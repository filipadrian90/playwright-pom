import { test, expect } from "../../fixtures";

test.describe("Todo — Filtering", () => {
  test.beforeEach(async ({ seededTodoPage }) => {
    await seededTodoPage.checkbox(0).check();
  });

  test('should show all todos on "All" filter @smoke', async ({
    seededTodoPage,
  }) => {
    await seededTodoPage.filters.all.click();
    await expect(seededTodoPage.items).toHaveCount(3);
  });

  test("should show only active todos @regression", async ({
    seededTodoPage,
  }) => {
    await seededTodoPage.filters.active.click();
    await expect(seededTodoPage.items).toHaveCount(2);

    const total = await seededTodoPage.itemCount();
    for (let i = 0; i < total; i++) {
      await expect(seededTodoPage.item(i)).not.toHaveClass(/completed/);
    }
  });

  test("should show only completed todos @regression", async ({
    seededTodoPage,
  }) => {
    await seededTodoPage.filters.completed.click();
    await expect(seededTodoPage.items).toHaveCount(1);
    await expect(seededTodoPage.item(0)).toHaveClass(/completed/);
  });

  test("should persist filter on reload @regression", async ({
    seededTodoPage,
  }) => {
    await seededTodoPage.filters.active.click();
    await seededTodoPage.page.reload();

    await expect(seededTodoPage.filters.active).toHaveClass(/selected/);
    await expect(seededTodoPage.items).toHaveCount(2);
  });

  test("clear completed should only appear when completed items exist @regression", async ({
    seededTodoPage,
  }) => {
    await expect(seededTodoPage.clearCompleted).toBeVisible();
    await seededTodoPage.filters.completed.click();
    await seededTodoPage.clearCompleted.click();
    await expect(seededTodoPage.clearCompleted).toBeHidden();
  });
});
