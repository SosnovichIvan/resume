export interface PersonalProject {
	slug: string;
	name: string;
	description: string;
	architecture: string[];
	technologies: string[];
	repositoryUrl: string;
	websiteUrl: string | null;
	logo: string;
	screenshots: Array<{ src: string; alt: string; caption: string; fit?: "cover" | "contain" }>;
	role: string;
	status: string;
	featuredResult: string;
	architectureFlow: string[];
	contribution: Array<{ title: string; description: string }>;
	creationProcess: string;
	benefitSkills?: Array<{
		name: string;
		description: string;
		readmeUrl: string;
		statistics: { title: string; caption?: string; rows: Array<{ metric: string; result: string }> };
	}>;
}

export const personalProjects: PersonalProject[] = [
	{
		slug: "agent-skills-lab",
		name: "Agent Skills Lab",
		description:
			"Репозиторий для разработки, версионирования и установки переиспользуемых навыков и инструкций для агентных CLI.",
		architecture: [
			"Каталог skills описывает bundled и modular навыки, а catalog.json связывает их с обязательными и выбираемыми reference-профилями.",
			"Python-установщик выбирает набор навыков и профилей, копирует связанные материалы и регистрирует их в инструкциях агента; при повторной установке сохраняет backup.",
			"execution-state добавляет управляемое состояние для длинных агентных задач: маршрутизацию, checkpoints, quality contracts и перенос работы между контекстами.",
			"Тесты проверяют установщик и execution-state; benchmark изолирован от релизной статистики, а raw-результаты не хранятся в репозитории.",
		],
		technologies: ["Python", "Markdown", "JSON", "pytest", "Git"],
		repositoryUrl: "https://github.com/SosnovichIvan/agent-skills-lab",
		websiteUrl: null,
		logo: "/projects/agent-skills-lab/logo.svg",
		screenshots: [],
		role: "Автор · AI Engineering",
		status: "Open source · развивается",
		featuredResult: "−73,88% total tokens в benchmark на 16 задачах",
		architectureFlow: ["Конфигурация навыка", "Установщик", "Агентный CLI", "Проверка benchmark"],
		contribution: [
			{ title: "Лично", description: "Спроектировал формат навыков, установщик, execution-state и контракты качества." },
			{ title: "С помощью AI", description: "Ускорял реализацию, подготовку тестов и сравнение вариантов поведения." },
			{ title: "Проверка", description: "pytest, изолированный benchmark, сравнение токенов, времени и завершения задач." },
		],
		creationProcess: "Код, визуальная подача и документация создаются в AI-assisted процессе под моим контролем.",
		benefitSkills: [{
			name: "Execution State",
			description: "Ведёт компактное проверяемое состояние длинной агентной задачи, снижая повторную передачу истории между контекстами.",
			readmeUrl: "https://github.com/SosnovichIvan/agent-skills-lab/blob/main/skills/execution-state/README.md",
			statistics: {
				title: "Ключевые результаты candidate против AI-only",
				caption: "16 задач",
				rows: [
				{ metric: "Total tokens", result: "−73,88%" },
				{ metric: "Output tokens", result: "−59,60%" },
				{ metric: "Uncached input", result: "−15,82%" },
				{ metric: "Время выполнения", result: "+76,14%" },
				{ metric: "Repair tokens", result: "0 против 2 296 689" },
				{ metric: "Завершено задач", result: "16/16 у candidate и AI-only" },
			],
			},
		}],
	},
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
		screenshots: [
			{ src: "/projects/arhdesign/home-desktop.png", alt: "Главная страница arhDesign", caption: "Главная: визуальная подача услуг и проектов", fit: "cover" },
			{ src: "/projects/arhdesign/home-mobile.png", alt: "Мобильная версия arhDesign", caption: "Мобильный viewport; полный длинный скриншот открывается по клику", fit: "cover" },
			{ src: "/projects/arhdesign/projects-desktop.png", alt: "Каталог проектов arhDesign", caption: "Каталог: просмотр архитектурных и интерьерных работ", fit: "cover" },
			{ src: "/projects/arhdesign/project-detail-desktop.png", alt: "Страница проекта arhDesign", caption: "Карточка проекта: история, параметры и галерея", fit: "cover" },
			{ src: "/projects/arhdesign/contact-form-desktop.png", alt: "Форма заявки arhDesign", caption: "Заявка: защищённая отправка с уведомлением в Telegram", fit: "cover" },
		],
		role: "Frontend-first разработка · архитектура и релиз",
		status: "Production · работает",
		featuredResult: "Публичный продукт: web, API, заявки и автоматический деплой",
		architectureFlow: ["Next.js интерфейс", "Go API", "PostgreSQL", "Telegram relay"],
		contribution: [
			{ title: "Frontend — лично", description: "Интерфейс, адаптивность, каталог, галерея, формы, темы, SEO и UX-сценарии." },
			{ title: "Backend — AI-assisted", description: "Go API, хранение заявок, webhook и инфраструктурные заготовки создавались с поддержкой AI." },
			{ title: "Проверка и эксплуатация", description: "Контракты, валидация, антиспам, Docker, health checks, CI/CD и ручные production-сценарии." },
		],
		creationProcess: "Код и дизайн проекта созданы в AI-assisted процессе; решения, сценарии и production-проверка контролировались лично.",
	},
];

export function getPersonalProject(slug: string): PersonalProject | undefined {
	return personalProjects.find((project) => project.slug === slug);
}
