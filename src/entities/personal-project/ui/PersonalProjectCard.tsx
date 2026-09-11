import Image from "next/image";
import Link from "next/link";
import type { PersonalProject } from "@/entities/personal-project/model/data";
import { Card, Icon } from "@/shared/ui";

interface PersonalProjectCardProps { project: PersonalProject; }

export function PersonalProjectCard({ project }: PersonalProjectCardProps) {
	return <Card hover className="group flex h-full flex-col p-6">
		<div className="mb-6 flex items-start justify-between gap-4">
			<div className="flex min-w-0 items-center gap-3"><Image src={project.logo} alt={`Логотип ${project.name}`} width={44} height={44} className="h-11 w-11 shrink-0 rounded-xl" /><div className="min-w-0"><Link href={`/my-projects/${project.slug}`} className="focus-ring text-xl font-extrabold tracking-[-0.03em] text-slate-950 transition-colors hover:text-accent-600 dark:text-white dark:hover:text-brand-300">{project.name}</Link><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{project.role}</p></div></div>
			<Link href={`/my-projects/${project.slug}`} aria-label={`Открыть проект ${project.name}`} className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-surface-border text-slate-500 transition-colors hover:border-accent-400 hover:bg-accent-50 hover:text-accent-600 dark:border-surface-border-dark dark:text-slate-400 dark:hover:border-brand-500 dark:hover:bg-brand-950 dark:hover:text-brand-300"><Icon name="arrow-right" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" /></Link>
		</div>
		<p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
		<div className="my-5 border-y border-surface-border py-4 dark:border-surface-border-dark"><span className="eyebrow text-accent-600 dark:text-brand-300">Главный результат</span><p className="mt-2 text-base font-extrabold leading-snug text-slate-950 dark:text-white">{project.featuredResult}</p></div>
		<p className="font-mono text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{project.technologies.slice(0, 5).join(" · ")}</p>
		<div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold"><a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-1.5 rounded-lg text-slate-600 hover:text-accent-600 dark:text-slate-300 dark:hover:text-brand-300"><Icon name="github" className="h-4 w-4" />GitHub</a>{project.websiteUrl && <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-1.5 rounded-lg text-slate-600 hover:text-accent-600 dark:text-slate-300 dark:hover:text-brand-300"><Icon name="external-link" className="h-4 w-4" />Сайт</a>}</div>
	</Card>;
}
