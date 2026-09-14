import type { Metadata } from "next";
import { Navigation } from "@/widgets/navigation/ui/Navigation";
import "./globals.css";

export const metadata: Metadata = {
	title: "Соснович Иван — Senior Frontend / Fullstack Engineer",
	description:
		"Senior Frontend / Fullstack Engineer: 5+ лет опыта, React, TypeScript, Next.js, NestJS и Go. AI Engineering, MCP и автоматизация разработки.",
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
			<body>
				<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3 focus:text-slate-900">К содержимому</a>
				<Navigation />
				<main id="main-content" tabIndex={-1}>{children}</main>
			</body>
		</html>
	);
}
