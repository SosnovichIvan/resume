"use client";

import { ContactDropdown } from "@/widgets/contact-dropdown/ui/ContactDropdown";
import { ThemeToggle } from "@/widgets/theme-toggle/ui/ThemeToggle";

const containerClass =
	"flex items-center rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800";

const iconButtonClass =
	"flex h-10 w-10 cursor-pointer shrink-0 items-center justify-center text-slate-600 transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:text-slate-300 dark:hover:text-brand-300 dark:focus-visible:ring-offset-slate-900";

export function HeaderActions() {
	return (
		<div className={containerClass}>
			<ThemeToggle bare className={iconButtonClass} />
			<ContactDropdown bare />
		</div>
	);
}
