import data from "./data.json";

export interface PersonalProject {
	id: string;
	name: string;
	description: string;
	details: string[];
	stack: string[];
	repo: string;
	builtByAI: boolean;
}

export const personalProjects: PersonalProject[] = data as PersonalProject[];
