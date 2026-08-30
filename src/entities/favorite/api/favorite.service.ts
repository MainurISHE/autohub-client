import { apiClient } from "@/shared/api/api-client";
import type { Car } from "@/entities/car/model/types/car.types";

export const favoriteService = {
  getAll: async (): Promise<Car[]> => {
    const response = await apiClient.get("/favorites");

    return response.data;
  },

  add: async (carId: number) => {
    const response = await apiClient.post(`/favorites/${carId}`);

    return response.data;
  },

  remove: async (carId: number) => {
    const response = await apiClient.delete(`/favorites/${carId}`);

    return response.data;
  },
};