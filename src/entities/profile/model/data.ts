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
		"Проектирую frontend-архитектуру и сложные интерфейсы. Использую AI-инструменты для автоматизации разработки и доставки backend-частей продукта.",
	location: "Красногорск (Московская область) · удалённо",
	availability: "Открыт к предложениям",
	contacts: [
		{ label: "Email", value: "isosnovich@yandex.ru", href: "mailto:isosnovich@yandex.ru", icon: "mail" },
		{ label: "Телефон", value: "+7 (999) 591-00-23", href: "tel:+79995910023", icon: "phone" },
		{ label: "Telegram", value: "@ivanSVladimirovich", href: "https://t.me/ivanSVladimirovich", icon: "telegram" },
		{ label: "GitHub", value: "SosnovichIvan", href: "https://github.com/SosnovichIvan", icon: "github" },
	],
	coreSkills: ["React", "TypeScript", "Next.js", "FSD", "Performance", "Team Lead"],
	aiSkills: ["AI-скилы", "MCP", "LLM-интеграции"],
	proofs: [
		{ value: "5+ лет", label: "во frontend-разработке" },
		{ value: "до 3", label: "инженеров в команде" },
		{ value: "2 мин → 30 сек", label: "ускорение загрузки" },
		{ value: "2", label: "статьи об архитектуре" },
	],
	competenceAreas: [
		{
			title: "Frontend — основная экспертиза",
			level: "Core",
			description: "Архитектура React-приложений, производительность сложных интерфейсов, дизайн API-контрактов и качество продукта.",
			skills: ["React", "TypeScript", "FSD", "Next.js", "Zustand", "TanStack Query", "Vitest"],
		},
		{
			title: "Техническое лидерство",
			level: "Production",
			description: "Груминг, декомпозиция, архитектурное и код-ревью, менторство и формирование командного техстандарта.",
			skills: ["Team Lead", "Code Review", "Mentoring", "Architecture"],
		},
		{
			title: "Backend с поддержкой AI",
			level: "AI-assisted",
			description: "Проектирую интеграцию и контракты, использую AI для реализации backend-частей и проверяю результат тестами, логами и review-чеклистами.",
			skills: ["REST API", "NestJS", "Go", "PostgreSQL", "Docker", "GitHub Actions"],
		},
	],
};
