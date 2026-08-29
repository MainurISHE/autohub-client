import { apiClient } from "@/shared/api/api-client";
import { Message } from "../model/types/message.types";

export const messageService = {
  getAll: async (conversationId: number) => {
    const response = await apiClient.get<Message[]>(
      `/messages/${conversationId}`,
    );

    return response.data;
  },

  markAsRead: async (conversationId: number) => {
    const response = await apiClient.patch(`/messages/${conversationId}/read`);

    return response.data;
  },

  create: async (conversationId: number, content: string) => {
    const response = await apiClient.post<Message>("/messages", {
      conversationId,
      content,
    });

    return response.data;
  },
};
