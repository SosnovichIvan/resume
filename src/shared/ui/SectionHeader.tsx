import Link from "next/link";
import { Icon } from "./Icon";

interface SectionHeaderProps {
	icon: string;
	title: string;
	viewAllHref?: string;
	viewAllLabel?: string;
}

export function SectionHeader({
	icon,
	title,
	viewAllHref,
	viewAllLabel = "Смотреть все",
}: SectionHeaderProps) {
	return (
		<div className="mb-6 flex items-center justify-between gap-4">
			<h2 className="flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-slate-50">
				<span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
					<Icon name={icon} className="h-5 w-5" />
				</span>
				{title}
			</h2>
			{viewAllHref && (
				<Link
					href={viewAllHref}
					className="group inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 dark:text-indigo-300 dark:hover:bg-indigo-950"
				>
					<span className="hidden sm:inline">{viewAllLabel}</span>
					<span className="sm:hidden">Все</span>
					<Icon
						name="arrow-right"
						className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
					/>
				</Link>
			)}
		</div>
	);
}
