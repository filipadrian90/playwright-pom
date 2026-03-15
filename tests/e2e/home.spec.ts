import { test, expect } from "../../fixtures";

test.describe("Home Page", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test("should display hero heading @smoke", async ({ homePage }) => {
    await expect(homePage.hero).toBeVisible();
  });

  test("should display navigation links @smoke", async ({ homePage, page }) => {
    test.skip(
      page.viewportSize()?.width !== undefined &&
        page.viewportSize()!.width < 768,
      "Nav links hidden on mobile viewport",
    );
    await expect(homePage.docs).toBeVisible();
    await expect(homePage.api).toBeVisible();
  });

  test("should navigate to Get Started page @regression", async ({
    homePage,
  }) => {
    await homePage.getStarted.click();
    await expect(homePage.page).toHaveURL(/docs\/intro/);
  });

  test("should open search dialog @regression", async ({ homePage }) => {
    await homePage.search.click();
    await expect(homePage.searchModal).toBeVisible();
  });

  test("should have no console errors @regression", async ({
    homePage,
    browserName,
    consoleErrors,
  }) => {
    test.skip(
      browserName === "firefox",
      "playwright.dev emits known Firefox console warnings",
    );
    await homePage.goto();
    expect(consoleErrors).toHaveLength(0);
  });

  test("should be responsive on mobile @regression", async ({ homePage }) => {
    await homePage.page.setViewportSize({ width: 375, height: 812 });
    await homePage.goto();
    await expect(homePage.hero).toBeVisible();
  });
});
