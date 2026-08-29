export interface ConversationUser {
  id: number;
  name: string;
  lastName: string;
  avatarUrl: string | null;
}

export interface ConversationMessage {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
}

export interface Conversation {
  id: number;
  user1Id: number;
  user2Id: number;
  user1: ConversationUser;
  user2: ConversationUser;
  messages: ConversationMessage[];
  createdAt: string;
  updatedAt: string;
  unreadCount: number;
}
