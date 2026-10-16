# create-nsp-app-kit

Scaffold a Next.js (App Router, TypeScript, Tailwind CSS v4, shadcn-style UI) app from a **dashboard**, **web** or **blank** template.

```bash
npx create-nsp-app-kit@latest my-app
npx create-nsp-app-kit@latest my-app -t dashboard --app-prefered-name "Acme Portal"
```

Options: `-t, --template <dashboard|web|blank>`, `--app-prefered-name <name>`, `-h, --help`. Missing values are prompted for.

Generated apps include Axios, TanStack Query, React Hook Form + Zod, Zustand, ESLint and Prettier, and do not depend on this package at runtime.

MIT
