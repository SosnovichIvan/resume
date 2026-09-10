"use client";

import { useState } from "react";
import type { Experience } from "@/entities/experience/model/data";
import { Badge, Card, Icon, SkillBadge } from "@/shared/ui";

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
	const [expanded, setExpanded] = useState<Set<string>>(new Set([experiences[0]?.id]));
	const toggle = (id: string) => setExpanded((current) => {
		const next = new Set(current);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		return next;
	});

	return (
		<div className="relative space-y-5 before:absolute before:bottom-4 before:left-5 before:top-4 before:w-px before:bg-slate-200 sm:before:left-6 dark:before:bg-slate-700">
			{experiences.map((job) => {
				const isExpanded = expanded.has(job.id);
				return <div key={job.id} className="relative pl-10 sm:pl-12"><span aria-hidden="true" className="absolute left-[14px] top-7 h-3 w-3 rounded-full border-2 border-white bg-brand-500 ring-4 ring-brand-100 sm:left-[18px] dark:border-slate-900 dark:ring-brand-950" />
					<Card className="p-5 sm:p-6">
						<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"><div><h2 className="text-xl font-semibold">{job.position}</h2><p className="font-medium text-brand-600 dark:text-brand-300">{job.company}</p></div><div className="flex flex-col items-start gap-1 sm:items-end"><Badge variant="muted">{job.period}</Badge><span className="text-xs text-slate-500 dark:text-slate-400">{job.duration}</span></div></div>
						<p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{job.summary}</p>
						<div className="mt-4 grid gap-2 sm:grid-cols-3">{job.keyResults.map((result) => <div key={result} className="rounded-xl bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{result}</div>)}</div>
						<div className={`${isExpanded ? "block" : "hidden"} mt-5 border-t border-slate-200 pt-5 print:block dark:border-slate-700`}><h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Достижения</h3><ul className="mt-3 space-y-2">{job.achievements.map((achievement) => <li key={achievement} className="flex gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-success-600 dark:text-success-400" /><span>{achievement}</span></li>)}</ul><div className="mt-4 flex flex-wrap gap-1.5">{job.stack.map((skill) => <SkillBadge key={skill} skill={skill} />)}</div></div>
						<button type="button" aria-expanded={isExpanded} onClick={() => toggle(job.id)} className="print-hidden mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-brand-300"><Icon name={isExpanded ? "chevron-up" : "chevron-down"} className="h-4 w-4" />{isExpanded ? "Свернуть" : "Показать достижения"}</button>
					</Card>
				</div>;
			})}
		</div>
	);
}
