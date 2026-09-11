import Image from "next/image";
import Link from "next/link";
import { profile } from "@/entities/profile/model/data";
import { Icon } from "@/shared/ui";

const highlightSkills = [...profile.coreSkills.slice(0, 4), ...profile.aiSkills.slice(0, 2)];

export function Header() {
	return (
		<header className="relative mb-16 overflow-hidden rounded-[1.75rem] border border-surface-border bg-[#fffdf9] shadow-[0_24px_80px_rgba(62,23,15,0.08)] dark:border-surface-border-dark dark:bg-[#0e1519] dark:shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
			<div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400 to-transparent dark:via-brand-400" />
			<div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl dark:bg-brand-400/10" />

			<div className="relative grid lg:grid-cols-[1.3fr_0.7fr]">
				<div className="flex flex-col justify-between p-6 sm:p-9 lg:p-12">
					<div>
						<div className="mb-6 flex flex-wrap items-center gap-3">
							<span className="eyebrow inline-flex items-center gap-2 text-success-600 dark:text-brand-300"><span className="h-2 w-2 animate-pulse rounded-full bg-success-500" />{profile.availability}</span>
							<span className="eyebrow text-slate-500 dark:text-slate-400">Frontend-first · AI-assisted</span>
						</div>
						<h1 className="max-w-3xl text-[clamp(2.55rem,7vw,5.4rem)] font-extrabold leading-[0.96] tracking-[-0.065em] text-slate-950 dark:text-white">Я нахожу, где интерфейс теряет секунды — и <span className="text-accent-500 dark:text-brand-300">возвращаю их.</span></h1>
						<p className="mt-7 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">{profile.tagline}</p>
					</div>
					<div className="mt-8 flex flex-wrap items-center gap-3">
						<Link href="#cases" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 dark:bg-brand-300 dark:text-brand-950">Ключевые кейсы <Icon name="arrow-right" className="h-4 w-4" /></Link>
						<Link href="/experience#print" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-accent-50 hover:text-accent-600 dark:text-slate-300 dark:hover:bg-brand-950 dark:hover:text-brand-300"><Icon name="article" className="h-4 w-4" />Версия для PDF</Link>
					</div>
				</div>

				<aside className="border-t border-surface-border bg-[#f7f2ea] p-6 sm:p-8 lg:border-l lg:border-t-0 dark:border-surface-border-dark dark:bg-[#111a1f]" aria-label="Профиль Ивана Сосновича">
					<div className="flex items-center gap-4">
						<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-surface-border bg-white dark:border-surface-border-dark dark:bg-surface-card"><Image src="/avatar.jpg" alt="Фото Ивана Сосновича" fill sizes="80px" priority className="object-cover" /></div>
						<div><p className="text-xl font-extrabold tracking-[-0.03em] text-slate-950 dark:text-white">{profile.name}</p><p className="mt-1 text-sm font-semibold leading-snug text-accent-600 dark:text-brand-300">{profile.position}</p></div>
					</div>
					<div className="mt-8 rounded-2xl border border-surface-border bg-[#fffdf9] p-4 dark:border-surface-border-dark dark:bg-[#0b1115]">
						<div className="mb-4 flex items-center justify-between"><span className="eyebrow text-slate-500 dark:text-slate-400">engineering.profile</span><span className="h-2.5 w-2.5 rounded-full bg-brand-400 shadow-[0_0_18px_rgba(77,214,185,0.65)]" /></div>
						<dl className="space-y-4 font-mono text-xs">
							<div className="grid gap-1 sm:grid-cols-[5.5rem_1fr]"><dt className="text-slate-500">architecture</dt><dd className="font-medium text-slate-800 sm:text-right dark:text-slate-200">архитектура продукта · frontend depth</dd></div>
							<div className="grid gap-1 sm:grid-cols-[5.5rem_1fr]"><dt className="text-slate-500">delivery</dt><dd className="font-medium text-slate-800 sm:text-right dark:text-slate-200">от анализа задачи до production</dd></div>
							<div className="grid gap-1 sm:grid-cols-[5.5rem_1fr]"><dt className="text-slate-500">teams</dt><dd className="font-medium text-slate-800 sm:text-right dark:text-slate-200">небольшие команды · крупные кросс-функциональные контуры</dd></div>
							<div className="grid gap-1 sm:grid-cols-[5.5rem_1fr]"><dt className="text-slate-500">collaboration</dt><dd className="font-medium text-slate-800 sm:text-right dark:text-slate-200">разные стеки и зоны ответственности</dd></div>
						</dl>
					</div>
					<div className="mt-6 flex flex-wrap gap-2">{highlightSkills.map((skill) => <span key={skill} className="rounded-lg border border-surface-border bg-[#fffdf9] px-2.5 py-1.5 font-mono text-[11px] font-medium text-slate-600 dark:border-surface-border-dark dark:bg-[#0b1115] dark:text-slate-300">{skill}</span>)}</div>
				</aside>
			</div>

			<div className="relative grid grid-cols-2 border-t border-surface-border sm:grid-cols-4 dark:border-surface-border-dark">
				{profile.proofs.map((proof, index) => <div key={proof.label} className={`border-surface-border px-5 py-5 dark:border-surface-border-dark sm:px-7 ${index % 2 ? "border-l" : ""} ${index > 1 ? "border-t sm:border-t-0" : ""} sm:border-l sm:first:border-l-0`}><span className="eyebrow mb-2 block text-slate-400 dark:text-slate-500">{index < 2 ? "system" : "performance"}</span><strong className="block text-lg font-extrabold tracking-[-0.03em] text-accent-600 sm:text-xl dark:text-brand-300">{proof.value}</strong><span className="mt-1.5 block text-xs leading-snug text-slate-500 dark:text-slate-400">{proof.label}</span></div>)}
			</div>
		</header>
	);
}
