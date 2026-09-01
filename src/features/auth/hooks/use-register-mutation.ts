"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { userService } from "../api/user.service";
import { toast } from "sonner";
import { getSafeRedirect } from "../lib/get-safe-redirect";

export const useRegisterMutation = (returnUrl?: string | null) => {
  const { setAccessToken, setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.register,

    onSuccess: async ({ accessToken }) => {
      toast.success("Account created successfully");

      setAccessToken(accessToken);

      const user = await userService.getProfile();

      setUser(user);

      router.replace(getSafeRedirect(returnUrl) ?? "/profile");
    },

    onError: () => {
      toast.error("Failed to create account");
    },
  });
};
