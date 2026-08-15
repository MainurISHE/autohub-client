import { useCarsQuery } from "@/entities/car/hooks/use-cars-query";
import { CarCard } from "@/entities/car/ui/car-card";
import { Container } from "@/shared/ui/container";
import Link from "next/link";
import { CarsPagination } from "./cars-pagination";
import { CarFilters } from "@/entities/car/model/types/car-filters.types";

interface CarsGridProps {
  page: number;
  limit: number;
  search: string;
  filters: CarFilters;
  onPageChange: (page: number) => void;
}

export const CarsGrid = ({
  page,
  limit,
  search,
  filters,
  onPageChange,
}: CarsGridProps) => {
  const { data, isLoading, error } = useCarsQuery({ page, limit, search, ...filters });

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

      <CarsPagination
        page={page}
        totalPages={data?.meta.totalPages ?? 1}
        hasNextPage={data?.meta.hasNextPage ?? false}
        hasPreviousPage={data?.meta.hasPreviousPage ?? false}
        onPageChange={onPageChange}
      />
    </Container>
  );
};
