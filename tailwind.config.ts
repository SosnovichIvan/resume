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
			fontFamily: {
				sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
				mono: ["var(--font-mono)", "ui-monospace", "monospace"],
			},
			colors: {
				// Graphite + mint: инженерная тёмная тема и тёплая светлая тема.
				brand: {
					50: "#ecfdf8",
					100: "#d1faed",
					200: "#a8f2dc",
					300: "#72e5ca",
					400: "#4dd6b9",
					500: "#2bc3a5",
					600: "#117766",
					700: "#0d5f52",
					800: "#0d4f46",
					900: "#0c4139",
					950: "#062b26",
				},
				// Тёплый editorial-акцент светлой темы.
				accent: {
					50: "#fff5ef",
					100: "#fee8dc",
					300: "#efa17e",
					400: "#e17a50",
					500: "#ca6039",
					600: "#ad482b",
					950: "#3e170f",
				},
				// Поверхности и границы
				surface: {
					DEFAULT: "#ffffff",
					light: "#f3efe7",
					dark: "#0b1014",
					card: "#11181d",
					border: "#d9d3c8",
					"border-dark": "#263138",
					track: "#e8e2d8",
					"track-dark": "#1d272d",
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
