import type { Metadata } from "next";
import { publications } from "@/entities/publication/model/data";
import { Card, Icon, PageTransition } from "@/shared/ui";
import { BackLink } from "@/shared/ui/BackLink";

export const metadata: Metadata = {
	title: "Публикации — Соснович Иван",
};

export default function PublicationsPage() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<BackLink />
				<h1 className="mb-2 flex items-center gap-3 text-3xl font-bold">
					<span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
						<Icon name="book-open" className="h-6 w-6" />
					</span>
					Публикации
				</h1>
				<p className="mb-8 text-slate-500 dark:text-slate-400">
					Статьи и технические публикации
				</p>

				<div className="space-y-4">
					{publications.map((p) => (
						<a
							key={p.id}
							href={p.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group block"
						>
							<Card hover className="flex items-center gap-4 p-5">
								<div
									className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-white`}
								>
									<Icon name="book-open" className="h-6 w-6" />
								</div>
								<div className="min-w-0 flex-1">
									<h2 className="font-semibold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
										{p.title}
									</h2>
									<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
										{p.description}
									</p>
									<p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
										{p.source}
									</p>
								</div>
								<Icon
									name="external-link"
									className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300"
								/>
							</Card>
						</a>
					))}
				</div>
			</div>
		</PageTransition>
	);
}
