
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Message, User, Reaction } from '@/types/chat';
import { Heart, ThumbsUp, Laugh, MoreHorizontal, Download } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface MessageItemProps {
  message: Message;
  currentUser: User;
  showAvatar: boolean;
  showTimestamp: boolean;
}

const reactionEmojis = [
  { emoji: '👍', icon: ThumbsUp },
  { emoji: '❤️', icon: Heart },
  { emoji: '😂', icon: Laugh }
];

export const MessageItem = ({ message, currentUser, showAvatar, showTimestamp }: MessageItemProps) => {
  const [showReactions, setShowReactions] = useState(false);
  const isOwnMessage = message.sender.id === currentUser.id;

  const handleReaction = (emoji: string) => {
    // In a real app, this would emit a socket event
    console.log(`Adding reaction ${emoji} to message ${message.id}`);
    setShowReactions(false);
  };

  const groupedReactions = message.reactions.reduce((acc, reaction) => {
    if (!acc[reaction.emoji]) {
      acc[reaction.emoji] = [];
    }
    acc[reaction.emoji].push(reaction);
    return acc;
  }, {} as Record<string, Reaction[]>);

  return (
    <div className={`group flex items-start space-x-3 hover:bg-white/5 px-3 py-2 rounded-lg transition-colors ${
      isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''
    }`}>
      {showAvatar && (
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={message.sender.avatar} />
          <AvatarFallback>{message.sender.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      )}

      <div className={`flex-1 min-w-0 ${!showAvatar ? 'ml-13' : ''} ${isOwnMessage ? 'mr-13' : ''}`}>
        {(showAvatar || showTimestamp) && (
          <div className={`flex items-center space-x-2 mb-1 ${isOwnMessage ? 'justify-end' : ''}`}>
            {showAvatar && (
              <span className="font-semibold text-white text-sm">
                {message.sender.username}
              </span>
            )}
            <span className="text-xs text-white/50">
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </span>
          </div>
        )}

        <div className={`relative ${isOwnMessage ? 'text-right' : ''}`}>
          {message.type === 'text' && (
            <p className="text-white leading-relaxed break-words">{message.content}</p>
          )}

          {message.type === 'image' && (
            <div className="space-y-2">
              <img
                src={message.fileUrl}
                alt={message.fileName}
                className="max-w-sm rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.open(message.fileUrl, '_blank')}
              />
              {message.content && (
                <p className="text-white leading-relaxed">{message.content}</p>
              )}
            </div>
          )}

          {message.type === 'file' && (
            <div className="bg-slate-700/50 rounded-lg p-4 max-w-sm">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{message.fileName}</p>
                  <p className="text-white/60 text-sm">Click to download</p>
                </div>
              </div>
            </div>
          )}

          {/* Reactions */}
          {Object.keys(groupedReactions).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(groupedReactions).map(([emoji, reactions]) => (
                <Badge
                  key={emoji}
                  variant="secondary"
                  className="bg-slate-700/50 text-white hover:bg-slate-600/50 cursor-pointer transition-colors"
                  onClick={() => handleReaction(emoji)}
                >
                  <span className="mr-1">{emoji}</span>
                  <span>{reactions.length}</span>
                </Badge>
              ))}
            </div>
          )}

          {/* Hover Actions */}
          <div className={`absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity ${
            isOwnMessage ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'
          }`}>
            <div className="flex items-center space-x-1 bg-slate-800 rounded-lg shadow-lg p-1">
              {reactionEmojis.map(({ emoji, icon: Icon }) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReaction(emoji)}
                  className="w-8 h-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
                >
                  <span className="text-sm">{emoji}</span>
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReactions(!showReactions)}
                className="w-8 h-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
