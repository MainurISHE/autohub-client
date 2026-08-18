import Image from "next/image";
import { Calendar, Gauge, Settings2 } from "lucide-react";

import { Car } from "../model/types/car.types";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={car.images[0]?.url ?? "/images/car-placeholder.jpg"}
          alt={`${car.brand.name} ${car.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Status */}
        <div className="absolute right-4 top-4">
          <span className="rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
            {car.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div>
          <p className="text-2xl font-bold">
            ${Number(car.price).toLocaleString()}
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {car.brand.name} {car.title}
          </h3>
        </div>

        {/* Specs */}
        <div className="mt-5 grid grid-cols-3 border-y border-border py-4">
          <div className="flex flex-col items-center gap-1 border-r border-border">
            <Calendar
              size={17}
              className="text-muted-foreground"
            />

            <span className="text-sm font-medium">
              {car.year}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1 border-r border-border">
            <Gauge
              size={17}
              className="text-muted-foreground"
            />

            <span className="text-sm font-medium">
              {car.mileage.toLocaleString()} km
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Settings2
              size={17}
              className="text-muted-foreground"
            />

            <span className="text-sm font-medium">
              {car.transmission}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};