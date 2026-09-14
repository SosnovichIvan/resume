import { test, expect } from "@playwright/test";

const routes = [
 ["/", "Соснович Иван"],
 ["/experience", "Опыт и образование"],
 ["/projects", "Коммерческие проекты"],
 ["/my-projects", "Личные проекты"],
 ["/publications", "Публикации"],
];

for (const [route, heading] of routes) {
 test(`${route}: readable and no horizontal overflow`, async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const response = await page.goto(route);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: heading, exact: true, level: 1 })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
 });
}

test("contacts have working destinations and dismiss with Escape", async ({ page }) => {
 await page.goto("/");
 const trigger = page.getByRole("button", { name: "Связаться", exact: true });
 await trigger.click();
 await expect(page.getByRole("link", { name: "isosnovich@yandex.ru", exact: true })).toHaveAttribute("href", "mailto:isosnovich@yandex.ru");
 await page.keyboard.press("Tab");
 await page.keyboard.press("Escape");
 await expect(trigger).toHaveAttribute("aria-expanded", "false");
 await expect(trigger).toBeFocused();
});

test("theme persists after reload", async ({ page }) => {
 await page.goto("/");
 const toggle = page.getByRole("button", { name: /Включить .* тему/ });
 await toggle.click();
 const dark = await page.locator("html").evaluate(el => el.classList.contains("dark"));
 await page.reload();
 await expect(page.locator("html")).toHaveClass(dark ? /dark/ : /^(?!.*dark).*$/);
});

test("navigation opens experience and returns home", async ({ page, isMobile }) => {
 await page.goto("/");
 if (isMobile) await page.getByRole("button", { name: "Открыть меню" }).click();
 await page.getByRole("link", { name: "Опыт", exact: true }).filter({ visible: true }).click();
 await expect(page).toHaveURL(/\/experience$/);
 await page.getByRole("link", { name: "На главную", exact: true }).click();
 await expect(page.getByRole("heading", { name: "Соснович Иван", exact: true })).toBeVisible();
});

test("resume and native details remain usable without JavaScript", async ({ browser }) => {
 const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
 const page = await context.newPage();
 await page.goto("http://127.0.0.1:3100/");
 await expect(page.getByRole("heading", { name: "Соснович Иван", exact: true })).toBeVisible();
 await expect(page.getByRole("link", { name: "Связаться по email" })).toBeVisible();
 await page.getByText("Подробнее: AI Engineering & Developer Automation", { exact: true }).press("Enter");
 await expect(page.getByText(/Проектирую агентные системы/)).toBeVisible();
 await context.close();
});


test("downloads the published resume PDF", async ({ page }) => {
 await page.goto("/");
 const link = page.getByRole("link", { name: "Скачать резюме PDF" });
 await expect(link).toBeVisible();
 const response = await page.request.get("/resume.pdf");
 expect(response.status()).toBe(200);
 expect(response.headers()["content-type"]).toContain("application/pdf");
 expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
 const downloadEvent = page.waitForEvent("download");
 await link.click();
 const download = await downloadEvent;
 expect(download.suggestedFilename()).toBe("Соснович Иван Владимирович.pdf");
 expect(await download.failure()).toBeNull();
});
