# next-starter-pack

Monorepo for **create-nsp-app-kit**, a CLI that scaffolds a standalone Next.js app (App Router, TypeScript, Tailwind v4, shadcn-style UI) from one of three templates: **dashboard**, **web**, **blank**.

## Install / use

```bash
npx create-nsp-app-kit@latest my-app
npx create-nsp-app-kit@latest my-app -t dashboard --app-prefered-name "Acme Portal"
cd my-app && npm install && npm run dev
```

Options: `-t, --template <dashboard|web|blank>`, `--app-prefered-name <name>`, `-h, --help`. Missing values are prompted for. Requires Node.js 18.18+.

**Keywords:** nextjs, starter, starter-kit, template, boilerplate, scaffold, cli, dashboard, admin-dashboard, tailwindcss, typescript, shadcn, react-query, zustand, zod, app-router

## Repository layout

```
shared/                         Source of truth for everything common to all templates
templates/{dashboard,web,blank} Independently runnable apps (shared files are synced in)
packages/create-nsp-app-kit     The CLI (no runtime dependencies)
scripts/                        sync, format, check and CLI test scripts
```

## Template architecture (identical in all three)

Mirrors the `panterrios` app: root-level folders (no `src/`), `@/*` maps to the project root, route groups under `app/`, a `ClientLayoutWrapper` that picks the layout.

```
app/              layout.tsx, globals.css, not-found.tsx (shared) · ClientLayoutWrapper.tsx, page.tsx, route groups (template-specific)
components/
  ui/             shadcn-style primitives + sonner Toaster (shared)
  providers/      Providers: React Query + Toaster (shared)
  shared/         layout components: dashboard/ (DashboardLayout, Sidebar, Header, PageHead, data.ts), web/ (WebLayout, Header, Footer, Navigation, Hero, Section, data.ts), AppLayout (blank)
config/           env.ts (Zod), constants.ts (shared) · site.ts (template-specific)
hook/             React Query hooks, one folder per feature (hook/<feature>/useX.ts + index.ts)
hooks/            generic hooks: use-debounce, use-media-query, use-zod-form
interface/        API entity / request / response types
lib/              utils (cn), validations/ (Zod schemas)
services/         axios.ts (API instance + interceptors) + one file per feature
store/            Zustand stores (appStore.ts)
types/            shared types · dashboard.ts / web.ts (template-specific)
utils/            error.ts (axios error toasts), helpers
assets/ helper/ public/
```

Navigation lives in `components/shared/dashboard/data.ts` (`SIDE_BAR_MENU`) and `components/shared/web/data.ts` (`MAIN_NAV`, `FOOTER_NAV`).

Not carried over from panterrios on purpose: auth, role-based menus, SCSS, tiptap, and feature modules.

## Workflow

```bash
npm run format               # format shared/ and templates with Prettier
npm run sync                 # copy shared/ into every template + regenerate package.json
npm run check                # install, typecheck, lint, prettier check, production build for all templates
npm run check -- web         # one template
npm run test:cli             # generate each template with the CLI into a temp dir and verify

cd templates/dashboard && npm install && npm run dev   # run one template
```

**Updating shared config/components:** edit `shared/`, then `npm run sync`. Never edit shared files inside `templates/*` — they are overwritten. Dependencies live in `shared/package.base.json`.

**Integrating your existing dashboard UI:** replace the files in `templates/dashboard/components/shared/dashboard/`, edit `data.ts` and `config/site.ts`, and add pages under `app/(dashboard)/`. Keep `ClientLayoutWrapper` rendering `DashboardLayout` and nothing else changes. Put your preferred configs (extra deps, ESLint rules, etc.) into `shared/` so all templates stay aligned, or into one template only if they are template-specific.

**Environment:** `.env.example` lists the variables; they are validated with Zod in `config/env.ts`. Add new ones in both the schema and the explicit `process.env` object.

## CLI

```bash
# Local development (run the CLI from this repo)
node packages/create-nsp-app-kit/bin/index.js my-app                 # interactive
node packages/create-nsp-app-kit/bin/index.js my-app -t web --app-prefered-name "Acme Site"
```

- `project-name` becomes the directory and `package.json` name.
- `--app-prefered-name` is the display name; it is written to `.env.local` as `NEXT_PUBLIC_APP_NAME` and used by `siteConfig`. Defaults to a title-cased project name.
- Generated apps are plain copies of a template and do not depend on the CLI.

### Publishing

Published as `create-nsp-app-kit` on npm. `prepack` bundles `templates/` into the package (`.gitignore` is shipped as `_gitignore` and restored on generation). To release an update:

```bash
npm run sync && npm run check && npm run test:cli
cd packages/create-nsp-app-kit
npm version patch            # or minor / major
npm pack --dry-run           # preview contents
npm publish --access public  # requires npm 2FA
```
