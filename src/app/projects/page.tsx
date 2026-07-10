import type { Metadata } from "next";
import { projects } from "@/entities/project/model/data";
import { Badge, Card, Icon, PageTransition } from "@/shared/ui";
import { BackLink } from "@/shared/ui/BackLink";

export const metadata: Metadata = {
	title: "Проекты — Соснович Иван",
};

export default function ProjectsPage() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<BackLink />
				<h1 className="mb-2 flex items-center gap-3 text-3xl font-bold">
					<span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
						<Icon name="folder" className="h-6 w-6" />
					</span>
					Проекты
				</h1>
				<p className="mb-8 text-slate-500 dark:text-slate-400">
					{projects.length} ключевых проектов · команды, архитектура, результаты
				</p>

				<div className="space-y-6">
					{projects.map((p) => (
						<Card key={p.id} className="p-6">
							<div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
								<div>
									<h2 className="text-xl font-semibold">{p.name}</h2>
									<p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
										{p.company}
									</p>
								</div>
								<div className="flex shrink-0 gap-2">
									{p.repo ? (
										<a
											href={p.repo}
											target="_blank"
											rel="noopener"
											className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
										>
											<Icon name="github" className="h-4 w-4" />
											Репозиторий
										</a>
									) : (
										<span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 dark:border-slate-700 dark:text-slate-400">
											<Icon name="lock" className="h-4 w-4" />
											Внутренний
										</span>
									)}
									{p.host && (
										<a
											href={p.host}
											target="_blank"
											rel="noopener"
											className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
										>
											<Icon name="external-link" className="h-4 w-4" />
											Демо
										</a>
									)}
								</div>
							</div>

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
											className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400"
										/>
										{d}
									</li>
								))}
							</ul>

							<div className="flex flex-wrap gap-2">
								{p.stack.map((s) => (
									<Badge key={s}>{s}</Badge>
								))}
							</div>
						</Card>
					))}
				</div>
			</div>
		</PageTransition>
	);
}
