import { Badge } from "./Badge";

interface SkillBadgeProps {
	skill: string;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
	return (
		<Badge variant="accent">
			<span className="inline-flex items-center gap-1.5">{skill}</span>
		</Badge>
	);
}
