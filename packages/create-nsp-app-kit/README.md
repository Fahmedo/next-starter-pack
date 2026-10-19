# create-nsp-app-kit

Scaffold a production-ready **Next.js** app (App Router, TypeScript, Tailwind CSS v4, shadcn-style UI) from a **Dashboard**, **Web** or **Blank** starter template.

## Quick start

```bash
npx create-nsp-app-kit@latest my-app
```

Also works with other package managers:

```bash
pnpm dlx create-nsp-app-kit@latest my-app
yarn dlx create-nsp-app-kit@latest my-app
bunx create-nsp-app-kit@latest my-app
```

Then:

```bash
cd my-app
npm install
npm run dev
```

Requires Node.js 18.18 or newer.

## Options

| Option                       | Description                                                          |
| ---------------------------- | -------------------------------------------------------------------- |
| `[project-name]`             | Directory and `package.json` name (prompted if omitted)              |
| `-t, --template <name>`      | `dashboard`, `web` or `blank` (prompted if omitted)                  |
| `--app-prefered-name <name>` | Display name shown in the app (default: title-cased project name)    |
| `-h, --help`                 | Show help                                                            |

```bash
npx create-nsp-app-kit@latest acme-portal -t dashboard --app-prefered-name "Acme Portal"
```

The display name is written to `.env.local` as `NEXT_PUBLIC_APP_NAME`.

## Templates

| Template      | Includes                                                                        |
| ------------- | ------------------------------------------------------------------------------- |
| **dashboard** | Sidebar, header (search, notifications, account menu), responsive layout, page head |
| **web**       | Header, footer, navigation, hero, reusable sections, web layout                 |
| **blank**     | Minimal homepage and layout with all shared configuration                       |

All templates share one folder structure and come with:

- Next.js App Router, TypeScript, Tailwind CSS v4, shadcn-style UI
- Axios client with interceptors, TanStack Query
- React Hook Form + Zod, Zustand
- Validated environment variables (`.env.example`)
- ESLint and Prettier

Generated apps do not depend on this package at runtime.

## Keywords

nextjs, next.js, starter, starter-kit, template, boilerplate, scaffold, cli, create-app, dashboard, admin-dashboard, tailwindcss, typescript, shadcn, react-query, zustand, zod, app-router

## License

MIT
