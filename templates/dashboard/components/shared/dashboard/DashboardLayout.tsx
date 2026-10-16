'use client';

import { useState, type ReactNode } from 'react';

import { useAppStore } from '@/store/appStore';
import type { DashboardUser } from '@/types/dashboard';

import { DashboardHeader } from './DashboardHeader';
import { DashboardSidebar } from './DashboardSidebar';
import { accountMenu, SIDE_BAR_MENU } from './data';

interface DashboardLayoutProps {
  children: ReactNode;
  currentUser: DashboardUser;
}

export function DashboardLayout({ children, currentUser }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar
        navigationItems={SIDE_BAR_MENU}
        isOpen
        onClose={() => {}}
        isCollapsed={sidebarCollapsed}
      />
      <DashboardSidebar
        navigationItems={SIDE_BAR_MENU}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isMobile
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardHeader
          user={currentUser}
          accountMenuItems={accountMenu}
          onMenuClick={() => setMobileOpen(true)}
          onCollapseClick={toggleSidebar}
          isCollapsed={sidebarCollapsed}
        />
        <main className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
