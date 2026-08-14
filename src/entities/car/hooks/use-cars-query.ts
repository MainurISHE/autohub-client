import { useQuery } from "@tanstack/react-query";
import { carService } from "../api/car.service";

interface UseCarsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const useCarsQuery = ({page = 1, limit = 12, search}: UseCarsQueryParams = {}) => {
  return useQuery({
    queryKey: ["cars", page, limit, search],
    queryFn: () => carService.getAll({
      page,
      limit,
      search,
    }),
  });
};
