"use client";

import { useMyCarsQuery } from "@/entities/car/hooks/use-my-cars-query";
import { CarsList } from "@/entities/car/ui/cars-list";
import { Container } from "@/shared/ui/container";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { CarActions } from "@/entities/car/ui/car-actions";

export default function MyCarsPage() {
  const { data, isLoading, error } = useMyCarsQuery();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);

    return <pre>{JSON.stringify(error, null, 2)}</pre>;
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
          <CarsList cars={data ?? []} actions={(car) => <CarActions carId={car.id} />} />
        )}
      </section>
    </Container>
  );
}
