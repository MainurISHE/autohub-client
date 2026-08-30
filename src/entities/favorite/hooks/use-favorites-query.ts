import { useQuery } from "@tanstack/react-query";
import { favoriteService } from "../api/favorite.service";

export const useFavoritesQuery = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: favoriteService.getAll,
  });
};
