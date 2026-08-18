"use client";

import { useMyCarsQuery } from "@/entities/car/hooks/use-my-cars-query";
import { Container } from "@/shared/ui/container";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { MyCarCard } from "@/entities/car/ui/my-car-card";
import { MyCarCardSkeleton } from "@/entities/car/ui/my-car-card-skeleton";

export default function MyCarsPage() {
  const { data, isLoading, error } = useMyCarsQuery();
  const router = useRouter();

  if (isLoading) {
    return (
      <Container>
        <section className="py-10">
          <div className="mb-8">
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />

            <div className="mt-3 h-10 w-40 animate-pulse rounded-md bg-muted" />

            <div className="mt-3 h-5 w-72 animate-pulse rounded-md bg-muted" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <MyCarCardSkeleton key={index} />
            ))}
          </div>
        </section>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <section className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold">Failed to load your cars</h2>

          <p className="mt-2 max-w-md text-muted-foreground">
            Something went wrong while loading your listings. Please try again.
          </p>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section className="py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
              AutoHub
            </span>

            <h1 className="mt-2 text-4xl font-bold tracking-tight">My Cars</h1>

            <p className="mt-2 text-muted-foreground">
              Manage the cars you have listed on AutoHub.
            </p>
          </div>

          <Button onClick={() => router.push("/create-car")}>Add Car</Button>
        </div>

        {data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-xl font-semibold">
              You don't have any cars yet
            </h2>

            <p className="mt-2 text-muted-foreground">
              Add your first car and start selling on AutoHub.
            </p>

            <Button className="mt-6" onClick={() => router.push("/create-car")}>
              Add your first car
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data?.map((car) => (
              <MyCarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}
