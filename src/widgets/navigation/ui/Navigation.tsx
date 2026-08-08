"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Icon, Logo } from "@/shared/ui";
import { HeaderActions } from "@/widgets/header-actions/ui/HeaderActions";

const links = [
	{ href: "/", label: "Главная" },
	{ href: "/experience", label: "Опыт" },
	{ href: "/projects", label: "Проекты" },
	{ href: "/my-projects", label: "Свои проекты" },
	{ href: "/publications", label: "Публикации" },
];

function isActive(href: string, pathname: string): boolean {
	return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navigation() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);

	// Закрывать мобильное меню при смене страницы
	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	// Закрывать по клику вне меню (кроме самой кнопки-гамбургера) и по Escape
	useEffect(() => {
		if (!open) return;
		const onPointerDown = (e: MouseEvent) => {
			const target = e.target as Node;
			const insidePanel = panelRef.current?.contains(target);
			const onToggle = toggleRef.current?.contains(target);
			if (!insidePanel && !onToggle) setOpen(false);
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("mousedown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("mousedown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	// Блокировать прокрутку страницы, пока меню открыто
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	const close = () => setOpen(false);

	return (
		<nav className="sticky top-0 z-40 border-b border-surface-border bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
			<div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
				<Link
					href="/"
					aria-label="Соснович Иван — на главную"
					className="inline-flex items-center text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:text-brand-300 dark:hover:text-brand-200 dark:focus-visible:ring-offset-slate-900"
				>
					<Logo />
				</Link>

				{/* Десктопная навигация (md и выше) */}
				<ul className="hidden items-center gap-1 md:flex md:flex-wrap md:justify-end">
					{links.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className={`inline-flex items-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
									isActive(link.href, pathname)
										? "bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"
										: "text-ink-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
								}`}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				{/* Действия (тема + связь) и гамбургер — действия слева от гамбургера */}
				<div className="flex items-center gap-2">
					<HeaderActions />

					<button
						ref={toggleRef}
						type="button"
						onClick={() => setOpen((o) => !o)}
						aria-label={open ? "Закрыть меню" : "Открыть меню"}
						aria-expanded={open}
						className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 md:hidden dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-500 dark:hover:text-brand-300 dark:focus-visible:ring-offset-slate-900"
					>
						<Icon name={open ? "close" : "menu"} className="h-5 w-5" />
					</button>
				</div>
			</div>

			{/* Мобильное меню-оверлей (полупрозрачное, поверх контента, не сдвигает страницу) */}
			<AnimatePresence>
				{open && (
					<motion.div
						ref={panelRef}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: "easeOut" }}
						className="absolute inset-x-0 top-full z-50 overflow-hidden rounded-b-2xl border-b border-surface-border bg-white/95 shadow-2xl backdrop-blur-md md:hidden dark:border-slate-800 dark:bg-slate-900/95"
					>
						<ul className="max-h-[calc(100vh-5rem)] space-y-1 overflow-y-auto px-4 py-3">
							{links.map((link, i) => (
								<motion.li
									key={link.href}
									initial={{ opacity: 0, x: -8 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.2, delay: i * 0.04 }}
								>
									<Link
										href={link.href}
										onClick={close}
										className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
											isActive(link.href, pathname)
												? "bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300"
												: "text-ink-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
										}`}
									>
										{link.label}
										{isActive(link.href, pathname) && (
											<Icon name="arrow-right" className="h-4 w-4" />
										)}
									</Link>
								</motion.li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
