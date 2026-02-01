import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User, UserRole } from '@/types';
import { usersData, getUserByEmail } from '@/data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, _password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo: any password works with valid email
    const foundUser = getUserByEmail(email);
    
    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
      return { success: true };
    }
    
    // Demo accounts for easy testing
    if (email === 'student@demo.com') {
      const demoStudent = usersData.find(u => u.role === 'student');
      if (demoStudent) {
        setUser(demoStudent);
        setIsLoading(false);
        return { success: true };
      }
    }
    
    if (email === 'admin@demo.com') {
      const demoAdmin = usersData.find(u => u.role === 'admin');
      if (demoAdmin) {
        setUser(demoAdmin);
        setIsLoading(false);
        return { success: true };
      }
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const hasRole = useCallback((role: UserRole): boolean => {
    return user?.role === role;
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
