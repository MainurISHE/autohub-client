"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
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

import { SlidersHorizontal } from "lucide-react";

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

  const handleApply = () => {
    onFiltersChange(draftFilters);
  };

  const handleReset = () => {
    setDraftFilters({});
    onFiltersChange({});
  };

  return (
    <div className="flex justify-end">
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="default" className="h-12 w-32">
              Filters <SlidersHorizontal />
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

          <div className="flex flex-col gap-4 p-4">
            {/* Brand */}
            <Select
              value={draftFilters.brandId?.toString() ?? ""}
              onValueChange={(value) => {
                setDraftFilters({
                  ...draftFilters,
                  brandId: value ? Number(value) : undefined,
                });
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

            {/* Fuel */}
            <CarFilterSelect
              placeholder="Fuel"
              value={draftFilters.fuelType}
              options={options?.fuelTypes ?? []}
              onChange={(value) => {
                setDraftFilters({
                  ...draftFilters,
                  fuelType: value ?? undefined,
                });
              }}
            />

            {/* Transmission */}
            <CarFilterSelect
              placeholder="Transmission"
              value={draftFilters.transmission}
              options={options?.transmissions ?? []}
              onChange={(value) => {
                setDraftFilters({
                  ...draftFilters,
                  transmission: value ?? undefined,
                });
              }}
            />

            {/* Body */}
            <CarFilterSelect
              placeholder="Body type"
              value={draftFilters.bodyType}
              options={options?.bodyTypes ?? []}
              onChange={(value) => {
                setDraftFilters({
                  ...draftFilters,
                  bodyType: value ?? undefined,
                });
              }}
            />

            {/* Drive */}
            <CarFilterSelect
              placeholder="Drive"
              value={draftFilters.driveType}
              options={options?.driveTypes ?? []}
              onChange={(value) => {
                setDraftFilters({
                  ...draftFilters,
                  driveType: value ?? undefined,
                });
              }}
            />

            {/* Color */}
            <CarFilterSelect
              placeholder="Color"
              value={draftFilters.color}
              options={options?.colors ?? []}
              onChange={(value) => {
                setDraftFilters({
                  ...draftFilters,
                  color: value ?? undefined,
                });
              }}
            />

            {/* Status */}
            <CarFilterSelect
              placeholder="Status"
              value={draftFilters.status}
              options={options?.statuses ?? []}
              onChange={(value) => {
                setDraftFilters({
                  ...draftFilters,
                  status: value ?? undefined,
                });
              }}
            />
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
    </div>
  );
};
