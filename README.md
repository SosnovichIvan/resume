# Resume Site — Соснович Иван

Персональный сайт-резюме на Next.js. Проект содержит только frontend: данные резюме хранятся локально, backend и переменные окружения не требуются.

## Стек

- Next.js 16 (App Router, standalone output)
- React 19 и TypeScript
- Tailwind CSS
- CSS-анимации с поддержкой reduced motion
- Feature-Sliced Design

## Запуск

Требуется Node.js 20 или новее.

```bash
npm ci
npm run dev
```

Сайт будет доступен на `http://localhost:3000`.

Проверка production-сборки:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

## Структура

```text
src/
├── app/             # страницы: /, /experience, /projects, /my-projects, /publications
├── widgets/         # составные блоки интерфейса
├── entities/        # данные профиля, опыта, проектов и публикаций
└── shared/          # переиспользуемые UI-компоненты
```

Данные резюме находятся в `src/entities/*/model/data.ts`.

## Docker

```bash
docker compose up -d --build
docker compose ps
```

Контейнер публикует порт только на `127.0.0.1:3000`. Для публичного стенда нужен reverse proxy с TLS. Подробности приведены в [DEPLOYMENT.md](DEPLOYMENT.md).

## AI-инструменты

Проект разрабатывался с использованием AI-инструментов, но не содержит runtime AI-ассистента, LLM-бэкенда или проектных `SKILL.md`.

## Тестирование

Компонентные тесты запускаются в Vitest и Testing Library. Минимальные пороги
покрытия по строкам, функциям, ветвлениям и выражениям закреплены на уровне 90%.

```bash
npm test
npm run test:coverage
```

## Проверка изменений

Используйте Node.js из `.nvmrc`, затем `npm ci` и `npm run check`.
Для браузерных проверок: `npm run build`, `npx playwright install chromium`,
`npm run test:e2e`. Тесты стартуют production-сервер на порту 3100.

План улучшений и открытые вопросы: [TASKS.md](TASKS.md).

## Общие данные сайта и PDF

Тексты хранятся в `src/entities/*/model/data.json`. Файлы `data.ts` добавляют
типы для приложения; генератор PDF читает те же JSON-файлы напрямую.
Главный блок редактируется в `profile/model/data.json` → `hero`.

PDF показывает избранные пункты из общих массивов: `pdfAchievementIndices` и
`pdfDetailIndices` — индексы пунктов с нуля. При перестановке пунктов проверьте
эти списки. Тексты для PDF отдельно не переписываются.

После изменения данных:

1. Выполните `npm run pdf` (нужен Python с `reportlab` и `Pillow`).
2. Проверьте страницы PDF визуально. На macOS используется Arial, на Linux — DejaVu Sans.
3. Сохраните `public/resume.pdf` и `scripts/resume-pdf-manifest.json` вместе с данными.

Для выбора Python используйте `RESUME_PYTHON=/path/to/python3 npm run pdf`.
`npm run check:pdf` сверяет хеши данных, генератора, фотографии и PDF;
CI завершится ошибкой, если PDF не обновлён после правки источников.
Исходное пользовательское резюме в `output/pdf` не перезаписывается.
