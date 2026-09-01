"use client";

import Image from "next/image";
import { User } from "lucide-react";

interface ConversationItemProps {
  name: string;
  avatarUrl?: string | null;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isSelected: boolean;
  onClick: () => void;
}

export const ConversationItem = ({
  name,
  avatarUrl,
  lastMessage,
  lastMessageTime,
  unreadCount = 0,
  isSelected,
  onClick,
}: ConversationItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 border-b px-4 py-3 text-left transition-colors ${
        isSelected ? "bg-primary/10" : "hover:bg-muted/60"
      }`}
    >
      {/* Avatar */}
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={name}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>
      )}

      {/* Conversation info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-semibold">{name}</p>

          {lastMessageTime && (
            <span className="shrink-0 text-xs text-muted-foreground">
              {lastMessageTime}
            </span>
          )}
        </div>

        <div className="mt-1 flex min-w-0 items-center justify-between gap-2">
          <p className="truncate text-sm text-muted-foreground">
            {lastMessage || "No messages"}
          </p>

          {unreadCount > 0 && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
