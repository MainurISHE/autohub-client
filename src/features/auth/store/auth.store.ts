import { create } from "zustand";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AuthState = {
  accessToken: string | null;
  user: User | null;

  isInitialized: boolean

  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  setInitialized: (isInitialized: boolean) => void
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isInitialized: false,
  

  setAccessToken: (accessToken) =>
    set({
      accessToken,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  setInitialized: (isInitialized) => 
    set({
      isInitialized,
    }),

  logout: () =>
    set({
      accessToken: null,
      user: null,
    }),
}));