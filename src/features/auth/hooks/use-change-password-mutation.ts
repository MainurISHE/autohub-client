"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import {
  ChangePasswordData,
  userService,
} from "@/features/auth/api/user.service";

import { useAuthStore } from "@/features/auth/store/auth.store";

export const useChangePasswordMutation = () => {
  const logout = useAuthStore((state) => state.logout);

  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ChangePasswordData) =>
      userService.changePassword(data),

    onSuccess: () => {
      logout();

      queryClient.clear();

      router.replace("/login");
    },
  });
};