"use client";

import { useState } from "react";

import { CarsHeader } from "@/widgets/cars/cars-header";
import { CarsGrid } from "@/widgets/cars/cars-grid";
import { useDebounce } from "@/shared/hooks/use-debounce";

export const CarsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <>
      <CarsHeader
        search={search}
        onSearchChange={handleSearchChange}
      />

      <CarsGrid
        search={debouncedSearch}
        page={page}
        limit={12}
        onPageChange={setPage}
      />
    </>
  );
};

export default CarsPage;
