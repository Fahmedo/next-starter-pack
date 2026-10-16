// Runs install (if needed), typecheck, lint and production build for each template.
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const names = process.argv.slice(2);
const all = ["dashboard", "web", "blank"];

for (const name of names.length ? names : all) {
  const cwd = join(import.meta.dirname, "..", "templates", name);
  const run = (cmd) => {
    console.log(`\n[${name}] ${cmd}`);
    execSync(cmd, { cwd, stdio: "inherit" });
  };
  if (!existsSync(join(cwd, "node_modules"))) run("npm install --no-fund --no-audit");
  for (const cmd of ["npm run typecheck", "npm run lint", "npm run format:check", "npm run build"]) run(cmd);
}
