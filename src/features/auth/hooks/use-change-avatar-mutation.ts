import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { userService } from "../api/user.service";
import { toast } from "sonner";

export const useChangeAvatarMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (file: File) => userService.changeAvatar(file),

    onSuccess: (data) => {
      toast.success("Avatar updated");

      setUser(data);

      queryClient.setQueryData(["profile"], data);
    },

    onError: () => {
      toast.error("Failed to update avatar");
    },
  });
};
