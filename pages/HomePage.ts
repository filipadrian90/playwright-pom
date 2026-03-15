import { Locator, type Page } from "@playwright/test";

export class HomePage {
  private readonly heroHeading: Locator;
  private readonly getStartedBtn: Locator;
  private readonly searchBtn: Locator;
  private readonly navbar: Locator;
  private readonly docsLink: Locator;
  private readonly apiLink: Locator;
  private readonly searchModalInput: Locator;

  constructor(readonly page: Page) {
    this.heroHeading = page.getByRole("heading", { level: 1 });
    this.getStartedBtn = page.getByRole("link", { name: "GET STARTED" });
    this.searchBtn = page.getByRole("button", { name: /search/i });
    this.navbar = page.getByRole("navigation");
    this.docsLink = page
      .locator("a")
      .filter({ hasText: /^Docs$/ })
      .first();
    this.apiLink = page.locator("a").filter({ hasText: /^API$/ }).first();
    this.searchModalInput = page.getByPlaceholder("Search docs");
  }

  async goto() {
    await this.page.goto("https://playwright.dev/");
    await this.heroHeading.waitFor({ state: "visible" });
  }

  get hero(): Locator {
    return this.heroHeading;
  }
  get getStarted(): Locator {
    return this.getStartedBtn;
  }
  get search(): Locator {
    return this.searchBtn;
  }
  get docs(): Locator {
    return this.docsLink;
  }
  get api(): Locator {
    return this.apiLink;
  }
  get searchModal(): Locator {
    return this.searchModalInput;
  }
}
