interface CardProps {
	children: React.ReactNode;
	className?: string;
	hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
	return (
		<div
			className={`rounded-2xl border border-surface-border bg-white shadow-sm dark:border-slate-700 dark:bg-surface-card ${
				hover
					? "transition-colors duration-200 hover:border-brand-400 dark:hover:border-brand-500"
					: ""
			} ${className}`}
		>
			{children}
		</div>
	);
}
