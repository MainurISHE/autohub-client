import { PublicProfile } from "@/entities/user/model/types/user.types";
import type { User } from "@/features/auth/store/auth.store";
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
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>("/auth/profile");

    return response.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    const response = await apiClient.patch<User>("/auth/profile", data);

    return response.data;
  },

  getPublicProfile: async (id: number): Promise<PublicProfile> => {
    const response = await apiClient.get(`/users/${id}/public`);

    return response.data;
  },

  changeAvatar: async (file: File): Promise<User> => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await apiClient.patch<User>("/auth/avatar", formData);

    return response.data;
  },

  removeAvatar: async (): Promise<User> => {
    const response = await apiClient.delete<User>("/auth/avatar");

    return response.data;
  },

  changePassword: async (data: ChangePasswordData) => {
    const response = await apiClient.patch("/auth/change-password", data);

    return response.data;
  },
};
