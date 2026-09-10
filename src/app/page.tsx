import Link from "next/link";
import { experiences } from "@/entities/experience/model/data";
import { personalProjects } from "@/entities/personal-project/model/data";
import { PersonalProjectCard } from "@/entities/personal-project/ui/PersonalProjectCard";
import { projects } from "@/entities/project/model/data";
import { publications } from "@/entities/publication/model/data";
import { Badge, Card, FadeInSection, Icon, PageTransition, SectionHeader } from "@/shared/ui";
import { About } from "@/widgets/about/ui/About";
import { Header } from "@/widgets/header/ui/Header";

export default function HomePage() {
	const currentJob = experiences[0];
	const commercialCase = projects[0];
	const article = publications[0];
	const orderedPersonalProjects = [...personalProjects].sort((a) => a.websiteUrl ? -1 : 1);
	return <PageTransition><div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
		<Header />
		<FadeInSection><div className="mb-12"><About /></div></FadeInSection>
		<FadeInSection delay={0.05}><section id="cases" className="mb-12 scroll-mt-24"><SectionHeader icon="sparkles" title="Ключевые кейсы" viewAllHref="/projects" viewAllLabel="Все коммерческие кейсы" />
			<Card className="mb-5 overflow-hidden p-0"><div className="grid lg:grid-cols-[1.15fr_0.85fr]"><div className="p-6 sm:p-7"><div className="flex flex-wrap items-center gap-2"><Badge variant="muted">{commercialCase.company}</Badge><span className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">Frontend architecture · Team Lead</span></div><h3 className="mt-3 text-2xl font-bold">{commercialCase.name}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{commercialCase.description}</p><Link href="/projects" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300">Разобрать кейс <Icon name="arrow-right" className="h-4 w-4" /></Link></div><div className="grid grid-cols-1 gap-px bg-slate-200 sm:grid-cols-3 lg:grid-cols-1 dark:bg-slate-700">{commercialCase.outcomes.map((outcome) => <div key={outcome} className="flex items-center bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100"><Icon name="check" className="mr-3 h-4 w-4 shrink-0 text-success-600 dark:text-success-400" />{outcome}</div>)}</div></div></Card>
			<div className="grid gap-5 md:grid-cols-2">{orderedPersonalProjects.map((project) => <PersonalProjectCard key={project.slug} project={project} />)}</div>
		</section></FadeInSection>
		<FadeInSection delay={0.05}><section className="mb-12"><SectionHeader icon="briefcase" title="Текущая роль" viewAllHref="/experience" viewAllLabel="Весь опыт" /><Card className="p-6"><div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"><div><h3 className="text-lg font-semibold">{currentJob.position}</h3><p className="font-medium text-brand-600 dark:text-brand-300">{currentJob.company}</p></div><Badge variant="muted">{currentJob.period}</Badge></div><p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{currentJob.summary}</p><div className="mt-4 grid gap-2 sm:grid-cols-3">{currentJob.keyResults.map((result) => <div key={result} className="rounded-xl bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{result}</div>)}</div></Card></section></FadeInSection>
		<FadeInSection delay={0.05}><section className="mb-12"><SectionHeader icon="book-open" title="Пишу о frontend-архитектуре" viewAllHref="/publications" viewAllLabel={`Все публикации (${publications.length})`} /><a href={article.href} target="_blank" rel="noopener noreferrer" className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><Card hover className="grid overflow-hidden p-0 md:grid-cols-[220px_1fr]"><div className={`flex min-h-36 items-end bg-gradient-to-br ${article.gradient} p-5 text-white`}><div><p className="text-xs font-semibold uppercase tracking-wide text-white/80">{article.topic}</p><p className="mt-2 text-sm">{article.readTime}</p></div></div><div className="p-5"><h3 className="text-lg font-semibold group-hover:text-brand-600 dark:group-hover:text-brand-300">{article.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{article.takeaway}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-300">Читать на Хабре <Icon name="external-link" className="h-4 w-4" /></span></div></Card></a></section></FadeInSection>
		<footer className="border-t border-slate-200 py-8 text-center dark:border-slate-700"><p className="text-sm text-slate-500 dark:text-slate-400">Готов обсудить frontend-архитектуру, техническое лидерство и AI-инструменты.</p><a href="mailto:isosnovich@yandex.ru" className="mt-3 inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-300"><Icon name="mail" className="h-4 w-4" />isosnovich@yandex.ru</a><p className="mt-5 text-xs text-slate-400">© 2026 Соснович Иван</p></footer>
	</div></PageTransition>;
}
