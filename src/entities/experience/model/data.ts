import data from "./data.json";

export interface ExperienceProject {
	name: string;
	points: string[];
}

export interface Experience {
	pdfAchievementIndices?: number[];
	id: string;
	company: string;
	position: string;
	period: string;
	duration: string;
	summary: string;
	achievements: string[];
	stack: string[];
	keyResults: string[];
}

export const experiences: Experience[] = data as Experience[];
