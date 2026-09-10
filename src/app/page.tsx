import { experiences } from "@/entities/experience/model/data";
import { publications } from "@/entities/publication/model/data";
import { projects } from "@/entities/project/model/data";
import { personalProjects } from "@/entities/personal-project/model/data";
import { PersonalProjectCard } from "@/entities/personal-project/ui/PersonalProjectCard";
import {
	Badge,
	Card,
	Icon,
	SectionHeader,
	PageTransition,
	FadeInSection,
	SkillBadge,
} from "@/shared/ui";
import { Header } from "@/widgets/header/ui/Header";
import { About } from "@/widgets/about/ui/About";

export default function HomePage() {
	const lastJob = experiences[0];
	const topProjects = projects.slice(0, 2);

	return (
		<PageTransition>
			<div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
				<Header />

				{/* About */}
				<FadeInSection>
					<div className="mb-10 grid gap-6 md:grid-cols-1">
						<About />
					</div>
				</FadeInSection>

				{/* Experience preview: only last job */}
				<FadeInSection delay={0.05}>
					<div className="mb-10">
						<SectionHeader
							icon="briefcase"
							title="Опыт работы"
							viewAllHref="/experience"
							viewAllLabel={`Все места работы (${experiences.length})`}
						/>
						<Card hover className="p-6">
							<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
								<div>
									<h3 className="text-lg font-semibold">{lastJob.position}</h3>
									<p className="font-medium text-brand-600 dark:text-brand-300">
										{lastJob.company}
									</p>
								</div>
								<Badge variant="muted">{lastJob.period}</Badge>
							</div>
							<p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
								{lastJob.summary}
							</p>
							<ul className="mb-4 space-y-2">
								{lastJob.achievements.slice(0, 3).map((a) => (
									<li
										key={a}
										className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300"
									>
										<Icon
											name="check"
											className="mt-0.5 h-4 w-4 shrink-0 text-success-600 dark:text-success-400"
										/>
										{a}
									</li>
								))}
							</ul>
							<div className="flex flex-wrap gap-2">
								{lastJob.stack.map((s) => (
									<SkillBadge key={s} skill={s} />
								))}
							</div>
						</Card>
					</div>
				</FadeInSection>

				{/* Projects preview */}
				<FadeInSection delay={0.05}>
					<div className="mb-10">
						<SectionHeader
							icon="folder"
							title="Проекты"
							viewAllHref="/projects"
							viewAllLabel={`Все проекты (${projects.length})`}
						/>
						<div className="grid gap-4 md:grid-cols-2">
							{topProjects.map((p) => (
								<Card key={p.id} hover className="flex flex-col p-6">
									<div className="mb-2 flex items-start justify-between gap-2">
										<h3 className="font-semibold">{p.name}</h3>
										<Badge variant="muted">{p.company}</Badge>
									</div>
									<p className="mb-4 flex-1 text-sm text-slate-600 dark:text-slate-300">
										{p.description}
									</p>
									<div className="flex flex-wrap gap-1.5">
										{p.stack.map((s) => (
											<SkillBadge key={s} skill={s} />
										))}
									</div>
								</Card>
							))}
						</div>
					</div>
				</FadeInSection>

				{/* Personal projects preview */}
				<FadeInSection delay={0.05}>
					<div className="mb-10">
						<SectionHeader
							icon="sparkles"
							title="Свои проекты"
							viewAllHref="/my-projects"
							viewAllLabel={`Все свои проекты (${personalProjects.length})`}
						/>
						<div className="grid gap-4 md:grid-cols-2">
							{personalProjects.map((project) => <PersonalProjectCard key={project.slug} project={project} />)}
						</div>
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
			</div>
		</PageTransition>
	);
}
