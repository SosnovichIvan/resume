export interface PersonalProject {
	slug: string;
	name: string;
	description: string;
	architecture: string[];
	technologies: string[];
	repositoryUrl: string;
	websiteUrl: string | null;
	logo: string;
	screenshots: string[];
}

export const personalProjects: PersonalProject[] = [
	{
		slug: "arhdesign",
		name: "arhDesign",
		description:
			"Production-сайт-портфолио архитектора и дизайнера интерьеров Светланы Полисмаковой. Содержит лендинг и страницы проектов, защищённую форму заявок и Telegram-уведомления для администраторов.",
		architecture: [
			"Next.js 16-приложение отдаёт публичный сайт: адаптивный интерфейс, каталог и страницы проектов, галерею, темы, SEO и единую модальную форму заявки.",
			"Go API валидирует и сохраняет заявки, применяет антиспам и cooldown, принимает Telegram webhook и отправляет уведомления подписанным администраторам.",
			"PostgreSQL хранит заявки, маркеры cooldown и Telegram-подписки; миграции запускаются отдельным контейнером до старта API.",
			"Caddy обеспечивает HTTPS и маршрутизацию на VPS; Docker Compose изолирует web, API, PostgreSQL и миграции. GitHub Actions публикует релизы по тегам.",
			"Cloudflare Worker relay доставляет уведомления в Telegram Bot API, не раскрывая токен бота приложению на VPS.",
		],
		technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Go", "PostgreSQL", "Docker Compose", "Caddy", "Cloudflare Workers", "Telegram Bot API", "GitHub Actions"],
		repositoryUrl: "https://github.com/SosnovichIvan/arhdesign",
		websiteUrl: "https://designer-svetlana.ru/",
		logo: "/projects/arhdesign/logo.svg",
		screenshots: ["/projects/arhdesign/home-desktop.png", "/projects/arhdesign/home-mobile.png", "/projects/arhdesign/projects-desktop.png", "/projects/arhdesign/project-detail-desktop.png", "/projects/arhdesign/contact-form-desktop.png"],
	},
];

export function getPersonalProject(slug: string): PersonalProject | undefined {
	return personalProjects.find((project) => project.slug === slug);
}
