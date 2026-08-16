import { useQuery } from "@tanstack/react-query";
import { carService } from "../api/car.service";

export const useMyCarsQuery = () => {
  return useQuery({
    queryKey: ["my-cars"],
    queryFn: () => carService.getMyCars(),
  });
};
