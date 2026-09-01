import { useMutation } from "@tanstack/react-query";
import { authService } from "../api/auth.service";
import { useAuthStore } from "../store/auth.store";
import { userService } from "../api/user.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getSafeRedirect } from "../lib/get-safe-redirect";

export const useLoginMutation = (redirectUrl?: string | null) => {
  const { setAccessToken, setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.login,

    onSuccess: async ({ accessToken }) => {
      toast.success("Logged in successfully");

      setAccessToken(accessToken);

      const user = await userService.getProfile();

      setUser(user);

      router.replace(getSafeRedirect(redirectUrl) ?? "/profile");
    },

    onError: () => {
      toast.error("Invalid email or password");
    },
  });
};
