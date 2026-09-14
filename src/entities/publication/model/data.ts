import data from "./data.json";

export interface Publication {
	id: string;
	title: string;
	description: string;
	href: string;
	source: string;
	gradient: string;
}

export const publications: Publication[] = data as Publication[];
