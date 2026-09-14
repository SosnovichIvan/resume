/* eslint-disable @typescript-eslint/no-unused-vars */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { About } from "@/widgets/about/ui/About";
import { ContactDropdown } from "@/widgets/contact-dropdown/ui/ContactDropdown";
import { Header } from "@/widgets/header/ui/Header";
import { ThemeToggle } from "@/widgets/theme-toggle/ui/ThemeToggle";

vi.mock("next/image", () => ({
	default: ({ priority: _priority, unoptimized: _unoptimized, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; unoptimized?: boolean }) => createElement("img", props),
}));

describe("profile widgets", () => {
	it("renders the new positioning in the header", () => {
		render(<Header />);
		expect(screen.getByText("Соснович Иван")).toBeVisible();
		expect(
			screen.getByText("Senior Frontend / Fullstack Engineer"),
		).toBeVisible();
		expect(screen.getByAltText("Фото Ивана Сосновича")).toBeVisible();
	});

	it("provides native disclosure for role details", () => {
  render(<About />);
  const summary = screen.getByText("Подробнее: AI Engineering & Developer Automation");
  expect(summary.tagName).toBe("SUMMARY");
  expect(summary.parentElement?.tagName).toBe("DETAILS");
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

 it("exposes real contact links and closes with Escape", async () => {
  const user = userEvent.setup();
  render(<ContactDropdown />);
  const trigger = screen.getByRole("button", { name: "Связаться" });
  await user.click(trigger);
  expect(screen.getByRole("link", { name: "isosnovich@yandex.ru" })).toHaveAttribute("href", "mailto:isosnovich@yandex.ru");
  expect(screen.getByRole("link", { name: "+7 (999) 591-00-23" })).toHaveAttribute("href", "tel:+79995910023");
  expect(screen.getByRole("link", { name: "@ivanSVladimirovich" })).toHaveAttribute("href", "https://t.me/ivanSVladimirovich");
  expect(screen.getByRole("link", { name: "SosnovichIvan" })).toHaveAttribute("href", "https://github.com/SosnovichIvan");
  await user.tab();
  await user.keyboard("{Escape}");
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(trigger).toHaveFocus();
 });
 it("announces clipboard failure", async () => {
  const user = userEvent.setup();
  vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("Denied"));
  render(<ContactDropdown />);
  await user.click(screen.getByRole("button", { name: "Связаться" }));
  await user.click(screen.getByRole("button", { name: "Скопировать Email" }));
  expect(screen.getByRole("status")).toHaveTextContent("Не удалось скопировать");
 });
});
