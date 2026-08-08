"use client";

import { useState } from "react";
import { profile } from "@/entities/profile/model/data";
import { experienceLabel } from "@/shared/lib/experience";
import { Card, Icon } from "@/shared/ui";

export function About() {
	const [expanded, setExpanded] = useState(false);

	return (
		<Card className="p-6">
			<h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
				<Icon name="user" className="h-5 w-5 text-brand-600 dark:text-brand-300" />
				{profile.experienceBlock.title}
			</h2>

			<div className="mb-4 space-y-2">
				{profile.experienceBlock.roles.map((r) => (
					<div
						key={r.role}
						className="flex flex-wrap items-center gap-x-3 gap-y-1"
					>
						<span
							className={
								"inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold " +
								(r.startDate
									? "bg-gradient-to-r from-indigo-600 to-pink-500 text-white"
									: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300")
							}
						>
							{experienceLabel(r.minYears, r.startDate)}
						</span>
						<span className="text-sm font-medium text-ink-600 dark:text-slate-300">
							{r.role}
						</span>
					</div>
				))}
			</div>

			<p className="text-sm leading-relaxed text-ink-600 dark:text-slate-300">
				{profile.about}
			</p>
			{expanded && (
				<div className="mt-4 space-y-3 border-t border-surface-border pt-4 dark:border-slate-700">
					{profile.aboutFull.map((para) => (
						<p
							key={para}
							className="text-sm leading-relaxed text-ink-600 dark:text-slate-300"
						>
							{para}
						</p>
					))}
				</div>
			)}
			<div className="mt-4 flex flex-wrap items-center gap-4">
				<div className="flex items-center gap-2 text-sm text-ink-500 dark:text-slate-400">
					<span className="h-2 w-2 animate-pulse rounded-full bg-success-500" />
					Открыт к предложениям
				</div>
				<button
					type="button"
					onClick={() => setExpanded((v) => !v)}
					className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-950"
				>
					<Icon
						name={expanded ? "chevron-up" : "chevron-down"}
						className="h-4 w-4"
					/>
					{expanded ? "Свернуть" : "Подробнее"}
				</button>
			</div>
		</Card>
	);
}
