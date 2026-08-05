import { Container } from "@/shared/ui/container";
import { CarsSearch } from "./cars-search";

interface CarsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const CarsHeader = ({
  search,
  onSearchChange,
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

          <CarsSearch 
          search={search}
          onSearchChange={onSearchChange}
          />
        </div>
      </Container>
    </section>
  );
};