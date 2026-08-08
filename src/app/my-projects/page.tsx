import type { Metadata } from "next";
import { personalProjects } from "@/entities/personal-project/model/data";
import { Card, Icon, PageTransition, SkillBadge } from "@/shared/ui";
import { BackLink } from "@/shared/ui/BackLink";

export const metadata: Metadata = {
	title: "Свои проекты — Соснович Иван",
};

export default function MyProjectsPage() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<BackLink />
				<h1 className="mb-2 flex items-center gap-3 text-3xl font-bold">
					<span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
						<Icon name="laptop" className="h-6 w-6" />
					</span>
					Свои проекты
				</h1>
				<p className="mb-8 text-slate-500 dark:text-slate-400">
					Pet-проекты, созданные с помощью ИИ
				</p>

				<div className="space-y-6">
					{personalProjects.map((p) => (
						<Card key={p.id} className="p-6">
							<div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
										<Icon name="laptop" className="h-5 w-5" />
									</div>
									<div className="group relative">
										<a
											href={p.repo}
											target="_blank"
											rel="noopener noreferrer"
											className="text-xl font-semibold transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:hover:text-brand-300 dark:focus-visible:ring-offset-slate-900"
										>
											{p.name}
										</a>
										{p.id === "resume" && (
											<span className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-white group-hover:block group-focus-within:block dark:bg-slate-700">
												Вы уже здесь — это текущий сайт
											</span>
										)}
									</div>
								</div>
								<a
									href={p.repo}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
								>
									<Icon name="github" className="h-4 w-4" />
									GitHub
								</a>
							</div>

							{p.builtByAI && (
								<div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300">
									<Icon name="sparkles" className="h-4 w-4" />
									Создан только с помощью ИИ
								</div>
							)}

							<p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
								{p.description}
							</p>

							<ul className="mb-4 space-y-2">
								{p.details.map((d) => (
									<li
										key={d}
										className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
									>
										<Icon
											name="check"
											className="mt-0.5 h-4 w-4 shrink-0 text-success-600 dark:text-success-400"
										/>
										{d}
									</li>
								))}
							</ul>

							<div className="flex flex-wrap gap-2">
								{p.stack.map((s) => (
									<SkillBadge key={s} skill={s} />
								))}
							</div>
						</Card>
					))}
				</div>
			</div>
		</PageTransition>
	);
}
