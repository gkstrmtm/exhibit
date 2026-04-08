import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { mkdir, readFile, rm, writeFile } from "fs/promises";

import { getLocalCatalogEntries, getLocalCatalogExhibits } from "../server/local-catalog.ts";
import { buildOperationalWorkbenchBundle } from "../server/operational-workbench-bundle.ts";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("generating public catalog snapshot...");
  const sourceEntries = getLocalCatalogEntries();
  const sourceUrlBySlug = new Map(sourceEntries.map((entry) => [entry.slug, entry.sourceUrl || null]));
  const publicCatalog = getLocalCatalogExhibits().map((exhibit) => ({
    ...exhibit,
    sourceUrl: sourceUrlBySlug.get(exhibit.slug) || null,
  }));
  await mkdir("generated", { recursive: true });
  await writeFile("generated/public-catalog.json", JSON.stringify(publicCatalog));
  await writeFile("generated/operational-workbench.json", JSON.stringify(buildOperationalWorkbenchBundle()));

  console.log("building client...");
  await viteBuild();

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist-server/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
