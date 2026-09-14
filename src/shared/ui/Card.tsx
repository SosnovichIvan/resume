interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	hover?: boolean;
}

export function Card({ children, className = "", hover = false, ...props }: CardProps) {
	return (
		<div
			{...props}
			className={`rounded-[1.25rem] border border-surface-border bg-[#fffdf9] shadow-[0_1px_0_rgba(15,23,42,0.04)] dark:border-surface-border-dark dark:bg-surface-card ${
				hover
					? "transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent-400 hover:shadow-[0_18px_50px_rgba(62,23,15,0.08)] dark:hover:border-brand-500 dark:hover:shadow-[0_18px_55px_rgba(0,0,0,0.24)]"
					: ""
			} ${className}`}
		>
			{children}
		</div>
	);
}
