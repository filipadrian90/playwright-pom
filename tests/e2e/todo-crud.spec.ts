import { test, expect } from "../../fixtures";
import { uniqueTodo, TODO_ITEMS } from "../../test-data/todos.data";

test.describe("Todo — Create", () => {
  test("should add a new todo @smoke", async ({ todoPage }) => {
    const text = uniqueTodo();
    await todoPage.input.fill(text);
    await todoPage.input.press("Enter");

    await expect(todoPage.items).toHaveCount(1);
    await expect(todoPage.items.first()).toHaveText(text);
    await expect(todoPage.input).toBeEmpty();
  });

  test("should add multiple todos @regression", async ({ todoPage }) => {
    for (const item of TODO_ITEMS) {
      await todoPage.input.fill(item);
      await todoPage.input.press("Enter");
    }

    await expect(todoPage.items).toHaveCount(TODO_ITEMS.length);
    await expect(todoPage.items).toHaveText([...TODO_ITEMS]);
  });

  test("should not add an empty todo @regression", async ({ todoPage }) => {
    await todoPage.input.press("Enter");
    await expect(todoPage.items).toHaveCount(0);
  });

  test("should trim whitespace @regression", async ({ todoPage }) => {
    await todoPage.input.fill("  Buy milk  ");
    await todoPage.input.press("Enter");
    await expect(todoPage.items.first()).toHaveText("Buy milk");
  });
});

test.describe("Todo — Complete", () => {
  test("should mark a todo as completed @smoke", async ({ seededTodoPage }) => {
    await seededTodoPage.checkbox(0).check();
    await expect(seededTodoPage.item(0)).toHaveClass(/completed/);
  });

  test("should show correct active item counter @regression", async ({
    seededTodoPage,
  }) => {
    await seededTodoPage.checkbox(0).check();
    await expect(seededTodoPage.count).toContainText("2 items left");
  });

  test("should toggle all todos at once @regression", async ({
    seededTodoPage,
  }) => {
    await seededTodoPage.toggleAll.check();
    const total = await seededTodoPage.itemCount();
    for (let i = 0; i < total; i++) {
      await expect(seededTodoPage.item(i)).toHaveClass(/completed/);
    }
  });
});

test.describe("Todo — Edit", () => {
  test("should edit an existing todo @regression", async ({
    seededTodoPage,
  }) => {
    await seededTodoPage.item(1).dblclick();
    await seededTodoPage.editInput(1).fill("Updated todo text");
    await seededTodoPage.editInput(1).press("Enter");
    await expect(seededTodoPage.item(1)).toHaveText("Updated todo text");
  });

  test("should cancel edit on Escape @regression", async ({
    seededTodoPage,
  }) => {
    const originalText = await seededTodoPage.item(0).textContent();
    await seededTodoPage.item(0).dblclick();
    await seededTodoPage.editInput(0).fill("Abandoned edit");
    await seededTodoPage.editInput(0).press("Escape");
    await expect(seededTodoPage.item(0)).toHaveText(originalText!.trim());
  });
});

test.describe("Todo — Delete", () => {
  test("should delete a todo item @smoke", async ({ seededTodoPage }) => {
    const initialCount = await seededTodoPage.itemCount();
    await seededTodoPage.item(0).hover();
    await seededTodoPage.deleteButton(0).click();
    await expect(seededTodoPage.items).toHaveCount(initialCount - 1);
  });

  test("should clear all completed todos @regression", async ({
    seededTodoPage,
  }) => {
    await seededTodoPage.checkbox(0).check();
    await seededTodoPage.checkbox(1).check();
    await seededTodoPage.clearCompleted.click();

    await expect(seededTodoPage.items).toHaveCount(1);
    await expect(seededTodoPage.clearCompleted).toBeHidden();
  });
});
