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
		<div className="mb-6 flex items-end justify-between gap-4 border-b border-surface-border pb-4 dark:border-surface-border-dark">
			<h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-[-0.03em] text-slate-950 sm:text-3xl dark:text-white">
				<span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-300/70 bg-accent-50 text-accent-600 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300">
					<Icon name={icon} className="h-5 w-5" />
				</span>
				{title}
			</h2>
			{viewAllHref && (
				<Link
					href={viewAllHref}
					aria-label={viewAllLabel}
					className="focus-ring group inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-accent-600 transition-colors hover:bg-accent-50 dark:text-brand-300 dark:hover:bg-brand-950"
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
