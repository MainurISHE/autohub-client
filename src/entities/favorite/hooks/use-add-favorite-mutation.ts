import { useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteService } from "../api/favorite.service";
import { toast } from "sonner";

export const useAddFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: favoriteService.add,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });

      toast.success("Car added to favorites");
    },

    onError: () => {
      toast.error("Failed to add car to favorites");
    },
  });
};
