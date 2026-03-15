import { type Page } from "@playwright/test";

export const normalise = (text: string): string =>
  text.replace(/\s+/g, " ").trim();

export const randomString = (length = 8): string =>
  Math.random()
    .toString(36)
    .substring(2, 2 + length);

export async function setLocalStorage(page: Page, key: string, value: unknown) {
  await page.evaluate(([k, v]) => localStorage.setItem(k, JSON.stringify(v)), [
    key,
    value,
  ] as [string, unknown]);
}

export async function retry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 500,
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw lastError;
}
