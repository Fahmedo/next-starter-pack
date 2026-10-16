import { z } from 'zod';

/**
 * Validated environment variables. Add new variables to the schema AND to the
 * explicit object below (Next.js only inlines `process.env.NEXT_PUBLIC_*` when
 * it is referenced statically).
 */
const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('My App'),
  NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_BASE_URL: z.url().default('http://localhost:3001/api'),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || undefined,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || undefined,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || undefined,
});
