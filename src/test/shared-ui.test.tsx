import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BackLink } from "@/shared/ui/BackLink";
import { Badge } from "@/shared/ui/Badge";
import { Card } from "@/shared/ui/Card";
import { Icon } from "@/shared/ui/Icon";
import { SectionHeader } from "@/shared/ui/SectionHeader";
import { SkillBadge } from "@/shared/ui/SkillBadge";

describe("shared UI", () => {
	it("renders badge variants and skill badge", () => {
		const { rerender } = render(<Badge>Accent</Badge>);
		expect(screen.getByText("Accent")).toHaveClass("bg-brand-50");
		rerender(<Badge variant="muted">Muted</Badge>);
		expect(screen.getByText("Muted")).toHaveClass("bg-slate-100");
		rerender(<SkillBadge skill="TypeScript" />);
		expect(screen.getByText("TypeScript")).toBeVisible();
	});

	it("renders card hover styles conditionally", () => {
		const { rerender } = render(<Card className="custom">Card</Card>);
		expect(screen.getByText("Card")).toHaveClass("custom");
		rerender(<Card hover>Hover card</Card>);
		expect(screen.getByText("Hover card")).toHaveClass("hover:border-brand-400");
	});

	it("renders known icons and ignores unknown names", () => {
		const { container, rerender } = render(<Icon name="check" className="icon" />);
		expect(container.querySelector("svg")).toHaveClass("icon");
		rerender(<Icon name="missing" />);
		expect(container.querySelector("svg")).not.toBeInTheDocument();
	});

	it("renders section links and fallback labels", () => {
		const { rerender } = render(<SectionHeader icon="folder" title="Проекты" />);
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
		rerender(<SectionHeader icon="folder" title="Проекты" viewAllHref="/projects" />);
		expect(screen.getByRole("link")).toHaveAttribute("href", "/projects");
		expect(screen.getByText("Смотреть все")).toBeVisible();
	});

	it("renders the home navigation link", () => {
		render(<BackLink />);
		expect(screen.getByRole("link", { name: /на главную/i })).toHaveAttribute("href", "/");
	});
});
