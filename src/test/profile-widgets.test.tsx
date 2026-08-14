import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { About } from "@/widgets/about/ui/About";
import { ContactDropdown } from "@/widgets/contact-dropdown/ui/ContactDropdown";
import { Header } from "@/widgets/header/ui/Header";
import { ThemeToggle } from "@/widgets/theme-toggle/ui/ThemeToggle";

vi.mock("next/image", () => ({
	default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => createElement("img", props),
}));

describe("profile widgets", () => {
	it("renders the new positioning in the header", () => {
		render(<Header />);
		expect(screen.getByText("Соснович Иван")).toBeVisible();
		expect(
			screen.getByText("Senior Frontend / Fullstack Engineer · AI Engineering & Developer Automation"),
		).toBeVisible();
		expect(screen.getByAltText("Фото Ивана Сосновича")).toBeVisible();
	});

	it("expands and collapses role details", async () => {
		const user = userEvent.setup();
		render(<About />);
		const buttons = screen.getAllByRole("button", { name: "Раскрыть все" });
		await user.click(buttons[0]);
		expect(screen.getByText(/Проектирую агентные системы/)).toBeVisible();
		await user.click(screen.getByRole("button", { name: "Свернуть" }));
		expect(screen.queryByText(/Проектирую агентные системы/)).not.toBeInTheDocument();
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

	it("runs contact actions for email, phone, Telegram, and GitHub", async () => {
		const user = userEvent.setup();
		const open = vi.spyOn(window, "open").mockImplementation(() => null);
		const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
		render(<ContactDropdown />);
		await user.click(screen.getByRole("button", { name: "Связаться" }));
		await user.click(screen.getByRole("button", { name: "isosnovich@yandex.ru" }));
		await user.click(screen.getByRole("button", { name: "+7 (999) 591-00-23" }));
		await user.click(screen.getByRole("button", { name: "@ivanSVladimirovich" }));
		await user.click(screen.getByRole("button", { name: "SosnovichIvan" }));
		expect(open).toHaveBeenNthCalledWith(1, "https://t.me/ivanSVladimirovich", "_blank");
		expect(open).toHaveBeenNthCalledWith(2, "https://github.com/SosnovichIvan", "_blank");
		consoleError.mockRestore();
	});
});
