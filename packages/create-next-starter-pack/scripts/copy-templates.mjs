// Bundles ../../templates into ./templates before `npm pack` / `npm publish`.
// .gitignore is stored as _gitignore because npm drops .gitignore files from tarballs.
import { cpSync, existsSync, renameSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(pkgRoot, "..", "..", "templates");
const dest = join(pkgRoot, "templates");
const skip = new Set(["node_modules", ".next", "package-lock.json", "next-env.d.ts", "tsconfig.tsbuildinfo"]);

rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true, filter: (p) => !skip.has(p.split("/").pop()) });

for (const name of ["dashboard", "web", "blank"]) {
  const gi = join(dest, name, ".gitignore");
  if (existsSync(gi)) renameSync(gi, join(dest, name, "_gitignore"));
}
console.log("templates bundled");
