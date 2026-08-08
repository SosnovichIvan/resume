import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/widgets/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/entities/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Основной брендовый акцент (индиго)
				brand: {
					50: "#eef2ff",
					100: "#e0e7ff",
					300: "#a5b4fc",
					400: "#818cf8",
					500: "#6366f1",
					600: "#4f46e5",
					700: "#4338ca",
					900: "#312e81",
					950: "#1e1b4b",
				},
				// Вторичный акцент градиентов (розовый)
				accent: {
					50: "#fdf2f8",
					300: "#f9a8d4",
					400: "#f472b6",
					500: "#ec4899",
					600: "#db2777",
					950: "#500724",
				},
				// Поверхности и границы
				surface: {
					DEFAULT: "#ffffff",
					light: "#f8fafc", // фон страницы (светлая тема)
					dark: "#0f172a", // фон страницы (тёмная тема)
					card: "#1e293b", // фон карточек (тёмная тема)
					border: "#e2e8f0", // границы (светлая тема)
					"border-dark": "#334155", // границы (тёмная тема)
					track: "#f1f5f9", // трек прогресс-баров (светлая тема)
					"track-dark": "#334155", // трек прогресс-баров (тёмная тема)
				},
				// Нейтральный текст
				ink: {
					300: "#cbd5e1",
					400: "#94a3b8",
					500: "#64748b",
					600: "#475569",
					900: "#0f172a",
				},
				// Индикаторы успеха
				success: {
					400: "#4ade80",
					500: "#22c55e",
					600: "#16a34a",
				},
			},
		},
	},
	plugins: [],
};
export default config;
