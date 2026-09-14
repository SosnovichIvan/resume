import data from "./data.json";

export interface PersonalProject {
	slug: string;
	name: string;
	description: string;
	architecture: string[];
	technologies: string[];
	repositoryUrl: string;
	websiteUrl: string | null;
	logo: string;
	screenshots: Array<{ src: string; alt: string; caption: string; fit?: "cover" | "contain" }>;
	role: string;
	status: string;
	featuredResult: string;
	architectureFlow: string[];
	contribution: Array<{ title: string; description: string }>;
	creationProcess: string;
	benefitSkills?: Array<{
		name: string;
		description: string;
		readmeUrl: string;
		highlights?: Array<{ value: string; label: string; tone?: "positive" | "tradeoff" }>;
		statistics?: { title: string; caption?: string; rows: Array<{ metric: string; result: string }> };
	}>;
}

export const personalProjects: PersonalProject[] = data as PersonalProject[];

export function getPersonalProject(slug: string): PersonalProject | undefined {
 return personalProjects.find((project) => project.slug === slug);
}
