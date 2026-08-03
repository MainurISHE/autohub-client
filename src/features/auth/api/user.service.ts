import { apiClient } from "@/shared/api/api-client";

export const userService = {
  getProfile: async () => {
    const response = await apiClient.get("/auth/profile");

    return response.data;
  },
};
