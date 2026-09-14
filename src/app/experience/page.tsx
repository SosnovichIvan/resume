import type { Metadata } from "next";
import { education } from "@/entities/education/model/data";
import { experiences } from "@/entities/experience/model/data";
import { ExperienceTimeline } from "@/entities/experience/ui/ExperienceTimeline";
import { Badge, Card, Icon, PageTransition, PrintResumeButton } from "@/shared/ui";
import { BackLink } from "@/shared/ui/BackLink";

export const metadata: Metadata = { title: "Опыт и образование — Соснович Иван" };

export default function ExperiencePage() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="print-hidden"><BackLink /></div>
				<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="flex items-center gap-3 text-3xl font-bold"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"><Icon name="briefcase" className="h-6 w-6" /></span>Опыт и образование</h1><p className="mt-2 text-slate-500 dark:text-slate-400">5+ лет во frontend · {experiences.length} компании · frontend-first профиль</p></div><PrintResumeButton /></div>
				<div className="mb-6 rounded-2xl border border-brand-200 bg-brand-50/70 p-4 text-sm leading-relaxed text-brand-950 dark:border-brand-900 dark:bg-brand-950/50 dark:text-brand-100"><strong>Граница экспертизы:</strong> frontend и техническое лидерство — основная специализация. Backend-задачи выполняю как интеграцию и AI-assisted delivery с проверкой контрактов, тестов и эксплуатационных сценариев.</div>
				<ExperienceTimeline experiences={experiences} />
				<h2 className="mb-4 mt-10 flex items-center gap-3 text-2xl font-bold"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"><Icon name="graduation" className="h-5 w-5" /></span>Образование и курсы</h2>
				<div className="grid gap-4 sm:grid-cols-2">{education.map((item) => <Card key={item.title + item.year} className="p-5"><div className="flex items-start justify-between gap-2"><div><h3 className="font-semibold">{item.title}</h3><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.org}</p></div><Badge variant="muted">{item.year}</Badge></div></Card>)}</div>
			</div>
		</PageTransition>
	);
}
