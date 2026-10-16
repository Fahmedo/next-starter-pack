import type { LucideIcon } from 'lucide-react';

export interface DashboardUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  initials: string;
}

export interface ChildMenu {
  name: string;
  icon?: LucideIcon;
  link?: string;
}

export interface MenuItem {
  name: string;
  icon: LucideIcon;
  link?: string;
  children?: ChildMenu[];
}
