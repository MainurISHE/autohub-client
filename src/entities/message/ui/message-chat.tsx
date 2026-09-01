"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MoreVertical, User } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { useMessagesQuery } from "@/entities/message/hooks/use-messages-query";
import { useAuthStore } from "@/features/auth/store/auth.store";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { messageService } from "@/entities/message/api/message.service";
import { Message } from "@/entities/message/model/types/message.types";

import { socket } from "@/shared/api/socket";

interface MessageChatProps {
  conversationId: number;
  user: {
    name: string;
    lastName: string;
    avatarUrl?: string | null;
  };
}

type RealtimeMessage = Omit<Message, "updatedAt"> & {
  updatedAt?: string;
};

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const getDateLabel = (date: Date) => {
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) {
    return "Today";
  }

  if (isSameDay(date, yesterday)) {
    return "Yesterday";
  }

  return date.toLocaleDateString([], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const MessageChat = ({ conversationId, user }: MessageChatProps) => {
  const currentUser = useAuthStore((state) => state.user);

  const queryClient = useQueryClient();

  const [content, setContent] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages, isLoading, error } = useMessagesQuery(conversationId);

  useEffect(() => {
    const handleMessage = (message: RealtimeMessage) => {
      if (message.conversationId !== conversationId) {
        return;
      }

      const nextMessage: Message = {
        ...message,
        updatedAt: message.updatedAt ?? message.createdAt,
      };

      queryClient.setQueriesData<Message[]>(
        {
          predicate: (query) => {
            return (
              query.queryKey[0] === "messages" &&
              query.queryKey[1] === conversationId
            );
          },
        },
        (oldMessages) => {
          const currentMessages = oldMessages ?? [];

          const alreadyExists = currentMessages.some(
            (item) => item.id === nextMessage.id,
          );

          if (alreadyExists) {
            return currentMessages;
          }

          return [...currentMessages, nextMessage];
        },
      );
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [conversationId, queryClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const markAsRead = async () => {
      try {
        await messageService.markAsRead(conversationId);

        await queryClient.invalidateQueries({
          queryKey: ["conversations"],
        });
      } catch {
        // Read receipts are non-critical and will be retried on the next visit.
      }
    };

    markAsRead();
  }, [conversationId, currentUser, queryClient]);

  const handleSend = () => {
    const message = content.trim();

    if (!message) {
      return;
    }

    socket.emit("sendMessage", {
      conversationId,
      content: message,
    });

    setContent("");
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        Loading messages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        Failed to load messages.
      </div>
    );
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {/* Chat header */}
      <header className="flex shrink-0 items-center justify-between border-b px-5 py-3">
        <div className="flex min-w-0 items-center gap-3">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={`${user.name} ${user.lastName}`}
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
          )}

          <div className="min-w-0">
            <h2 className="truncate font-semibold">
              {user.name} {user.lastName}
            </h2>

            <div className="mt-0.5 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />

              <span className="text-xs text-muted-foreground">Active now</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
        >
          <MoreVertical className="h-5 w-5 text-muted-foreground" />
        </button>
      </header>

      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        <div className="flex flex-col gap-3">
          {messages?.map((message, index) => {
            const isOwnMessage = message.senderId === currentUser?.id;

            const messageDate = new Date(message.createdAt);

            const previousMessage = messages[index - 1];

            const previousDate = previousMessage
              ? new Date(previousMessage.createdAt)
              : null;

            const showDateLabel =
              !previousDate || !isSameDay(messageDate, previousDate);

            return (
              <div key={message.id}>
                {showDateLabel && (
                  <div className="my-4 flex justify-center">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {getDateLabel(messageDate)}
                    </span>
                  </div>
                )}

                <div
                  className={`flex ${
                    isOwnMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      isOwnMessage
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-muted"
                    }`}
                  >
                    <p className="break-words whitespace-pre-wrap text-sm leading-6">
                      {message.content}
                    </p>

                    <div
                      className={`mt-1 text-[11px] ${
                        isOwnMessage
                          ? "text-primary-foreground/60"
                          : "text-muted-foreground"
                      }`}
                    >
                      {messageDate.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="shrink-0 border-t p-4">
        <div className="flex items-end gap-3">
          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Write a message..."
            maxLength={2000}
            className="min-h-10 max-h-32 resize-none"
          />

          <Button onClick={handleSend} disabled={!content.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
