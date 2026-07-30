import { test, expect, type Locator } from "@playwright/test";

/** Fire map path events without hitting overlay thumbs at the path centroid. */
async function dispatchStateEvent(
  path: Locator,
  type: "mouseenter" | "mouseleave" | "click",
) {
  await path.evaluate((el, eventType) => {
    el.dispatchEvent(
      new MouseEvent(eventType, {
        bubbles: true,
        cancelable: true,
        clientX: 80,
        clientY: 200,
        view: window,
      }),
    );
  }, type);
}

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

test.describe("Map interactions (desktop viewport)", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("state hover shows tooltip with state name and craft count", async ({ page }) => {
    await page.goto("/");

    const gujaratPath = page.locator("path.state[data-state='gujarat']");
    await dispatchStateEvent(gujaratPath, "mouseenter");
    await page.waitForSelector("#map-tooltip:not(.hidden)", { timeout: 3000 });

    const tooltip = page.locator("#map-tooltip");
    await expect(tooltip).toContainText("Gujarat");
    await expect(tooltip).toContainText(/crafts?/);
    await expect(tooltip).toContainText("Ajrakh");
  });

  test("state hover highlights the state path", async ({ page }) => {
    await page.goto("/");

    const gujaratPath = page.locator("path.state[data-state='gujarat']");
    await dispatchStateEvent(gujaratPath, "mouseenter");

    await expect(gujaratPath).toHaveClass(/state-hover/);
  });

  test("state with no crafts shows appropriate tooltip", async ({ page }) => {
    await page.goto("/");

    const statePath = page.locator("path.state[data-state='bihar']");
    await statePath.hover();
    await page.waitForSelector("#map-tooltip:not(.hidden)", { timeout: 3000 });

    const tooltip = page.locator("#map-tooltip");
    await expect(tooltip).toContainText("Bihar");
    await expect(tooltip).toContainText("No crafts yet");
  });

  test("thumbnail hover shows tooltip with craft name and summary", async ({ page }) => {
    await page.goto("/");

    const ajrakhThumb = page.locator("a[href='/craft/ajrakh/'] .craft-thumb").first();
    await ajrakhThumb.hover();
    await page.waitForSelector("#map-tooltip:not(.hidden)", { timeout: 3000 });

    const tooltip = page.locator("#map-tooltip");
    await expect(tooltip).toContainText("Ajrakh");
    await expect(tooltip).toContainText("A resist-dye block-print textile tradition");
  });

  test("multi-craft place slideshow cycles on hover and tooltip tracks craft", async ({
    page,
  }) => {
    await page.goto("/");

    const cluster = page.locator(".thumb-cluster[data-place='kutch']");
    await expect(cluster).toBeVisible();

    const craftsAttr = await cluster.getAttribute("data-crafts");
    expect(craftsAttr).toBeTruthy();
    const crafts = JSON.parse(craftsAttr!) as Array<{ name: string }>;
    expect(crafts.length).toBeGreaterThanOrEqual(2);

    await cluster.hover();
    await page.waitForSelector("#map-tooltip:not(.hidden)", { timeout: 3000 });

    const tooltip = page.locator("#map-tooltip");
    const firstName = await tooltip.locator(".tt-title").textContent();
    expect(firstName).toBeTruthy();

    await expect
      .poll(
        async () => {
          const title = await tooltip.locator(".tt-title").textContent();
          return title !== firstName;
        },
        { timeout: 5000 },
      )
      .toBe(true);

    const secondName = await tooltip.locator(".tt-title").textContent();
    expect(crafts.map((c) => c.name)).toContain(secondName);
  });

  test("thumbnail click navigates to craft page", async ({ page }) => {
    await page.goto("/");

    const ajrakhLink = page.locator("a[href='/craft/ajrakh/']").first();
    await expect(ajrakhLink).toBeVisible();

    await ajrakhLink.click();
    await page.waitForURL("/craft/ajrakh/");

    await expect(page.locator("h1")).toHaveText("Ajrakh");
  });

  test("state click opens side panel with craft cards", async ({ page }) => {
    await page.goto("/");

    const gujaratPath = page.locator("path.state[data-state='gujarat']");
    await dispatchStateEvent(gujaratPath, "click");

    const sidePanel = page.locator("#side-panel");
    await expect(sidePanel).toHaveClass(/side-panel-open/);

    await expect(sidePanel).toContainText("Gujarat");
    await expect(sidePanel).toContainText("Ajrakh");

    const craftLink = sidePanel.locator("a[href='/craft/ajrakh/']");
    await expect(craftLink).toBeVisible();
  });

  test("side panel contains view full state page link", async ({ page }) => {
    await page.goto("/");

    const gujaratPath = page.locator("path.state[data-state='gujarat']");
    await dispatchStateEvent(gujaratPath, "click");

    const stateLink = page.locator("#side-panel a.sp-state-link");
    await expect(stateLink).toBeVisible();
    await expect(stateLink).toHaveAttribute("href", "/state/gujarat/");
    await expect(stateLink).toContainText("View full state page");
  });

  test("side panel can be closed with close button", async ({ page }) => {
    await page.goto("/");

    await dispatchStateEvent(page.locator("path.state[data-state='gujarat']"), "click");
    const sidePanel = page.locator("#side-panel");
    await expect(sidePanel).toHaveClass(/side-panel-open/);

    await page.locator("#side-panel-close").click();
    await expect(sidePanel).not.toHaveClass(/side-panel-open/);
  });

  test("side panel can be closed with Escape key", async ({ page }) => {
    await page.goto("/");

    await dispatchStateEvent(page.locator("path.state[data-state='gujarat']"), "click");
    const sidePanel = page.locator("#side-panel");
    await expect(sidePanel).toHaveClass(/side-panel-open/);

    await page.keyboard.press("Escape");
    await expect(sidePanel).not.toHaveClass(/side-panel-open/);
  });

  test("state click in state with no crafts shows empty state", async ({ page }) => {
    await page.goto("/");

    await page.locator("path.state[data-state='bihar']").click();

    const sidePanel = page.locator("#side-panel");
    await expect(sidePanel).toHaveClass(/side-panel-open/);
    await expect(sidePanel.locator(".sp-empty")).toBeVisible();
    await expect(sidePanel.locator(".sp-empty")).toContainText("No crafts recorded");
  });

  test("kanjeevaram thumbnail is rendered and interactive", async ({ page }) => {
    await page.goto("/");

    const kanjeevaramThumb = page.locator("a[href='/craft/kanjeevaram/'] .craft-thumb").first();
    await kanjeevaramThumb.hover();
    await page.waitForSelector("#map-tooltip:not(.hidden)", { timeout: 3000 });

    const tooltip = page.locator("#map-tooltip");
    await expect(tooltip).toContainText("Kanjeevaram");
    await expect(tooltip).toContainText("A richly woven silk saree tradition");
  });
});
