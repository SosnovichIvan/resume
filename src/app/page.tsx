import { experiences } from "@/entities/experience/model/data";
import { skillCategories } from "@/entities/skill/model/data";
import { publications } from "@/entities/publication/model/data";
import { projects } from "@/entities/project/model/data";
import { personalProjects } from "@/entities/personal-project/model/data";
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
	const topSkills = skillCategories.slice(0, 3);
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
									<p className="font-medium text-indigo-600 dark:text-indigo-300">
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
											className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400"
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

				{/* Skills preview */}
				<FadeInSection delay={0.05}>
					<div className="mb-10">
						<SectionHeader
							icon="code"
							title="Навыки"
							viewAllHref="/skills"
							viewAllLabel={`Все навыки (${skillCategories.length} категорий)`}
						/>
						<div className="grid gap-4 sm:grid-cols-3">
							{topSkills.map((cat) => (
								<Card key={cat.id} hover className="p-5">
									<div className="mb-2 flex items-center justify-between">
										<h3 className="font-semibold">{cat.title}</h3>
										<span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
											{cat.level}%
										</span>
									</div>
									<div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
										<div
											className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
											style={{ width: `${cat.level}%` }}
										/>
									</div>
									<div className="flex flex-wrap gap-1.5">
										{cat.skills.map((s) => (
											<SkillBadge key={s} skill={s} />
										))}
									</div>
								</Card>
							))}
						</div>
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
							{personalProjects.map((p) => (
								<Card key={p.id} hover className="flex flex-col p-6">
									<div className="mb-2 flex items-start justify-between gap-2">
										<div className="group relative">
											<a
												href={p.repo}
												target="_blank"
												rel="noopener noreferrer"
												className="font-semibold transition-colors hover:text-indigo-600 dark:hover:text-indigo-300"
											>
												{p.name}
											</a>
											{p.id === "resume" && (
												<span className="pointer-events-none absolute left-0 top-full z-20 mt-1 hidden whitespace-nowrap rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-white group-hover:block dark:bg-slate-700">
													Вы уже здесь — это текущий сайт
												</span>
											)}
										</div>
										{p.builtByAI && (
											<div className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-50 to-pink-50 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:from-indigo-950 dark:to-pink-950 dark:text-indigo-300">
												<Icon name="sparkles" className="h-3.5 w-3.5" />
												Через ИИ
											</div>
										)}
									</div>
									<p className="mb-4 flex-1 text-sm text-slate-600 dark:text-slate-300">
										{p.description}
									</p>
									<div className="flex flex-wrap gap-1.5">
										{p.stack.slice(0, 6).map((s) => (
											<SkillBadge key={s} skill={s} />
										))}
										{p.stack.length > 6 && (
											<Badge>+{p.stack.length - 6}</Badge>
										)}
									</div>
								</Card>
							))}
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
								className="group block"
							>
								<Card hover className="flex items-center gap-4 p-5">
									<div
										className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-white`}
									>
										<Icon name="book-open" className="h-6 w-6" />
									</div>
									<div className="min-w-0 flex-1">
										<h3 className="font-semibold transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
											{p.title}
										</h3>
										<p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
											{p.description}
										</p>
									</div>
									<Icon
										name="external-link"
										className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-300"
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
