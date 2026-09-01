"use client";

import { PropsWithChildren, useEffect } from "react";
import { authService } from "@/features/auth/api/auth.service";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { userService } from "@/features/auth/api/user.service";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { logout, setAccessToken, setUser, setInitialized } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { accessToken } = await authService.refresh();

        setAccessToken(accessToken);

        const user = await userService.getProfile();

        setUser(user);
      } catch {
        logout();
      } finally {
        setInitialized(true);
      }
    };

    checkAuth();
  }, [logout, setAccessToken, setInitialized, setUser]);

  return <>{children}</>;
};
