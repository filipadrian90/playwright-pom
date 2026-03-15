import { test as setup, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

/**
 * Runs once before the full suite.
 * Performs login and persists storage state so tests skip the login UI.
 * See: https://playwright.dev/docs/auth
 */
setup("authenticate", async ({ page }) => {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  // Replace with your real login flow:
  // await page.goto('/login');
  // await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL!);
  // await page.getByLabel('Password').fill(process.env.TEST_USER_PASSWORD!);
  // await page.getByRole('button', { name: 'Sign in' }).click();
  // await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.goto("/");
  await page.context().storageState({ path: authFile });
});
