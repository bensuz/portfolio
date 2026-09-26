import { expect, test } from "@playwright/test";
import { projects } from "../lib/content";

test.describe("home page", () => {
  test("introduces Bensu with a clear role and calls to action", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Elif Bensu Zorlu — Full-stack developer/);
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toHaveCount(1);
    await expect(heading).toContainText("Elif Bensu Zorlu");
    await expect(heading).toContainText("built end to end");
    await expect(page.getByRole("link", { name: "See selected work" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Download CV" }).first()).toBeVisible();
  });

  test("renders every section and project", async ({ page }) => {
    await page.goto("/");
    for (const id of ["work", "stack", "experience", "about", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    for (const project of projects) {
      await expect(page.getByRole("heading", { level: 3, name: project.name })).toBeAttached();
    }
  });

  test("serves the downloadable CV", async ({ request }) => {
    const response = await request.get("/Elif_Bensu_Zorlu_CV.pdf");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/pdf");
  });

  test("gives every image alternative text", async ({ page }) => {
    await page.goto("/");
    const missing = await page.locator("img:not([alt]), img[alt='']").count();
    expect(missing).toBe(0);
  });

  test("loads without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });

  test("keeps content visible when motion is reduced", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    const certs = page.getByRole("heading", { name: "Certifications & training" });
    await certs.scrollIntoViewIfNeeded();
    await expect(certs).toBeVisible();
    await expect(page.locator("[data-reveal]").first()).toHaveCSS("opacity", "1");
    await context.close();
  });

  test("keeps every section in the centred 1440px column on wide screens", async ({ page, isMobile }) => {
    test.skip(isMobile, "Wide screens only");
    await page.setViewportSize({ width: 2400, height: 1300 });
    await page.goto("/");
    const edges = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".shell")).map((el) => {
        const { left, right } = el.getBoundingClientRect();
        return { name: el.className, left: Math.round(left), right: Math.round(right) };
      }),
    );
    expect(edges.length).toBeGreaterThan(8);
    for (const edge of edges) {
      expect(edge, edge.name).toMatchObject({ left: 480, right: 1920 });
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(2400);
  });

  test("validates the contact form before sending", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByText("Prefer a quick message?").click();
    const email = page.getByLabel("Your email");
    await email.fill("not-an-email");
    await page.getByLabel("Message").fill("Hello there, I have a role in mind.");
    await page.getByRole("button", { name: /Send message/ }).click();
    expect(await email.evaluate((input: HTMLInputElement) => input.validity.valid)).toBe(false);
  });
});

test.describe("navigation", () => {
  test("header links move to their section", async ({ page, isMobile }) => {
    test.skip(isMobile, "Desktop navigation only");
    await page.goto("/");
    await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Experience" }).click();
    await expect(page.locator("#experience")).toBeInViewport();
  });

  test("mobile menu opens, navigates and closes with Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile navigation only");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.click();
    await menu.getByRole("link", { name: /About/ }).click();
    await expect(menu).toBeHidden();
    await expect(page.locator("#about")).toBeInViewport();
  });
});

test.describe("case studies", () => {
  for (const project of projects) {
    test(`${project.name} has a complete case study`, async ({ page }) => {
      await page.goto(`/work/${project.slug}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.name);
      await expect(page.getByRole("link", { name: /Visit live site/ })).toHaveAttribute("href", project.url);
      for (const section of project.sections) {
        await expect(page.getByRole("heading", { level: 2, name: section.title })).toBeAttached();
      }
      await expect(page.getByRole("navigation", { name: "Next project" })).toBeVisible();
    });
  }

  test("unknown projects return a 404 page", async ({ page }) => {
    const response = await page.goto("/work/not-a-project");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("link", { name: /See selected work/ })).toBeVisible();
  });
});

test("publishes crawlable metadata", async ({ request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const project of projects) expect(sitemap).toContain(`/work/${project.slug}`);
  const html = await (await request.get("/")).text();
  expect(html).toContain('"@type":"Person"');
  expect(html).toContain('property="og:image"');
});
