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
	default: ({ priority: _priority, unoptimized: _unoptimized, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; unoptimized?: boolean }) => createElement("img", props),
}));



describe("portfolio pages", () => {
	it("renders the home page sections", () => {
		render(<HomePage />);
		expect(screen.getByRole("heading", { name: "Соснович Иван" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Опыт работы" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Коммерческие проекты" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Личные проекты" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Публикации" })).toBeVisible();
	});

	it.each([
		["experience", <ExperiencePage />, "Опыт и образование"],
		["projects", <ProjectsPage />, "Коммерческие проекты"],
		["personal projects", <MyProjectsPage />, "Личные проекты"],
		["publications", <PublicationsPage />, "Публикации"],
	])("renders the %s page", (_name, page, heading) => {
		render(page);
		expect(screen.getByRole("heading", { name: heading, level: 1 })).toBeVisible();
	});
});
