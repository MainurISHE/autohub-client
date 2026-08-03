import { apiClient } from "@/shared/api/api-client";

import { LoginDto } from "../model/dto/login.dto";
import { AuthResponse } from "../model/types/auth.types";
import { RegisterDto } from "../model/dto/register.dto";

export const authService = {
  login: async (data: LoginDto) => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);

    return response.data;
  },

  register: async (data: RegisterDto) => {
    const response = await apiClient.post<AuthResponse>("/auth/register", data)

    return response.data;
  },

  refresh: async () => {
    const response = await apiClient.post<AuthResponse>("/auth/refresh");

    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post("/auth/logout")

    return response.data
  }
};
