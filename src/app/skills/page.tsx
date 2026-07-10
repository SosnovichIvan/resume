import type { Metadata } from "next";
import { skillCategories, education } from "@/entities/skill/model/data";
import { Badge, Card, Icon, PageTransition } from "@/shared/ui";
import { BackLink } from "@/shared/ui/BackLink";

export const metadata: Metadata = {
	title: "Навыки — Соснович Иван",
};

export default function SkillsPage() {
	return (
		<PageTransition>
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<BackLink />
				<h1 className="mb-2 flex items-center gap-3 text-3xl font-bold">
					<span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
						<Icon name="code" className="h-6 w-6" />
					</span>
					Навыки
				</h1>
				<p className="mb-8 text-slate-500 dark:text-slate-400">
					{skillCategories.length} категорий · стек, инструменты и практики
				</p>

				<div className="mb-10 space-y-5">
					{skillCategories.map((cat) => (
						<Card key={cat.id} className="p-6">
							<div className="mb-1 flex items-center justify-between gap-4">
								<h2 className="text-lg font-semibold">{cat.title}</h2>
								<span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
									{cat.level}%
								</span>
							</div>
							<p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
								{cat.description}
							</p>
							<div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
								<div
									className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-500"
									style={{ width: `${cat.level}%` }}
								/>
							</div>
							<div className="flex flex-wrap gap-2">
								{cat.skills.map((s) => (
									<Badge key={s} variant="muted">
										{s}
									</Badge>
								))}
							</div>
						</Card>
					))}
				</div>

				<h2 className="mb-4 flex items-center gap-3 text-2xl font-bold">
					<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
						<Icon name="graduation" className="h-5 w-5" />
					</span>
					Образование и курсы
				</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					{education.map((e) => (
						<Card key={e.title + e.year} className="p-5">
							<div className="flex items-start justify-between gap-2">
								<div>
									<h3 className="font-semibold">{e.title}</h3>
									<p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
										{e.org}
									</p>
								</div>
								<Badge variant="muted">{e.year}</Badge>
							</div>
						</Card>
					))}
				</div>
			</div>
		</PageTransition>
	);
}
