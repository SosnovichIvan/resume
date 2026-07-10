# Resume Site — Соснович Иван

Адаптивный сайт-визитка + AI-ассистент.

## Структура проекта

```
resume-site/
├── ui/                     # Frontend (Next.js 14 + FSD)
│   ├── src/
│   │   ├── app/           # App Router: главная + /experience /skills /projects /articles
│   │   ├── widgets/       # Header, ThemeToggle, AIAssistant
│   │   ├── entities/      # Данные резюме
│   │   └── shared/        # UI-компоненты, lib (crypto, api)
│   ├── .env.local         # (не коммитится) API_URL + SHARED_SECRET
│   └── .env.example       # Шаблон переменных
│
├── back/                   # Backend (Go 1.23)
│   ├── cmd/server/         # Точка входа, graceful shutdown
│   ├── internal/
│   │   ├── config/        # Загрузка env vars
│   │   ├── crypto/        # AES-256-GCM шифрование (совместимо с WebCrypto)
│   │   ├── llm/           # OpenAI-compatible chat completion клиент
│   │   ├── resume/        # Загрузка текста резюме как system prompt
│   │   ├── handler/       # HTTP API: /api/health, /api/chat, /api/contact
│   │   └── telegram/      # Telegram-мост для запросов на связь
│   └── .env.example       # Шаблон переменных
│
├── skils/                 # Скиллы дизайна и разработки (копия ~/.agents/skills)
└── Документация/          # Проектная документация
```

## Запуск

### Frontend

```bash
cd ui
npm install
cp .env.example .env.local   # заполнить API_URL и SHARED_SECRET
npm run dev                   # http://localhost:3000
npm run build && npm start   # production
```

### Backend

```bash
cd back
cp .env.example .env         # заполнить LLM_* и SHARED_SECRET
./resume-backend              # http://localhost:8080
```

Или одной строкой (Go должен быть в PATH):
```bash
go run ./cmd/server
```

## Переменные окружения

### Frontend (.env.local)
| Переменная | Описание | Пример |
|-----------|---------|--------|
| `NEXT_PUBLIC_API_URL` | URL backend | `http://localhost:8080` |
| `NEXT_PUBLIC_SHARED_SECRET` | Ключ шифрования | `32-симв. строка` |

### Backend (.env)
| Переменная | Описание | Пример |
|-----------|---------|--------|
| `ADDR` | Адрес сервера | `:8080` |
| `LLM_URL` | URL LLM API | `https://api.openai.com/v1` |
| `LLM_TOKEN` | API-ключ | `sk-...` |
| `LLM_MODEL` | Название модели | `gpt-4o-mini` |
| `SHARED_SECRET` | Ключ шифрования (>= 16 симв.) | `...` |
| `RESUME_PATH` | Путь к resume.txt | `resume.txt` |
| `TELEGRAM_BOT_TOKEN` | Токен Telegram-бота | `...` |
| `TELEGRAM_OWNER_ID` | Telegram ID владельца | `123456` |

## Архитектура

### Шифрование сообщений

Все сообщения между UI и backend зашифрованы AES-256-GCM:

- **Frontend**: WebCrypto API (`crypto.subtle`)
- **Backend**: Go `crypto/cipher` (aes.NewCipher + GCM)

Формат: `base64(nonce[12] || ciphertext+tag)`. Ключ — SHA-256(sharedSecret).

### AI-ассистент (UI)

Пульсирующий шарик в правом нижнем углу (sticky, виден на всех страницах):
- Волнистая пульсация (ping-анимация)
- Чат-модалка с историей сообщений
- Автоопределение намерения «связаться» → форма контакта
- Запрос → POST `/api/chat` (зашифрованный) → LLM → ответ

### AI-ассистент (Backend)

- `POST /api/chat` — зашифрованный chat completions
- `POST /api/contact` — зашифрованный запрос на связь через Telegram
- LLM system prompt загружается из `resume.txt`
- Контекст ограничен 20 сообщениями, timeout 55s

### Telegram-мост

Когда посетитель запрашивает связь:
1. Backend отправляет уведомление боту
2. Посетитель получает ссылку на Telegram-чат с Иваном

## Скиллы

Документация скиллов дизайна и разработки — в папке `skils/` (копия ~/Desktop/skils):
- `ui-ux-pro-max/` — стили, палитры, чек-листы
- `frontend-developer/` — React/Next.js паттерны
- `shadcn-ui/` — composition-компоненты
- `better-icons/`, `svg-precision/` — SVG иконки
- `ui-ux-expert-skill/` — доступность WCAG

## Стек

| Слой | Технологии |
|------|------------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion |
| Backend | Go 1.23, net/http, crypto/cipher |
| LLM | OpenAI-compatible API (GPT-4o, Claude, и др.) |
| Infrastructure | Devcontainers, Vite/Webpack |
