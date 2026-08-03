"use client";

import { PropsWithChildren, useEffect } from "react";
import { authService } from "@/features/auth/api/auth.service";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { userService } from "@/features/auth/api/user.service";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { setAccessToken, setUser, setInitialized } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { accessToken } = await authService.refresh();
        console.log("1. После refresh:", accessToken);

        setAccessToken(accessToken);
        console.log("2. В сторе:", useAuthStore.getState().accessToken);

        const user = await userService.getProfile();

        setUser(user);

      } catch (error) {
        console.log("Пользователь не авторизован");

      } finally {
        setInitialized(true)
      }
    };

    checkAuth();
  }, [setAccessToken, setUser]);

  return <>{children}</>;
};
