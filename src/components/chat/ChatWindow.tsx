
import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageInput } from './MessageInput';
import { MessageItem } from './MessageItem';
import { TypingIndicator } from './TypingIndicator';
import { User, Room, Message, TypingUser } from '@/types/chat';
import { Hash, Users } from 'lucide-react';

interface ChatWindowProps {
  user: User;
  room: Room | null;
  messages: Message[];
  onNewMessage: (message: Message) => void;
}

export const ChatWindow = ({ user, room, messages, onNewMessage }: ChatWindowProps) => {
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!room) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900/20">
        <div className="text-center">
          <Hash className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white/70 mb-2">Welcome to ChatFlow</h2>
          <p className="text-white/50">Select a channel to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-900/20">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-white/10 bg-slate-800/30 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{room.name}</h1>
              {room.description && (
                <p className="text-sm text-white/60">{room.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 text-white/60">
            <Users className="w-4 h-4" />
            <span className="text-sm">{room.participants.length || 1} members</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-6 py-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-white/50 py-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => {
              const showAvatar = index === 0 || messages[index - 1].sender.id !== message.sender.id;
              const showTimestamp = index === 0 || 
                new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 300000;
              
              return (
                <MessageItem
                  key={message.id}
                  message={message}
                  currentUser={user}
                  showAvatar={showAvatar}
                  showTimestamp={showTimestamp}
                />
              );
            })
          )}
          <TypingIndicator typingUsers={typingUsers.filter(t => t.roomId === room.id)} />
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-white/10 bg-slate-800/30 backdrop-blur-sm">
        <MessageInput
          user={user}
          room={room}
          onSendMessage={onNewMessage}
          onTyping={(isTyping) => {
            // Handle typing indicator
            console.log(`${user.username} is ${isTyping ? 'typing' : 'not typing'} in ${room.name}`);
          }}
        />
      </div>
    </div>
  );
};
