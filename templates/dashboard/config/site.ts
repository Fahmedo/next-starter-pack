import { env } from '@/config/env';
import type { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: env.NEXT_PUBLIC_APP_NAME,
  description: 'Dashboard starter built with Next.js.',
  url: env.NEXT_PUBLIC_APP_URL,
};
