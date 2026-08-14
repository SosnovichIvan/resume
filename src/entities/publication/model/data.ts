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
		id: "habr-es-modules-microfrontends",
		title: "Монолит больше не приговор: строим быстрые и гибкие микрофронтенды на ES-модулях",
		description:
			"Практический разбор архитектуры микрофронтендов на ES-модулях: декомпозиция монолита, независимая сборка модулей и применение AI-инструментов в Platform V Kintsugi.",
		href: "https://habr.com/ru/companies/sberbank/articles/1067496/",
		source: "habr.com",
		gradient: "from-emerald-500 to-cyan-600",
	},
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
