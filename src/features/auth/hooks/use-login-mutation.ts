import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { useAuthStore } from "../store/auth.store";

export const useLoginMutation = () => {
  const { setAccessToken } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,

    onSuccess: ({ accessToken }) => {
      console.log("ACCESS TOKEN:", accessToken);

      setAccessToken(accessToken);

      console.log("STORE:", useAuthStore.getState());

      console.log("Успешный вход");
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
