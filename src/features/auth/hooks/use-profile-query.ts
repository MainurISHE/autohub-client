import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/user.service";
import { useAuthStore } from "../store/auth.store";

export const useProfileQuery = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["profile"],
    queryFn: userService.getProfile,
    enabled: Boolean(accessToken),
  });
};
