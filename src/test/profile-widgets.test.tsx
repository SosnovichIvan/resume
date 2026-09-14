import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { About } from "@/widgets/about/ui/About";
import { ContactDropdown } from "@/widgets/contact-dropdown/ui/ContactDropdown";
import { Header } from "@/widgets/header/ui/Header";
import { ThemeToggle } from "@/widgets/theme-toggle/ui/ThemeToggle";

vi.mock("next/image", () => ({
	default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
		const imageProps = { ...props };
		delete imageProps.fill;
		delete imageProps.priority;
		return createElement("img", imageProps);
	},
}));

describe("profile widgets", () => {
	it("renders the new positioning in the header", () => {
		render(<Header />);
		expect(screen.getByText("Соснович Иван")).toBeVisible();
		expect(screen.getByText("Senior Frontend Engineer / Team Lead · AI Engineering")).toBeVisible();
		expect(screen.queryByRole("link", { name: "Связаться" })).not.toBeInTheDocument();
		expect(screen.getByText(/Проектирую frontend-архитектуру/)).toBeVisible();
		expect(screen.queryByText("16.01.1987")).not.toBeInTheDocument();
		expect(screen.getByAltText("Фото Ивана Сосновича")).toBeVisible();
	});

	it("renders a transparent competence profile", () => {
		render(<About />);
		expect(screen.getByRole("heading", { name: "Архитектура продукта" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "Frontend-системы" })).toBeVisible();
		expect(screen.getByRole("heading", { name: "AI-assisted engineering" })).toBeVisible();
		expect(screen.getByText("AI tooling")).toBeVisible();
	});

	it("toggles and persists the theme", async () => {
		const user = userEvent.setup();
		render(<ThemeToggle />);
		const darkButton = await screen.findByRole("button", { name: "Включить тёмную тему" });
		await user.click(darkButton);
		expect(document.documentElement).toHaveClass("dark");
		expect(localStorage.getItem("theme")).toBe("dark");
		await user.click(screen.getByRole("button", { name: "Включить светлую тему" }));
		expect(document.documentElement).not.toHaveClass("dark");
	});

	it("supports bare theme controls and existing dark mode", async () => {
		document.documentElement.classList.add("dark");
		render(<ThemeToggle bare className="bare-theme" />);
		expect(await screen.findByRole("button", { name: "Включить светлую тему" })).toHaveClass("bare-theme");
	});

	it("opens contacts, copies a value, and closes outside", async () => {
		const user = userEvent.setup();
		const writeText = vi.spyOn(navigator.clipboard, "writeText");
		render(<ContactDropdown />);
		const trigger = screen.getByRole("button", { name: "Связаться" });
		await user.click(trigger);
		expect(trigger).toHaveAttribute("aria-expanded", "true");
		await user.click(screen.getByRole("button", { name: "Скопировать Email" }));
		expect(writeText).toHaveBeenCalledWith("isosnovich@yandex.ru");
		fireEvent.mouseDown(document.body);
		await waitFor(() => expect(screen.queryByText("isosnovich@yandex.ru")).not.toBeInTheDocument());
	});

	it("toggles bare contacts from the same trigger", async () => {
		const user = userEvent.setup();
		render(<ContactDropdown bare />);
		const trigger = screen.getByRole("button", { name: "Связаться" });
		await user.click(trigger);
		expect(screen.getByText("@ivanSVladimirovich")).toBeVisible();
		await user.click(trigger);
		expect(screen.queryByText("@ivanSVladimirovich")).not.toBeInTheDocument();
	});

	it("exposes contact links and restores focus on Escape", async () => {
 const user = userEvent.setup(); render(<ContactDropdown />);
 const trigger = screen.getByRole("button", { name: "Связаться" });
 await user.click(trigger);
 expect(screen.getByRole("link", { name: "isosnovich@yandex.ru" })).toHaveAttribute("href", "mailto:isosnovich@yandex.ru");
 expect(screen.getByRole("link", { name: "SosnovichIvan" })).toHaveAttribute("rel", "noopener noreferrer");
 await user.keyboard("{Tab}{Escape}"); expect(trigger).toHaveFocus(); expect(trigger).toHaveAttribute("aria-expanded", "false");
 });
});
