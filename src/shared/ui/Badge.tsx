interface BadgeProps {
	children: React.ReactNode;
	variant?: "accent" | "muted";
}

export function Badge({ children, variant = "accent" }: BadgeProps) {
	const styles =
		variant === "accent"
			? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300"
			: "bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
	return (
		<span
			className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${styles}`}
		>
			{children}
		</span>
	);
}
