import { apiClient } from "@/shared/api/api-client";

export const uploadService = {
  upload: async (file: File) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await apiClient.post(
      "/cloudinary/upload",
      formData
    );

    return response.data;
  },
};