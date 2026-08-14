import type { Metadata } from "next";
import { experiences } from "@/entities/experience/model/data";
import { education } from "@/entities/education/model/data";
import { Badge, Card, Icon, PageTransition, SkillBadge } from "@/shared/ui";
import { BackLink } from "@/shared/ui/BackLink";

export const metadata: Metadata = {
	title: "Опыт и образование — Соснович Иван",
};

export default function ExperiencePage() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<BackLink />
				<h1 className="mb-2 flex items-center gap-3 text-3xl font-bold">
					<span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
						<Icon name="briefcase" className="h-6 w-6" />
					</span>
					Опыт и образование
				</h1>
				<p className="mb-8 text-slate-500 dark:text-slate-400">
					Общий стаж — 5 лет 5 месяцев · {experiences.length} компании
				</p>

				<div className="space-y-6">
					{experiences.map((job) => (
						<Card key={job.id} className="p-6">
							<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
								<div>
									<h2 className="text-xl font-semibold">{job.position}</h2>
									<p className="font-medium text-brand-600 dark:text-brand-300">
										{job.company}
									</p>
								</div>
								<div className="flex flex-col items-start gap-1 sm:items-end">
									<Badge variant="muted">{job.period}</Badge>
									<span className="text-xs text-slate-500 dark:text-slate-400">
										{job.duration}
									</span>
								</div>
							</div>

							<p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
								{job.summary}
							</p>

							<h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
								Достижения
							</h3>
							<ul className="mb-5 space-y-2">
								{job.achievements.map((a) => (
									<li
										key={a}
										className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
									>
										<Icon
											name="check"
											className="mt-0.5 h-4 w-4 shrink-0 text-success-600 dark:text-success-400"
										/>
										{a}
									</li>
								))}
							</ul>

							<div className="flex flex-wrap gap-2">
								{job.stack.map((s) => (
									<SkillBadge key={s} skill={s} />
								))}
							</div>
						</Card>
					))}
				</div>

				<h2 className="mb-4 mt-10 flex items-center gap-3 text-2xl font-bold">
					<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
						<Icon name="graduation" className="h-5 w-5" />
					</span>
					Образование и курсы
				</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					{education.map((e) => (
						<Card key={e.title + e.year} className="p-5">
							<div className="flex items-start justify-between gap-2">
								<div>
									<h3 className="font-semibold">{e.title}</h3>
									<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
										{e.org}
									</p>
								</div>
								<Badge variant="muted">{e.year}</Badge>
							</div>
						</Card>
					))}
				</div>
			</div>
		</PageTransition>
	);
}
