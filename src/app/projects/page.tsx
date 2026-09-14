import type { Metadata } from "next";
import { projects } from "@/entities/project/model/data";
import { ProjectCatalog } from "@/entities/project/ui/ProjectCatalog";
import { Icon, PageTransition } from "@/shared/ui";
import { BackLink } from "@/shared/ui/BackLink";

export const metadata: Metadata = { title: "Коммерческие кейсы — Соснович Иван" };

export default function ProjectsPage() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<BackLink />
				<h1 className="mb-2 flex items-center gap-3 text-3xl font-bold"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"><Icon name="folder" className="h-6 w-6" /></span>Коммерческие кейсы</h1>
				<p className="mb-3 max-w-2xl text-slate-500 dark:text-slate-400">Frontend-архитектура, производительность и техническое лидерство в продуктовых командах.</p>
				<p className="mb-8 text-sm text-slate-500 dark:text-slate-400">Из-за NDA кейсы описаны без закрытых экранов и исходного кода.</p>
				<ProjectCatalog projects={projects} />
			</div>
		</PageTransition>
	);
}
