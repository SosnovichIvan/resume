#!/usr/bin/env bash
#
# deploy.sh — развёртывание сайта-резюме (Next.js) на Ubuntu VM в Docker.
#
# Что делает скрипт:
#   1. Проверяет, что мы на Ubuntu и под root.
#   2. Обновляет систему и ставит базовые утилиты (curl, git, ca-certificates, gnupg, jq).
#   3. Устанавливает Docker Engine + Docker Compose plugin (официальный APT-репозиторий).
#   4. Устанавливает Caddy (reverse-proxy) с автоматическим публичным HTTPS.
#   5. Читает URL репозитория, домен и ACME email из deploy.config.
#   6. Клонирует код, настраивает Caddy (домен → 127.0.0.1:3000).
#   7. Собирает и запускает Docker-образ сайта.
#   8. Проверяет здоровье контейнера и доступность сайта по HTTPS.
#
# Использование:
#   sudo bash deploy.sh
#
# Требования перед запуском:
#   - VM на Ubuntu (20.04/22.04/24.04), доступ по root/sudo.
#   - Домен из deploy.config должен быть привязан (DNS A/AAAA-записи)
#     к публичному IP этой VM ДО запуска,
#     иначе Caddy не сможет выпустить публичный ACME-сертификат.
#
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
config_file="${DEPLOY_CONFIG:-${script_dir}/deploy.config}"

# ─────────────────────────────────────────────────────────────────────────────
# Помощники вывода
# ─────────────────────────────────────────────────────────────────────────────
c_reset='\033[0m'
c_green='\033[0;32m'
c_yellow='\033[1;33m'
c_red='\033[0;31m'
c_blue='\033[0;34m'

info()  { printf "${c_blue}[INFO]${c_reset}  %s\n" "$*"; }
step()  { printf "${c_green}[STEP]${c_reset}  %s\n" "$*"; }
warn()  { printf "${c_yellow}[WARN]${c_reset}  %s\n" "$*"; }
error() { printf "${c_red}[ERROR]${c_reset} %s\n" "$*" >&2; }

trim() {
	local value="$1"
	value="${value#"${value%%[![:space:]]*}"}"
	value="${value%"${value##*[![:space:]]}"}"
	printf '%s' "${value}"
}

read_config() {
	local raw_key raw_value key value
	if [[ ! -f "${config_file}" ]]; then
		error "Файл конфигурации не найден: ${config_file}"
		exit 1
	fi

	while IFS='=' read -r raw_key raw_value || [[ -n "${raw_key:-}" ]]; do
		key="$(trim "${raw_key:-}")"
		[[ -z "${key}" || "${key}" == \#* ]] && continue
		value="$(trim "${raw_value:-}")"
		case "${key}" in
			DOMAIN) domain="${value}" ;;
			ACME_EMAIL) acme_email="${value}" ;;
			REPOSITORY_URL) repo_url="${value}" ;;
			*) warn "Неизвестный параметр в deploy.config: ${key}" ;;
		esac
	done < "${config_file}"
}

# ─────────────────────────────────────────────────────────────────────────────
# 0. Предварительные проверки
# ─────────────────────────────────────────────────────────────────────────────
if [[ $EUID -ne 0 ]]; then
	error "Скрипт нужно запускать от root. Используйте: sudo bash deploy.sh"
	exit 1
fi

if ! command -v lsb_release >/dev/null 2>&1; then
	apt-get update -qq && apt-get install -y -qq lsb-release >/dev/null
fi

os_name="$(lsb_release -is 2>/dev/null || echo unknown)"
os_codename="$(lsb_release -cs 2>/dev/null || echo unknown)"

if [[ "${os_name,,}" != "ubuntu" ]]; then
	error "Скрипт рассчитан на Ubuntu (сейчас: ${os_name}). Прерываю."
	exit 1
fi

info "Обнаружена система: ${os_name} ${os_codename}"

# ─────────────────────────────────────────────────────────────────────────────
# 1. Обновление системы и базовые утилиты
# ─────────────────────────────────────────────────────────────────────────────
step "Обновление пакетной базы и установка базовых утилит"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq \
	ca-certificates \
	curl \
	git \
	gnupg \
	jq \
	lsb-release \
	dnsutils \
	iproute2 \
	openssl \
	> /dev/null

