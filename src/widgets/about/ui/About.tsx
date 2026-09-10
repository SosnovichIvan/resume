import { profile } from "@/entities/profile/model/data";
import { Card, SkillBadge } from "@/shared/ui";

export function About() {
	return (
		<section aria-labelledby="expertise-title">
			<div className="mb-4"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">Профиль компетенций</p><h2 id="expertise-title" className="mt-1 text-2xl font-bold">Где я создаю наибольшую ценность</h2></div>
			<div className="grid gap-4 lg:grid-cols-3">
				{profile.competenceAreas.map((area) => <Card key={area.title} className="flex h-full flex-col p-5"><span className="mb-3 w-fit rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">{area.level}</span><h3 className="font-semibold text-slate-950 dark:text-white">{area.title}</h3><p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{area.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{area.skills.slice(0, 5).map((skill) => <SkillBadge key={skill} skill={skill} />)}</div></Card>)}
			</div>
		</section>
	);
}
