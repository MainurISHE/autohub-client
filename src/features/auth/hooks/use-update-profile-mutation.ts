import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService, UpdateProfileData } from "../api/user.service";
import { useAuthStore } from "../store/auth.store";
import { toast } from "sonner";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: UpdateProfileData) => userService.updateProfile(data),

    onSuccess: (data) => {
      toast.success("Profile updated");

      setUser(data);

      queryClient.setQueryData(["profile"], data);
    },

    onError: () => {
      toast.error("Failed to update profile");
    },
  });
};
