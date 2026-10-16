'use client';

import type { ReactNode } from 'react';

import { AppLayout } from '@/components/shared';

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
