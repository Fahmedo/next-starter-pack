import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface PageHeadProps {
  pageTitle: string;
  subTitle?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHead({ pageTitle, subTitle, children, className }: PageHeadProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div>
        <h2 className="text-2xl font-bold">{pageTitle}</h2>
        {subTitle && <p className="mt-0.5 text-sm text-muted-foreground">{subTitle}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}
