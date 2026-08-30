import { useCarsQuery } from "@/entities/car/hooks/use-cars-query";
import { CarCard } from "@/entities/car/ui/car-card";
import { Container } from "@/shared/ui/container";
import Link from "next/link";
import { CarsPagination } from "./cars-pagination";
import { CarFilters } from "@/entities/car/model/types/car-filters.types";

import { CarCardSkeleton } from "@/entities/car/ui/car-card-skeleton";
import { Button } from "@/components/ui/button";

interface CarsGridProps {
  page: number;
  limit: number;
  search: string;
  filters: CarFilters;
  onPageChange: (page: number) => void;
  onResetFilters: () => void;
}

export const CarsGrid = ({
  page,
  limit,
  search,
  filters,
  onPageChange,
  onResetFilters,
}: CarsGridProps) => {
  const { data, isLoading, error } = useCarsQuery({
    page,
    limit,
    search,
    ...filters,
  });

  if (isLoading) {
    return (
      <Container>
        <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    );
  }
  if (error) {
    return <div>Something went wrong.</div>;
  }

  if (!data?.data.length) {
    return (
      <Container>
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-semibold">No cars found</h2>

          <p className="mt-2 max-w-md text-muted-foreground">
            Try changing your search or filters to find more cars.
          </p>

          <Button variant="outline" className="mt-6" onClick={onResetFilters}>
            Reset filters
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {data?.meta.total ?? 0}
          </span>{" "}
          cars found
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-2 xl:grid-cols-3">
        {data?.data.map((car) => (
          <CarCard key={car.id} car={car} />
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
