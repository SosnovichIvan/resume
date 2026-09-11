import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { Navigation } from "@/widgets/navigation/ui/Navigation";
import "./globals.css";

const sans = Manrope({
	subsets: ["cyrillic", "latin"],
	variable: "--font-sans",
	display: "swap",
});

const mono = IBM_Plex_Mono({
	subsets: ["cyrillic", "latin"],
	weight: ["400", "500", "600"],
	variable: "--font-mono",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Соснович Иван — Senior Frontend Engineer / Team Lead · AI Engineering",
	description:
		"Senior Frontend Engineer и Team Lead: React, TypeScript, frontend-архитектура, производительность и AI-assisted разработка.",
};

const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="ru" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body>
				<Navigation />
				{children}
			</body>
		</html>
	);
}
