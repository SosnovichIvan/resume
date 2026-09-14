# Resume Site — Соснович Иван

Персональный сайт-резюме на Next.js. Проект содержит только frontend: данные резюме хранятся локально, backend и переменные окружения не требуются.

Сайт позиционирует автора как Senior Frontend Engineer / Team Lead. Backend-опыт описывается отдельно как интеграция и AI-assisted delivery с явным указанием способов проверки результата.

## Стек

- Next.js 16 (App Router, standalone output)
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

Описание текущего визуального редизайна, принятых решений и критериев готовности находится в [`changes/portfolio-visual-redesign/CHANGE.md`](changes/portfolio-visual-redesign/CHANGE.md). Предыдущая итерация позиционирования сохранена в [`changes/frontend-first-portfolio/CHANGE.md`](changes/frontend-first-portfolio/CHANGE.md).

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

### Ручная приёмка перед `main`

PR из `develop` в `main` нельзя создавать до ручной проверки release-кандидата.
Автор PR запускает проект в production-режиме (через Docker или `npm run build`
и `npm start`) и фиксирует в описании PR: URL/окружение, браузер и результат
каждого пункта ниже.

- Главная страница и все маршруты: `/experience`, `/projects`, `/my-projects`,
  `/publications`, а также страницы личных проектов открываются без ошибок.
- Навигация, переключатель темы и выпадающее меню контактов работают; ссылки
  ведут на ожидаемые адреса.
- Карусели и интерактивные элементы личных проектов проверены мышью и
  клавиатурой.
- Верстка проверена как минимум в desktop- и mobile-ширине; нет обрезанного
  текста, горизонтальной прокрутки или нечитаемого контраста.

Найденный блокирующий дефект сначала исправляется в `develop`; только затем
можно открывать PR в `main`.

### PDF и общие данные

Сайт и скачиваемое резюме используют `src/entities/*/model/data.json`.
После изменения данных выполните `npm run pdf` (Python 3.12+, ReportLab и
Pillow; Arial на macOS или DejaVu Sans на Linux). Другой Python можно указать
через `RESUME_PYTHON`. Генератор обновляет `public/resume.pdf` и
`scripts/resume-pdf-manifest.json`. `npm run check:pdf` проверяет соответствие
PDF исходным данным; эта проверка также входит в `npm run check` и CI.
Индексы `pdfAchievementIndices` и `pdfDetailIndices` выбирают пункты для
компактной версии резюме, не дублируя текст.

### Логотип

`public/logo-loop.svg` — выбранный знак с циклом сборки 5 секунд,
`public/logo-static.svg` — статичный вариант, `src/app/icon.svg` — иконка вкладки.
Кнопок управления анимацией нет. При `prefers-reduced-motion`
анимация отключается внутри SVG автоматически. Внешних зависимостей на
каталог с дизайнерскими исходниками нет.

### Дополнительные проверки

`npm run check` запускает линтер, TypeScript, компонентные тесты и проверку PDF.
После `npm run build` команда `npm run test:e2e` проверяет desktop/mobile в
Chromium, включая маршруты личных проектов, скачивание PDF и управление
анимацией. `Site checks` запускается для веток и PR. Публикация рабочей ветки
не запускает production: отдельный Deploy release реагирует только на теги `v*`.
