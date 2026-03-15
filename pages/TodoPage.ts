import { Locator, type Page } from "@playwright/test";
import { TODO_ITEMS } from "../test-data/todos.data";

export class TodoPage {
  private readonly newTodoInput: Locator;
  private readonly todoItems: Locator;
  private readonly todoCount: Locator;
  private readonly toggleAllCheckbox: Locator;
  private readonly clearCompletedButton: Locator;
  private readonly filterAll: Locator;
  private readonly filterActive: Locator;
  private readonly filterCompleted: Locator;

  constructor(readonly page: Page) {
    this.newTodoInput = page.getByPlaceholder("What needs to be done?");
    this.todoItems = page.getByTestId("todo-item");
    this.todoCount = page.getByTestId("todo-count");
    this.toggleAllCheckbox = page.getByLabel("Toggle All Input");
    this.clearCompletedButton = page.getByRole("button", {
      name: "Clear completed",
    });
    this.filterAll = page.getByRole("link", { name: "All" });
    this.filterActive = page.getByRole("link", { name: "Active" });
    this.filterCompleted = page.getByRole("link", { name: "Completed" });
  }

  async goto() {
    await this.page.goto("https://demo.playwright.dev/todomvc/#/");
    await this.newTodoInput.waitFor({ state: "visible" });
  }

  async seed() {
    for (const item of TODO_ITEMS) {
      await this.newTodoInput.fill(item);
      await this.newTodoInput.press("Enter");
    }
  }

  // ── Scoped locator helpers (return Locator, no actions) ──────────────────

  item(index: number): Locator {
    return this.todoItems.nth(index);
  }

  itemCount(): Promise<number> {
    return this.todoItems.count();
  }

  checkbox(index: number): Locator {
    return this.todoItems.nth(index).getByRole("checkbox");
  }

  deleteButton(index: number): Locator {
    return this.todoItems.nth(index).getByRole("button", { name: "Delete" });
  }

  editInput(index: number): Locator {
    return this.todoItems.nth(index).getByRole("textbox", { name: "Edit" });
  }

  // ── Exposed stable locators tests need directly ──────────────────────────

  get input(): Locator {
    return this.newTodoInput;
  }
  get items(): Locator {
    return this.todoItems;
  }
  get count(): Locator {
    return this.todoCount;
  }
  get toggleAll(): Locator {
    return this.toggleAllCheckbox;
  }
  get clearCompleted(): Locator {
    return this.clearCompletedButton;
  }
  get filters() {
    return {
      all: this.filterAll,
      active: this.filterActive,
      completed: this.filterCompleted,
    };
  }
}
