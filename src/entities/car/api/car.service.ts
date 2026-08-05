import { apiClient } from "@/shared/api/api-client";
import { CarsResponse } from "../model/types/car.types";
import { CreateCarDto } from "../model/dto/create-car.dto";

export const carService = {
  getAll: async (search?: string): Promise<CarsResponse> => {
    const response = await apiClient.get<CarsResponse>("/cars", {
      params: {
        search,
      }
    });

    return response.data;
  },

  create: async (data: CreateCarDto) => {
    const response = await apiClient.post("/cars", data);

    return response.data;
  },
};
