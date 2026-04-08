import { existsSync, readFileSync } from "fs";
import path from "path";

function stripQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

export function loadEnvFile(fileName = ".env") {
  const envPath = path.resolve(process.cwd(), fileName);

  if (!existsSync(envPath)) {
    return;
  }

  const content = readFileSync(envPath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf("=");
    if (separatorIndex <= 0) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1);

    if (!key || process.env[key] !== undefined) {
      continue;
    }

    process.env[key] = stripQuotes(rawValue).replace(/\\n/g, "\n");
  }
}

function getDefaultEnvFiles(nodeEnv = process.env.NODE_ENV) {
  const fileNames = [
    nodeEnv ? `.env.${nodeEnv}.local` : null,
    nodeEnv === "test" ? null : ".env.local",
    nodeEnv ? `.env.${nodeEnv}` : null,
    ".env",
  ].filter((fileName): fileName is string => Boolean(fileName));

  return Array.from(new Set(fileNames));
}

export function loadEnvFiles(fileNames = getDefaultEnvFiles()) {
  for (const fileName of fileNames) {
    loadEnvFile(fileName);
  }
}