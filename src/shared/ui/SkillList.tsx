import { SkillBadge } from "./SkillBadge";

export function SkillList({ skills, limit = skills.length }: { skills: string[]; limit?: number }) {
 return <ul className="flex flex-wrap gap-1.5" aria-label="Технологии">
  {skills.slice(0, limit).map(skill => <li key={skill}><SkillBadge skill={skill} /></li>)}
  {skills.length > limit && <li className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">+{skills.length - limit}</li>}
 </ul>;
}
