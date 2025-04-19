import fs from "fs";
import path from "path";
import chalk from "chalk";
import { FullConfig, TestInfo } from "@playwright/test";

type LogLevel = "INFO" | "WARN" | "ERROR";

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const MIN_LOG_LEVEL: LogLevel = "INFO"; // Change to "WARN" or "ERROR" to filter

const formatMessage = (level: LogLevel, message: string): string => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
};

const colorize = (level: LogLevel, message: string) => {
  switch (level) {
    case "INFO":
      return chalk.cyan(message);
    case "WARN":
      return chalk.yellow(message);
    case "ERROR":
      return chalk.red(message);
  }
};

const getLogFilePath = (testInfo: TestInfo) => {
  const browserName = testInfo.project.name;
  const testName = testInfo.title.replace(/\W+/g, "_"); // safe filename
  const dir = path.join(__dirname, "..", "logs", browserName);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, `${testName}.log`);
};

const writeToFile = (testInfo: TestInfo, log: string) => {
  const logPath = getLogFilePath(testInfo);
  fs.appendFileSync(logPath, log + "\n");
};

export const logger = {
  info: (message: string, testInfo: TestInfo) => {
    if (LOG_LEVEL_PRIORITY["INFO"] < LOG_LEVEL_PRIORITY[MIN_LOG_LEVEL]) return;
    const log = formatMessage("INFO", message);
    console.log(colorize("INFO", log));
    writeToFile(testInfo, log);
  },

  warn: (message: string, testInfo: TestInfo) => {
    if (LOG_LEVEL_PRIORITY["WARN"] < LOG_LEVEL_PRIORITY[MIN_LOG_LEVEL]) return;
    const log = formatMessage("WARN", message);
    console.warn(colorize("WARN", log));
    writeToFile(testInfo, log);
  },

  error: (message: string, testInfo: TestInfo) => {
    if (LOG_LEVEL_PRIORITY["ERROR"] < LOG_LEVEL_PRIORITY[MIN_LOG_LEVEL]) return;
    const log = formatMessage("ERROR", message);
    console.error(colorize("ERROR", log));
    writeToFile(testInfo, log);
  },
};
