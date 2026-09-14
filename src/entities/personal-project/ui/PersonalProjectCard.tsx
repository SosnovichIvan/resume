import type { PersonalProject } from "../model/data";
import { Card, SkillList, AchievementList, ExternalLink, Badge } from "@/shared/ui";

export function PersonalProjectCard({ project, preview = false }: { project: PersonalProject; preview?: boolean }) {
 const Heading = preview ? "h3" : "h2";
 return <Card className="flex h-full flex-col p-6">
  <Heading className="mb-2 text-lg font-semibold">{project.name}</Heading>
  <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{project.description}</p>
  {!preview && <AchievementList items={project.details} />}
  <div className="mt-auto"><SkillList skills={project.stack} limit={preview ? 6 : project.stack.length} /></div>
  <div className="mt-4 flex flex-wrap items-center gap-2">
   <ExternalLink href={project.repo}>Код на GitHub</ExternalLink>
   {project.builtByAI && <Badge variant="muted">С помощью ИИ</Badge>}
  </div>
  {project.id === "resume" && <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">Вы сейчас на этом сайте</p>}
 </Card>;
}
