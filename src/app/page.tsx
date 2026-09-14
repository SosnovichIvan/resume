import { ExperienceCard } from "@/entities/experience/ui/ExperienceCard";
import { ProjectCard } from "@/entities/project/ui/ProjectCard";
import { PersonalProjectCard } from "@/entities/personal-project/ui/PersonalProjectCard";
import { experiences } from "@/entities/experience/model/data";
import { publications } from "@/entities/publication/model/data";
import { projects } from "@/entities/project/model/data";
import { personalProjects } from "@/entities/personal-project/model/data";
import {
	Card,
	Icon,
	SectionHeader,
	PageShell,
	FadeInSection,
} from "@/shared/ui";
import { Header } from "@/widgets/header/ui/Header";
import { About } from "@/widgets/about/ui/About";

export default function HomePage() {
	const lastJob = experiences[0];
	const topProjects = projects.slice(0, 2);

	return (
		<PageShell wide>
				<Header />

				{/* Experience preview: only last job */}
				<FadeInSection delay={0.05}>
					<div className="mb-10">
						<SectionHeader
							icon="briefcase"
							title="Опыт работы"
							viewAllHref="/experience"
							viewAllLabel={`Все места работы (${experiences.length})`}
						/>
      <ExperienceCard experience={lastJob} preview />
					</div>
				</FadeInSection>

				{/* Projects preview */}
				<FadeInSection delay={0.05}>
					<div className="mb-10">
						<SectionHeader
							icon="folder"
							title="Коммерческие проекты"
							viewAllHref="/projects"
							viewAllLabel={`Все проекты (${projects.length})`}
						/>
						<div className="grid gap-4 md:grid-cols-2">
       {topProjects.map(project => <ProjectCard key={project.id} project={project} preview />)}
						</div>
					</div>
				</FadeInSection>

				{/* Personal projects preview */}
				<FadeInSection delay={0.05}>
					<div className="mb-10">
						<SectionHeader
							icon="sparkles"
							title="Личные проекты"
							viewAllHref="/my-projects"
							viewAllLabel={`Все личные проекты (${personalProjects.length})`}
						/>
						<div className={`grid gap-4 ${personalProjects.length > 1 ? "md:grid-cols-2" : ""}`}>
       {personalProjects.map(project => <PersonalProjectCard key={project.id} project={project} preview />)}
						</div>
					</div>
				</FadeInSection>

				{/* About */}
				<FadeInSection>
					<div className="mb-10 grid gap-6 md:grid-cols-1">
						<About />
					</div>
				</FadeInSection>

				{/* Publications preview */}
				<FadeInSection delay={0.05}>
					<div className="mb-10">
						<SectionHeader
							icon="book-open"
							title="Публикации"
							viewAllHref="/publications"
							viewAllLabel={`Все публикации (${publications.length})`}
						/>
						{publications.slice(0, 1).map((p) => (
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
										<h3 className="font-semibold transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-300">
											{p.title}
										</h3>
										<p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
											{p.description}
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
				</FadeInSection>

				<footer className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
					© 2026 Соснович Иван
				</footer>
</PageShell>
	);
}
