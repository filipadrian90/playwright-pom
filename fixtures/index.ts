import {
  test as base,
  expect,
  type APIRequestContext,
  type Page,
} from "@playwright/test";
import { TodoPage } from "../pages/TodoPage";
import { HomePage } from "../pages/HomePage";
import { DocsPage } from "../pages/DocsPage";
import { ApiClient } from "../utils/ApiClient";
import { TestDataFactory } from "../utils/TestDataFactory";

type Use<T> = (fixture: T) => Promise<void>;

export const test = base.extend<
  {
    todoPage: TodoPage;
    seededTodoPage: TodoPage;
    homePage: HomePage;
    docsPage: DocsPage;
    apiClient: ApiClient;
    testData: TestDataFactory;
    consoleErrors: string[];
  },
  {
    workerApiContext: APIRequestContext;
  }
>({
  todoPage: async ({ page }: { page: Page }, use: Use<TodoPage>) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await use(todo);
  },

  seededTodoPage: async ({ page }: { page: Page }, use: Use<TodoPage>) => {
    const todo = new TodoPage(page);
    await todo.goto();
    await todo.seed();
    await use(todo);
  },

  homePage: async ({ page }: { page: Page }, use: Use<HomePage>) => {
    await use(new HomePage(page));
  },

  docsPage: async ({ page }: { page: Page }, use: Use<DocsPage>) => {
    await use(new DocsPage(page));
  },

  apiClient: async (
    { request }: { request: APIRequestContext },
    use: Use<ApiClient>,
  ) => {
    await use(new ApiClient(request));
  },

  testData: async ({}: {}, use: Use<TestDataFactory>) => {
    await use(new TestDataFactory());
  },

  consoleErrors: async ({ page }: { page: Page }, use: Use<string[]>) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
    await use(errors);
  },

  workerApiContext: [
    async (
      { playwright }: { playwright: any },
      use: Use<APIRequestContext>,
    ) => {
      const ctx = await playwright.request.newContext({
        baseURL: "https://jsonplaceholder.typicode.com",
        extraHTTPHeaders: { Accept: "application/json" },
      });
      await use(ctx);
      await ctx.dispose();
    },
    { scope: "worker" },
  ],
});

export { expect };
