
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Paperclip, Smile, Image } from 'lucide-react';
import { User, Room, Message } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

interface MessageInputProps {
  user: User;
  room: Room;
  onSendMessage: (message: Message) => void;
  onTyping: (isTyping: boolean) => void;
}

export const MessageInput = ({ user, room, onSendMessage, onTyping }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: uuidv4(),
      content: message.trim(),
      sender: user,
      timestamp: new Date(),
      roomId: room.id,
      type: 'text',
      reactions: [],
      readBy: []
    };

    onSendMessage(newMessage);
    setMessage('');
    onTyping(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fileMessage: Message = {
        id: uuidv4(),
        content: `Shared a file: ${file.name}`,
        sender: user,
        timestamp: new Date(),
        roomId: room.id,
        type: file.type.startsWith('image/') ? 'image' : 'file',
        fileName: file.name,
        fileUrl: URL.createObjectURL(file),
        reactions: [],
        readBy: []
      };

      onSendMessage(fileMessage);
      toast({
        title: "File uploaded",
        description: `${file.name} has been shared`
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              onTyping(e.target.value.length > 0);
            }}
            onKeyPress={handleKeyPress}
            placeholder={`Message #${room.name}`}
            className="pr-20 bg-slate-700/50 border-slate-600 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
            disabled={isUploading}
          />
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-8 h-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
            >
              {isUploading ? (
                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Paperclip className="w-4 h-4" />
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!message.trim() || isUploading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 transition-colors"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>

      <div className="text-xs text-white/40">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
};
