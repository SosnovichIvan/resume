export interface PersonalProject {
	id: string;
	name: string;
	description: string;
	details: string[];
	stack: string[];
	repo: string;
	builtByAI: boolean;
}

export const personalProjects: PersonalProject[] = [
	{
		id: "resume",
		name: "resume",
		description:
			"Этот сайт-резюме: адаптивное персональное портфолио, созданное с использованием AI-инструментов.",
		details: [
			"Сгенерирован и свёрстан целиком с использованием ИИ-инструментов (GigaCode) — без ручного написания кода разработчиком",
			"Next.js 14 (App Router) + Feature-Sliced Design (FSD) + Tailwind CSS + Framer Motion",
			"Тёмная/светлая тема, анимации, адаптивная вёрстка",
		],
		stack: [
			"Next.js",
			"TypeScript",
			"React",
			"FSD",
			"Tailwind CSS",
			"Framer Motion",
		],
		repo: "https://github.com/SosnovichIvan/resume",
		builtByAI: true,
	},
	{
		id: "my-sport-life",
		name: "my sport life",
		description:
			"Платформа для занятий спортом, правильного питания и контроля веса: трекинг активности, планирование рациона и аналитика прогресса. Спроектирована и реализована полностью средствами ИИ.",
		details: [
			"Разработан полностью с помощью ИИ-технологий — от архитектуры и документации до кода и инфраструктуры",
			"Монорепозиторий: микрофронтенды (ES-модули) + микросервисы на Go (gRPC) + API Gateway",
			"HTTP/3 (QUIC) на граничном слое Envoy, NATS JetStream, OpenTelemetry/Jaeger",
			"Полная техническая документация и архитектура в docs/architecture.md",
		],
		stack: [
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Vite",
			"Radix UI",
			"Go",
			"gRPC",
			"REST",
			"HTTP/3 (QUIC)",
			"NATS JetStream",
			"PostgreSQL",
			"Redis",
			"S3",
			"OpenTelemetry",
			"Jaeger",
			"Envoy",
			"Kubernetes",
		],
		repo: "https://github.com/SosnovichIvan/my-sport-life",
		builtByAI: true,
	},
];
