"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";

import { CarsHeader } from "@/widgets/cars/cars-header";
import { CarsGrid } from "@/widgets/cars/cars-grid";
import { CarFilters } from "@/entities/car/model/types/car-filters.types";
import { CarsFilters } from "@/widgets/cars/cars-filters";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

const getOptionalNumberParam = (
  searchParams: URLSearchParams,
  key: string,
) => {
  const value = searchParams.get(key);

  return value ? Number(value) : undefined;
};

interface CarsHeaderControlsProps {
  filters: CarFilters;
  initialSearch: string;
  onFiltersChange: (filters: CarFilters) => void;
  onSearchChange: (value: string) => void;
}

const CarsHeaderControls = ({
  filters,
  initialSearch,
  onFiltersChange,
  onSearchChange,
}: CarsHeaderControlsProps) => {
  const [searchInput, setSearchInput] = useState(initialSearch);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== initialSearch) {
        onSearchChange(searchInput);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [initialSearch, onSearchChange, searchInput]);

  return (
    <CarsHeader search={searchInput} onSearchChange={setSearchInput}>
      <CarsFilters
        key={JSON.stringify(filters)}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
    </CarsHeader>
  );
};

const CarsPageContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";

  const page = Number(searchParams.get("page")) || 1;

  const filters: CarFilters = useMemo(
    () => ({
      brandId: getOptionalNumberParam(searchParams, "brandId"),
      status: searchParams.get("status") ?? undefined,
      fuelType: searchParams.get("fuelType") ?? undefined,
      bodyType: searchParams.get("bodyType") ?? undefined,
      driveType: searchParams.get("driveType") ?? undefined,
      transmission: searchParams.get("transmission") ?? undefined,
      color: searchParams.get("color") ?? undefined,
      minPrice: getOptionalNumberParam(searchParams, "minPrice"),
      maxPrice: getOptionalNumberParam(searchParams, "maxPrice"),
      sortBy: searchParams.get("sortBy") ?? undefined,
      order: searchParams.get("order") ?? undefined,
    }),
    [searchParams],
  );

  const updateUrl = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      const query = params.toString();

      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      updateUrl({
        search: value || undefined,
        page: "1",
      });
    },
    [updateUrl],
  );

  const handlePageChange = (newPage: number) => {
    updateUrl({
      page: String(newPage),
    });
  };

  const handleFiltersChange = (newFilters: CarFilters) => {
    const params = new URLSearchParams(searchParams.toString());

    filterKeys.forEach((key) => {
      const value = newFilters[key];

      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    params.set("page", "1");

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleResetFilters = () => {
    updateUrl({
      search: undefined,
      page: "1",
      brandId: undefined,
      status: undefined,
      fuelType: undefined,
      bodyType: undefined,
      driveType: undefined,
      transmission: undefined,
      color: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: undefined,
      order: undefined,
    });
  };

  return (
    <>
      <CarsHeaderControls
        key={search}
        filters={filters}
        initialSearch={search}
        onFiltersChange={handleFiltersChange}
        onSearchChange={handleSearchChange}
      />

      <CarsGrid
        search={search}
        page={page}
        limit={12}
        filters={filters}
        onPageChange={handlePageChange}
        onResetFilters={handleResetFilters}
      />
    </>
  );
};

export const CarsPage = () => {
  return (
    <Suspense fallback={null}>
      <CarsPageContent />
    </Suspense>
  );
};

export default CarsPage;
