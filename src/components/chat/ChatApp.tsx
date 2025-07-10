
import { useState, useEffect } from 'react';
import { SocketProvider } from '@/hooks/useSocket';
import { Sidebar } from './Sidebar';
import { ChatWindow } from './ChatWindow';
import { User, Room, Message } from '@/types/chat';
import { useToast } from '@/hooks/use-toast';

interface ChatAppProps {
  user: User;
  onLogout: () => void;
}

export const ChatApp = ({ user, onLogout }: ChatAppProps) => {
  const [activeRoom, setActiveRoom] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const { toast } = useToast();

  // Initialize default rooms
  useEffect(() => {
    const defaultRooms: Room[] = [
      {
        id: 'general',
        name: 'General',
        description: 'General discussion',
        isPrivate: false,
        participants: [],
        unreadCount: 0
      },
      {
        id: 'random',
        name: 'Random',
        description: 'Random chatter',
        isPrivate: false,
        participants: [],
        unreadCount: 0
      },
      {
        id: 'tech',
        name: 'Tech Talk',
        description: 'Technology discussions',
        isPrivate: false,
        participants: [],
        unreadCount: 0
      }
    ];

    setRooms(defaultRooms);
    setActiveRoom(defaultRooms[0]);

    // Demo messages
    const demoMessages: Message[] = [
      {
        id: '1',
        content: 'Welcome to ChatFlow! 🎉',
        sender: { id: 'system', username: 'System', isOnline: true },
        timestamp: new Date(Date.now() - 60000),
        roomId: 'general',
        type: 'text',
        reactions: [],
        readBy: []
      },
      {
        id: '2',
        content: 'This is a demo message with some reactions!',
        sender: { id: 'demo-user', username: 'Demo User', isOnline: true },
        timestamp: new Date(Date.now() - 30000),
        roomId: 'general',
        type: 'text',
        reactions: [
          { emoji: '👍', userId: 'user1', username: 'Alice' },
          { emoji: '❤️', userId: 'user2', username: 'Bob' }
        ],
        readBy: ['user1', 'user2']
      }
    ];

    setMessages(demoMessages);
  }, []);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          toast({
            title: "Notifications enabled",
            description: "You'll receive notifications for new messages"
          });
        }
      });
    }
  }, [toast]);

  const handleNewMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
    
    // Show notification if not in active room
    if (message.roomId !== activeRoom?.id && message.sender.id !== user.id) {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`New message from ${message.sender.username}`, {
          body: message.content,
          icon: message.sender.avatar
        });
      }
    }
  };

  return (
    <SocketProvider user={user}>
      <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex overflow-hidden">
        <Sidebar
          user={user}
          rooms={rooms}
          activeRoom={activeRoom}
          onRoomSelect={setActiveRoom}
          onLogout={onLogout}
        />
        <ChatWindow
          user={user}
          room={activeRoom}
          messages={messages.filter(m => m.roomId === activeRoom?.id)}
          onNewMessage={handleNewMessage}
        />
      </div>
    </SocketProvider>
  );
};
