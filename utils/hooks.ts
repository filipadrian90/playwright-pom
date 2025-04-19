import { test as base, expect as baseExpect } from "@playwright/test";
import fs from "fs";
import path from "path";

export const test = base;
export const expect = baseExpect;

test.afterEach(async ({}, testInfo) => {
  const sanitizedTitle = testInfo.title.replace(/\W+/g, "_");
  const logPath = path.join(
    __dirname,
    "..",
    "logs",
    testInfo.project.name,
    `${sanitizedTitle}.log`
  );

  if (fs.existsSync(logPath)) {
    await testInfo.attach("Test Log", {
      path: logPath,
      contentType: "text/plain",
    });
  }
});
