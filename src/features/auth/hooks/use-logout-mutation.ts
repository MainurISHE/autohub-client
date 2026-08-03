import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { useAuthStore } from "../store/auth.store";
import { useRouter } from "next/navigation";

export const useLogoutMutation = () => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,

    onSuccess: () => {
      logout();

      queryClient.clear();

      router.push("/login")
    },

    onError: () => {
        console.log("Что то не так :/")
    }
  });
};
