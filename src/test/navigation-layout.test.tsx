/* eslint-disable react/display-name, @typescript-eslint/no-unused-vars */
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement, forwardRef } from "react";
import { describe, expect, it, vi } from "vitest";
import RootLayout, { metadata } from "@/app/layout";
import { Logo } from "@/shared/ui/Logo";
import { HeaderActions } from "@/widgets/header-actions/ui/HeaderActions";
import { Navigation } from "@/widgets/navigation/ui/Navigation";

vi.mock("next/navigation", () => ({ usePathname: () => "/projects" }));

vi.mock("framer-motion", () => ({
	AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
	motion: {
		div: forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & Record<string, unknown>>(
			({ children, initial: _initial, animate: _animate, exit: _exit, transition: _transition, ...props }, ref) =>
				createElement("div", { ...props, ref }, children as React.ReactNode),
		),
		li: ({ children, initial: _initial, animate: _animate, transition: _transition, ...props }: React.LiHTMLAttributes<HTMLLIElement> & Record<string, unknown>) =>
			createElement("li", props, children),
	},
}));

describe("navigation and layout", () => {
	it("builds the root layout and exposes the updated metadata", () => {
		const layout = RootLayout({ children: <main>Content</main> });
		expect(layout.type).toBe("html");
		expect(metadata.title).toBe("Соснович Иван — Senior Frontend / Fullstack Engineer");
	});

	it("renders the animated logo and header actions", async () => {
		render(<><Logo className="brand-logo" /><HeaderActions /></>);
		expect(document.querySelector("svg.brand-logo")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Связаться" })).toBeVisible();
		expect(await screen.findByRole("button", { name: /включить .* тему/i })).toBeVisible();
	});

	it("opens and closes mobile navigation by link and Escape", async () => {
		const user = userEvent.setup();
		render(<Navigation />);
		const toggle = screen.getByRole("button", { name: "Открыть меню" });
		await user.click(toggle);
		expect(document.body.style.overflow).toBe("hidden");
		expect(screen.getByRole("button", { name: "Закрыть меню" })).toBeVisible();
		fireEvent.keyDown(document, { key: "Escape" });
		expect(screen.getByRole("button", { name: "Открыть меню" })).toBeVisible();
	});

	it("closes mobile navigation on an outside click and a link click", async () => {
		const user = userEvent.setup();
		render(<Navigation />);
		await user.click(screen.getByRole("button", { name: "Открыть меню" }));
		fireEvent.mouseDown(document.body);
		expect(screen.getByRole("button", { name: "Открыть меню" })).toBeVisible();
		await user.click(screen.getByRole("button", { name: "Открыть меню" }));
		const projectLinks = screen.getAllByRole("link", { name: "Проекты" });
		const mobileProjectLink = projectLinks[projectLinks.length - 1];
		mobileProjectLink.addEventListener("click", (event) => event.preventDefault());
		await user.click(mobileProjectLink);
		expect(screen.getByRole("button", { name: "Открыть меню" })).toBeVisible();
	});
});
