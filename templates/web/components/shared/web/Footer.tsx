import { siteConfig } from '@/config/site';

import { FOOTER_NAV } from './data';
import { Navigation } from './Navigation';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-6 text-sm">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <Navigation items={FOOTER_NAV} />
      </div>
    </footer>
  );
}
