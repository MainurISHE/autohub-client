"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { userService } from "../api/user.service";

export const useRegisterMutation = () => {
  const { setAccessToken, setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,

    onSuccess: async ({ accessToken }) => {
      setAccessToken(accessToken);

      const user = await userService.getProfile();

      setUser(user);

      router.replace("/profile");
      console.log("Успешная регистрация");
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
