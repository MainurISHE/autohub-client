import { ReactNode } from "react";
import { Container } from "@/shared/ui/container";
import { CarsSearch } from "./cars-search";

interface CarsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  children?: ReactNode;
}

export const CarsHeader = ({
  search,
  onSearchChange,
  children,
}: CarsHeaderProps) => {
  return (
    <section className="py-10">
      <Container>
        <div className="space-y-6">
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
              AutoHub
            </span>

            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              Find your perfect car
            </h1>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Browse thousands of verified vehicles from trusted sellers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <CarsSearch
                search={search}
                onSearchChange={onSearchChange}
              />
            </div>

            {children}
          </div>
        </div>
      </Container>
    </section>
  );
};