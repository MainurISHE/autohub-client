"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { userService } from "../api/user.service";

export const useRegisterMutation = () => {
  const { setAccessToken, setUser } = useAuthStore();
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const returnUrl = searchParams.get("returnUrl");

  return useMutation({
    mutationFn: authService.register,

    onSuccess: async ({ accessToken }) => {
      setAccessToken(accessToken);

      const user = await userService.getProfile();

      setUser(user);

      router.replace(returnUrl ?? "/profile");
      console.log("Успешная регистрация");
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
