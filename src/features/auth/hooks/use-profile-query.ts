import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/user.service";

export const useProfileQuery = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: userService.getProfile,
  });
};
