"use client";

import { useEffect, useState } from "react";

import { CarsHeader } from "@/widgets/cars/cars-header";
import { CarsGrid } from "@/widgets/cars/cars-grid";
import { CarFilters } from "@/entities/car/model/types/car-filters.types";
import { CarsFilters } from "@/widgets/cars/cars-filters";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const CarsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const search = searchParams.get("search") ?? "";

  const page = Number(searchParams.get("page")) || 1;

  const filters: CarFilters = {
    brandId: searchParams.get("brandId")
      ? Number(searchParams.get("brandId"))
      : undefined,

    status: searchParams.get("status") ?? undefined,

    fuelType: searchParams.get("fuelType") ?? undefined,

    bodyType: searchParams.get("bodyType") ?? undefined,

    driveType: searchParams.get("driveType") ?? undefined,

    transmission: searchParams.get("transmission") ?? undefined,

    color: searchParams.get("color") ?? undefined,

    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,

    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,

    sortBy: searchParams.get("sortBy") ?? undefined,

    order: searchParams.get("order") ?? undefined,
  };

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const updateUrl = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput === search) {
        return;
      }

      updateUrl({
        search: searchInput || undefined,
        page: "1",
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handlePageChange = (newPage: number) => {
    updateUrl({
      page: String(newPage),
    });
  };

  const handleFiltersChange = (newFilters: CarFilters) => {
    const params = new URLSearchParams(searchParams.toString());

    const filterKeys: (keyof CarFilters)[] = [
      "brandId",
      "status",
      "fuelType",
      "bodyType",
      "driveType",
      "transmission",
      "color",
      "minPrice",
      "maxPrice",
      "sortBy",
      "order",
    ];

    filterKeys.forEach((key) => {
      const value = newFilters[key];

      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <CarsHeader search={searchInput} onSearchChange={handleSearchChange}>
        <CarsFilters filters={filters} onFiltersChange={handleFiltersChange} />
      </CarsHeader>

      <CarsGrid
        search={search}
        page={page}
        limit={12}
        filters={filters}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CarsPage;
