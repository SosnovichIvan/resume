# Развертывание сайта-резюме на стенде

Документ описывает развертывание **фронтенд-части** (Next.js 14, standalone-сборка) в Docker, настройку reverse-proxy с TLS и раздел безопасности.

> **Важно о текущем состоянии проекта.**
> На момент написания репозиторий содержит только фронтенд (Next.js, `output: "standalone"`).
> Файлы `.env.example` / `.env.production.example` и разделы README про Go-бэкенд, AES-шифрование и Telegram-мост относятся к более старой архитектуре (`ui/` + `back/`) и **в текущем коде не используются** — в фронтенде нет ни `fetch()` к API, ни чтения `process.env`. Проверьте и обновите эти артефакты, если планируете вернуть бэкенд.

---

## 1. Требования

| Компонент | Версия | Назначение |
|-----------|--------|------------|
| Docker | >= 24 | сборка и запуск контейнера |
| Docker Compose | >= 2.20 | оркестрация одного сервиса + деплой |
| Node.js (локально) | >= 20 (в Docker — 22-alpine) | только для локального `npm run build` |
| Reverse-proxy | nginx / Caddy / Traefik | TLS-терминация и безопасные заголовки |

Никаких переменных окружения **не требуется** — сайт полностью статический (данные зашиты в `src/entities/**/model/data.ts`).

---

## 2. Локальная проверка (без Docker)

```bash
npm ci            # детерминированная установка по lock-файлу
npm run lint
npx tsc --noEmit
npm run build     # output: standalone -> .next/standalone
npm start         # http://localhost:3000
```

---

## 3. Сборка и запуск в Docker

### 3.1. Собрать образ

```bash
docker build -t resume-site:latest .
```

Если позже появятся `NEXT_PUBLIC_*`-переменные, их передают на этапе сборки **без зашивания в образ**:

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.example.com \
  -t resume-site:latest .
```

### 3.2. Запустить контейнер (Docker-рантайм-vars)

```bash
docker run -d \
  --name resume-site \
  --restart unless-stopped \
  --init \
  --read-only \
  -p 127.0.0.1:3000:3000 \
  resume-site:latest
```

> Порт привязан к `127.0.0.1` — наружу контейнер отдаёт **только** reverse-proxy (см. раздел 5). Никогда не публикуйте `3000` на `0.0.0.0` настендовом сервере.

### 3.3. Docker Compose (рекомендуемый способ)

```bash
docker compose up -d --build
docker compose ps            # статус
docker compose logs -f       # логи
```

Проверка через healthcheck:

```bash
docker inspect --format='{{json .State.Health}}' resume-site
# ожидаем "status":"healthy"
```

---

## 4. Проверка после деплоя

```bash
# Ответ сервера
curl -I http://localhost:3000/        # ожидаем 200 OK

# Безопасные заголовки (должны присутствовать, см. раздел 6)
curl -sI http://localhost:3000/ | grep -iE 'content-security-policy|x-frame-options|strict-transport|referrer-policy|x-content-type-options'
```

---

## 5. Reverse-proxy + TLS (обязательно для продакшена)

Контейнер должен быть доступен **только** через HTTPS. Пример nginx:

```nginx
server {
    listen 443 ssl http2;
    server_name resume.example.com;

    # TLS 1.2+ только; современные шифры
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    ssl_certificate     /etc/letsencrypt/live/resume.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/resume.example.com/privkey.pem;

    # Редирект HTTP -> HTTPS
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name resume.example.com;
    return 301 https://$host$request_uri;
}
```

Если **не** включаете HSTS в `next.config.mjs` на уровне proxy — оставьте его в конфиге Next (он уже там). При проксировании дублирование заголовка не критично, но лучше один источник правды.

---

## 6. Секции безопасности

### 6.1. Уровень приложения (уже в `next.config.mjs`)

Заголовки задаются для всех маршрутов через `headers()`:

| Заголовок | Значение | Назначение |
|-----------|----------|------------|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; ... frame-ancestors 'none'` | Базовая CSP: ресурсы только с себя; защита от clickjacking (`frame-ancestors 'none'`) |
| `X-Frame-Options` | `DENY` | Ещё один слой против встраивания в фреймы |
| `X-Content-Type-Options` | `nosniff` | Запрет MIME-сниффинга |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Форсирование HTTPS (только при HTTPS-раздаче) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Не утекает полный URL при переходе на сторонние ресурсы |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Без доступа к камере/микрофону/гео |
| (нет `X-Powered-By`) | `poweredByHeader: false` | Сокрытие версии сервера |

