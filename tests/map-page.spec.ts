import { test, expect } from "@playwright/test";

test.describe("Homepage map render", () => {
  test("renders the SVG map with state paths", async ({ page }) => {
    await page.goto("/");

    const svg = page.locator(".map-svg");
    await expect(svg).toBeVisible();
    await expect(svg).toHaveAttribute("role", "img");

    const statePaths = svg.locator("path.state");
    const count = await statePaths.count();
    expect(count).toBeGreaterThanOrEqual(28);
  });

  test("renders craft thumbnails at origin place positions", async ({ page }) => {
    await page.goto("/");

    const thumbnails = page.locator(".craft-thumb");
    await expect(thumbnails.first()).toBeVisible();
    const count = await thumbnails.count();
    expect(count).toBeGreaterThanOrEqual(2);

    const ajrakhLinks = page.locator("a[href='/craft/ajrakh/'] image");
    await expect(ajrakhLinks.first()).toBeVisible();
    const kanjeevaramLinks = page.locator("a[href='/craft/kanjeevaram/'] image");
    await expect(kanjeevaramLinks.first()).toBeVisible();
  });

  test("thumbnails are square-cropped and link to craft pages", async ({ page }) => {
    await page.goto("/");

    const thumb = page.locator(".craft-thumb").first();
    await expect(thumb).toHaveAttribute("preserveAspectRatio", "xMidYMid slice");

    const link = page.locator("a[href='/craft/ajrakh/']").first();
    await expect(link).toBeVisible();
  });
});
