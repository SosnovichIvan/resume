import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

vi.mock("next/font/google", () => ({
	IBM_Plex_Mono: () => ({ variable: "font-mono" }),
	Manrope: () => ({ variable: "font-sans" }),
}));

afterEach(() => {
	cleanup();
	document.documentElement.className = "";
	localStorage.clear();
	vi.restoreAllMocks();
});

Object.defineProperty(navigator, "clipboard", {
	configurable: true,
	value: { writeText: vi.fn().mockResolvedValue(undefined) },
});
