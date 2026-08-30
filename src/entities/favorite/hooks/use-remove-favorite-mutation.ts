import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteService } from "../api/favorite.service";

export const useRemoveFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoriteService.remove,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });
};
