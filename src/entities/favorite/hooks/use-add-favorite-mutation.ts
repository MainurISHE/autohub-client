import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteService } from "../api/favorite.service";

export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoriteService.add,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });
};
