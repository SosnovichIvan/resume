"use client";

import { useState } from "react";
import { profile } from "@/entities/profile/model/data";
import { Card, Icon, SkillBadge } from "@/shared/ui";

export function About() {
	const [expanded, setExpanded] = useState<Set<number>>(new Set());

	const toggle = (i: number) => {
		setExpanded((prev) => {
			const next = new Set(prev);
			if (next.has(i)) next.delete(i);
			else next.add(i);
			return next;
		});
	};

	return (
		<Card className="p-6">
			<div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
				<h2 className="flex items-center gap-2 text-lg font-semibold">
					<Icon name="user" className="h-5 w-5 text-brand-600 dark:text-brand-300" />
					{profile.experienceBlock.title}
				</h2>
				<span className="flex items-center gap-2 text-sm text-ink-500 dark:text-slate-400">
					<span className="h-2 w-2 animate-pulse rounded-full bg-success-500" />
					Открыт к предложениям
				</span>
			</div>

			<div className="divide-y divide-surface-border overflow-hidden rounded-2xl border border-surface-border dark:divide-slate-700 dark:border-slate-700">
				{profile.experienceBlock.roles.map((r, i) => (
					<div key={r.role} className="p-4">
						<div>
							<span className="block text-sm font-semibold text-ink-800 dark:text-slate-100">
								{r.role}
							</span>
						</div>

						{r.skills && r.skills.length > 0 ? (
							<div className="mt-3 flex flex-wrap gap-1.5">
								{r.skills.map((s) => (
									<SkillBadge key={s} skill={s} />
								))}
							</div>
						) : (
							r.summary && (
								<p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-slate-300">
									{r.summary}
								</p>
							)
						)}

						{r.details && r.details.length > 0 && (
							<>
								{expanded.has(i) && (
									<ul className="mt-3 space-y-2">
										{r.details.map((d) => (
											<li
												key={d}
												className="flex gap-2 text-sm leading-relaxed text-ink-600 dark:text-slate-300"
											>
												<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
												<span>{d}</span>
											</li>
										))}
									</ul>
								)}
								<button
									type="button"
									onClick={() => toggle(i)}
									className="mt-3 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:text-brand-300 dark:hover:text-brand-200 dark:focus-visible:ring-offset-slate-900"
								>
									<Icon
										name={expanded.has(i) ? "chevron-up" : "chevron-down"}
										className="h-4 w-4"
									/>
									{expanded.has(i) ? "Свернуть" : "Раскрыть все"}
								</button>
							</>
						)}
					</div>
				))}
			</div>
		</Card>
	);
}
