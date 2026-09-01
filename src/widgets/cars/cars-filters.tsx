"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CarFilters } from "@/entities/car/model/types/car-filters.types";
import { useBrandQuery } from "@/entities/brand/hooks/use-brands-query";
import { useCarOptionsQuery } from "@/entities/car/hooks/use-car-options-query";

import { CarFilterSelect } from "./car-filter-select";

interface CarsFiltersProps {
  filters: CarFilters;
  onFiltersChange: (filters: CarFilters) => void;
}

export const CarsFilters = ({ filters, onFiltersChange }: CarsFiltersProps) => {
  const { data: options } = useCarOptionsQuery();
  const { data: brands = [] } = useBrandQuery();

  const [draftFilters, setDraftFilters] = useState<CarFilters>(filters);

  const updateDraftFilter = <Key extends keyof CarFilters>(
    key: Key,
    value: CarFilters[Key] | null,
  ) => {
    setDraftFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value === "" || value === null ? undefined : value,
    }));
  };

  const handleApply = () => {
    onFiltersChange(draftFilters);
  };

  const handleReset = () => {
    setDraftFilters({});
    onFiltersChange({});
  };

  const activeFiltersCount =
    Object.entries(filters).filter(
      ([key, value]) =>
        key !== "sortBy" &&
        key !== "order" &&
        value !== undefined &&
        value !== "",
    ).length + (filters.sortBy && filters.order ? 1 : 0);

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="default" className="h-10 w-36">
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-1 rounded-full bg-primary-foreground/20 px-1.5 text-xs">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        }
      />

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>

          <SheetDescription>
            Filter cars by their characteristics.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 overflow-y-auto p-4">
          {/* Brand */}
          <div className="space-y-2">
            <Label>Brand</Label>

            <Select
              value={draftFilters.brandId?.toString() ?? ""}
              onValueChange={(value) => {
                updateDraftFilter("brandId", value ? Number(value) : undefined);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Brand">
                  {
                    brands.find((brand) => brand.id === draftFilters.brandId)
                      ?.name
                  }
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fuel */}
          <div className="space-y-2">
            <Label>Fuel</Label>

            <CarFilterSelect
              placeholder="Fuel"
              value={draftFilters.fuelType}
              options={options?.fuelTypes ?? []}
              onChange={(value) => {
                updateDraftFilter("fuelType", value);
              }}
            />
          </div>

          {/* Transmission */}
          <div className="space-y-2">
            <Label>Transmission</Label>

            <CarFilterSelect
              placeholder="Transmission"
              value={draftFilters.transmission}
              options={options?.transmissions ?? []}
              onChange={(value) => {
                updateDraftFilter("transmission", value);
              }}
            />
          </div>

          {/* Body */}
          <div className="space-y-2">
            <Label>Body type</Label>

            <CarFilterSelect
              placeholder="Body type"
              value={draftFilters.bodyType}
              options={options?.bodyTypes ?? []}
              onChange={(value) => {
                updateDraftFilter("bodyType", value);
              }}
            />
          </div>

          {/* Drive */}
          <div className="space-y-2">
            <Label>Drive</Label>

            <CarFilterSelect
              placeholder="Drive"
              value={draftFilters.driveType}
              options={options?.driveTypes ?? []}
              onChange={(value) => {
                updateDraftFilter("driveType", value);
              }}
            />
          </div>

          {/* Color */}
          <div className="space-y-2">
            <Label>Color</Label>

            <CarFilterSelect
              placeholder="Color"
              value={draftFilters.color}
              options={options?.colors ?? []}
              onChange={(value) => {
                updateDraftFilter("color", value);
              }}
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>

            <CarFilterSelect
              placeholder="Status"
              value={draftFilters.status}
              options={options?.statuses ?? []}
              onChange={(value) => {
                updateDraftFilter("status", value);
              }}
            />
          </div>

          <div className="space-y-2">
            <Label>Sort by</Label>

            <Select
              value={
                draftFilters.sortBy && draftFilters.order
                  ? `${draftFilters.sortBy}-${draftFilters.order}`
                  : ""
              }
              onValueChange={(value) => {
                if (!value) return;

                const [sortBy, order] = value.split("-");

                setDraftFilters((currentFilters) => ({
                  ...currentFilters,
                  sortBy,
                  order,
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="price-asc">Price: low to high</SelectItem>

                <SelectItem value="price-desc">Price: high to low</SelectItem>

                <SelectItem value="year-desc">Year: newest first</SelectItem>

                <SelectItem value="year-asc">Year: oldest first</SelectItem>

                <SelectItem value="mileage-asc">
                  Mileage: low to high
                </SelectItem>

                <SelectItem value="mileage-desc">
                  Mileage: high to low
                </SelectItem>

                <SelectItem value="createdAt-desc">Newest listings</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label>Price</Label>

            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min"
                value={draftFilters.minPrice ?? ""}
                onChange={(event) => {
                  updateDraftFilter(
                    "minPrice",
                    event.target.value ? Number(event.target.value) : undefined,
                  );
                }}
              />

              <Input
                type="number"
                placeholder="Max"
                value={draftFilters.maxPrice ?? ""}
                onChange={(event) => {
                  updateDraftFilter(
                    "maxPrice",
                    event.target.value ? Number(event.target.value) : undefined,
                  );
                }}
              />
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>

          <SheetClose
            render={<Button onClick={handleApply}>Apply filters</Button>}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
