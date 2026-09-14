import Link from "next/link";
import { experiences } from "@/entities/experience/model/data";
import { personalProjects } from "@/entities/personal-project/model/data";
import { PersonalProjectCard } from "@/entities/personal-project/ui/PersonalProjectCard";
import { profile } from "@/entities/profile/model/data";
import { projects } from "@/entities/project/model/data";
import { publications } from "@/entities/publication/model/data";
import { Card, FadeInSection, Icon, PageTransition, SectionHeader } from "@/shared/ui";
import { About } from "@/widgets/about/ui/About";
import { Header } from "@/widgets/header/ui/Header";

const impactMetrics = [
	{ label: "Загрузка приложения", before: "2 минуты", after: "30 секунд", width: "25%" },
	{ label: "Рендер больших списков", before: "30 секунд", after: "5 секунд", width: "17%" },
	{ label: "Нагрузка интерфейса", before: "real-time данные", after: "5000+ объектов", width: "82%" },
];

const experienceFocus: Record<string, string> = {
	sbertech: "Архитектура · техническое лидерство · AI-инструменты",
	"yoko-trade": "Продукт с нуля · интерфейс · API · данные · интеграции",
	sber: "Высоконагруженные интерфейсы · BFF · продуктовые системы",
};

export default function HomePage() {
	const commercialCase = projects[0];
	const article = publications[0];
	const contactLinks = [
		{ ...profileContact("Email"), primary: true },
		{ ...profileContact("Telegram"), primary: false },
		{ ...profileContact("GitHub"), primary: false },
	].filter((contact) => contact.href);
	const orderedPersonalProjects = [...personalProjects].sort((a) => a.websiteUrl ? -1 : 1);

	return (
		<PageTransition>
			<div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
				<Header />

				<FadeInSection><div className="mb-16"><About /></div></FadeInSection>

				<FadeInSection delay={0.05}>
					<section id="cases" className="mb-16 scroll-mt-24">
						<div className="mb-6"><p className="eyebrow text-accent-600 dark:text-brand-300">02 · выбранные работы</p></div>
						<SectionHeader icon="briefcase" title="Ключевые кейсы" viewAllHref="/projects" viewAllLabel="Все коммерческие кейсы" />

						<Card className="mb-10 overflow-hidden p-0">
							<div className="grid lg:grid-cols-[1.08fr_0.92fr]">
								<div className="p-6 sm:p-8 lg:p-10">
									<div className="flex flex-wrap items-center gap-3"><span className="eyebrow text-accent-600 dark:text-brand-300">{commercialCase.company}</span><span className="h-1 w-1 rounded-full bg-slate-400" /><span className="eyebrow text-slate-500 dark:text-slate-400">Architecture · Performance · Team Lead</span></div>
									<h3 className="mt-5 max-w-xl break-words text-3xl font-extrabold leading-[1.04] tracking-[-0.045em] text-slate-950 sm:text-5xl sm:tracking-[-0.055em] dark:text-white">{commercialCase.name} — производительность сложного интерфейса</h3>
									<p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">{commercialCase.description}</p>
									<p className="mt-5 border-l-2 border-accent-400 pl-4 text-sm font-medium leading-relaxed text-slate-700 dark:border-brand-400 dark:text-slate-200">Виртуализация списков, мемоизация селекторов, debounce обновлений, разделение серверного и локального состояния, переход к FSD и устранение циклических зависимостей.</p>
									<Link href="/projects" className="focus-ring mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 dark:bg-brand-300 dark:text-brand-950">Подробный разбор решений <Icon name="arrow-right" className="h-4 w-4" /></Link>
								</div>

								<div className="border-t border-surface-border bg-[#f7f2ea] p-6 sm:p-8 lg:border-l lg:border-t-0 dark:border-surface-border-dark dark:bg-[#0d1418]">
									<div className="mb-7 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between"><span className="eyebrow break-all text-slate-500 dark:text-slate-400">impact.snapshot</span><span className="font-mono text-[11px] text-success-600 dark:text-brand-300">verified outcomes</span></div>
									<div className="space-y-7">{impactMetrics.map((metric) => <div key={metric.label}>
										<div className="mb-2 flex items-end justify-between gap-4"><div><p className="eyebrow text-slate-500 dark:text-slate-400">{metric.label}</p><p className="mt-1 text-xs text-slate-400">{metric.before}</p></div><strong className="font-mono text-sm text-accent-600 dark:text-brand-300">{metric.after}</strong></div>
										<div className="h-2 overflow-hidden rounded-full bg-surface-track dark:bg-surface-track-dark"><div className="h-full rounded-full bg-accent-500 dark:bg-brand-300" style={{ width: metric.width }} /></div>
									</div>)}</div>
								</div>
							</div>
						</Card>

						<div className="mb-6 max-w-3xl"><p className="eyebrow text-accent-600 dark:text-brand-300">Личная практика</p><h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-3xl dark:text-white">Проекты, где я отвечал за весь цикл</h3><p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Самостоятельно отвечал за концепцию, архитектуру, интерфейс, интеграции и production-доставку. Код и дизайн создавались в AI-assisted процессе с ручной проверкой решений и тестированием.</p></div>
						<div className="grid gap-5 md:grid-cols-2">{orderedPersonalProjects.map((project) => <PersonalProjectCard key={project.slug} project={project} />)}</div>
					</section>
				</FadeInSection>

				<FadeInSection delay={0.05}>
					<section className="mb-16 overflow-hidden rounded-[1.5rem] bg-accent-500 text-white dark:bg-brand-300 dark:text-brand-950">
						<div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
							<div><p className="eyebrow opacity-75">03 · публикации · {article.topic}</p><h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight tracking-[-0.045em] sm:text-4xl">Пишу о решениях, проверенных на практике</h2><p className="mt-4 max-w-2xl text-base font-bold leading-snug">Монолит больше не приговор</p><p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80 dark:text-brand-950/75">{article.takeaway}</p></div>
							<div className="lg:text-right"><a href={article.href} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-accent-600 transition-transform hover:-translate-y-0.5 dark:bg-brand-950 dark:text-brand-100">Читать на Хабре <Icon name="external-link" className="h-4 w-4" /></a><Link href="/publications" className="focus-ring ml-2 inline-flex min-h-11 items-center rounded-xl px-3 py-3 text-sm font-semibold">Все статьи</Link></div>
						</div>
					</section>
				</FadeInSection>

				<FadeInSection delay={0.05}>
					<section className="mb-16">
						<div className="mb-6"><p className="eyebrow text-accent-600 dark:text-brand-300">04 · опыт</p></div>
						<SectionHeader icon="briefcase" title="Как росла зона ответственности" viewAllHref="/experience" viewAllLabel="Весь опыт" />
						<Card className="overflow-hidden p-0"><ol>{experiences.slice(0, 3).map((experience, index) => <li key={experience.id} className={`grid gap-4 p-6 sm:grid-cols-[2rem_0.8fr_1.2fr] sm:p-8 ${index ? "border-t border-surface-border dark:border-surface-border-dark" : ""}`}><span className="font-mono text-xs font-bold text-accent-600 dark:text-brand-300">0{index + 1}</span><div><p className="eyebrow text-accent-600 dark:text-brand-300">{experience.company}</p><p className="mt-2 font-mono text-xs text-slate-500 dark:text-slate-400">{experience.period}</p></div><div><h3 className="text-lg font-extrabold tracking-[-0.025em] text-slate-950 dark:text-white">{experience.position}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{experienceFocus[experience.id]}</p></div></li>)}</ol></Card>
					</section>
				</FadeInSection>

				<FadeInSection delay={0.05}>
					<footer className="mb-4 rounded-[1.5rem] border border-surface-border bg-slate-950 p-7 text-white sm:p-10 dark:border-surface-border-dark dark:bg-[#11191e]">
						<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow text-brand-300">Есть сложный продукт?</p><h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">Давайте обсудим, что мешает продукту развиваться быстрее</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">Архитектура, производительность, взаимодействие команд, технический долг или внедрение AI-assisted разработки.</p></div><div className="flex flex-wrap gap-2">{contactLinks.map((contact) => <a key={contact.label} href={contact.href} target={contact.href.startsWith("http") ? "_blank" : undefined} rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined} className={`focus-ring inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold ${contact.primary ? "bg-brand-300 text-brand-950" : "border border-slate-700 text-slate-200 hover:border-brand-300 hover:text-brand-300"}`}><Icon name={contact.icon} className="h-4 w-4" />{contact.label === "Email" ? "Написать Ивану" : contact.label}</a>)}</div></div>
						<div className="mt-10 border-t border-slate-800 pt-5 font-mono text-[11px] text-slate-500">© 2026 Соснович Иван · Красногорск / remote</div>
					</footer>
				</FadeInSection>
			</div>
		</PageTransition>
	);
}

function profileContact(label: string) {
	return profile.contacts.find((contact) => contact.label === label) ?? { label, href: "", icon: "external-link", value: "" };
}
