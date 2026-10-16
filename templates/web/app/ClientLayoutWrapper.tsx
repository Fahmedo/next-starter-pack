'use client';

import type { ReactNode } from 'react';

import { WebLayout } from '@/components/shared';

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  return <WebLayout>{children}</WebLayout>;
}
