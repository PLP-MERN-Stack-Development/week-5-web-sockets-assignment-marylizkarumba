
import { useState, useEffect } from 'react';
import { LoginForm } from '@/components/chat/LoginForm';
import { ChatApp } from '@/components/chat/ChatApp';
import { User } from '@/types/chat';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('chatUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('chatUser');
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <ChatApp user={user} onLogout={handleLogout} />;
};

export default Index;
