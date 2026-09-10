/* eslint-disable @typescript-eslint/no-unused-vars, react/jsx-key */
import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import ExperiencePage from "@/app/experience/page";
import HomePage from "@/app/page";
import MyProjectsPage from "@/app/my-projects/page";
import PersonalProjectPage, { generateMetadata, generateStaticParams } from "@/app/my-projects/[slug]/page";
import ProjectsPage from "@/app/projects/page";
import PublicationsPage from "@/app/publications/page";

vi.mock("next/image", () => ({
	default: ({ fill: _fill, priority: _priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => createElement("img", props),
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
		expect(screen.getByRole("heading", { name: "Где я создаю наибольшую ценность" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Ключевые кейсы" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Текущая роль" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Пишу о frontend-архитектуре" })).toBeVisible();
	});

	it.each([
		["experience", <ExperiencePage />, "Опыт и образование"],
		["projects", <ProjectsPage />, "Коммерческие кейсы"],
		["personal projects", <MyProjectsPage />, "Личные проекты"],
		["publications", <PublicationsPage />, "Публикации"],
	])("renders the %s page", (_name, page, heading) => {
		render(page);
		expect(screen.getByRole("heading", { name: heading, level: 1 })).toBeVisible();
	});

	it("renders a personal-project detail page with the screenshot carousel", async () => {
		expect(generateStaticParams()).toContainEqual({ slug: "arhdesign" });
		expect(await generateMetadata({ params: Promise.resolve({ slug: "arhdesign" }) })).toMatchObject({ title: "arhDesign — Соснович Иван" });
		expect(await generateMetadata({ params: Promise.resolve({ slug: "missing" }) })).toEqual({});
		render(await PersonalProjectPage({ params: Promise.resolve({ slug: "arhdesign" }) }));
		expect(screen.getByRole("heading", { name: "arhDesign", level: 1 })).toBeVisible();
		expect(screen.getByRole("region", { name: "Галерея: arhDesign" })).toBeVisible();
		expect(screen.getByText("01 / 05")).toBeVisible();
		expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
			"href",
			"https://github.com/SosnovichIvan/arhdesign",
		);
	});

	it("shows benchmark statistics instead of a gallery for a repository-only project", async () => {
		render(await PersonalProjectPage({ params: Promise.resolve({ slug: "agent-skills-lab" }) }));
		expect(screen.getByRole("heading", { name: "Agent Skills Lab", level: 1 })).toBeVisible();
		expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
			"href",
			"https://github.com/SosnovichIvan/agent-skills-lab",
		);
		expect(screen.queryByRole("link", { name: "Открыть сайт" })).not.toBeInTheDocument();
		expect(screen.queryByRole("heading", { name: "Экраны проекта" })).not.toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Skills с подтверждённой пользой" })).toBeVisible();
		expect(screen.getByRole("link", { name: "Методика и README" })).toHaveAttribute("href", "https://github.com/SosnovichIvan/agent-skills-lab/blob/main/skills/execution-state/README.md");
		expect(screen.getByRole("table", { name: "Статистика Execution State" })).toBeVisible();
		expect(screen.getByText("0 против 2 296 689")).toBeVisible();
		expect(screen.queryByRole("button", { name: "Предыдущий skill" })).not.toBeInTheDocument();
		expect(screen.getAllByText("trade-off").length).toBeGreaterThan(0);
	});
});
