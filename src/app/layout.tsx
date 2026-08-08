import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/widgets/navigation/ui/Navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
	title: "Соснович Иван — Fullstack AI Engineer (React, Next.js, NestJS, Go, LLM)",
	description:
		"Резюме и портфолио: Fullstack AI Engineer, 5+ лет опыта, React, TypeScript, Next.js, NestJS, Go, FSD, ИИ-инжиниринг (скилы, субагенты, MCP-серверы).",
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
				<Navigation />
				{children}
			</body>
		</html>
	);
}
