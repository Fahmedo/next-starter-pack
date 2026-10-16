import Link from 'next/link';

import { siteConfig } from '@/config/site';

import { MAIN_NAV } from './data';
import { Navigation } from './Navigation';

export function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="font-semibold">
          {siteConfig.name}
        </Link>
        <Navigation items={MAIN_NAV} />
      </div>
    </header>
  );
}
