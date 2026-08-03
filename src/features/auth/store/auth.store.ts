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

  setAccessToken: (accessToken: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAccessToken: (accessToken) =>
    set({
      accessToken,
    }),

  setUser: (user) =>
    set({
      user,
    }),

  logout: () =>
    set({
      accessToken: null,
      user: null,
    }),
}));