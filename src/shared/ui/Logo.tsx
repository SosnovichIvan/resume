interface LogoProps {
	className?: string;
}

/**
 * Логотип на основе инициалов S·I·V.
 * Буквы не спешно увеличиваются и уменьшаются поочерёдно (эффект «лесенки» /
 * бегущей волны): каждая буква с небольшим сдвигом пульсирует по масштабу.
 * Цвет наследуется из контекста (currentColor). Анимация мягкая и
 * ненавязчивая; отключается при prefers-reduced-motion.
 */
export function Logo({ className = "h-6 w-16" }: LogoProps) {
	const letters: { ch: string; x: number; step: number }[] = [
		{ ch: "S", x: 8, step: 0 },
		{ ch: "I", x: 22, step: 1 },
		{ ch: "V", x: 36, step: 2 },
	];
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 44 16"
			fill="currentColor"
			className={className}
			aria-hidden="true"
		>
			{letters.map((l) => (
				<text
					key={l.ch}
					x={l.x}
					y="8.5"
					textAnchor="middle"
					dominantBaseline="middle"
					className={`logo-letter logo-letter-${l.step}`}
					fontSize="13"
					fontWeight="700"
					style={{ fontFamily: "inherit" }}
				>
					{l.ch}
				</text>
			))}
		</svg>
	);
}
