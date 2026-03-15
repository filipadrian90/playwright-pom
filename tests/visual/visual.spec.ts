import { test, expect } from "../../fixtures";

/**
 * Visual regression tests.
 * Generate baselines: npx playwright test tests/visual --update-snapshots
 */
test.describe("Visual Regression — TodoMVC", () => {
  test("empty state @visual", async ({ todoPage, page }) => {
    await expect(page).toHaveScreenshot("todo-empty.png", {
      maxDiffPixelRatio: 0.02,
    });
  });

  test("populated list @visual", async ({ seededTodoPage, page }) => {
    await expect(page).toHaveScreenshot("todo-populated.png", {
      maxDiffPixelRatio: 0.02,
    });
  });

  test("with completed items @visual", async ({ seededTodoPage, page }) => {
    await seededTodoPage.checkbox(0).check();
    await seededTodoPage.checkbox(1).check();
    await expect(page).toHaveScreenshot("todo-completed.png", {
      maxDiffPixelRatio: 0.02,
    });
  });

  test("active filter @visual", async ({ seededTodoPage, page }) => {
    await seededTodoPage.checkbox(0).check();
    await seededTodoPage.filters.active.click();
    await expect(page).toHaveScreenshot("todo-filter-active.png", {
      maxDiffPixelRatio: 0.02,
    });
  });

  test("mobile viewport @visual", async ({ todoPage, page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await todoPage.goto();
    await expect(page).toHaveScreenshot("todo-mobile.png", {
      maxDiffPixelRatio: 0.02,
    });
  });
});
