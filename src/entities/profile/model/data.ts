export interface CompetenceArea {
	title: string;
	level: string;
	description: string;
	skills: string[];
}

export interface ProfileProof {
	value: string;
	label: string;
}

export interface Profile {
	name: string;
	position: string;
	tagline: string;
	location: string;
	availability: string;
	contacts: { label: string; value: string; href: string; icon: string }[];
	coreSkills: string[];
	aiSkills: string[];
	proofs: ProfileProof[];
	competenceAreas: CompetenceArea[];
}

export const profile: Profile = {
	name: "Соснович Иван",
	position: "Senior Frontend Engineer / Team Lead · AI Engineering",
	tagline:
		"Проектирую архитектуру продукта с глубокой frontend-экспертизой. Использую AI-инструменты, чтобы ускорять разработку и доставку решений — с обязательной проверкой результата.",
	location: "Красногорск (Московская область) · удалённо",
	availability: "Открыт к продуктовым и R&D-командам",
	contacts: [
		{ label: "Email", value: "isosnovich@yandex.ru", href: "mailto:isosnovich@yandex.ru", icon: "mail" },
		{ label: "Телефон", value: "+7 (999) 591-00-23", href: "tel:+79995910023", icon: "phone" },
		{ label: "Telegram", value: "@ivanSVladimirovich", href: "https://t.me/ivanSVladimirovich", icon: "telegram" },
		{ label: "GitHub", value: "SosnovichIvan", href: "https://github.com/SosnovichIvan", icon: "github" },
	],
	coreSkills: ["React", "TypeScript", "Next.js", "FSD", "Performance", "Team Lead"],
	aiSkills: ["AI-скилы", "MCP", "LLM-интеграции"],
	proofs: [
		{ value: "Legacy → FSD", label: "модернизирую проекты без остановки развития" },
		{ value: "0 → Production", label: "проектирую и запускаю продукты с нуля" },
		{ value: "2 мин → 30 сек", label: "ускоряю загрузку на слабых компьютерах" },
		{ value: "30 сек → 5 сек", label: "оптимизирую рендер больших данных" },
	],
	competenceAreas: [
		{
			title: "Архитектура продукта",
			level: "System design",
			description: "Анализирую задачу и проектирую взаимодействие интерфейсов, API, данных, интеграций и процессов доставки.",
			skills: ["API Contracts", "BFF", "REST", "WebSocket", "Microfrontends", "CI/CD"],
		},
		{
			title: "Frontend-системы",
			level: "Core expertise",
			description: "Моя основная техническая глубина — архитектура и производительность сложных пользовательских интерфейсов.",
			skills: ["React", "TypeScript", "FSD", "Next.js", "Zustand", "TanStack Query"],
		},
		{
			title: "Техническое лидерство",
			level: "Team delivery",
			description: "Формирую технические решения и помогаю командам стабильно доводить их до production.",
			skills: ["Planning", "Architecture Review", "Code Review", "Mentoring", "Tech Standards"],
		},
		{
			title: "AI-assisted engineering",
			level: "AI tooling",
			description: "Использую AI для разработки, анализа и автоматизации процессов, сохраняя за собой ответственность за архитектуру и проверку результата.",
			skills: ["AI Skills", "MCP", "Task Engineering", "Testing", "Backend Delivery"],
		},
	],
};
