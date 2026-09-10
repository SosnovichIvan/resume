import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPersonalProject, personalProjects } from "@/entities/personal-project/model/data";
import { Card, Icon, PageTransition, SkillBadge } from "@/shared/ui";
import { BackLink } from "@/shared/ui/BackLink";
import { ProjectCarousel } from "@/widgets/project-carousel/ui/ProjectCarousel";

interface ProjectPageProps { params: { slug: string }; }
export function generateStaticParams() { return personalProjects.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: ProjectPageProps): Metadata { const project = getPersonalProject(params.slug); return project ? { title: `${project.name} — Соснович Иван` } : {}; }

export default function PersonalProjectPage({ params }: ProjectPageProps) {
	const project = getPersonalProject(params.slug);
	if (!project) notFound();
	return <PageTransition><div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8"><BackLink href="/my-projects" label="К своим проектам" /><div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div className="flex items-center gap-4"><Image src={project.logo} alt={`Логотип ${project.name}`} width={56} height={56} className="h-14 w-14 rounded-2xl" /><div><h1 className="text-3xl font-bold">{project.name}</h1><p className="mt-1 text-slate-500 dark:text-slate-400">Веб-проект</p></div></div><div className="flex flex-wrap gap-3"><a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:bg-slate-700 dark:hover:bg-slate-600"><Icon name="github" className="h-4 w-4" />GitHub</a>{project.websiteUrl && <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><Icon name="external-link" className="h-4 w-4" />Открыть сайт</a>}</div></div><Card className="mb-8 p-6"><h2 className="mb-3 text-xl font-semibold">Концепция</h2><p className="text-slate-600 dark:text-slate-300">{project.description}</p></Card><div className="mb-8"><h2 className="mb-4 text-xl font-semibold">Экраны проекта</h2><ProjectCarousel images={project.screenshots} title={project.name} /></div><Card className="mb-8 p-6"><h2 className="mb-4 text-xl font-semibold">Архитектура</h2><ul className="space-y-3">{project.architecture.map((item) => <li key={item} className="flex gap-3 text-slate-600 dark:text-slate-300"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-success-600 dark:text-success-400" />{item}</li>)}</ul></Card><Card className="p-6"><h2 className="mb-4 text-xl font-semibold">Технологии</h2><div className="flex flex-wrap gap-2">{project.technologies.map((technology) => <SkillBadge key={technology} skill={technology} />)}</div></Card><Link href="/my-projects" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-300 dark:hover:text-brand-200"><Icon name="arrow-left" className="h-4 w-4" />Ко всем своим проектам</Link></div></PageTransition>;
}
