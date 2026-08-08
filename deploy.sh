#!/usr/bin/env bash
#
# deploy.sh — развёртывание сайта-резюме (Next.js) на Ubuntu VM в Docker.
#
# Что делает скрипт:
#   1. Проверяет, что мы на Ubuntu и под root.
#   2. Обновляет систему и ставит базовые утилиты (curl, git, ca-certificates, gnupg, jq).
#   3. Устанавливает Docker Engine + Docker Compose plugin (официальный APT-репозиторий).
#   4. Устанавливает Caddy (reverse-proxy) с авто-HTTPS (Let's Encrypt).
#   5. Запрашивает URL git-репозитория с кодом сайта и домен для развёртывания.
#   6. Клонирует код, настраивает Caddy (домен → 127.0.0.1:3000).
#   7. Собирает и запускает Docker-образ сайта.
#   8. Проверяет здоровье контейнера и доступность сайта по HTTPS.
#
# Использование:
#   sudo bash deploy.sh
#
# Требования перед запуском:
#   - VM на Ubuntu (20.04/22.04/24.04), доступ по root/sudo.
#   - Домен, для которого скрипт запросит подтверждение, должен быть
#     привязан (DNS A-запись) к публичному IP этой VM ДО запуска,
#     иначе Caddy не сможет выпустить сертификат Let's Encrypt.
#
set -euo pipefail

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
# 4. Запрос параметров: репозиторий и домен
# ─────────────────────────────────────────────────────────────────────────────
echo
step "Параметры развёртывания"

read -r -p "URL git-репозитория с кодом сайта (например, https://github.com/user/resume.git): " repo_url
repo_url="$(echo "${repo_url}" | xargs)"
if [[ -z "${repo_url}" ]]; then
	error "URL репозитория не может быть пустым."
	exit 1
fi

read -r -p "Домен для сайта (например, resume.example.com): " domain
domain="$(echo "${domain}" | xargs | tr '[:upper:]' '[:lower:]')"
if [[ -z "${domain}" ]]; then
	error "Домен не может быть пустым."
	exit 1
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
step "Настройка Caddy для домена ${domain}"

# Сохраняем дефолтный Caddyfile, чтобы не потерять его (для диагностики)
if [[ -f "${caddyfile}" ]] && ! grep -q "${domain}" "${caddyfile}" 2>/dev/null; then
	backup="${caddyfile}.bak.$(date +%Y%m%d%H%M%S)"
	cp -a "${caddyfile}" "${backup}"
	warn "Текущий Caddyfile сохранён как ${backup}"
fi

cat > "${caddyfile}" <<EOF
# Автоконфигурация развёртывания сайта-резюме (создано deploy.sh)
${domain} {
	reverse_proxy 127.0.0.1:3000

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

# Перечитываем конфигурацию Caddy
caddy reload --config "${caddyfile}" >/dev/null 2>&1 || systemctl restart caddy
info "Caddy настроен. HTTP ➜ HTTPS + сертификат Let's Encrypt выпустит автоматически."

# ─────────────────────────────────────────────────────────────────────────────
# 6.1 Настройка logrotate — логи за последние 72 часа
# ─────────────────────────────────────────────────────────────────────────────
# Цель: на VM хранить логи ровно за последние 72 часа, не давая им расти в бесконечность.
# Решение: systemd-таймер logrotate (daily) + rotate 3 (= 3 суток = 72 часа),
# сжатие (compress) и copytruncate (без потери записей открытых файлов).
step "Настройка logrotate (хранение логов за последние 72 часа)"

apt-get install -y -qq logrotate > /dev/null
mkdir -p /var/log/caddy
chown root:caddy /var/log/caddy 2>/dev/null || true

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
	warn "Контейнер не вернул health=healthy (последний статус: '${status:-unknown}'). Проверьте логи: docker compose logs"
else
	info "Контейнер здоров (healthy)."
fi

# ─────────────────────────────────────────────────────────────────────────────
# 8. Финальная проверка и вывод
# ─────────────────────────────────────────────────────────────────────────────
step "Проверка доступности сайта"

sleep 3
http_code="$(curl -s -o /dev/null -w '%{http_code}' -k "https://${domain}/" 2>/dev/null || true)"
if [[ "${http_code}" == "200" ]]; then
	info "Сайт отвечает 200 по https://${domain}/"
else
	warn "Не удалось получить 200 по HTTPS (код: '${http_code:-нет ответа}')."
	warn "Caddy выпускает сертификат в фоне; проверьте DNS (A-запись должна указывать на IP VM)."
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
