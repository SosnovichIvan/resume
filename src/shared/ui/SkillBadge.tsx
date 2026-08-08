import { Badge } from "./Badge";
import { skillLevelLabel, skillLevelOf } from "@/shared/lib/skillLevel";

interface SkillBadgeProps {
	skill: string;
	showLabel?: boolean;
}

export function SkillBadge({ skill, showLabel = false }: SkillBadgeProps) {
	const level = skillLevelOf(skill);
	const dotClass =
		level === "confident"
			? "bg-success-500"
			: "bg-slate-400 dark:bg-slate-500";
	return (
		<span
			title={skillLevelLabel[level]}
			className="inline-flex items-center gap-1.5"
		>
			<Badge variant="muted">
				<span className="inline-flex items-center gap-1.5">
					<span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
					{skill}
				</span>
			</Badge>
			{showLabel && (
				<span className="text-xs text-slate-400 dark:text-slate-500">
					{skillLevelLabel[level]}
				</span>
			)}
		</span>
	);
}
