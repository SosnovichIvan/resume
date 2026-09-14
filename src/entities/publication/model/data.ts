import data from "./data.json";

export interface Publication {
	id: string;
	title: string;
	description: string;
	href: string;
	source: string;
	gradient: string;
	date: string;
	readTime: string;
	topic: string;
	takeaway: string;
}

export const publications: Publication[] = data as Publication[];