**Про CSP и inline-скрипт темы.** В `layout.tsx` есть inline-скрипт переключения темы (`dangerouslySetInnerHTML`), поэтому `script-src` содержит `'unsafe-inline'`. Это осознанный компромисс для минимизации FOUC. Для **максимального усиления**:
- вынесите inline-скрипт в отдельный файл `public/theme.js` (тогда `script-src 'self'`), **или**
- используйте nonce/hash на уровне прокси, сгенерированный для этого скрипта.

### 6.2. Уровень контейнера (в `Dockerfile` / `docker-compose.yml`)

| Мера | Где | Назначение |
|------|-----|------------|
| Запуск от не-root пользователя | `USER nextjs` (uid 1001) | Минимум привилегий |
| `--read-only` + `tmpfs: /tmp` | compose | Запрет записи в корневую ФС |
| `--init` | compose | Graceful shutdown, нет сиротских процессов |
| `cap_drop: [ALL]` + `no-new-privileges` | compose | Без лишних Linux-капабилити |
| `restart: unless-stopped` | compose | Автовосстановление |
| Лимиты CPU/RAM | compose `deploy.resources` | Защита стенда от OOM/неконтролируемого роста |
| HEALTHCHECK | Dockerfile | Автоперезапуск нездорового контейнера |
| Минимальный рантайм | multi-stage `runner` | Меньше поверхности атаки |

### 6.3. Секреты и окружение

- `.env*`, `*.pem`, `*.key`, `*.crt` **исключены** из образа через `.dockerignore`.
- Никакой ключ/токен не должен попадать в образ на этапе сборки без необходимости. Если понадобятся `NEXT_PUBLIC_*` — только через `--build-arg` / `ENV` на рантайме, никогда хардкодом.
- Для рантайм-секретов используйте Docker secrets или переменные окружения хоста, а не текст внутри `docker-compose.yml`.

### 6.4. Сеть и доступ

- Порт контейнера опубликован только на `127.0.0.1` — наружу общается reverse-proxy.
- Reverse-proxy — единственный вход (HTTPS:443). SSH-доступ к стенду — по ключам, не по паролю.

### 6.5. Зависимости и образ

- Периодически обновляйте зависимости: `npm audit` / `npm outdated`. Финальный рантайм-образ не содержит `devDependencies` (node_modules в репо не попадают — сборка идёт внутри многоступенчатого `Dockerfile`).
- Пинните базовый образ по тегу (`node:22-alpine`), при upgrades проверяйте изменения.

---

## 7. Чек-лист перед выкаткой на прод

- [ ] `npm run lint` и `npx tsc --noEmit` проходят чисто
- [ ] `npm run build` успешен (standalone)
- [ ] Docker-образ собран, `healthcheck` → `healthy`
- [ ] Контейнер слушает только `127.0.0.1:3000`
- [ ] HTTPS с валидным сертификатом, HTTP → HTTPS редирект
- [ ] Присутствуют безопасные заголовки (раздел 6.1)
- [ ] `.env*`/ключи/сертификаты не попали в образ (`docker history <image>` / `docker run --entrypoint ls image`)
- [ ] Лимиты CPU/RAM и `read_only` включены
- [ ] Ограничен доступ к SSH; только reverse-proxy наружу

---

## 8. Откат

```bash
# Вернуться на предыдущий образ
docker compose down
docker tag resume-site:previous resume-site:latest
docker compose up -d
```
