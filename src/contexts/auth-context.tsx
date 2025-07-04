'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Mock User type to replace Firebase's User object.
export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session storage for a logged-in user to persist state across reloads
    try {
        const storedUser = sessionStorage.getItem('scentique_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
    } catch(e) {
        // If parsing fails, remove the invalid item
        sessionStorage.removeItem('scentique_user');
    } finally {
        setLoading(false);
    }
  }, []);

  const login = (email: string) => {
    const newUser: User = {
      uid: 'mock-uid-' + Date.now(),
      email,
      displayName: email.split('@')[0] || 'User',
      photoURL: null,
    };
    sessionStorage.setItem('scentique_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    sessionStorage.removeItem('scentique_user');
    setUser(null);
  };

  const value = { user, loading, login, logout };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
