
export interface User {
  id: string;
  username: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  roomId: string;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  reactions: Reaction[];
  readBy: string[];
  isPrivate?: boolean;
  recipientId?: string;
}

export interface Reaction {
  emoji: string;
  userId: string;
  username: string;
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  participants: User[];
  unreadCount: number;
  lastMessage?: Message;
}

export interface TypingUser {
  userId: string;
  username: string;
  roomId: string;
}

export interface NotificationData {
  title: string;
  body: string;
  icon?: string;
  roomId?: string;
  messageId?: string;
}
