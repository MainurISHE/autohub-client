"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useFavoritesQuery } from "@/entities/favorite/hooks/use-favorites-query";
import { useAddFavoriteMutation } from "@/entities/favorite/hooks/use-add-favorite-mutation";
import { useRemoveFavoriteMutation } from "@/entities/favorite/hooks/use-remove-favorite-mutation";

interface FavoriteButtonProps {
  carId: number;
}

export const FavoriteButton = ({ carId }: FavoriteButtonProps) => {
  const { data: favorites, isLoading } = useFavoritesQuery();

  const addFavoriteMutation = useAddFavoriteMutation();
  const removeFavoriteMutation = useRemoveFavoriteMutation();

  const isFavorite =
    favorites?.some((favorite) => favorite.id === carId) ?? false;

  const isPending =
    addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  const handleClick = () => {
    if (isPending) {
      return;
    }

    if (isFavorite) {
      removeFavoriteMutation.mutate(carId);
    } else {
      addFavoriteMutation.mutate(carId);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleClick}
      disabled={isLoading || isPending}
      aria-label={
        isFavorite ? "Remove from favorites" : "Add to favorites"
      }
    >
      <Heart
        className={`h-5 w-5 ${
          isFavorite ? "fill-current text-red-500" : ""
        }`}
      />
    </Button>
  );
};