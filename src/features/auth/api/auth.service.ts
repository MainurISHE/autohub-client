import { apiClient } from "@/shared/api/api-client";

import { LoginDto } from "../model/dto/login.dto";
import { AuthResponse } from "../model/types/auth.types";

export const authService = {
  login: async (data: LoginDto) => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);

    return response.data;
  },

  refresh: async () => {
    const response = await apiClient.post<AuthResponse>("/auth/refresh");

    return response.data;
  },
};
