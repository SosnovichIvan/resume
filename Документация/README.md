# Resume Site — сайт-визитка разработчика

## Описание

Адаптивный сайт-визитка Сосновича Ивана (Frontend Developer) на React + Next.js по архитектуре FSD.

## Стек

- **Next.js 14** (App Router, static prerender)
- **React 18** + TypeScript
- **Tailwind CSS** (darkMode: class)
- **Framer Motion** — анимации переходов между блоками/страницами
- **FSD-структура**: `app` / `widgets` / `entities` / `shared`

## Структура (FSD)

```
src/
├── app/                  # Next.js App Router (страницы)
│   ├── page.tsx          # Главная: краткие превью всех блоков
│   ├── experience/       # Полный опыт работы
│   ├── skills/           # Все навыки + образование
│   ├── projects/         # Все проекты
│   └── articles/         # Все статьи
├── widgets/
│   ├── header/           # Шапка с фото и бейджами
│   └── theme-toggle/     # Переключатель темы
├── entities/             # Данные резюме (model/data.ts)
│   ├── profile/
│   ├── experience/
│   ├── skill/
│   ├── article/
│   └── project/
└── shared/ui/            # Icon, Badge, Card, SectionHeader, PageTransition, BackLink
```

## UX-паттерн

Главная показывает **краткие превью** (последнее место работы, топ-3 категории навыков, 2 проекта, 1 статья) с кнопками «Смотреть все (N)», ведущими на детальные страницы. Это решает проблему чтения при большом количестве данных.

## Возможности

- Светлая/тёмная тема (переключатель + prefers-color-scheme + localStorage, без FOUC)
- Анимации: fade-in блоков при скролле, transition при переходах между страницами
- Полная адаптивность (mobile-first)
- SVG-иконки (Lucide-стиль, без emoji)
- prefers-reduced-motion поддержан

## Команды

```bash
npm run dev      # dev server
npm run build    # production build
npm start        # production server
```

## Данные

Все данные резюме — в `src/entities/*/model/data.ts`. Для обновления резюме редактируются только эти файлы.
