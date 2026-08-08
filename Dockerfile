# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────────────────────
#  Стадия 1 — deps: установка зависимостей (кэш по package-lock.json)
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
# Базовые утилиты/библиотеки, нужные для нативных модулей (если появятся)
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
# npm ci — детерминированная установка строго по lock-файлу
RUN npm ci

# ─────────────────────────────────────────────────────────────────────────────
#  Стадия 2 — builder: сборка продакшен-сборки
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# Переменные, которые Next.js подставляет на этапе сборки (NEXT_PUBLIC_*)
# ARG — позволяют передать их через --build-arg, не зашивая в образ.
ARG NEXT_PUBLIC_API_URL=
ARG NEXT_PUBLIC_SHARED_SECRET=

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_SHARED_SECRET=$NEXT_PUBLIC_SHARED_SECRET \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# standalone-вывод кладёт самодостаточный сервер в .next/standalone
RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
#  Стадия 3 — runner: минимальный рантайм ТОЛЬКО для запуска
# ─────────────────────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

# Запуск от непривилегированного пользователя (security best practice)
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Для standalone достаточно скопировать статику и сам сервер
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Переходим на непривилегированного пользователя
USER nextjs

# Standalone-сервер слушает этот порт (именно из-за него Next собирает standalone)
ENV PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# Проверка живости: standalone-сервер отвечает на / 200
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1 || exit 1

CMD ["node", "server.js"]
