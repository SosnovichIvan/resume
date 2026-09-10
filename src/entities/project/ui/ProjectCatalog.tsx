"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/entities/project/model/data";
import { Card, Icon, SkillBadge } from "@/shared/ui";

const filters: Array<"Все" | ProjectCategory> = ["Все", "Архитектура", "Производительность", "Team Lead", "AI tooling", "AI-assisted fullstack"];

export function ProjectCatalog({ projects }: { projects: Project[] }) {
	const [filter, setFilter] = useState<(typeof filters)[number]>("Все");
	const [expanded, setExpanded] = useState<Set<string>>(new Set());
	const visible = filter === "Все" ? projects : projects.filter((project) => project.categories.includes(filter));

	const toggle = (id: string) => setExpanded((current) => {
		const next = new Set(current);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		return next;
	});

	return (
		<>
			<div aria-label="Фильтры проектов" className="mb-6 flex flex-wrap gap-2">
				{filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${filter === item ? "border-brand-600 bg-brand-600 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}>{item}</button>)}
			</div>
			<p aria-live="polite" className="sr-only">Показано проектов: {visible.length}</p>
			<div className="space-y-5">
				{visible.map((project) => {
					const isExpanded = expanded.has(project.id);
					return <Card key={project.id} className="overflow-hidden p-0">
						<div className="p-5 sm:p-6">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-300">{project.company}</p><h2 className="mt-1 text-xl font-semibold">{project.name}</h2></div><span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"><Icon name="lock" className="h-3.5 w-3.5" />Коммерческий проект</span></div>
							<p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
							<div className="mt-4 grid gap-2 sm:grid-cols-3">{project.outcomes.map((outcome) => <div key={outcome} className="rounded-xl bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{outcome}</div>)}</div>
							<div className="mt-4 flex flex-wrap gap-1.5">{project.stack.slice(0, 6).map((skill) => <SkillBadge key={skill} skill={skill} />)}{project.stack.length > 6 && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">+{project.stack.length - 6}</span>}</div>
							<button type="button" aria-expanded={isExpanded} onClick={() => toggle(project.id)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-brand-300"><Icon name={isExpanded ? "chevron-up" : "chevron-down"} className="h-4 w-4" />{isExpanded ? "Скрыть детали" : "Моя роль и детали"}</button>
						</div>
						{isExpanded && <div className="border-t border-slate-200 bg-slate-50/70 p-5 sm:p-6 dark:border-slate-700 dark:bg-slate-800/40"><h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Вклад и решения</h3><ul className="mt-3 space-y-2.5">{project.details.map((detail) => <li key={detail} className="flex gap-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-success-600 dark:text-success-400" /><span>{detail}</span></li>)}</ul></div>}
					</Card>;
				})}
			</div>
		</>
	);
}
