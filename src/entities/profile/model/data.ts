export interface ExperienceRole {
	role: string;
	/** Нижняя граница опыта (полных лет). */
	minYears: number;
	/** Если указана дата старта в формате «ДД.ММ.ГГГГ», стаж считается автоматически. */
	startDate?: string;
	added: boolean;
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
	about: string;
	aboutFull: string[];
	contacts: { label: string; value: string; href: string; icon: string }[];
	highlights: string[];
	aiHighlights: string[];
}

export const profile: Profile = {
	name: "Соснович Иван",
	position: "Fullstack AI Engineer — R&D с уклоном в ИИ-инжиниринг и автоматизацию",
	location: "Красногорск (Московская область) · удалённо",
	birthDate: "16.01.1987",
	experienceBlock: {
		title: "Опыт",
		roles: [
			{
				role: "Senior Frontend Developer / Team Lead",
				minYears: 5,
				added: true,
			},
			{
				role: "Fullstack AI Engineer — R&D · ИИ-инжиниринг и автоматизация",
				minYears: 1,
				startDate: "20.09.2025",
				added: true,
			},
		],
	},
	about:
		"Senior Frontend Developer / Team Lead с опытом 5+ лет (React, Next.js, NestJS, Go) и Fullstack AI Engineer (R&D, ИИ-инжиниринг и автоматизация) с опытом 1+ год. Проектирую архитектуру приложений на FSD, добиваюсь покрытия тестами 90%+ и стабильной работы высоконагруженных интерфейсов. Проектирую агентные системы на базе LLM, автоматизирую разработку: скилы, субагенты, MCP-серверы, промпт-инжиниринг.",
	aboutFull: [
		"Проектирую архитектуру фронтенд-приложений с нуля, перевожу существующие проекты на FSD, формирую контракты API и обеспечиваю покрытие тестами 90%+.",
		"Разрабатываю AI-скилы разработки: код в едином стиле, структурированный контекст задачи, условия приёмки, DoD и сценарии воспроизведения. Сократил время выполнения задач и увеличил объём решений на 300%+.",
		"Разработал AI-скил ревью пул-реквестов — учитывает структуру проекта, контекст задачи, стиль кода и лучшие практики, что сократило время проверки PR при большой команде.",
		"Разработал AI-скил тестирования старого и нового функционала, включая сверку с QA-тестами на Python, — свёл появление новых багов к минимуму и упростил работу тестировщиков.",
		"Активно применяю ИИ-ассистентов (GigaCode, Copilot, ChatGPT) для написания кода, код-ревью, рефакторинга, генерации тестов и анализа узких мест в кодовой базе.",
		"Разрабатываю сложные продукты: от архитектуры и кода до тестирования и деплоя. Участвую в груминге, планировании спринтов и развитии команды.",
		"Анализирую и оптимизирую UX-путь пользователя, формирую технологический стек продукта по современным технологиям.",
		"Продумываю фичу на несколько шагов вперёд, чтобы упростить будущую отладку и дальнейшую разработку.",
		"Постоянно изучаю новые технологии и инструменты, расширяю профессиональный кругозор.",
	],
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
