import { apiClient } from "@/shared/api/api-client";
import { Car, CarsResponse } from "../model/types/car.types";
import { CreateCarDto } from "../model/dto/create-car.dto";
import { CarOptions } from "../model/types/car-options.types";

interface GetCarsParams {
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

export const carService = {
  getAll: async ({
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
  }: GetCarsParams = {}): Promise<CarsResponse> => {
    const response = await apiClient.get<CarsResponse>("/cars", {
      params: {
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
    });

    return response.data;
  },

  getById: async (id: number): Promise<Car> => {
    const response = await apiClient.get<Car>(`/cars/${id}`);

    return response.data;
  },

  getOptions: async (): Promise<CarOptions> => {
    const response = await apiClient.get<CarOptions>("/cars/options");

    return response.data;
  },

  create: async (data: CreateCarDto) => {
    const response = await apiClient.post("/cars", data);

    return response.data;
  },

  update: async (id: number, data: CreateCarDto) => {
    const response = await apiClient.patch(`/cars/${id}`, data);

    return response.data;
  },

  remove: async (id: number) => {
    const response = await apiClient.delete(`/cars/${id}`);

    return response.data;
  },

  deleteImage: async (publicId: string) => {
    const response = await apiClient.delete("/cloudinary/:publicId", {
      data: {
        publicId,
      },
    });

    return response.data;
  },
};
