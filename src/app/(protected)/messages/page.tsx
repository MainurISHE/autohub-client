"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

import { MessageChat } from "@/entities/message/ui/message-chat";
import { ConversationItem } from "@/entities/conversation/ui/conversation-item";
import { Conversation } from "@/entities/conversation/model/types/conversation.types";
import { Message } from "@/entities/message/model/types/message.types";
import { MessagesSkeleton } from "@/entities/message/ui/messages-skeleton";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { useConversationsQuery } from "@/entities/conversation/hooks/use-conversations-query";

import { socket } from "@/shared/api/socket";

function MessagesPageContent() {
  const { user, accessToken } = useAuthStore();

  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedConversationOverride, setSelectedConversationOverride] =
    useState<number | null>(null);

  const [swipeOffset, setSwipeOffset] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const { data: conversations, isLoading, error } = useConversationsQuery();

  const conversationIdFromUrl = useMemo(() => {
    const conversationParam = searchParams.get("conversation");

    if (!conversationParam) {
      return null;
    }

    const conversationId = Number(conversationParam);

    return Number.isNaN(conversationId) ? null : conversationId;
  }, [searchParams]);

  const selectedConversationId =
    selectedConversationOverride ??
    (conversationIdFromUrl &&
    conversations?.some(
      (conversation) => conversation.id === conversationIdFromUrl,
    )
      ? conversationIdFromUrl
      : null);

  const selectConversation = (conversationId: number) => {
    setSelectedConversationOverride(conversationId);
  };

  const handleBackToConversations = () => {
    setSwipeOffset(0);
    setSelectedConversationOverride(null);

    router.replace("/messages");
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];

    if (touch.clientX > 30) {
      return;
    }

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.touches[0];

    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;


    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }


    if (deltaX > 0) {
      setSwipeOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    const SWIPE_THRESHOLD = 100;

    if (swipeOffset > SWIPE_THRESHOLD) {
      handleBackToConversations();
    } else {
      setSwipeOffset(0);
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

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
    const handleMessage = (message: Message) => {
      queryClient.setQueriesData(
        {
          predicate: (query) => {
            return query.queryKey[0] === "conversations";
          },
        },
        (oldData: Conversation[] | undefined) => {
          if (!oldData) {
            return oldData;
          }

          const updatedConversations = oldData.map((conversation) => {
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
            (a, b) =>
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
    return <MessagesSkeleton />;
  }

  if (error) {
    return <div>Failed to load conversations.</div>;
  }

  return (
    <main className="relative mx-auto flex h-[calc(100dvh-72px)] min-h-0 w-full max-w-7xl overflow-hidden border">
      <aside
        className={`absolute inset-0 z-10 flex w-full flex-col border-r bg-background transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:w-96 lg:shrink-0 ${
          selectedConversationId
            ? "-translate-x-full lg:translate-x-0"
            : "translate-x-0"
        }`}
      >
        <div className="border-b px-5 py-4">
          <h1 className="text-xl font-bold">Messages</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Your conversations
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations?.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <h2 className="text-lg font-semibold">No conversations yet</h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Start chatting with a seller to see your conversations here.
              </p>
            </div>
          ) : (
            conversations?.map((conversation) => {
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
                  onClick={() => selectConversation(conversation.id)}
                />
              );
            })
          )}
        </div>
      </aside>

      <section
        className={`absolute inset-0 z-20 flex min-h-0 min-w-0 flex-1 overflow-hidden bg-background lg:static lg:z-auto ${
          selectedConversationId ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition:
            swipeOffset > 0
              ? "none"
              : "transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {selectedConversationId && selectedOtherUser ? (
          <MessageChat
            conversationId={selectedConversationId}
            user={selectedOtherUser}
            onBack={handleBackToConversations}
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

export default function MessagesPage() {
  return (
    <Suspense fallback={null}>
      <MessagesPageContent />
    </Suspense>
  );
}