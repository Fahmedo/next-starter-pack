'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const toLabel = (segment: string) =>
  segment.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

/** Path-based breadcrumbs. */
export function AppBreadcrumbs() {
  const segments = usePathname().split('/').filter(Boolean);

  return (
    <nav className="flex items-center gap-1 text-sm">
      {segments.map((segment, i) => {
        const href = '/' + segments.slice(0, i + 1).join('/');
        const last = i === segments.length - 1;
        return (
          <span key={href} className="flex items-center gap-1">
            {i > 0 && <span className="text-muted-foreground">/</span>}
            {last ? (
              <span className="font-medium">{toLabel(segment)}</span>
            ) : (
              <Link href={href} className="text-muted-foreground hover:text-foreground">
                {toLabel(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
