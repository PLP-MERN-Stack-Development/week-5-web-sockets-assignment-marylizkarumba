
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Hash, 
  Users, 
  Settings, 
  LogOut, 
  Plus,
  Search,
  MessageCircle,
  UserPlus
} from 'lucide-react';
import { User, Room } from '@/types/chat';
import { useSocket } from '@/hooks/useSocket';

interface SidebarProps {
  user: User;
  rooms: Room[];
  activeRoom: Room | null;
  onRoomSelect: (room: Room) => void;
  onLogout: () => void;
}

export const Sidebar = ({ user, rooms, activeRoom, onRoomSelect, onLogout }: SidebarProps) => {
  const [showUsers, setShowUsers] = useState(true);
  const { onlineUsers } = useSocket();

  return (
    <div className="w-80 bg-slate-800/50 backdrop-blur-lg border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl font-bold text-white">ChatFlow</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="text-white/70 hover:text-red-400 hover:bg-red-400/10"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* User info */}
        <div className="flex items-center space-x-3 p-2 rounded-lg bg-white/5">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.username}</p>
            <p className="text-xs text-green-400">Online</p>
          </div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* Rooms Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wide">
              Channels
            </h2>
            <Button variant="ghost" size="sm" className="w-6 h-6 p-0 text-white/50 hover:text-white">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onRoomSelect(room)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  activeRoom?.id === room.id
                    ? 'bg-blue-500/20 text-blue-400 shadow-md'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Hash className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1 font-medium truncate">{room.name}</span>
                {room.unreadCount > 0 && (
                  <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                    {room.unreadCount}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Online Users Section */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setShowUsers(!showUsers)}
            className="flex items-center justify-between w-full mb-3 text-sm font-semibold text-white/70 uppercase tracking-wide hover:text-white transition-colors"
          >
            <span>Online Users ({onlineUsers.length})</span>
            <Users className="w-4 h-4" />
          </button>

          {showUsers && (
            <div className="space-y-2">
              {onlineUsers.map((onlineUser) => (
                <div
                  key={onlineUser.id}
                  className="flex items-center space-x-3 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={onlineUser.avatar} />
                      <AvatarFallback className="text-xs">
                        {onlineUser.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-800 ${
                      onlineUser.isOnline ? 'bg-green-400' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {onlineUser.username}
                    </p>
                    <p className="text-xs text-white/50">
                      {onlineUser.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  {onlineUser.id !== user.id && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0 text-white/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <UserPlus className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          className="w-full text-white/70 hover:text-white hover:bg-white/5"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
};
