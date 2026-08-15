import { useQuery } from "@tanstack/react-query";
import { carService } from "../api/car.service";

interface UseCarsQueryParams {
  page?: number;
  limit?: number;
  search?: string;

  brandId?: number;
  status?: string;
  fuelType?: string;
  bodyType?: string;
  driveType?: string;
  transmission?: string;
  color?: string;

  minPrice?: number;
  maxPrice?: number;

  sortBy?: string;
  order?: string;
}

export const useCarsQuery = ({
  page = 1,
  limit = 12,
  search,
  brandId,
  status,
  fuelType,
  bodyType,
  driveType,
  transmission,
  color,
  minPrice,
  maxPrice,
  sortBy,
  order,
}: UseCarsQueryParams = {}) => {
  return useQuery({
    queryKey: [
      "cars",
      {
        page,
        limit,
        search,
        brandId,
        status,
        fuelType,
        bodyType,
        driveType,
        transmission,
        color,
        minPrice,
        maxPrice,
        sortBy,
        order,
      },
    ],
    queryFn: () =>
      carService.getAll({
        page,
        limit,
        search,
        brandId,
        status,
        fuelType,
        bodyType,
        driveType,
        transmission,
        color,
        minPrice,
        maxPrice,
        sortBy,
        order,
      }),
  });
};
