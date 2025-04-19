import fs from "fs";
import path from "path";

export const cleanLogs = () => {
  const logsPath = path.join(__dirname, "..", "logs");
  if (fs.existsSync(logsPath)) {
    fs.rmSync(logsPath, { recursive: true, force: true });
    console.log("[LOG] Cleaned previous logs");
  }
};
