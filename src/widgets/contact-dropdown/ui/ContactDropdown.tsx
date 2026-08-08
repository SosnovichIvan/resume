"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/entities/profile/model/data";
import { Icon } from "@/shared/ui";

const contactActions: Record<string, { icon: string; action: (v: string) => void }> = {
	Email: { icon: "mail", action: (v) => window.location.assign(`mailto:${v}`) },
	Телефон: { icon: "phone", action: (v) => (window.location.href = `tel:${v.replace(/[^\d+]/g, "")}`) },
	Telegram: { icon: "telegram", action: (v) => window.open(`https://t.me/${v.replace(/^@/, "")}`, "_blank") },
	GitHub: { icon: "github", action: (v) => window.open(`https://github.com/${v}`, "_blank") },
};

interface ContactDropdownProps {
	/** Рендерить кнопку без собственного фона (для встраивания в группу действий). */
	bare?: boolean;
}

export function ContactDropdown({ bare = false }: ContactDropdownProps) {
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState<string | null>(null);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onPointerDown = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", onPointerDown);
		return () => document.removeEventListener("mousedown", onPointerDown);
	}, [open]);

	useEffect(() => {
		if (!open && copied) setCopied(null);
	}, [open, copied]);

	const copy = async (label: string, value: string) => {
		try {
			await navigator.clipboard.writeText(value);
			setCopied(label);
			setTimeout(() => setCopied(null), 1500);
		} catch {
			/* clipboard unavailable */
		}
	};

	return (
		<div ref={ref} className="relative">
			<button
				onClick={() => setOpen((o) => !o)}
				aria-label="Связаться"
				aria-expanded={open}
				title="Связаться"
				className={
					bare
						? "flex h-10 w-10 cursor-pointer shrink-0 items-center justify-center text-brand-600 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:text-brand-300 dark:hover:text-brand-200 dark:focus-visible:ring-offset-slate-900"
						: "inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
				}
			>
				<Icon name="send" className="h-4 w-4" />
				{!bare && (
					<>
						<span className="whitespace-nowrap">Связаться</span>
						<Icon name="chevron-down" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
					</>
				)}
			</button>

			{open && (
				<div className="absolute right-0 z-20 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
					{profile.contacts.map((c) => (
						<div
							key={c.label}
							className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-0 dark:border-slate-700"
						>
							<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
								<Icon name={c.icon} className="h-4 w-4" />
							</span>
							<div className="min-w-0 flex-1">
								<p className="text-xs text-slate-400 dark:text-slate-500">{c.label}</p>
								<button
									onClick={() => contactActions[c.label]?.action(c.value)}
									title={c.value}
									className="block max-w-full cursor-pointer truncate text-sm font-medium text-slate-700 transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-200 dark:hover:text-brand-300"
								>
									{c.value}
								</button>
							</div>
							<button
								onClick={() => copy(c.label, c.value)}
								aria-label={`Скопировать ${c.label}`}
								className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:text-slate-400 dark:hover:border-brand-500 dark:hover:text-brand-300"
							>
								<Icon
									name={copied === c.label ? "check" : "copy"}
									className="h-4 w-4"
								/>
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
