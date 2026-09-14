import type { Project } from "../model/data";
import { Card, Badge, SkillList, AchievementList, ExternalLink, Icon } from "@/shared/ui";

export function ProjectCard({ project, preview = false }: { project: Project; preview?: boolean }) {
 const Heading = preview ? "h3" : "h2";
 return <Card className="flex h-full flex-col p-6">
  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
   <Heading className="text-lg font-semibold">{project.name}</Heading>
   <Badge variant="muted">{project.company}</Badge>
  </div>
  <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
  {!preview && <AchievementList items={project.details} />}
  <div className="mt-auto"><SkillList skills={project.stack} limit={preview ? 6 : project.stack.length} /></div>
  {!preview && <div className="mt-4 flex flex-wrap items-center gap-2">
   {project.repo && <ExternalLink href={project.repo}><Icon name="github" className="h-4 w-4" />{project.repo === "https://github.com/SosnovichIvan" ? "Профиль автора на GitHub" : "Репозиторий"}</ExternalLink>}
   {project.internal && <span className="text-sm text-slate-600 dark:text-slate-300">Внутренний проект · исходный код закрыт</span>}
   {project.host && <ExternalLink href={project.host}>Демо</ExternalLink>}
  </div>}
 </Card>;
}
