"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { useAuthStore } from "../store/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogoutMutation = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,

    onSuccess: () => {
      toast.success("Logged out successfully");

      logout();

      queryClient.clear();

      router.replace("/login");
    },

    onError: () => {
      toast.error("Failed to logout");
    },
  });
};
