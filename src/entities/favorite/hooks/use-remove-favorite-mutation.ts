import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteService } from "../api/favorite.service";
import { toast } from "sonner";

export const useRemoveFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoriteService.remove,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });

      toast.success("Car removed from favorites");
    },

    onError: () => {
      toast.error("Failed to remove car from favorites");
    },
  });
};
