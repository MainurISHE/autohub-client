import { useQuery } from "@tanstack/react-query";
import { userService } from "@/features/auth/api/user.service";

export const usePublicProfileQuery = (id: number) => {
  return useQuery({
    queryKey: ["public-profile", id],
    queryFn: () => userService.getPublicProfile(id),
    enabled: Boolean(id),
  });
};