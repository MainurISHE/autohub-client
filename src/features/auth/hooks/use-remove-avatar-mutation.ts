import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { userService } from "../api/user.service";

export const useRemoveAvatarMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: userService.removeAvatar,

    onSuccess: (data) => {
      toast.success("Avatar removed");

      setUser(data);

      queryClient.setQueryData(["profile"], data);
    },

    onError: () => {
      toast.error("Failed to remove avatar");
    },
  });
};
