// Copies ./shared into every template and generates each template's package.json.
// shared/ is the single source of truth: never edit shared files inside templates/*.
import { cpSync, existsSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sharedDir = join(root, "shared");
const templatesDir = join(root, "templates");

const base = JSON.parse(readFileSync(join(sharedDir, "package.base.json"), "utf8"));

for (const name of readdirSync(templatesDir)) {
  const dir = join(templatesDir, name);
  const metaPath = join(dir, "template.json");
  if (!existsSync(metaPath)) continue;

  cpSync(sharedDir, dir, { recursive: true });
  renameSync(join(dir, "_gitignore"), join(dir, ".gitignore"));
  renameSync(join(dir, "package.base.json"), join(dir, "package.json"));

  const meta = JSON.parse(readFileSync(metaPath, "utf8"));
  const pkg = { name: meta.name, description: meta.description, ...base };
  writeFileSync(join(dir, "package.json"), JSON.stringify(pkg, null, 2) + "\n");
  console.log(`synced ${name}`);
}
