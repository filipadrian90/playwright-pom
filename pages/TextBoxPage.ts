import { Page } from "@playwright/test";

class TextBoxPage {
  constructor(private page: Page) {}

  //selectors
  private readonly fullNameInput: string = "#userName";

  //methods

  public async goto(): Promise<void> {
    await this.page.goto("https://demoqa.com/text-box");
  }

  public async enterFullName(fullName: string): Promise<void> {
    const fullNameInput = this.page.locator(this.fullNameInput);

    await fullNameInput.fill(fullName);
  }
}
export default TextBoxPage;
