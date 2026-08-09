import { useQuery } from "@tanstack/react-query";
import { carService } from "../api/car.service";

export const useCarOptionsQuery = () => {
  return useQuery({
    queryKey: ["car-options"],
    queryFn: carService.getOptions,
  });
};