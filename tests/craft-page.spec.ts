import { test, expect, type Page } from "@playwright/test";

async function assertPageAnatomy(page: Page) {
  await expect(page.locator("h1")).toHaveText("Ajrakh");
  await expect(page.locator(".summary")).toBeVisible();
  await expect(page.getByText("Technique")).toBeVisible();
  await expect(page.locator(".meta dd").first()).toHaveText("block-print");
  await expect(page.locator(".meta dd").nth(1)).toHaveText("kutch, barmer");
  await expect(page.locator("section h2")).toContainText(["History", "How it's made", "Motifs & materials"]);

  const figures = page.locator(".gallery-grid figure");
  await expect(figures).toHaveCount(2);
  await expect(figures.first().locator(".img-credit")).toContainText("Khatri Family Workshop");
  await expect(figures.first().locator(".img-credit")).toContainText("CC BY-SA 4.0");
  await expect(figures.nth(1).locator(".img-credit")).toContainText("D. B. Kumar");

  const citation = page.locator(".citation").first();
  await expect(citation).toHaveText("[1]");
  await expect(citation).toHaveAttribute("href", "#source-1");

  const notice = page.locator(".ai-notice");
  await expect(notice).toBeVisible();
  await expect(notice).toContainText("2 sources");
  await expect(notice).toContainText("2025-07-29");

  const link = page.locator(".edit-footer a");
  const href = await link.getAttribute("href");
  expect(href).toContain("issues/new");
  expect(href).toContain("craft=Ajrakh");
  expect(href).toContain("page=");
  expect(href).toContain(encodeURIComponent("/craft/ajrakh/"));
}

test.describe("Craft page anatomy", () => {
  test.describe("desktop viewport", () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test("renders complete page anatomy", async ({ page }) => {
      await page.goto("/craft/ajrakh/");
      await assertPageAnatomy(page);
    });
  });

  test.describe("mobile viewport", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("renders complete page anatomy", async ({ page }) => {
      await page.goto("/craft/ajrakh/");
      await assertPageAnatomy(page);
    });
  });
});
