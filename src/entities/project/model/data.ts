import data from "./data.json";

export interface Project {
	pdfDetailIndices?: number[];
	id: string;
	name: string;
	company: string;
	description: string;
	details: string[];
	stack: string[];
	repo?: string;
	host?: string;
	internal: boolean;
	experienceId?: string;
	categories: ProjectCategory[];
	outcomes: string[];
}

export type ProjectCategory = "Архитектура" | "Производительность" | "Team Lead" | "AI tooling" | "AI-assisted fullstack";

export const projects: Project[] = data as Project[];
