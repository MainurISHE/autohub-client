import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { useAuthStore } from "../store/auth.store";
import { userService } from "../api/user.service";
import { useRouter } from "next/navigation";


export const useLoginMutation = () => {
  const { setAccessToken, setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,

    onSuccess: async ({ accessToken }) => {
      setAccessToken(accessToken);

      const user = await userService.getProfile();

      setUser(user);

      router.replace("/profile")
      console.log("Успешный вход");
    },

    onError: (error) => {
      console.log(error);
    },
  });
};
