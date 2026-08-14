# Развёртывание сайта-резюме

Проект собирается как standalone-приложение Next.js и запускается Node.js-сервером в Docker. Backend, секреты и переменные окружения приложению не требуются.

## Требования

- Docker 24+
- Docker Compose 2.20+
- reverse proxy с TLS для публичного стенда
- Node.js 20+ только для локальной сборки

## Локальная проверка

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run build
npm start
```

## Docker Compose

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f
```

Проверка приложения:

```bash
curl -I http://127.0.0.1:3000/
docker inspect --format='{{json .State.Health}}' resume-site
```

Порт привязан к `127.0.0.1:3000`, поэтому публичный трафик должен идти через reverse proxy.

## Reverse proxy

Пример для Caddy:

```caddyfile
resume.example.com {
    reverse_proxy 127.0.0.1:3000
    encode zstd gzip
}
```

Caddy автоматически получает TLS-сертификат и перенаправляет HTTP на HTTPS при корректной DNS-записи.

## Меры безопасности

- контейнер запускается от пользователя `nextjs`, а не root;
- корневая файловая система контейнера доступна только для чтения;
- Linux capabilities удалены, `no-new-privileges` включён;
- порт приложения не публикуется на внешнем интерфейсе;
- HTTP security headers задаются в `next.config.mjs`;
- логи Docker ротируются по размеру;
- `.env*`, ключи и сертификаты исключены из Docker context и Git.

`NEXT_PUBLIC_*` нельзя использовать для секретов: такие значения встраиваются в клиентский JavaScript во время сборки.

## Автоматическое развёртывание Ubuntu

`deploy.sh` устанавливает Docker и Caddy, клонирует репозиторий в `/opt/resume-site`, создаёт отдельный Caddy-фрагмент и запускает Compose:

Перед запуском заполните `deploy.config`:

```ini
DOMAIN=resume.example.com
ACME_EMAIL=admin@example.com
REPOSITORY_URL=https://github.com/user/resume.git
```

DNS A/AAAA должен уже указывать на публичные адреса VM. В security group или NAT
провайдера должны быть разрешены входящие соединения на `80/tcp` и `443/tcp`.
Активный UFW скрипт настраивает автоматически.

```bash
sudo bash deploy.sh
```

Скрипт предназначен для Ubuntu и требует root-доступа, публичного домена и корректной DNS A/AAAA-записи. Другой путь к конфигурации можно передать через `DEPLOY_CONFIG=/path/to/file`.

## Чек-лист

- `npm run lint`, TypeScript и production build проходят;
- контейнер имеет статус `healthy`;
- `https://<домен>/` отвечает кодом 200;
- TLS-сертификат доверен, не истёк и соответствует домену;
- HTTP возвращает 301/308 и перенаправляет на HTTPS;
- security headers присутствуют;
- порт 3000 доступен только локально;
- в Git и Docker image нет `.env`, токенов, ключей или сертификатов.
