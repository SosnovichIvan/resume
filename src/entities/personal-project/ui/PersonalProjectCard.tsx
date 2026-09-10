import Image from "next/image";
import Link from "next/link";
import type { PersonalProject } from "@/entities/personal-project/model/data";
import { Card, Icon, SkillBadge } from "@/shared/ui";

interface PersonalProjectCardProps { project: PersonalProject; }

export function PersonalProjectCard({ project }: PersonalProjectCardProps) {
	return <Card hover className="flex h-full flex-col p-6">
		<div className="mb-4 flex items-start gap-3"><Image src={project.logo} alt={`Логотип ${project.name}`} width={48} height={48} className="h-12 w-12 shrink-0 rounded-xl" /><div className="min-w-0"><Link href={`/my-projects/${project.slug}`} className="text-xl font-semibold transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:hover:text-brand-300">{project.name}</Link><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{project.websiteUrl ? "Веб-проект" : "Open-source проект"}</p></div></div>
		<p className="mb-5 flex-1 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
		<div className="mb-5 flex flex-wrap gap-1.5">{project.technologies.slice(0, 6).map((technology) => <SkillBadge key={technology} skill={technology} />)}{project.technologies.length > 6 && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">+{project.technologies.length - 6}</span>}</div>
		<div className="flex flex-wrap gap-3 text-sm font-medium"><Link href={`/my-projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200">Подробнее <Icon name="arrow-right" className="h-4 w-4" /></Link><a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300"><Icon name="github" className="h-4 w-4" /> GitHub</a>{project.websiteUrl && <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300"><Icon name="external-link" className="h-4 w-4" /> Сайт</a>}</div>
	</Card>;
}
