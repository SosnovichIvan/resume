export interface Publication {
	id: string;
	title: string;
	description: string;
	href: string;
	source: string;
	gradient: string;
}

export const publications: Publication[] = [
	{
		id: "habr-fsd-msd",
		title: "Был FSD — стал MSD: как мы допилили методологию FSD, чтобы поудобнее делить монолит на модули",
		description:
			"Статья в блоге Сбербанка на Хабре о том, как эволюционировала методология FSD для более удобного разделения монолита на модули.",
		href: "https://habr.com/ru/companies/sberbank/articles/959400/",
		source: "habr.com",
		gradient: "from-blue-500 to-purple-600",
	},
];
