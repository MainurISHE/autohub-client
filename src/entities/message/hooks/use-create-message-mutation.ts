import { useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService } from "../api/message.service";

interface CreateMessageVariables {
  conversationId: number;
  content: string;
}

export const useCreateMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      content,
    }: CreateMessageVariables) =>
      messageService.create(conversationId, content),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.conversationId],
      });

      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
};