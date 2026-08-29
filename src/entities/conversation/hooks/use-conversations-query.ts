import { useQuery } from "@tanstack/react-query";
import { conversationService } from "../api/conversation.service";

export const useConversationsQuery = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: conversationService.getAll,
  });
};