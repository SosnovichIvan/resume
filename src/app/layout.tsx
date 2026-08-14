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
				<Navigation />
				{children}
			</body>
		</html>
	);
}
