import Image from "next/image";
import { Calendar, Gauge, Settings2 } from "lucide-react";

import { CarActions } from "./car-actions";

import { Car } from "../model/types/car.types";

interface MyCarCardProps {
  car: Car;
}

export const MyCarCard = ({ car }: MyCarCardProps) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={car.images[0]?.url ?? "/images/car-placeholder.jpg"}
          alt={car.title}
          fill
          className="object-cover"
        />

        {/* Status */}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            {car.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-4">
        <div>
          <p className="text-2xl font-bold text-primary">
            ${Number(car.price).toLocaleString()}
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {car.brand.name} {car.title}
          </h3>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-3 border-y border-border py-4 text-sm text-muted-foreground text-center">
          <div className="flex flex-col items-center gap-1">
            <Calendar size={17} />
            <span>{car.year}</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Gauge size={17} />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Settings2 size={17} />
            <span>{car.transmission}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center p-4">
        <CarActions carId={car.id} />
      </div>
    </article>
  );
};
