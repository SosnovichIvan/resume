export type SkillLevel = "confident" | "worked";

/** Технологии, которыми владею уверенно (по заданию) */
const CONFIDENT_BASES = ["React", "TypeScript", "TS", "Axios", "Tailwind"];

export function skillLevelOf(skill: string): SkillLevel {
	const normalized = skill.toLowerCase();
	return CONFIDENT_BASES.some((base) => normalized.includes(base.toLowerCase()))
		? "confident"
		: "worked";
}

export const skillLevelLabel: Record<SkillLevel, string> = {
	confident: "Уверенный пользователь",
	worked: "Работал",
};
