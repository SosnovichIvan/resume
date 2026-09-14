import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { experiences } from "@/entities/experience/model/data";
import { ExperienceTimeline } from "@/entities/experience/ui/ExperienceTimeline";
import { projects } from "@/entities/project/model/data";
import { ProjectCatalog } from "@/entities/project/ui/ProjectCatalog";
import { PrintResumeButton } from "@/shared/ui/PrintResumeButton";
import { ProjectCarousel } from "@/widgets/project-carousel/ui/ProjectCarousel";
import { ProjectSkillCarousel } from "@/widgets/project-skill-carousel/ui/ProjectSkillCarousel";

vi.mock("next/image", () => ({
	default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
		const imageProps = { ...props };
		delete imageProps.fill;
		delete imageProps.priority;
		return createElement("img", imageProps);
	},
}));

afterEach(() => window.history.replaceState({}, "", "/"));

describe("portfolio interactions", () => {
	it("filters and expands commercial cases", async () => {
		const user = userEvent.setup();
		render(<ProjectCatalog projects={projects} />);
		await user.click(screen.getByRole("button", { name: "AI-assisted fullstack" }));
		expect(screen.getByRole("heading", { name: "Криптотрейдинг-платформа" })).toBeVisible();
		expect(screen.queryByRole("heading", { name: "Kintsugi" })).not.toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Моя роль и детали" }));
		expect(screen.getByText(/Спроектировал взаимодействие React-клиента/)).toBeVisible();
		await user.click(screen.getByRole("button", { name: "Скрыть детали" }));
		expect(screen.queryByText(/Спроектировал взаимодействие React-клиента/)).not.toBeInTheDocument();
		await user.click(screen.getByRole("button", { name: "Все" }));
		expect(screen.getByRole("heading", { name: "Kintsugi" })).toBeVisible();
	});

	it("expands and collapses timeline achievements", async () => {
		const user = userEvent.setup();
		render(<ExperienceTimeline experiences={experiences} />);
		await user.click(screen.getByRole("button", { name: "Свернуть" }));
		expect(screen.getAllByRole("button", { name: "Показать достижения" })).toHaveLength(experiences.length);
		await user.click(screen.getAllByRole("button", { name: "Показать достижения" })[1]);
		expect(screen.getByText(/Спроектировал взаимодействие React-клиента/)).toBeVisible();
	});

	it("navigates the screenshot gallery and closes its lightbox", async () => {
		const user = userEvent.setup();
		const images = [
			{ src: "/one.png", alt: "Первый экран", caption: "Первый" },
			{ src: "/two.png", alt: "Второй экран", caption: "Второй", fit: "contain" as const },
		];
		render(<ProjectCarousel images={images} title="Demo" />);
		const region = screen.getByRole("region", { name: "Галерея: Demo" });
		fireEvent.keyDown(region, { key: "ArrowRight" });
		expect(screen.getByText("02 / 02")).toBeVisible();
		fireEvent.keyDown(region, { key: "Home" });
		fireEvent.keyDown(region, { key: "End" });
		fireEvent.keyDown(region, { key: "ArrowLeft" });
		await user.click(screen.getByRole("button", { name: "Следующее изображение" }));
		await user.click(screen.getByRole("button", { name: "Предыдущее изображение" }));
		await user.click(screen.getByRole("button", { name: /Показать кадр 2/ }));
		const opener = screen.getByRole("button", { name: /Открыть изображение 2/ });
		fireEvent.pointerDown(opener, { clientX: 200 });
		fireEvent.pointerUp(opener, { clientX: 100 });
		fireEvent.pointerDown(opener, { clientX: 100 });
		fireEvent.pointerUp(opener, { clientX: 100 });
		await user.click(opener);
		expect(screen.getByRole("dialog", { name: /Полноэкранный просмотр/ })).toBeVisible();
		fireEvent.keyDown(document, { key: "Escape" });
		await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
	});

	it("navigates between multiple benefit skills", async () => {
		const user = userEvent.setup();
		const skills = ["One", "Two"].map((name, index) => ({ name, description: `${name} description`, readmeUrl: `https://example.com/${name}`, highlights: [{ value: `−${index + 1}0%`, label: "total tokens" }], statistics: { title: name, caption: "2 задачи", rows: [{ metric: "Output tokens", result: "−5%" }] } }));
		render(<ProjectSkillCarousel skills={skills} projectName="Lab" />);
		await user.click(screen.getByRole("button", { name: "Следующий skill" }));
		expect(screen.getByRole("heading", { name: "Two" })).toBeVisible();
		expect(screen.getByRole("group", { name: "Главные достижения Two" })).toHaveTextContent("−20%");
		await user.click(screen.getByRole("button", { name: "Предыдущий skill" }));
		expect(screen.getByRole("heading", { name: "One" })).toBeVisible();
		expect(screen.getByRole("group", { name: "Главные достижения One" })).toHaveTextContent("−10%");
	});

	it("opens print flow from a direct link and button", async () => {
		const print = vi.spyOn(window, "print").mockImplementation(() => undefined);
		window.history.replaceState({}, "", "/experience#print");
		const user = userEvent.setup();
		render(<PrintResumeButton />);
		await waitFor(() => expect(print).toHaveBeenCalled());
		await user.click(screen.getByRole("button", { name: "Сохранить как PDF" }));
		expect(print).toHaveBeenCalledTimes(2);
	});
});
