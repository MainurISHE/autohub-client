import { apiClient } from "@/shared/api/api-client";
import { Car, CarsResponse } from "../model/types/car.types";
import { CreateCarDto } from "../model/dto/create-car.dto";
import { CarOptions } from "../model/types/car-options.types";

export const carService = {
  getAll: async (search?: string): Promise<CarsResponse> => {
    const response = await apiClient.get<CarsResponse>("/cars", {
      params: {
        search,
      },
    });

    return response.data;
  },

  getById: async (id: number): Promise<Car> => {
    const response = await apiClient.get<Car>(`/cars/${id}`);

    return response.data
  },

  getOptions: async (): Promise<CarOptions> => {
    const response = await apiClient.get<CarOptions>("/cars/options");

    return response.data;
  },

  create: async (data: CreateCarDto) => {
    const response = await apiClient.post("/cars", data);

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
