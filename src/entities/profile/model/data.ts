import data from "./data.json";

export interface ExperienceRole {
	role: string;
	/** Краткие технологии/навыки направления (видно при свёрнутом состоянии). */
	summary?: string;
	/** Бейджи технологий/направлений (рендерятся вместо summary есл есть). */
	skills?: string[];
	/** Развёрнутые навыки и достижения (открываются кнопкой «Раскрыть все»). */
	details?: string[];
}

export interface Profile {
 siteUrl: string;
 careerStartYear: number;
 hero: { title: string; summary: string; headline?: string; skills: string[]; results: { value: string; label: string }[] };
	name: string;
	position: string;
	location: string;
	birthDate: string; // формат "ДД.ММ.ГГГГ"
	/** Направления опыта и компетенции. */
	experienceBlock: {
		title: string;
		roles: ExperienceRole[];
	};
	contacts: { label: string; value: string; href: string; icon: string }[];
	highlights: string[];
	aiHighlights: string[];
}

export const profile: Profile = data as Profile;
