import Image from "next/image";
import Link from "next/link";
import { profile } from "@/entities/profile/model/data";
import { Icon } from "@/shared/ui";

const badgeClass = "inline-flex items-center whitespace-nowrap rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200";

export function Header() {
	return (
		<header className="relative mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
			<div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-400/15 blur-3xl" />
			<div className="relative flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
				<div className="h-32 w-32 shrink-0 overflow-hidden rounded-3xl border-4 border-white shadow-xl ring-1 ring-slate-200 sm:h-40 sm:w-40 dark:border-slate-800 dark:ring-slate-700">
					<Image src="/avatar.jpg" alt="Фото Ивана Сосновича" width={160} height={160} priority className="h-full w-full object-cover" />
				</div>
				<div className="min-w-0 flex-1 text-center md:text-left">
					<div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
						<span className="inline-flex items-center gap-2 rounded-full bg-success-500/10 px-3 py-1 text-xs font-semibold text-success-600 dark:text-success-400"><span className="h-2 w-2 animate-pulse rounded-full bg-success-500" />{profile.availability}</span>
						<span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950 dark:text-brand-300">Frontend-first</span>
					</div>
					<h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl md:text-5xl dark:text-white">{profile.name}</h1>
					<p className="mt-2 text-lg font-semibold text-brand-600 sm:text-xl dark:text-brand-300">{profile.position}</p>
					<p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">{profile.tagline}</p>
					<p className="mt-3 text-sm text-slate-500 dark:text-slate-400"><Icon name="map-pin" className="mr-1 inline h-3.5 w-3.5" />{profile.location}</p>
					<div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:justify-start">
						{profile.coreSkills.map((skill) => <span key={skill} className={badgeClass}>{skill}</span>)}
						{profile.aiSkills.map((skill) => <span key={skill} className={badgeClass}>{skill}</span>)}
					</div>
					<div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
						<Link href="#cases" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><Icon name="sparkles" className="h-4 w-4" />Ключевые кейсы</Link>
						<Link href="/experience#print" className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-semibold text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-300"><Icon name="article" className="h-4 w-4" />Версия для PDF</Link>
					</div>
				</div>
			</div>
			<div className="relative mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-4 dark:border-slate-700 dark:bg-slate-700">
				{profile.proofs.map((proof) => <div key={proof.label} className="bg-slate-50 px-4 py-4 dark:bg-slate-800/80"><strong className="block text-lg text-slate-950 dark:text-white">{proof.value}</strong><span className="mt-1 block text-xs leading-snug text-slate-500 dark:text-slate-400">{proof.label}</span></div>)}
			</div>
		</header>
	);
}
