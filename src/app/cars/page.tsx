"use client";

import { useState } from "react";

import { CarsHeader } from "@/widgets/cars/cars-header";
import { CarsGrid } from "@/widgets/cars/cars-grid";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { CarFilters } from "@/entities/car/model/types/car-filters.types";
import { CarsFilters } from "@/widgets/cars/cars-filters";

export const CarsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<CarFilters>({});

  const debouncedSearch = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <>
      <CarsHeader search={search} onSearchChange={handleSearchChange}>
        <CarsFilters
          filters={filters}
          onFiltersChange={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
          }}
        />
      </CarsHeader>

      <CarsGrid
        search={debouncedSearch}
        page={page}
        limit={12}
        filters={filters}
        onPageChange={setPage}
      />
    </>
  );
};

export default CarsPage;
