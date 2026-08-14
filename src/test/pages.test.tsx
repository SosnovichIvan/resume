/* eslint-disable @typescript-eslint/no-unused-vars, react/jsx-key */
import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import ExperiencePage from "@/app/experience/page";
import HomePage from "@/app/page";
import MyProjectsPage from "@/app/my-projects/page";
import ProjectsPage from "@/app/projects/page";
import PublicationsPage from "@/app/publications/page";

vi.mock("next/image", () => ({
	default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => createElement("img", props),
}));

vi.mock("framer-motion", () => ({
	AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
	motion: {
		div: ({ children, initial: _initial, animate: _animate, transition: _transition, ...props }: React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>) =>
			createElement("div", props, children),
		section: ({ children, initial: _initial, whileInView: _whileInView, viewport: _viewport, transition: _transition, ...props }: React.HTMLAttributes<HTMLElement> & Record<string, unknown>) =>
			createElement("section", props, children),
		li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) =>
			createElement("li", props, children),
	},
}));

describe("portfolio pages", () => {
	it("renders the home page sections", () => {
		render(<HomePage />);
		expect(screen.getByRole("heading", { name: "Соснович Иван" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Опыт работы" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Проекты" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Свои проекты" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Публикации" })).toBeVisible();
	});

	it.each([
		["experience", <ExperiencePage />, "Опыт и образование"],
		["projects", <ProjectsPage />, "Проекты"],
		["personal projects", <MyProjectsPage />, "Свои проекты"],
		["publications", <PublicationsPage />, "Публикации"],
	])("renders the %s page", (_name, page, heading) => {
		render(page);
		expect(screen.getByRole("heading", { name: heading, level: 1 })).toBeVisible();
	});
});
