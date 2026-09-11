interface LogoProps {
	className?: string;
}

/** Монограмма IS: архитектурная схема собирается из линий и узлов. */
export function Logo({ className = "h-8 w-14" }: LogoProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 56 28"
			fill="none"
			className={`logo-mark ${className}`}
			aria-hidden="true"
		>
			<path className="logo-line logo-line-i" d="M7 5h15M14.5 5v18M7 23h15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
			<path className="logo-line logo-line-s" d="M49 5H32v9h17v9H32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
			<g className="logo-nodes" fill="currentColor">
				<circle cx="14.5" cy="14" r="2.5" />
				<circle cx="49" cy="5" r="2.5" />
				<circle className="logo-node-active" cx="32" cy="14" r="2.5" />
				<circle cx="49" cy="23" r="2.5" />
			</g>
		</svg>
	);
}
