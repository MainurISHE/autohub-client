import { apiClient } from "@/shared/api/api-client";
import { Brand } from "../model/types/brand.types";

export const brandService = {
  getAll: async (): Promise<Brand[]> => {
    const response = await apiClient.get<Brand[]>("/brands");

    return response.data;
  },
};
