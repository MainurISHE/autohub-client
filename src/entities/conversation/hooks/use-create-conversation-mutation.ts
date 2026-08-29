import { useMutation, useQueryClient } from "@tanstack/react-query";
import { conversationService } from "../api/conversation.service";

export const useCreateConversationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (receiverId: number) =>
      conversationService.create(receiverId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
};