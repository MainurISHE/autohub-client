"use client";

import { useState } from "react";

import { CarsHeader } from "@/widgets/cars/cars-header";
import { CarsGrid } from "@/widgets/cars/cars-grid";
import { useDebounce } from "@/shared/hooks/use-debounce";

export default function CarsPage() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500)

  return (
    <>
      <CarsHeader
        search={search}
        onSearchChange={setSearch}
      />

      <CarsGrid
        search={debouncedSearch}
      />
    </>
  );
}