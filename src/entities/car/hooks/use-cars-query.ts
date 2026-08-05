import { useQuery } from "@tanstack/react-query";
import { carService } from "../api/car.service";

export const useCarsQuery = (search?: string) => {
  return useQuery({
    queryKey: ["cars", search],
    queryFn: () => carService.getAll(search),
  });
};