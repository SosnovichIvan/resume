export interface ExperienceRole {
	role: string;
	/** Краткие технологии/навыки направления (видно при свёрнутом состоянии). */
	summary?: string;
	/** Бейджи технологий/направлений (рендерятся вместо summary есл есть). */
	skills?: string[];
	/** Развёрнутые навыки и достижения (открываются кнопкой «Раскрыть все»). */
	details?: string[];
}

export interface Profile {
	name: string;
	position: string;
	location: string;
	birthDate: string; // формат "ДД.ММ.ГГГГ", возраст считается автоматически
	/** Даты старта направлений, стаж в «Обо мне» считается автоматически. */
	experienceBlock: {
		title: string;
		roles: ExperienceRole[];
	};
	contacts: { label: string; value: string; href: string; icon: string }[];
	highlights: string[];
	aiHighlights: string[];
}

export const profile: Profile = {
	name: "Соснович Иван",
	position: "Senior Frontend / Fullstack Engineer · AI Engineering & Developer Automation",
	location: "Красногорск (Московская область) · удалённо",
	birthDate: "16.01.1987",
	experienceBlock: {
		title: "Опыт",
		roles: [
			{
				role: "AI Engineering & Developer Automation",
				summary:
					"React, Next.js, NestJS, Go, TypeScript · LLM-интеграции, MCP, AI-скилы, субагенты, промпт-инжиниринг",
				skills: [
					"React",
					"Next.js",
					"NestJS",
					"Go",
					"TypeScript",
					"LLM-интеграции",
					"MCP",
					"AI-скилы",
					"Субагенты",
					"Промпт-инжиниринг",
					"gRPC",
					"PostgreSQL",
					"Redis",
					"NATS JetStream",
					"Kubernetes",
					"Docker",
					"Микрофронтенды (ES-модули)",
					"Vite",
					"Tailwind CSS",
					"Radix UI",
					"TanStack Query",
					"Zustand",
					"OpenTelemetry",
					"Envoy",
					"Vitest",
					"Playwright",
				],
				details: [
					"Проектирую агентные системы на базе LLM: скилы разработки, ревью и тестирования, MCP-серверы, субагенты.",
					"AI-скил разработки: код в едином стиле, структурированный контекст задачи, условия приёмки, DoD и сценарии воспроизведения. Увеличил объём решений на 300%+.",
					"AI-скил ревью пул-реквестов: учитывает структуру проекта, контекст задачи и стиль кода — сократил время проверки PR.",
					"AI-скил тестирования со сверкой с QA-тестами на Python — свел появление новых багов к минимуму.",
					"Активно применяю ИИ-ассистентов (GigaCode, Copilot, ChatGPT) для кода, ревью, рефакторинга и генерации тестов.",
					"Проектирую архитектуру приложений на FSD, добиваюсь покрытия тестами 90%+.",
				],
			},
			{
				role: "Senior Frontend Developer / Team Lead",
				summary:
					"React, TypeScript, Next.js, FSD · Zustand, TanStack Query, Uplot, ChartJs, WebSockets",
				skills: [
					"React",
					"TypeScript",
					"Next.js",
					"FSD",
					"Zustand",
					"TanStack Query",
					"Uplot",
					"ChartJs",
					"WebSockets",
					"Jest",
					"Vitest",
					"Cypress",
				],
				details: [
					"Руковожу командами до 3 фронтенд-инженеров: груминг, планирование, код-ревью, менторство.",
					"Перевожу легаси-проекты на FSD — устранение хаотичных зависимостей, рост поддерживаемости.",
					"Оптимизация рендера высоконагруженных дашбордов: виртуализация, мемоизация, ускорение загрузки.",
					"Внедрение микрофронтенд-архитектуры через ES-модули для независимого деплоя сервисов.",
					"Формирую техстандарт: стайлгайд, структура проекта, правила code review.",
					"Покрытие тестами (Jest, Vitest, Cypress) на уровне 90%+.",
				],
			},
			{
				role: "Junior Swift Developer",
				summary: "Swift · UIKit · встроенные протоколы · кастомные ячейки · работа с API",
				skills: ["Swift", "UIKit", "Встроенные протоколы", "Кастомные ячейки", "Работа с API"],
				details: [
					"Разработка интерфейса на языке Swift кодом.",
					"Взаимодействие со встроенными протоколами, переопределение нативных методов.",
					"Формирование кастомных ячеек.",
					"Авторизация с разными сервисами.",
					"Получение данных с платформы ВК.",
				],
			},
		],
	},
	contacts: [
		{
			label: "Email",
			value: "isosnovich@yandex.ru",
			href: "mailto:isosnovich@yandex.ru",
			icon: "mail",
		},
		{
			label: "Телефон",
			value: "+7 (999) 591-00-23",
			href: "tel:+79995910023",
			icon: "phone",
		},
		{
			label: "Telegram",
			value: "@ivanSVladimirovich",
			href: "https://t.me/ivanSVladimirovich",
			icon: "telegram",
		},
		{
			label: "GitHub",
			value: "SosnovichIvan",
			href: "https://github.com/SosnovichIvan",
			icon: "github",
		},
	],
	highlights: ["Golang", "FSD", "React", "Nest", "Next", "Uplot", "ChartJs", "RestAPI", "TypeScript"],
	aiHighlights: ["GigaCode", "MCP", "Промпт-инжиниринг", "Скилы / Субагенты", "LLM-интеграции"],
};
