import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userService,
  UpdateProfileData,
} from "../api/user.service";
import { useAuthStore } from "../store/auth.store";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: (data: UpdateProfileData) =>
      userService.updateProfile(data),

    onSuccess: (data) => {
      setUser(data);

      queryClient.setQueryData(["profile"], data);
    },
  });
};