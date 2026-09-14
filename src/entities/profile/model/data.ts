import data from "./data.json";

export interface CompetenceArea {
	title: string;
	level: string;
	description: string;
	skills: string[];
}

export interface ProfileProof {
	value: string;
	label: string;
}

export interface Profile {
	siteUrl: string;
	careerStartYear: number;
	headline: string;
	name: string;
	position: string;
	tagline: string;
	location: string;
	availability: string;
	contacts: { label: string; value: string; href: string; icon: string }[];
	coreSkills: string[];
	aiSkills: string[];
	proofs: ProfileProof[];
	competenceAreas: CompetenceArea[];
}

export const profile: Profile = data as Profile;
