"use client";

import { ContactDropdown } from "@/widgets/contact-dropdown/ui/ContactDropdown";
import { ThemeToggle } from "@/widgets/theme-toggle/ui/ThemeToggle";

const containerClass =
	"flex items-center rounded-xl border border-surface-border bg-[#fffdf9] shadow-sm dark:border-surface-border-dark dark:bg-surface-card";

const iconButtonClass =
	"focus-ring flex h-11 w-11 cursor-pointer shrink-0 items-center justify-center text-slate-600 transition-colors hover:text-accent-600 dark:text-slate-300 dark:hover:text-brand-300";

export function HeaderActions() {
	return (
		<div className={containerClass}>
			<ThemeToggle bare className={iconButtonClass} />
			<ContactDropdown bare />
		</div>
	);
}
