'use client';

import { ChevronDown, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import type { MenuItem } from '@/types/dashboard';

interface DashboardSidebarProps {
  navigationItems: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  isCollapsed?: boolean;
}

/** Placeholder sidebar: desktop (collapsible) and mobile (drawer) variants. */
export function DashboardSidebar({
  navigationItems,
  isOpen,
  onClose,
  isMobile = false,
  isCollapsed = false,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const collapsed = isCollapsed && !isMobile;

  const isActive = (link?: string) =>
    !!link && (pathname === link || pathname.startsWith(link + '/'));

  const toggleItem = (name: string) =>
    setOpenItems((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );

  const itemClass = (active: boolean) =>
    cn(
      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
      active ? 'bg-accent font-medium' : 'text-muted-foreground hover:bg-accent',
      collapsed && 'justify-center px-2',
    );

  const content = (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex h-8 items-center justify-between">
        {!collapsed && <span className="truncate text-lg font-semibold">{siteConfig.name}</span>}
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        )}
      </div>
      <nav className="flex flex-col gap-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          if (item.children?.length) {
            const open = openItems.includes(item.name);
            return (
              <div key={item.name}>
                <button
                  className={cn(itemClass(false), 'w-full')}
                  onClick={() => toggleItem(item.name)}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon className="size-5 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      {open ? (
                        <ChevronDown className="size-4" />
                      ) : (
                        <ChevronRight className="size-4" />
                      )}
                    </>
                  )}
                </button>
                {open && !collapsed && (
                  <div className="mt-1 flex flex-col gap-1 pl-9">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.link ?? '#'}
                        onClick={isMobile ? onClose : undefined}
                        className={itemClass(isActive(child.link))}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link
              key={item.name}
              href={item.link ?? '#'}
              onClick={isMobile ? onClose : undefined}
              className={itemClass(isActive(item.link))}
              title={collapsed ? item.name : undefined}
            >
              <Icon className="size-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  if (isMobile) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-40 md:hidden">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <aside className="absolute inset-y-0 left-0 w-64 bg-sidebar shadow-lg">{content}</aside>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        'hidden shrink-0 border-r bg-sidebar transition-[width] md:block',
        collapsed ? 'w-20' : 'w-64',
      )}
    >
      {content}
    </aside>
  );
}
