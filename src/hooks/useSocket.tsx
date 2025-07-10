
import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { User, Message, Room, TypingUser } from '@/types/chat';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: User[];
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'reactions' | 'readBy'>) => void;
  sendTyping: (roomId: string, isTyping: boolean) => void;
  addReaction: (messageId: string, emoji: string) => void;
  sendPrivateMessage: (recipientId: string, content: string) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ 
  children, 
  user 
}: { 
  children: React.ReactNode; 
  user: User;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);

  useEffect(() => {
    // For demo purposes, we'll simulate the socket connection
    // In a real app, this would connect to your actual server
    const mockSocket = {
      connected: true,
      emit: (event: string, data: any) => {
        console.log(`Socket emit: ${event}`, data);
      },
      on: (event: string, callback: Function) => {
        console.log(`Socket listening for: ${event}`);
      },
      off: (event: string, callback?: Function) => {
        console.log(`Socket stopped listening for: ${event}`);
      }
    } as any;

    setSocket(mockSocket);
    setIsConnected(true);

    // Simulate some online users
    setOnlineUsers([
      { id: '1', username: 'Alice', isOnline: true },
      { id: '2', username: 'Bob', isOnline: true },
      { id: '3', username: 'Charlie', isOnline: false, lastSeen: new Date(Date.now() - 300000) }
    ]);

    return () => {
      mockSocket?.disconnect?.();
    };
  }, [user]);

  const joinRoom = (roomId: string) => {
    socket?.emit('join-room', { roomId, userId: user.id });
  };

  const leaveRoom = (roomId: string) => {
    socket?.emit('leave-room', { roomId, userId: user.id });
  };

  const sendMessage = (message: Omit<Message, 'id' | 'timestamp' | 'reactions' | 'readBy'>) => {
    socket?.emit('send-message', message);
  };

  const sendTyping = (roomId: string, isTyping: boolean) => {
    socket?.emit('typing', { roomId, userId: user.id, username: user.username, isTyping });
  };

  const addReaction = (messageId: string, emoji: string) => {
    socket?.emit('add-reaction', { messageId, emoji, userId: user.id, username: user.username });
  };

  const sendPrivateMessage = (recipientId: string, content: string) => {
    socket?.emit('private-message', { recipientId, content, senderId: user.id });
  };

  return (
    <SocketContext.Provider value={{
      socket,
      isConnected,
      onlineUsers,
      joinRoom,
      leaveRoom,
      sendMessage,
      sendTyping,
      addReaction,
      sendPrivateMessage
    }}>
      {children}
    </SocketContext.Provider>
  );
};
