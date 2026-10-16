import Link from 'next/link';

import type { NavLink } from '@/types/web';

export function Navigation({ items }: { items: NavLink[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-4 text-sm">
      {items.map(({ title, href, external }) => (
        <Link
          key={href}
          href={href}
          className="text-muted-foreground hover:text-foreground"
          {...(external && { target: '_blank', rel: 'noreferrer' })}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}
