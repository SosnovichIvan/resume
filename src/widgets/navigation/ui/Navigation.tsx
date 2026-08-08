"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ href: "/", label: "Главная" },
	{ href: "/experience", label: "Опыт" },
	{ href: "/skills", label: "Навыки" },
	{ href: "/projects", label: "Проекты" },
	{ href: "/my-projects", label: "Свои проекты" },
	{ href: "/publications", label: "Публикации" },
];

export function Navigation() {
	const pathname = usePathname();

	return (
		<nav className="sticky top-0 z-40 border-b border-surface-border bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
			<div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 lg:px-8">
				<Link
					href="/"
					className="font-semibold text-brand-600 dark:text-brand-300"
				>
					Соснович Иван
				</Link>
				<ul className="-mx-1 flex flex-nowrap items-center gap-1 overflow-x-auto px-1 py-0.5 sm:mx-0 sm:flex-wrap sm:justify-end sm:overflow-visible sm:p-0">
					{links.map((link) => {
						const active =
							link.href === "/"
								? pathname === "/"
								: pathname.startsWith(link.href);
						return (
							<li key={link.href} className="shrink-0">
								<Link
									href={link.href}
									className={`inline-flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
										active
											? "bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"
											: "text-ink-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
									}`}
								>
									{link.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}
