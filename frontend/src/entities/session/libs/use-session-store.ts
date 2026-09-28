import { create } from 'zustand';

interface SessionStore {
  isAuthenticated: boolean;
  accessToken: string | null;
  clearAuth: () => void;
  setAccessToken: (accessToken: string) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  isAuthenticated: false,
  accessToken: null,
  user: null,
  clearAuth: () =>
    set({
      accessToken: null,
    }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));
