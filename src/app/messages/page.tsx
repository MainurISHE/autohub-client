"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { MessageChat } from "@/entities/message/ui/message-chat";
import { ConversationItem } from "@/entities/conversation/ui/conversation-item";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { useConversationsQuery } from "@/entities/conversation/hooks/use-conversations-query";

import { socket } from "@/shared/api/socket";

export default function MessagesPage() {
  const { user, accessToken } = useAuthStore();

  const queryClient = useQueryClient();

  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  const { data: conversations, isLoading, error } = useConversationsQuery();

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    socket.auth = {
      token: accessToken,
    };

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [accessToken]);

  useEffect(() => {
    const handleMessage = (message: {
      id: number;
      conversationId: number;
      content: string;
      senderId: number;
      createdAt: string;
    }) => {
      queryClient.setQueriesData(
        {
          predicate: (query) => {
            return query.queryKey[0] === "conversations";
          },
        },
        (oldData: any) => {
          if (!oldData) {
            return oldData;
          }

          const updatedConversations = oldData.map((conversation: any) => {
            if (conversation.id !== message.conversationId) {
              return conversation;
            }

            return {
              ...conversation,

              messages: [
                {
                  id: message.id,
                  content: message.content,
                  senderId: message.senderId,
                  createdAt: message.createdAt,
                },
              ],
            };
          });

          return [...updatedConversations].sort(
            (a: any, b: any) =>
              new Date(b.messages[0]?.createdAt ?? 0).getTime() -
              new Date(a.messages[0]?.createdAt ?? 0).getTime(),
          );
        },
      );
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [queryClient]);

  const selectedConversation = conversations?.find(
    (conversation) => conversation.id === selectedConversationId,
  );

  const selectedOtherUser = selectedConversation
    ? user?.id === selectedConversation.user1Id
      ? selectedConversation.user2
      : selectedConversation.user1
    : null;

  if (isLoading) {
    return <div>Loading conversations...</div>;
  }

  if (error) {
    return <div>Failed to load conversations.</div>;
  }

  return (
    <main className="mx-auto flex h-[calc(100vh-80px)] w-full max-w-7xl overflow-hidden border">
      <aside className="flex w-96 shrink-0 flex-col border-r bg-background">
        <div className="border-b px-5 py-4">
          <h1 className="text-xl font-bold">Messages</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Your conversations
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations?.map((conversation) => {
            const otherUser =
              user?.id === conversation.user1Id
                ? conversation.user2
                : conversation.user1;

            return (
              <ConversationItem
                key={conversation.id}
                name={`${otherUser.name} ${otherUser.lastName}`}
                avatarUrl={otherUser.avatarUrl}
                lastMessage={conversation.messages[0]?.content}
                lastMessageTime={
                  conversation.messages[0]
                    ? new Date(
                        conversation.messages[0].createdAt,
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : undefined
                }
                unreadCount={conversation.unreadCount}
                isSelected={selectedConversationId === conversation.id}
                onClick={() => setSelectedConversationId(conversation.id)}
              />
            );
          })}
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 overflow-hidden">
        {selectedConversationId && selectedOtherUser ? (
          <MessageChat
            conversationId={selectedConversationId}
            user={selectedOtherUser}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">Select a conversation</p>
          </div>
        )}
      </section>
    </main>
  );
}
