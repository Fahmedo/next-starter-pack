// Formats shared/ with Prettier. Prettier needs the template's installed plugins and
// config, so: sync into a template, format it there, copy shared files back, re-sync.
import { execSync } from "node:child_process";
import { cpSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = join(import.meta.dirname, "..");
const shared = join(root, "shared");
const web = join(root, "templates", "web");
const sh = (cmd, cwd = root) => execSync(cmd, { cwd, stdio: "inherit" });

sh("node scripts/sync-shared.mjs");
sh("npx prettier --write .", web);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

for (const file of walk(shared)) {
  const rel = relative(shared, file);
  if (rel === "package.base.json" || rel === "_gitignore") continue;
  cpSync(join(web, rel), file);
}
sh("node scripts/sync-shared.mjs");
for (const t of ["dashboard", "blank"]) sh("npx prettier --write .", join(root, "templates", t));
