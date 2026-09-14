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
}

export const projects: Project[] = data as Project[];
