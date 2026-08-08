"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/shared/ui";

interface ThemeToggleProps {
	/** Рендерить без собственного контейнера/фона (для встраивания в группу). */
	bare?: boolean;
	className?: string;
}

export function ThemeToggle({ bare = false, className = "" }: ThemeToggleProps) {
	const [isDark, setIsDark] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		setIsDark(document.documentElement.classList.contains("dark"));
	}, []);

	const toggle = () => {
		const next = !isDark;
		setIsDark(next);
		document.documentElement.classList.toggle("dark", next);
		try {
			localStorage.setItem("theme", next ? "dark" : "light");
		} catch {
			/* localStorage unavailable */
		}
	};

	if (!mounted) {
		return <div className={bare ? className : "h-10 w-10"} aria-hidden />;
	}

	return (
		<button
			onClick={toggle}
			aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
			className={
				bare
					? className
					: "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:text-brand-300 dark:focus-visible:ring-offset-slate-900"
			}
		>
			<Icon name={isDark ? "sun" : "moon"} className="h-5 w-5" />
		</button>
	);
}
