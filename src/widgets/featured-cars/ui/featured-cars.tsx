"use client";

import { ArrowRight } from "lucide-react";

import { useCarsQuery } from "@/entities/car/hooks/use-cars-query";
import { CarCard } from "@/entities/car/ui/car-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const FeaturedCars = () => {
  const router = useRouter();
  const { data, isLoading } = useCarsQuery({
    page: 1,
    limit: 6,
    sortBy: "createdAt",
    order: "desc",
  });

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-5 w-72 animate-pulse rounded bg-muted" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[430px] animate-pulse rounded-2xl bg-muted"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data?.data?.length) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Latest listings
            </p>

            <h2 className="mt-1 text-3xl font-bold tracking-tight">
              Featured Cars
            </h2>

            <p className="mt-2 text-muted-foreground">
              Explore the latest cars added to AutoHub.
            </p>
          </div>

          <Button variant="default" onClick={() => router.push("/cars")}>
            View all cars
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.data.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};
