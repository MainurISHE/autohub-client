"use client";

import { useCarsQuery } from "@/entities/car/hooks/use-cars-query";
import { CarCard } from "@/entities/car/ui/car-card";
import { Container } from "@/shared/ui/container";
import Link from "next/link";
import { useState } from "react";

interface CarsGridProps {
  search: string;
}

export const CarsGrid = ({ search }: CarsGridProps) => {
  const { data, isLoading, error } = useCarsQuery(search);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong.</div>;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-2 xl:grid-cols-3">
        {data?.data.map((car) => (
          <Link key={car.id} href={`/cars/${car.id}`}>
            <CarCard car={car} />
          </Link>
        ))}
      </div>
    </Container>
  );
};
