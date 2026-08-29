import { useQuery } from "@tanstack/react-query";
import { messageService } from "../api/message.service";

export const useMessagesQuery = (conversationId: number) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => messageService.getAll(conversationId),
    enabled: conversationId !== null,
  });
};