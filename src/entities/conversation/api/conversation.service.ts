import { apiClient } from "@/shared/api/api-client";
import { Conversation } from "../model/types/conversation.types";

export const conversationService = {
  getAll: async () => {
    const response = await apiClient.get<Conversation[]>("/conversations");

    return response.data;
  },

  create: async (receiverId: number) => {
    const response = await apiClient.post<Conversation>("/conversations", {
      receiverId,
    });

    return response.data;
  },
};
