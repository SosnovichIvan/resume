export interface Education {
	title: string;
	org: string;
	year: string;
	kind: "education" | "course";
}

export const education: Education[] = [
	{
		title: "Информационные системы и технологии",
		org: "Московский технологический институт",
		year: "н. в.",
		kind: "education",
	},
	{
		title: "Мидл фронтенд-разработчик",
		org: "Яндекс Практикум",
		year: "2021",
		kind: "course",
	},
	{
		title: "Frontend Developer",
		org: "Elbrus Bootcamp",
		year: "2021",
		kind: "course",
	},
	{
		title: "Фронтенд-разработчик",
		org: "Яндекс Практикум",
		year: "2020",
		kind: "course",
	},
];
