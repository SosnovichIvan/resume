import type { Metadata } from "next";
import { personalProjects } from "@/entities/personal-project/model/data";
import { PersonalProjectCard } from "@/entities/personal-project/ui/PersonalProjectCard";
import { Icon, PageTransition } from "@/shared/ui";
import { BackLink } from "@/shared/ui/BackLink";

export const metadata: Metadata = { title: "Свои проекты — Соснович Иван" };

export default function MyProjectsPage() {
	return <PageTransition><div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8"><BackLink /><h1 className="mb-2 flex items-center gap-3 text-3xl font-bold"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"><Icon name="laptop" className="h-6 w-6" /></span>Свои проекты</h1><p className="mb-8 text-slate-500 dark:text-slate-400">Проекты с подробностями реализации, архитектурой и демо-экранами</p><div className="grid gap-6 md:grid-cols-2">{personalProjects.map((project) => <PersonalProjectCard key={project.slug} project={project} />)}</div></div></PageTransition>;
}
