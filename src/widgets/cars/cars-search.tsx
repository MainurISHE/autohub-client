"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CarsSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const CarsSearch = ({
    search,
    onSearchChange
}: CarsSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

      <Input
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by brand or model..."
        className="h-12 pl-12"
      />
    </div>
  );
};