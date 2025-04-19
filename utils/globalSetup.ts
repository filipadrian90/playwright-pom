import { FullConfig } from "@playwright/test";
import { cleanLogs } from "./cleanLogs";

async function globalSetup(config: FullConfig) {
  cleanLogs(); // Wipe old logs before test run starts
}

export default globalSetup;
