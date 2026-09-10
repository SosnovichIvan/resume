interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	hover?: boolean;
}

export function Card({ children, className = "", hover = false, ...props }: CardProps) {
	return (
		<div
			{...props}
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
