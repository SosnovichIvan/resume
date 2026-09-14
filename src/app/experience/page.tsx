import type { Metadata } from "next";
import { experiences } from "@/entities/experience/model/data";
import { education } from "@/entities/education/model/data";
import { Badge, Card, Icon, PageShell, PageHeader } from "@/shared/ui";
import { ExperienceCard } from "@/entities/experience/ui/ExperienceCard";

export const metadata: Metadata = {
	title: "Опыт и образование — Соснович Иван",
};

export default function ExperiencePage() {
	return (
  <PageShell>
   <PageHeader title="Опыт и образование" description={`Коммерческая разработка с 2021 года · ${experiences.length} места работы`} icon="briefcase" />
   <div className="space-y-6">{experiences.map(job => <ExperienceCard key={job.id} experience={job} />)}</div>

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
			</PageShell>
	);
}
