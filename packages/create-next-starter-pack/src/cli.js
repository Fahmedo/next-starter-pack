import { createInterface } from "node:readline/promises";
import { existsSync, readdirSync } from "node:fs";
import { basename, resolve } from "node:path";

import { generate } from "./generate.js";

export const TEMPLATES = ["dashboard", "web", "blank"];

const HELP = `Usage: create-next-starter-pack [project-name] [options]

Options:
  -t, --template <name>            ${TEMPLATES.join(" | ")}
      --app-prefered-name <name>   Display name of the app (default: derived from project name)
  -h, --help                       Show this help
`;

function parseArgs(argv) {
  const opts = { name: undefined, template: undefined, appName: undefined, help: false };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const [flag, inline] = arg.split(/=(.*)/s);
    const value = () => inline ?? argv[++i];
    if (flag === "-h" || flag === "--help") opts.help = true;
    else if (flag === "-t" || flag === "--template") opts.template = value();
    else if (flag === "--app-prefered-name") opts.appName = value();
    else if (arg.startsWith("-")) throw new Error(`Unknown option: ${arg}\n\n${HELP}`);
    else opts.name = arg;
  }
  return opts;
}

const toPackageName = (s) =>
  s.trim().toLowerCase().replace(/[^a-z0-9-_.~]+/g, "-").replace(/^[-._]+|-+$/g, "");

const toTitle = (s) =>
  s.split(/[-_.\s]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

export async function run(argv) {
  const opts = parseArgs(argv);
  if (opts.help) return console.log(HELP);

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const ask = async (q, fallback) => {
      const answer = (await rl.question(fallback ? `${q} (${fallback}): ` : `${q}: `)).trim();
      return answer || fallback;
    };

    const target = opts.name ?? (await ask("Project name", "my-app"));
    const packageName = toPackageName(basename(resolve(target)));
    if (!packageName) throw new Error("Invalid project name.");

    let template = opts.template;
    if (!template) {
      console.log("\nTemplates:");
      TEMPLATES.forEach((t, i) => console.log(`  ${i + 1}) ${t}`));
      const choice = await ask("Choose a template (name or number)", "dashboard");
      template = TEMPLATES[Number(choice) - 1] ?? choice;
    }
    if (!TEMPLATES.includes(template)) {
      throw new Error(`Unknown template "${template}". Choose one of: ${TEMPLATES.join(", ")}`);
    }

    const appName = opts.appName ?? toTitle(packageName);
    const dir = resolve(target);
    if (existsSync(dir) && readdirSync(dir).length > 0) {
      throw new Error(`Directory "${target}" already exists and is not empty.`);
    }

    generate({ dir, template, packageName, appName });

    console.log(`\nCreated "${appName}" (${template}) in ${dir}\n\nNext steps:`);
    if (target !== ".") console.log(`  cd ${target}`);
    console.log("  npm install\n  npm run dev\n");
  } finally {
    rl.close();
  }
}
