// Generates each template with the CLI into a temp dir and verifies the output.
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";

const cli = join(import.meta.dirname, "..", "packages", "create-next-starter-pack", "bin", "index.js");
const tmp = mkdtempSync(join(tmpdir(), "cnsp-"));

try {
  for (const template of ["dashboard", "web", "blank"]) {
    const dir = join(tmp, `${template}-app`);
    execFileSync("node", [cli, dir, "--template", template, "--app-prefered-name", "Acme Portal"], { stdio: "pipe" });
    const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
    assert.equal(pkg.name, `${template}-app`);
    assert.ok(existsSync(join(dir, ".gitignore")), "gitignore");
    assert.ok(!existsSync(join(dir, "template.json")), "template.json leaked");
    assert.match(readFileSync(join(dir, ".env.local"), "utf8"), /"Acme Portal"/);
    assert.ok(!JSON.stringify(pkg).includes("create-next-starter-pack"), "runtime dependency on CLI");
    console.log(`ok  ${template}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
