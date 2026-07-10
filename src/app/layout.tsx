import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AIAssistant } from "@/widgets/ai-assistant/ui/AIAssistant";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
	title: "Соснович Иван — Senior Frontend Developer (React, Next.js, NestJS)",
	description:
		"Резюме и портфолио: Senior Frontend Developer, 5+ лет опыта, React, TypeScript, Next.js, NestJS, FSD.",
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
		<html lang="ru" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body className={inter.className}>
				{children}
				<AIAssistant />
			</body>
		</html>
	);
}
