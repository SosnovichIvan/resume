"use client";

import { useEffect } from "react";
import { Icon } from "@/shared/ui/Icon";

export function PrintResumeButton() {
	useEffect(() => {
		if (window.location.hash === "#print") window.setTimeout(() => window.print(), 250);
	}, []);
	return <button type="button" onClick={() => window.print()} className="print-hidden inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"><Icon name="article" className="h-4 w-4" />Сохранить как PDF</button>;
}
