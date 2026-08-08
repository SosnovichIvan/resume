import Image from "next/image";
import { profile } from "@/entities/profile/model/data";
import { Icon } from "@/shared/ui";

const badgeClass =
	"inline-flex items-center whitespace-nowrap rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300";

export function Header() {
	return (
		<header className="mb-10">
			<div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
				<div className="h-32 w-32 shrink-0 overflow-hidden rounded-full border-[5px] border-brand-200 shadow-xl ring-4 ring-brand-100 sm:h-40 sm:w-40 md:h-48 md:w-48 dark:border-brand-500 dark:shadow-brand-500/40 dark:ring-brand-900">
					<Image
						src="/avatar.jpg"
						alt="Фото Ивана Сосновича"
						width={192}
						height={192}
						className="h-full w-full object-cover"
					/>
				</div>
				<div className="min-w-0 flex-1 text-center md:text-left">
					<h1 className="mb-2 text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl dark:text-slate-50">
						{profile.name}
					</h1>
					<p className="mb-4 text-lg text-slate-600 sm:text-xl dark:text-slate-300">
						{profile.position}
					</p>
					<p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
						<Icon name="map-pin" className="mr-1 inline h-3.5 w-3.5" />
						{profile.location}
						<span className="mx-2 text-slate-300 dark:text-slate-600">•</span>
						<Icon name="user" className="mr-1 inline h-3.5 w-3.5" />
						{profile.birthDate}
					</p>
					<div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
						{profile.aiHighlights.map((h) => (
							<span key={h} className={badgeClass}>
								{h}
							</span>
						))}
					</div>
					<div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
						{profile.highlights.map((h) => (
							<span key={h} className={badgeClass}>
								{h}
							</span>
						))}
					</div>
				</div>
			</div>
		</header>
	);
}
