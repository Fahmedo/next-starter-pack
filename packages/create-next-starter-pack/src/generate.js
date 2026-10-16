import { cpSync, existsSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

/** Bundled templates when published; the monorepo's templates/ folder in development. */
function templatesRoot() {
  for (const candidate of [join(here, "..", "templates"), join(here, "..", "..", "..", "templates")]) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error("Templates directory not found.");
}

const SKIP = new Set(["node_modules", ".next", "package-lock.json", "template.json", "next-env.d.ts"]);

export function generate({ dir, template, packageName, appName }) {
  const source = join(templatesRoot(), template);
  if (!existsSync(source)) throw new Error(`Template "${template}" not found.`);

  cpSync(source, dir, {
    recursive: true,
    filter: (p) => !SKIP.has(p.split(/[\\/]/).pop()),
  });

  // npm strips .gitignore from tarballs, so bundled templates ship it as _gitignore.
  const gitignore = join(dir, "_gitignore");
  if (existsSync(gitignore)) renameSync(gitignore, join(dir, ".gitignore"));

  const pkgPath = join(dir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  pkg.name = packageName;
  delete pkg.description;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

  // Per-app display name, read by src/config/env.ts. .env.local is git-ignored.
  writeFileSync(join(dir, ".env.local"), `NEXT_PUBLIC_APP_NAME=${JSON.stringify(appName)}\n`);
  rmSync(join(dir, "tsconfig.tsbuildinfo"), { force: true });
}
