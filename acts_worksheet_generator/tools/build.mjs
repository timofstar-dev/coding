import { mkdir, copyFile } from "node:fs/promises";
import { build } from "esbuild";

// Explicit allowlist: source, tests, credentials and dependencies never become static assets.
await mkdir("dist", { recursive: true });
for (const file of [
  "index.html",
  "style.css",
  "script.js",
  "worksheet-core.js",
  "acts_data.js",
  "acts_data_rkv.js",
  "spelling_100_data.js",
  "_routes.json",
  "_headers",
]) {
  await copyFile(file, `dist/${file}`);
}
await build({
  entryPoints: ["server/worker.js"],
  outfile: "dist/_worker.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
});
