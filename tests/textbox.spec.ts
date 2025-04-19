import { logger } from "../utils/logger";
import { test, expect } from "../utils/hooks";
import TextBoxPage from "../pages/TextBoxPage";

test.describe("TextBox Suite", () => {
  test("Enter valid inputs", async ({ page }, testInfo) => {
    const textBoxPage = new TextBoxPage(page);

    await test.step("Go to TextBox Page", async () => {
      logger.info("Navigating to the text box page", testInfo);
      await textBoxPage.goto();

      const url = page.url();
      if (!url.includes("text-box")) {
        logger.warn(`Unexpected URL: ${url}`, testInfo);
      }
      expect(url).toContain("text-box");
    });

    await test.step("Enter full name", async () => {
      logger.info("Filling in full name field", testInfo);
      await textBoxPage.enterFullName("Santa");
    });
  });
});
