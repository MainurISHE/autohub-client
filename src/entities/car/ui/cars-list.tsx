import Link from "next/link";

import { Car } from "../model/types/car.types";
import { CarCard } from "./car-card";
import React from "react";

interface CarsListProps {
  cars: Car[];
  actions?: (car: Car) => React.ReactNode;
}

export const CarsList = ({ cars, actions }: CarsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-2 xl:grid-cols-3">
      {cars.map((car) => (
        <div key={car.id}>
          <Link href={`/cars/${car.id}`}>
            <CarCard 
            car={car} />
          </Link>

          {actions?.(car)}
        </div>
      ))}
    </div>
  );
};
