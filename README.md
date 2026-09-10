# Resume Site — Соснович Иван

Персональный сайт-резюме на Next.js. Проект содержит только frontend: данные резюме хранятся локально, backend и переменные окружения не требуются.

Сайт позиционирует автора как Senior Frontend Engineer / Team Lead. Backend-опыт описывается отдельно как интеграция и AI-assisted delivery с явным указанием способов проверки результата.

## Стек

- Next.js 14 (App Router, standalone output)
- React 18 и TypeScript
- Tailwind CSS
- Framer Motion
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

Описание текущего продуктового изменения, принятых решений и критериев готовности находится в [`changes/frontend-first-portfolio/CHANGE.md`](changes/frontend-first-portfolio/CHANGE.md).

## Docker

```bash
docker compose up -d --build
docker compose ps
```

Контейнер публикует порт только на `127.0.0.1:3000`. Для публичного стенда нужен reverse proxy с TLS. Подробности приведены в [DEPLOYMENT.md](DEPLOYMENT.md).

Release-деплой собирает образ в отдельном BuildKit-builder `resume-site-builder`,
удаляет Compose-orphans и прежний образ только после успешных healthcheck и
HTTPS-проверки. Неиспользуемый кэш этого builder старше 7 дней очищается;
Docker-ресурсы других приложений на VPS не затрагиваются.

## AI-инструменты

Проект разрабатывался с использованием AI-инструментов, но не содержит runtime AI-ассистента, LLM-бэкенда или проектных `SKILL.md`.

## Тестирование

Компонентные тесты запускаются в Vitest и Testing Library. Минимальные пороги
покрытия по строкам, функциям, ветвлениям и выражениям закреплены на уровне 90%.

```bash
npm test
npm run test:coverage
```
