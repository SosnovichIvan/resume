import data from "./data.json";

export interface Education {
	title: string;
	org: string;
	year: string;
	kind: "education" | "course";
}

export const education: Education[] = data as Education[];