# ─────────────────────────────────────────────────────────────────────────────
# 2. Установка Docker Engine + Docker Compose plugin
# ─────────────────────────────────────────────────────────────────────────────
if ! command -v docker >/dev/null 2>&1; then
	step "Установка Docker Engine (официальный репозиторий)"

	install -m 0755 -d /etc/apt/keyrings
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg |
		gpg --dearmor --yes -o /etc/apt/keyrings/docker.gpg
	chmod a+r /etc/apt/keyrings/docker.gpg

	# arch: amd64 / arm64 / armhf
	arch="$(dpkg --print-architecture)"
	echo \
		"deb [arch=${arch} signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu ${os_codename} stable" \
		> /etc/apt/sources.list.d/docker.list

	apt-get update -qq
	apt-get install -y -qq docker-ce docker-ce-cli containerd.io \
		docker-buildx-plugin docker-compose-plugin > /dev/null
else
	info "Docker уже установлен ($(docker --version))"
fi

# Убеждаемся, что docker-compose plugin доступен
if ! docker compose version >/dev/null 2>&1; then
	error "Плагин docker compose не найден. Проверьте установку."
	exit 1
fi

step "Включение и запуск Docker"
systemctl enable --now docker >/dev/null 2>&1 || true
info "Docker: $(docker --version) | Compose: $(docker compose version --short)"

# ─────────────────────────────────────────────────────────────────────────────
# 3. Установка Caddy (reverse-proxy с авто-HTTPS)
# ─────────────────────────────────────────────────────────────────────────────
if ! command -v caddy >/dev/null 2>&1; then
	step "Установка Caddy (официальный APT-репозиторий)"

	install -m 0755 -d /etc/apt/keyrings
	curl -fsSL https://dl.cloudsmith.io/public/caddy/stable/gpg.key |
		gpg --dearmor --yes -o /etc/apt/keyrings/caddy-stable-archive-keyring.gpg
	curl -fsSL https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt \
		> /etc/apt/sources.list.d/caddy-stable.list

	apt-get update -qq
	apt-get install -y -qq caddy > /dev/null
else
	info "Caddy уже установлен ($(caddy version | head -1))"
fi

systemctl enable --now caddy >/dev/null 2>&1 || true
info "Caddy: $(caddy version | head -1)"

# ─────────────────────────────────────────────────────────────────────────────
# 4. Чтение и проверка параметров развёртывания
# ─────────────────────────────────────────────────────────────────────────────
step "Чтение параметров из ${config_file}"
domain=""
acme_email=""
repo_url=""
read_config

domain="$(trim "${domain}" | tr '[:upper:]' '[:lower:]')"
acme_email="$(trim "${acme_email}" | tr '[:upper:]' '[:lower:]')"
repo_url="$(trim "${repo_url}")"

if [[ -z "${repo_url}" ]]; then
	error "REPOSITORY_URL в ${config_file} не может быть пустым."
	exit 1
fi
if [[ -z "${domain}" ]]; then
	error "DOMAIN в ${config_file} не может быть пустым."
	exit 1
fi
if [[ ! "${domain}" =~ ^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$ ]]; then
	error "Некорректный домен: ${domain}"
	exit 1
fi
if [[ ! "${acme_email}" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)+$ ]]; then
	error "Некорректный ACME_EMAIL: ${acme_email}"
	exit 1
fi
if [[ "${domain}" == "resume.example.com" || "${acme_email}" == "admin@example.com" ]]; then
	error "Замените демонстрационные DOMAIN и ACME_EMAIL в ${config_file} на реальные значения."
	exit 1
fi
info "Домен: ${domain} | ACME email: ${acme_email} | Репозиторий: ${repo_url}"

# ─────────────────────────────────────────────────────────────────────────────
# 4.1 DNS, публичные адреса, порты и firewall
# ─────────────────────────────────────────────────────────────────────────────
step "Проверка DNS и сетевых требований HTTPS"

mapfile -t dns_ipv4 < <(dig +short A "${domain}" | sed '/^$/d' | sort -u)
mapfile -t dns_ipv6 < <(dig +short AAAA "${domain}" | sed '/^$/d' | sort -u)
public_ipv4="$(curl -4fsS --max-time 10 https://api.ipify.org 2>/dev/null || true)"
public_ipv6="$(curl -6fsS --max-time 10 https://api6.ipify.org 2>/dev/null || true)"

