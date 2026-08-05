import Image from "next/image";
import { Calendar, Gauge, Settings2 } from "lucide-react";

import { Car } from "../model/types/car.types";

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={car.images[0]?.url ?? "/images/car-placeholder.jpg"}
          alt={car.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-2xl font-bold text-primary">
            ${Number(car.price).toLocaleString()}
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            {car.brand.name} {car.title}
          </h3>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{car.year}</span>
          </div>

          <div className="flex items-center gap-2">
            <Gauge size={18} />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>

          <div className="flex items-center gap-2">
            <Settings2 size={18} />
            <span>{car.transmission}</span>
          </div>
        </div>
      </div>
    </article>
  );
};