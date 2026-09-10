"use client";

import { useState } from "react";
import { Icon } from "@/shared/ui";

export interface BenefitSkill {
	name: string;
	description: string;
	readmeUrl: string;
	statistics: { title: string; caption?: string; rows: Array<{ metric: string; result: string }> };
}

export function ProjectSkillCarousel({ skills, projectName }: { skills: BenefitSkill[]; projectName: string }) {
	const [current, setCurrent] = useState(0);
	if (skills.length === 0) return null;
	const skill = skills[current];
	const show = (index: number) => setCurrent((index + skills.length) % skills.length);

	return <section aria-label={`Полезные skills: ${projectName}`} role="region"><div className="overflow-hidden rounded-2xl border border-surface-border bg-white dark:border-slate-700 dark:bg-surface-card"><div className="border-b border-slate-200 px-6 py-5 dark:border-slate-700"><div className="flex items-start justify-between gap-4"><div><h3 className="text-xl font-semibold">{skill.name}</h3><p className="mt-2 text-slate-600 dark:text-slate-300">{skill.description}</p></div><a href={skill.readmeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500 dark:hover:text-brand-300"><Icon name="article" className="h-4 w-4" />README</a></div></div><div className="overflow-x-auto"><table aria-label={`Статистика ${skill.name}`} className="w-full text-left text-sm"><caption className="sr-only">{skill.statistics.title}{skill.statistics.caption ? `, ${skill.statistics.caption}` : ""}</caption><thead className="bg-slate-50 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300"><tr><th scope="col" className="px-6 py-3 font-medium">Метрика</th><th scope="col" className="px-6 py-3 text-right font-medium">Результат</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-700">{skill.statistics.rows.map((row) => <tr key={row.metric}><th scope="row" className="px-6 py-4 font-medium text-slate-700 dark:text-slate-200">{row.metric}</th><td className="px-6 py-4 text-right text-slate-600 dark:text-slate-300">{row.result}</td></tr>)}</tbody></table></div></div><div className="mt-3 flex items-center gap-3"><span aria-live="polite" className="mr-auto text-sm text-slate-500 dark:text-slate-400">{String(current + 1).padStart(2, "0")} / {String(skills.length).padStart(2, "0")}</span><button type="button" aria-label="Предыдущий skill" disabled={skills.length === 1} onClick={() => show(current - 1)} className="rounded-lg border border-slate-200 p-2 text-slate-700 enabled:hover:border-brand-400 enabled:hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"><Icon name="arrow-left" className="h-5 w-5" /></button><button type="button" aria-label="Следующий skill" disabled={skills.length === 1} onClick={() => show(current + 1)} className="rounded-lg border border-slate-200 p-2 text-slate-700 enabled:hover:border-brand-400 enabled:hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"><Icon name="arrow-right" className="h-5 w-5" /></button></div></section>;
}
