import { apiClient } from "@/shared/api/api-client";

export interface UpdateProfileData {
  name?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  getProfile: async () => {
    const response = await apiClient.get("/auth/profile");

    return response.data;
  },

  updateProfile: async (data: UpdateProfileData) => {
    const response = await apiClient.patch("/auth/profile", data);

    return response.data;
  },

  changeAvatar: async (file: File) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await apiClient.patch("/auth/avatar", formData);

    return response.data;
  },

  removeAvatar: async () => {
    const response = await apiClient.delete("/auth/avatar");

    return response.data;
  },

  changePassword: async (data: ChangePasswordData) => {
    const response = await apiClient.patch(
      "/auth/change-password",
      data,
    );

    return response.data;
  },
};