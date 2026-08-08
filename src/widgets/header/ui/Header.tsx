import Image from "next/image";
import { profile } from "@/entities/profile/model/data";
import { Icon } from "@/shared/ui";
import { ContactDropdown } from "@/widgets/contact-dropdown/ui/ContactDropdown";
import { ThemeToggle } from "@/widgets/theme-toggle/ui/ThemeToggle";

function calcAge(birthDate: string): number {
	const [d, m, y] = birthDate.split(".").map(Number);
	const today = new Date();
	let age = today.getFullYear() - y;
	if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) {
		age -= 1;
	}
	return age;
}

function pluralYears(n: number): string {
	const mod10 = n % 10;
	const mod100 = n % 100;
	if (mod10 === 1 && mod100 !== 11) return "год";
	if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "года";
	return "лет";
}

const badgeClass =
	"inline-flex items-center whitespace-nowrap rounded-full bg-gradient-to-r from-indigo-600 to-pink-500 px-3 py-1 text-xs font-medium text-white";

export function Header() {
	return (
		<header className="mb-10">
			<div className="mb-6 flex items-center justify-end gap-3">
				<ContactDropdown />
				<ThemeToggle />
			</div>
			<div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
				<div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-[5px] border-indigo-200 shadow-xl ring-4 ring-indigo-100 dark:border-indigo-500 dark:shadow-indigo-500/40 dark:ring-indigo-900 sm:h-40 sm:w-40 md:h-48 md:w-48">
					<Image
						src="/avatar.jpg"
						alt="Фото Ивана Сосновича"
						width={192}
						height={192}
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
					<p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
					<Icon name="map-pin" className="mr-1 inline h-3.5 w-3.5" />
					{profile.location}
					<span className="mx-2 text-slate-300 dark:text-slate-600">•</span>
					<Icon name="user" className="mr-1 inline h-3.5 w-3.5" />
					{profile.birthDate} · {calcAge(profile.birthDate)} {pluralYears(calcAge(profile.birthDate))}
				</p>
				<div className="mb-3 flex flex-wrap items-center gap-2">
					{profile.aiHighlights.map((h) => (
						<span key={h} className={badgeClass}>
							{h}
						</span>
					))}
				</div>
				<div className="flex flex-wrap items-center gap-2">
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
