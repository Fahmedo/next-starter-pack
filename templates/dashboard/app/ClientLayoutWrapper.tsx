'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { DashboardLayout } from '@/components/shared';
import type { DashboardUser } from '@/types/dashboard';

// Routes rendered without the dashboard chrome.
const noDashboardRoutes = ['/', '/not-found'];

// Placeholder user. Replace with your own user source (store, query, ...).
const currentUser: DashboardUser = {
  email: 'user@example.com',
  firstName: 'Demo',
  lastName: 'User',
  initials: 'DU',
};

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (noDashboardRoutes.includes(pathname)) return <>{children}</>;

  return <DashboardLayout currentUser={currentUser}>{children}</DashboardLayout>;
}
