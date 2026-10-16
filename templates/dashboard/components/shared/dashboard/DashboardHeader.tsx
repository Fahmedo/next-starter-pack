'use client';

import { ChevronDown, LogOut, Menu, PanelLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { ChildMenu, DashboardUser } from '@/types/dashboard';

import { AppBreadcrumbs } from './AppBreadcrumbs';
import Notification from './Notification';

interface DashboardHeaderProps {
  user: DashboardUser;
  accountMenuItems: ChildMenu[];
  onMenuClick: () => void;
  onCollapseClick: () => void;
  isCollapsed?: boolean;
  /** Called by the "Log out" item. Defaults to navigating home. */
  onLogout?: () => void;
}

export function DashboardHeader({
  user,
  accountMenuItems,
  onMenuClick,
  onCollapseClick,
  isCollapsed = false,
  onLogout,
}: DashboardHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const fullName = `${user.firstName} ${user.lastName}`.trim();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={onCollapseClick}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <PanelLeft className="size-5" />
        </Button>
        <AppBreadcrumbs />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden w-80 md:block">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 bg-muted/40 pl-9"
          />
        </div>

        <Notification />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors hover:bg-accent">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                {user.initials}
              </span>
              <span className="hidden xl:block">{fullName}</span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {accountMenuItems.map(({ name, icon: Icon, link }) => (
              <DropdownMenuItem key={name} asChild>
                <Link
                  href={link ?? '#'}
                  className={cn(
                    'flex cursor-pointer items-center gap-3',
                    pathname === link && 'font-medium',
                  )}
                >
                  {Icon && <Icon className="size-4 shrink-0" />}
                  <span>{name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={() => (onLogout ? onLogout() : router.push('/'))}
              className="flex cursor-pointer items-center gap-3 text-destructive focus:text-destructive"
            >
              <LogOut className="size-4 shrink-0" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
