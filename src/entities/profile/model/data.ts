export interface Profile {
	name: string;
	position: string;
	location: string;
	about: string;
	aboutFull: string[];
	contacts: { label: string; value: string; href: string; icon: string }[];
	highlights: string[];
}

export const profile: Profile = {
	name: "Соснович Иван",
	position: "Senior Frontend Developer — React, Next.js, NestJS",
	location: "Красногорск (Московская область) · удалённо",
	about:
		"Senior Frontend Developer с опытом 5+ лет. Проектирую архитектуру приложений на FSD, добиваюсь покрытия тестами 90%+ и стабильной работы высоконагруженных интерфейсов. Активно использую ИИ-инструменты для написания кода, ревью, рефакторинга и анализа кодовой базы.",
	aboutFull: [
		"Проектирую архитектуру фронтенд-приложений с нуля, перевожу существующие проекты на FSD, формирую контракты API и обеспечиваю покрытие тестами 90%+.",
		"Активно применяю ИИ-ассистентов (GigaCode, Copilot, ChatGPT) для написания кода, код-ревью, рефакторинга, генерации тестов и анализа узких мест в кодовой базе.",
		"Разрабатываю сложные продукты: от архитектуры и кода до тестирования и деплоя. Участвую в груминге, планировании спринтов и развитии команды.",
		"Постоянно изучаю новые технологии и инструменты, расширяю профессиональный кругозор.",
	],
	contacts: [
		{
			label: "Email",
			value: "isosnovich@yandex.ru",
			href: "mailto:isosnovich@yandex.ru",
			icon: "mail",
		},
		{
			label: "Телефон",
			value: "+7 (999) 591-00-23",
			href: "tel:+79995910023",
			icon: "phone",
		},
		{
			label: "Telegram",
			value: "@ivanSVladimirovich",
			href: "https://t.me/ivanSVladimirovich",
			icon: "telegram",
		},
		{
			label: "GitHub",
			value: "SosnovichIvan",
			href: "https://github.com/SosnovichIvan",
			icon: "github",
		},
	],
	highlights: ["Golang", "FSD", "React", "Nest", "Next", "Uplot", "ChartJs", "RestAPI", "TypeScript"],
};
