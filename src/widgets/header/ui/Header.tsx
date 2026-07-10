import { profile } from "@/entities/profile/model/data";
import { Badge, Icon } from "@/shared/ui";
import { ThemeToggle } from "@/widgets/theme-toggle/ui/ThemeToggle";

export function Header() {
	return (
		<header className="mb-10">
			<div className="mb-6 flex justify-end">
				<ThemeToggle />
			</div>
			<div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
				<div className="h-40 w-40 shrink-0 overflow-hidden rounded-2xl border-[5px] border-indigo-200 shadow-xl ring-4 ring-indigo-100 dark:border-indigo-500 dark:shadow-indigo-500/40 dark:ring-indigo-900 md:h-48 md:w-48">
					<img
						src="/avatar.jpg"
						alt="Фото Ивана Сосновича"
						className="h-full w-full object-cover"
					/>
				</div>
				<div className="min-w-0 flex-1">
					<h1 className="mb-2 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl dark:from-indigo-400 dark:to-pink-400">
						{profile.name}
					</h1>
					<p className="mb-4 text-xl text-slate-600 dark:text-slate-300">
						{profile.position}
					</p>
					<div className="flex flex-wrap items-center gap-2">
						<Badge>
							<Icon name="map-pin" className="mr-1 h-3.5 w-3.5" />
							{profile.location}
						</Badge>
						{profile.highlights.map((h) => (
							<Badge key={h}>{h}</Badge>
						))}
					</div>
				</div>
			</div>
		</header>
	);
}
