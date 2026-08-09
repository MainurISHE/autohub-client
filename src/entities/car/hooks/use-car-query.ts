import { useQuery } from "@tanstack/react-query";
import { carService } from "../api/car.service";

export const useCarQuery = (id: number) => {
  return useQuery({
    queryKey: ["car", id],
    queryFn: () => carService.getById(id),
    enabled: !!id,
  });
};