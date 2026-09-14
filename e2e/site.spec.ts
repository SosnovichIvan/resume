import { test, expect } from "@playwright/test";

const routes = [
 ["/", "Делаю сложные интерфейсы быстрее, а разработку — предсказуемее."],
 ["/experience", "Опыт и образование"],
 ["/projects", "Коммерческие кейсы"],
 ["/my-projects", "Личные проекты"],
 ["/publications", "Публикации"],
 ["/my-projects/agent-skills-lab", "Agent Skills Lab"],
 ["/my-projects/arhdesign", "arhDesign"],
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
 await expect(page.getByRole("heading", { name: "Делаю сложные интерфейсы быстрее, а разработку — предсказуемее.", exact: true })).toBeVisible();
});

test("resume and experience remain readable without JavaScript", async ({ browser }) => {
 const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
 const page = await context.newPage();
 await page.goto("http://127.0.0.1:3100/");
 await expect(page.getByRole("heading", { name: "Делаю сложные интерфейсы быстрее, а разработку — предсказуемее.", exact: true })).toBeVisible();
 await expect(page.getByRole("link", { name: "Скачать резюме PDF" })).toBeVisible();
 await page.goto("http://127.0.0.1:3100/experience");
 await expect(page.getByText("SberTech", {exact:true})).toBeVisible();
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

test("logo animation can be stopped and favicon is available", async ({ page }) => {
 await page.goto("/");
 const logo = page.getByRole("link", { name: "Соснович Иван — на главную" }).locator("img");
 await expect(logo).toHaveAttribute("src", "/logo-loop.svg");
 await page.getByRole("button", { name: "Остановить анимацию логотипа" }).click();
 await expect(logo).toHaveAttribute("src", "/logo-static.svg");
 await page.getByRole("button", { name: "Включить анимацию логотипа" }).click();
 await expect(logo).toHaveAttribute("src", "/logo-loop.svg");
 const icon = await page.request.get("/icon.svg");
 expect(icon.status()).toBe(200);
 expect(await icon.text()).toContain("#72E5CA");
 await page.emulateMedia({ reducedMotion: "reduce" });
 await expect(page.getByRole("button", { name: "Остановить анимацию логотипа" })).toBeHidden();
 await expect.poll(() => logo.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain("/logo-static.svg");
});

test("mobile menu stays within the viewport without resizing the page", async ({ page }) => {
 for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 280 }]) {
  await page.setViewportSize(viewport);
  await page.goto("/");
  await page.evaluate(() => window.scrollTo({ top: 450, behavior: "instant" }));
  const before = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight, scroll: window.scrollY }));
  const menuButton = page.getByRole("button", {name: "Открыть меню"});
  const triggerBox = await menuButton.boundingBox();
  // Direct pointer input avoids Playwright scrolling a sticky button into view.
  await page.mouse.click(triggerBox!.x + triggerBox!.width / 2, triggerBox!.y + triggerBox!.height / 2);
  expect(before.width).toBeLessThanOrEqual(viewport.width);
  const menu = page.locator("#mobile-navigation");
  await expect(menu).toBeVisible();
  expect(await page.evaluate(() => ({ width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight, scroll: window.scrollY }))).toEqual(before);
  const box = await menu.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width);
  expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
  await menu.getByRole("link", { name: "Публикации" }).click();
  await expect(page).toHaveURL(/\/publications$/);
  await expect(menu).toHaveCount(0);
  expect(await page.locator("html").evaluate(el => el.style.overflow)).toBe("");
 }
});
