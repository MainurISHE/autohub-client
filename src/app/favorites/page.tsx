"use client";

import { useFavoritesQuery } from "@/entities/favorite/hooks/use-favorites-query";
import { CarCard } from "@/entities/car/ui/car-card";
import { Container } from "@/shared/ui/container";

export default function FavoritesPage() {
  const { data: favorites, isLoading, error } = useFavoritesQuery();

  if (isLoading) {
    return (
      <Container>
        <div className="flex min-h-[500px] items-center justify-center">
          Loading favorites...
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold">
            Failed to load favorites
          </h2>

          <p className="mt-2 text-muted-foreground">
            Something went wrong while loading your favorite cars.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="py-10">
        <div>
          <h1 className="text-3xl font-bold">Favorites</h1>

          <p className="mt-2 text-muted-foreground">
            Cars you have saved
          </p>
        </div>

        {!favorites || favorites.length === 0 ? (
          <div className="mt-10 flex min-h-[300px] items-center justify-center rounded-2xl border">
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                No favorite cars
              </h2>

              <p className="mt-2 text-muted-foreground">
                Cars you add to favorites will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}