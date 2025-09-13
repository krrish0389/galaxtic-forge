import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'participant' | 'sponsor' | 'judge';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  walletAddress?: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  connectWallet: (address: string, signature?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user database - In real app, this would be your backend/Supabase
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@hackathon.app': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@hackathon.app',
      role: 'admin',
      name: 'Admin User'
    }
  },
  'participant@hackathon.app': {
    password: 'participant123',
    user: {
      id: '2',
      email: 'participant@hackathon.app',
      role: 'participant',
      name: 'Participant User'
    }
  },
  'sponsor@hackathon.app': {
    password: 'sponsor123',
    user: {
      id: '3',
      email: 'sponsor@hackathon.app',
      role: 'sponsor',
      name: 'Sponsor User'
    }
  },
  'judge@hackathon.app': {
    password: 'judge123',
    user: {
      id: '4',
      email: 'judge@hackathon.app',
      role: 'judge',
      name: 'Judge User'
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('hackathon_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('hackathon_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userRecord = mockUsers[email];
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      localStorage.setItem('hackathon_user', JSON.stringify(userRecord.user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const connectWallet = async (address: string, signature?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate wallet verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, create a participant user for wallet connection
    const walletUser: User = {
      id: `wallet_${address.slice(0, 8)}`,
      email: `${address.slice(0, 8)}@wallet.eth`,
      role: 'participant',
      walletAddress: address,
      name: `User ${address.slice(0, 8)}`
    };
    
    setUser(walletUser);
    localStorage.setItem('hackathon_user', JSON.stringify(walletUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hackathon_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, connectWallet, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};