if (( ${#dns_ipv4[@]} == 0 && ${#dns_ipv6[@]} == 0 )); then
	error "Для ${domain} не найдены DNS A/AAAA-записи."
	exit 1
fi
if [[ -n "${public_ipv4}" ]] && (( ${#dns_ipv4[@]} > 0 )); then
	if [[ ! " ${dns_ipv4[*]} " =~ " ${public_ipv4} " ]]; then
		error "DNS A (${dns_ipv4[*]}) не содержит публичный IPv4 этой VM (${public_ipv4})."
		exit 1
	fi
elif (( ${#dns_ipv4[@]} > 0 )); then
	warn "Не удалось определить публичный IPv4 VM; A-запись проверена только на наличие."
fi
if (( ${#dns_ipv6[@]} > 0 )); then
	if [[ -z "${public_ipv6}" ]]; then
		error "У домена есть AAAA (${dns_ipv6[*]}), но VM недоступна по публичному IPv6. Удалите AAAA или настройте IPv6."
		exit 1
	elif [[ ! " ${dns_ipv6[*]} " =~ " ${public_ipv6} " ]]; then
		error "DNS AAAA (${dns_ipv6[*]}) не содержит публичный IPv6 этой VM (${public_ipv6})."
		exit 1
	fi
fi
info "DNS проверен: A=${dns_ipv4[*]:-нет}, AAAA=${dns_ipv6[*]:-нет}."

for port in 80 443; do
	listeners="$(ss -H -ltnp 2>/dev/null | awk -v suffix=":${port}" '$4 ~ suffix "$" {print}' || true)"
	if [[ -n "${listeners}" && "${listeners}" != *caddy* ]]; then
		error "Порт ${port} уже занят не Caddy: ${listeners}"
		exit 1
	fi
done

if command -v ufw >/dev/null 2>&1 && ufw status | grep -q '^Status: active'; then
	step "Открытие HTTP/HTTPS в UFW"
	ufw allow 80/tcp >/dev/null
	ufw allow 443/tcp >/dev/null
	info "UFW разрешает входящие соединения на 80/tcp и 443/tcp."
else
	info "UFW не активен; проверьте security group/NAT провайдера для портов 80 и 443."
fi

# ─────────────────────────────────────────────────────────────────────────────
# 5. Клонирование кода
# ─────────────────────────────────────────────────────────────────────────────
app_dir="/opt/resume-site"
step "Клонирование репозитория в ${app_dir}"

if [[ -d "${app_dir}/.git" ]]; then
	warn "Репозиторий уже существует в ${app_dir}. Обновляю (git pull)..."
	git -C "${app_dir}" pull --ff-only
else
	rm -rf "${app_dir}"
	git clone --depth 1 "${repo_url}" "${app_dir}"
fi

if [[ ! -f "${app_dir}/docker-compose.yml" ]]; then
	error "В репозитории не найден docker-compose.yml. Убедитесь, что это код сайта."
	exit 1
fi

# ─────────────────────────────────────────────────────────────────────────────
# 6. Настройка Caddy (домен → 127.0.0.1:3000)
# ─────────────────────────────────────────────────────────────────────────────
caddyfile="/etc/caddy/Caddyfile"
caddy_sites_dir="/etc/caddy/sites"
caddy_site_file="${caddy_sites_dir}/resume-site.caddy"
step "Настройка Caddy для домена ${domain}"

# Caddy должен иметь возможность создать access.log уже при reload.
install -d -o caddy -g caddy -m 0750 /var/log/caddy

# Сохраняем существующий Caddyfile и подключаем отдельный фрагмент проекта.
# Так скрипт не удаляет конфигурацию других сайтов на сервере.
if [[ -f "${caddyfile}" ]]; then
	backup="${caddyfile}.bak.$(date +%Y%m%d%H%M%S)"
	cp -a "${caddyfile}" "${backup}"
	warn "Текущий Caddyfile сохранён как ${backup}"
fi
mkdir -p "${caddy_sites_dir}"
if [[ -f "${caddy_site_file}" ]]; then
	site_backup="${caddy_site_file}.bak.$(date +%Y%m%d%H%M%S)"
	cp -a "${caddy_site_file}" "${site_backup}"
	warn "Предыдущий конфиг сайта сохранён как ${site_backup}"
fi
touch "${caddyfile}"
if ! grep -Fxq "import ${caddy_sites_dir}/*.caddy" "${caddyfile}"; then
	printf '\nimport %s/*.caddy\n' "${caddy_sites_dir}" >> "${caddyfile}"
fi

cat > "${caddy_site_file}" <<EOF
# Автоконфигурация развёртывания сайта-резюме (создано deploy.sh)
${domain} {
	reverse_proxy 127.0.0.1:3000
	tls ${acme_email}

	# Гарантируем только HTTPS (HTTP-запросы Caddy сам редиректит на HTTPS)
	encode zstd gzip
	# Логи доступа: access.log; ошибки Caddy уходят в syslog/error.log (см. logrotate)
	log {
		output file /var/log/caddy/access.log {
			roll_size 10mb
			roll_keep 3
		}
		level INFO
	}
}
EOF

# Проверяем конфигурацию до reload, чтобы не сломать работающий reverse proxy.
if ! caddy validate --config "${caddyfile}"; then
	if [[ -n "${backup:-}" && -f "${backup}" ]]; then
		cp -a "${backup}" "${caddyfile}"
	fi
	if [[ -n "${site_backup:-}" && -f "${site_backup}" ]]; then
		cp -a "${site_backup}" "${caddy_site_file}"
	else
		rm -f "${caddy_site_file}"
	fi
	error "Конфигурация Caddy невалидна; исходный Caddyfile восстановлен."
	exit 1
fi
if ! caddy reload --config "${caddyfile}" >/dev/null 2>&1 && ! systemctl restart caddy; then
	if [[ -n "${backup:-}" && -f "${backup}" ]]; then
		cp -a "${backup}" "${caddyfile}"
	fi
	if [[ -n "${site_backup:-}" && -f "${site_backup}" ]]; then
		cp -a "${site_backup}" "${caddy_site_file}"
	else
		rm -f "${caddy_site_file}"
	fi
	systemctl restart caddy >/dev/null 2>&1 || true
	error "Caddy не принял новую конфигурацию; предыдущая конфигурация восстановлена."
	exit 1
fi
info "Caddy настроен. HTTP ➜ HTTPS и публичный ACME-сертификат включены автоматически."

# ─────────────────────────────────────────────────────────────────────────────
# 6.1 Настройка logrotate — логи за последние 72 часа
# ─────────────────────────────────────────────────────────────────────────────
# Цель: на VM хранить логи ровно за последние 72 часа, не давая им расти в бесконечность.
# Решение: systemd-таймер logrotate (daily) + rotate 3 (= 3 суток = 72 часа),
# сжатие (compress) и copytruncate (без потери записей открытых файлов).
step "Настройка logrotate (хранение логов за последние 72 часа)"

apt-get install -y -qq logrotate > /dev/null
install -d -o caddy -g caddy -m 0750 /var/log/caddy

# a) Caddy access log
cat > /etc/logrotate.d/resume-caddy <<EOF
/var/log/caddy/access.log {
	daily
	rotate 3
	compress
	delaycompress
	copytruncate
	missingok
	notifempty
	su caddy caddy
}
EOF

# b) Docker-json-логи контейнера (ротация по времени, а не только по размеру)
cat > /etc/logrotate.d/resume-docker <<EOF
/var/lib/docker/containers/*/*-json.log {
	daily
	rotate 3
	compress
	delaycompress
	copytruncate
	missingok
	notifempty
}
EOF

# Убеждаемся, что logrotate запускается ежедневно (systemd timer или cron.daily)
if command -v systemctl >/dev/null 2>&1 && systemctl list-timers "logrotate*" >/dev/null 2>&1; then
	systemctl enable --now logrotate.timer >/dev/null 2>&1 || true
	info "logrotate запускается ежедневно по systemd-таймеру (logrotate.timer)."
else
	info "logrotate будет запускаться daily через cron.daily (штатно для Ubuntu)."
fi
info "Логи Caddy и Docker ротируются: история за последние 72 часа (rotate 3 x daily), сжатие включено."

# ─────────────────────────────────────────────────────────────────────────────
# 7. Сборка и запуск Docker-образа сайта
# ─────────────────────────────────────────────────────────────────────────────
step "Сборка и запуск Docker-контейнера сайта"
cd "${app_dir}"

if docker compose ps >/dev/null 2>&1; then
	warn "Контейнер уже существует. Пересобираю/перезапускаю..."
fi
docker compose up -d --build

info "Ожидание готовности healthcheck контейнера..."
for i in $(seq 1 30); do
	status="$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' resume-site 2>/dev/null || true)"
	if [[ "${status}" == "healthy" ]]; then
		break
	fi
	sleep 2
done

if [[ "${status}" != "healthy" ]]; then
	error "Контейнер не вернул health=healthy (последний статус: '${status:-unknown}')."
	docker compose logs --tail=100 || true
	exit 1
else
	info "Контейнер здоров (healthy)."
fi

# ─────────────────────────────────────────────────────────────────────────────
# 8. Финальная проверка и вывод
# ─────────────────────────────────────────────────────────────────────────────
step "Проверка доступности сайта"

https_ok=false
for i in $(seq 1 30); do
	http_code="$(curl -fsS --connect-timeout 5 --max-time 15 -o /dev/null -w '%{http_code}' "https://${domain}/" 2>/dev/null || true)"
	if [[ "${http_code}" == "200" ]]; then
		https_ok=true
		break
	fi
	sleep 5
done
if [[ "${https_ok}" != true ]]; then
	error "HTTPS не прошёл проверку доверенной цепочки/домена или не вернул 200. Последний код: '${http_code:-нет ответа}'."
	journalctl -u caddy --no-pager -n 80 >&2 || true
	exit 1
fi
info "HTTPS отвечает 200; сертификат действителен, доверен и соответствует домену."

redirect_result="$(curl -sS --connect-timeout 5 --max-time 15 -o /dev/null -w '%{http_code} %{redirect_url}' "http://${domain}/" 2>/dev/null || true)"
redirect_code="${redirect_result%% *}"
redirect_url="${redirect_result#* }"
if [[ ! "${redirect_code}" =~ ^30[18]$ || "${redirect_url}" != https://${domain}/* ]]; then
	error "HTTP→HTTPS redirect некорректен: '${redirect_result:-нет ответа}'."
	exit 1
fi
info "HTTP ${redirect_code} корректно перенаправляет на ${redirect_url}."

certificate_info="$(echo | openssl s_client -connect "${domain}:443" -servername "${domain}" 2>/dev/null | openssl x509 -noout -subject -issuer -dates 2>/dev/null || true)"
if [[ -n "${certificate_info}" ]]; then
	info "Параметры TLS-сертификата:"
	printf '%s\n' "${certificate_info}"
fi

# Напоминание про автозапуск Docker при перезагрузке VM
if systemctl is-enabled docker >/dev/null 2>&1; then
	info "Docker включён в автозапуск (systemctl enabled) — контейнер поднимется после перезагрузки VM."
else
	warn "Docker НЕ включён в автозапуск: systemctl enable docker"
fi

echo
printf "${c_green}==================================================${c_reset}\n"
printf "${c_green} Готово. Сайт развёрнут.${c_reset}\n"
echo
printf "  Сайт (HTTPS):   ${c_green}https://%s${c_reset}\n" "${domain}"
printf "  Папка кода:     %s\n" "${app_dir}"
echo
printf "Мониторинг и обслуживание:\n"
printf "  docker compose -f %s/docker-compose.yml ps      # статус служб\n" "${app_dir}"
printf "  docker compose -f %s/docker-compose.yml logs -f # поток логов контейнера\n" "${app_dir}"
printf "  tail -f /var/log/caddy/access.log               # access-лог сайта (72 ч)\n"
printf "  journalctl -u caddy -f                          # лог службы caddy\n"
printf "  docker inspect resume-site --format '{{.RestartCount}}'        # счётчик перезапусков\n"
printf "  docker inspect resume-site --format '{{.State.Health.Status}}' # health контейнера\n"
printf "  docker inspect resume-site --format '{{.HostConfig.LogConfig.Type}}' # тип логирования\n"
printf "  docker events --filter container=resume-site     # события (старт/стоп/падение)\n"
printf "  caddy config    # текущий конфиг reverse-proxy\n"
echo
printf "Логирование (72 часа):\n"
printf "  /var/log/caddy/access.log              # HTTP-запросы (ротация 72 ч)\n"
printf "  /var/log/caddy/access.log.*.gz         # сжатые ротированные файлы\n"
printf "  docker logs resume-site                # stdout приложения (ротация 72 ч)\n"
printf "  logrotate --force /etc/logrotate.d/resume-caddy  # принудительная ротация\n"
echo
printf "Надёжность (в docker-compose.yml):\n"
printf "  restart: unless-stopped  # автоперезапуск при падении/ребуте\n"
printf "  init: true               # graceful shutdown, нет сиротских процессов\n"
printf "  healthcheck              # проба живости каждые 30s\n"
printf "  logging: json-file 10m x5 # ротация docker-логов по размеру\n"
printf "${c_green}==================================================${c_reset}\n"

exit 0
