import { Badge } from "./Badge";

export function SkillList({ skills, limit = skills.length }: { skills: string[]; limit?: number }) {
 return <ul className="flex flex-wrap gap-2" aria-label="Технологии">
  {skills.slice(0, limit).map(skill => <li key={skill}><Badge variant="muted">{skill}</Badge></li>)}
  {skills.length > limit && <li><Badge variant="muted">Ещё {skills.length - limit}</Badge></li>}
 </ul>;
}
