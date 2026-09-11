import { profile } from "@/entities/profile/model/data";
import { Card, Icon } from "@/shared/ui";

const icons = ["folder", "code", "users", "sparkles"];

export function About() {
	return (
		<section aria-labelledby="expertise-title">
			<div className="mb-6 max-w-2xl">
				<p className="eyebrow text-accent-600 dark:text-brand-300">01 · профиль компетенций</p>
				<h2 id="expertise-title" className="mt-2 text-3xl font-extrabold tracking-[-0.045em] text-slate-950 sm:text-4xl dark:text-white">Где я приношу наибольшую пользу</h2>
				<p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">Проектирую не только интерфейс, но и то, как продукт взаимодействует с данными, API, командами и процессом доставки.</p>
			</div>
			<div className="grid gap-4 md:grid-cols-2">
				{profile.competenceAreas.map((area, index) => <Card key={area.title} hover className="group flex h-full flex-col p-6">
					<div className="mb-8 flex items-center justify-between"><span className="eyebrow text-slate-400 dark:text-slate-500">0{index + 1}</span><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600 transition-colors group-hover:bg-accent-500 group-hover:text-white dark:bg-brand-950 dark:text-brand-300 dark:group-hover:bg-brand-300 dark:group-hover:text-brand-950"><Icon name={icons[index]} className="h-5 w-5" /></span></div>
					<p className="eyebrow text-accent-600 dark:text-brand-300">{area.level}</p>
					<h3 className="mt-2 text-xl font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">{area.title}</h3>
					<p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{area.description}</p>
					<p className="mt-6 font-mono text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{area.skills.slice(0, 5).join(" · ")}</p>
				</Card>)}
			</div>
		</section>
	);
}
