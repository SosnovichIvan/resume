import type { Metadata } from "next";
import { publications } from "@/entities/publication/model/data";
import { Card, Icon, PageShell, PageHeader } from "@/shared/ui";

export const metadata: Metadata = {
	title: "Публикации — Соснович Иван",
};

export default function PublicationsPage() {
	return (
  <PageShell>
   <PageHeader title="Публикации" description="Статьи и технические публикации" icon="book-open" />
				<div className="space-y-4">
					{publications.map((p) => (
						<a
							key={p.id}
							href={p.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
						>
							<Card hover className="flex items-center gap-4 p-5">
								<div
									className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-white`}
								>
									<Icon name="book-open" className="h-6 w-6" />
								</div>
								<div className="min-w-0 flex-1">
									<h2 className="font-semibold transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300">
										{p.title}
									</h2>
									<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
										{p.description}
									</p>
									<p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
										{p.source}
									</p>
								</div>
								<Icon
									name="external-link"
									className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300"
								/>
							</Card>
						</a>
					))}
				</div>
  </PageShell>
	);
}
