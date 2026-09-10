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

export const publications: Publication[] = [
	{
		id: "habr-es-modules-microfrontends",
		title: "Монолит больше не приговор: строим быстрые и гибкие микрофронтенды на ES-модулях",
		description:
			"Практический разбор архитектуры микрофронтендов на ES-модулях: декомпозиция монолита, независимая сборка модулей и применение AI-инструментов в Platform V Kintsugi.",
		href: "https://habr.com/ru/companies/sberbank/articles/1067496/",
		source: "habr.com",
		gradient: "from-emerald-500 to-cyan-600",
		date: "10 августа 2026",
		readTime: "11 минут",
		topic: "Microfrontends · ES Modules",
		takeaway: "Как выделять независимые frontend-модули без дублирования приложения и жёсткой связи со сборщиком.",
	},
	{
		id: "habr-fsd-msd",
		title: "Был FSD — стал MSD: как мы допилили методологию FSD, чтобы поудобнее делить монолит на модули",
		description:
			"Статья в блоге Сбербанка на Хабре о том, как эволюционировала методология FSD для более удобного разделения монолита на модули.",
		href: "https://habr.com/ru/companies/sberbank/articles/959400/",
		source: "habr.com",
		gradient: "from-blue-500 to-purple-600",
		date: "27 октября 2025",
		readTime: "9 минут",
		topic: "Frontend Architecture · FSD",
		takeaway: "Как усилить границы бизнес-модулей и упростить отделение частей frontend-монолита.",
	},
];
