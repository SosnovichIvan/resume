import { profile } from "@/entities/profile/model/data";
import { Card, SkillList, AchievementList } from "@/shared/ui";
import { Disclosure } from "@/shared/ui/Disclosure";

export function About() {
 return <Card className="p-6">
  <h2 className="mb-4 text-xl font-semibold">Компетенции</h2>
  <div className="divide-y divide-slate-200 dark:divide-slate-700">
   {profile.experienceBlock.roles.map(role => <div key={role.role} className="py-4 first:pt-0 last:pb-0">
    <h3 className="mb-3 font-semibold">{role.role}</h3>
    {role.summary && <p className="mb-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{role.summary}</p>}
    {role.skills && <SkillList skills={role.skills} limit={6} />}
    {role.details?.length ? <Disclosure title={`Подробнее: ${role.role}`}>
     <AchievementList items={role.details} />
     {role.skills && role.skills.length > 6 && <SkillList skills={role.skills.slice(6)} />}
    </Disclosure> : null}
   </div>)}
  </div>
 </Card>;
}
