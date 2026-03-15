import { Locator, type Page } from "@playwright/test";

export class DocsPage {
  private readonly sidebar: Locator;
  private readonly mainContent: Locator;
  private readonly copyCodeBtns: Locator;
  private readonly nextPageBtn: Locator;

  constructor(readonly page: Page) {
    this.sidebar = this.page.getByRole("navigation", { name: "Docs" });
    this.mainContent = this.page.getByRole("main");
    this.copyCodeBtns = this.page.getByRole("button", { name: /copy/i });
    this.nextPageBtn = this.page.getByRole("link", { name: /next/i });
  }

  async goto() {
    await this.page.goto("https://playwright.dev/docs/intro");
    await this.mainContent.waitFor({ state: "visible" });
  }
}
