"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Icon, Logo } from "@/shared/ui";
import { HeaderActions } from "@/widgets/header-actions/ui/HeaderActions";

const links = [
	{ href: "/", label: "Главная" },
	{ href: "/experience", label: "Опыт" },
	{ href: "/projects", label: "Коммерческие кейсы" },
	{ href: "/my-projects", label: "Личные проекты" },
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
			if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
		};
		document.addEventListener("mousedown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("mousedown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

 // Apply scroll lock and width compensation together, before the browser paints.
 useLayoutEffect(() => {
  if (!open) return;
  const root = document.documentElement;
  const previousRoot = root.style.overflow;
  const previousPadding = root.style.paddingRight;
  const widthBefore = document.body.getBoundingClientRect().width;
  const paddingBefore = Number.parseFloat(getComputedStyle(root).paddingRight) || 0;
  root.style.overflow = "hidden";
  // Some browsers ignore stable gutters for styled scrollbars when overflow is hidden.
  const widthChange = document.body.getBoundingClientRect().width - widthBefore;
  if (widthChange > 0) root.style.paddingRight = `${paddingBefore + widthChange}px`;
  const closeOnDesktop = () => { if (window.innerWidth >= 768) setOpen(false); };
  window.addEventListener("resize", closeOnDesktop);
  return () => {
   root.style.overflow = previousRoot;
   root.style.paddingRight = previousPadding;
   window.removeEventListener("resize", closeOnDesktop);
  };
 }, [open]);

	const close = () => setOpen(false);

	return (
		<nav className="sticky top-0 z-40 border-b border-surface-border bg-[#f3efe7]/90 backdrop-blur-xl dark:border-surface-border-dark dark:bg-surface-dark/90">
			<div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
				<div className="flex shrink-0 items-center">
 <Link
					href="/"
					aria-label="Соснович Иван — на главную"
					className="focus-ring inline-flex items-center text-accent-600 transition-colors hover:text-accent-500 dark:text-brand-300 dark:hover:text-brand-200"
				>
					<Logo />
				</Link>
 </div>

				{/* Десктопная навигация (md и выше) */}
				<ul className="hidden items-center gap-1 rounded-xl border border-surface-border bg-[#fffdf9]/70 p-1 md:flex md:flex-wrap md:justify-end dark:border-surface-border-dark dark:bg-surface-card/70">
					{links.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className={`focus-ring inline-flex min-h-9 items-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
									isActive(link.href, pathname)
										? "bg-accent-50 text-accent-600 dark:bg-brand-950 dark:text-brand-300"
										: "text-ink-600 hover:bg-[#eee8de] dark:text-slate-300 dark:hover:bg-[#192228]"
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
 aria-controls="mobile-navigation"
						className="focus-ring flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-surface-border bg-[#fffdf9] text-slate-600 transition-colors hover:border-accent-400 hover:text-accent-600 md:hidden dark:border-surface-border-dark dark:bg-surface-card dark:text-slate-300 dark:hover:border-brand-500 dark:hover:text-brand-300"
					>
						<Icon name={open ? "close" : "menu"} className="h-5 w-5" />
					</button>
				</div>
			</div>

   {/* Portal avoids the sticky header's backdrop-filter containing block. */}
   {open && createPortal(
    <div className="fixed inset-x-0 bottom-0 top-[71px] z-30 overflow-hidden md:hidden" id="mobile-navigation">
     <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-slate-950/20" />
     <div ref={panelRef} className="relative max-h-full overflow-y-auto overscroll-contain rounded-b-2xl border-b border-surface-border bg-[#f8f4ed] shadow-xl dark:border-surface-border-dark dark:bg-surface-dark">
      <ul className="space-y-1 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
       {links.map(link => <li key={link.href}>
        <Link href={link.href} onClick={close} aria-current={isActive(link.href, pathname) ? "page" : undefined} className={`focus-ring flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive(link.href, pathname) ? "bg-accent-50 text-accent-600 dark:bg-brand-950 dark:text-brand-300" : "text-ink-600 hover:bg-[#eee8de] dark:text-slate-300 dark:hover:bg-[#192228]"}`}>
         {link.label}{isActive(link.href, pathname) && <Icon name="arrow-right" className="h-4 w-4 shrink-0" />}
        </Link>
       </li>)}
      </ul>
     </div>
    </div>, document.body
   )}
  </nav>
 );
}
