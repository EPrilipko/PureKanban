import { create } from 'zustand';

interface LayoutStore {
  headerRef: HTMLElement | null;
  setHeaderRef: (header: HTMLElement) => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  headerRef: null,
  setHeaderRef: (headerRef) => set({ headerRef }),
}));
