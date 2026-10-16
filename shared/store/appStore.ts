import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { STORAGE_KEYS } from '@/config/constants';

interface AppState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

/** Global client state persisted to localStorage. Add feature stores as sibling files. */
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    { name: STORAGE_KEYS.appStore },
  ),
);
