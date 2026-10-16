import { LayoutDashboard } from 'lucide-react';

import type { ChildMenu, MenuItem } from '@/types/dashboard';

/**
 * Sidebar navigation. Add routes here; DashboardSidebar renders whatever is listed.
 * Use `children` for a collapsible group.
 */
export const SIDE_BAR_MENU: MenuItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard' },
];

/** Items in the header's account dropdown (a Log out action is added by the header). */
export const accountMenu: ChildMenu[] = [
  { name: 'Dashboard', icon: LayoutDashboard, link: '/dashboard' },
];
