import type { Experience } from "../model/data";
import { Card, Badge, SkillList, AchievementList } from "@/shared/ui";

export function ExperienceCard({ experience, preview = false }: { experience: Experience; preview?: boolean }) {
 const Heading = preview ? "h3" : "h2";
 return <Card className="p-6">
  <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row">
   <div><Heading className="text-lg font-semibold">{experience.position}</Heading><p className="font-medium text-brand-600 dark:text-brand-300">{experience.company}</p></div>
   <div><Badge variant="muted">{experience.period}</Badge></div>
  </div>
  <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{experience.summary}</p>
  <AchievementList items={preview ? experience.achievements.slice(0, 3) : experience.achievements} />
  <SkillList skills={experience.stack} limit={preview ? 6 : experience.stack.length} />
 </Card>;
}
