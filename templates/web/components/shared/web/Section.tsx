import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Reusable page section: constrained width, vertical rhythm, optional title. */
export function Section({
  id,
  title,
  className,
  children,
}: {
  id?: string;
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn('mx-auto max-w-5xl px-4 py-12', className)}>
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      {children}
    </section>
  );
}
