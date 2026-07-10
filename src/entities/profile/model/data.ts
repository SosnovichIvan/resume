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
		"Senior Frontend Developer с опытом 5+ лет. Проектирую архитектуру приложений, перевожу проекты на FSD, добиваюсь покрытия тестами 90%+ и стабильной работы высоконагруженных интерфейсов.",
	aboutFull: [
		"Квалифицированный специалист с обширным портфелем успешных проектов в сфере современного фронтенд- и бэкенд-программирования.",
		"Самостоятельно проектирую архитектуру приложений, предлагаю эффективные стратегии достижения бизнес-задач и улучшаю качество конечного продукта.",
		"Разрабатываю сложные продукты: от архитектуры и кода до тестирования и деплоя. Активно участвую в груминге, планировании спринтов и развитии команды.",
		"Постоянно развиваю квалификацию и расширяю профессиональный кругозор.",
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
	highlights: ["Опыт 5+ лет", "Senior", "FSD-архитектура", "Удалённо"],
};
