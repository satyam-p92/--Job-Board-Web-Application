import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage (simulating persistence)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user with matching email
    const user = users.find(u => u.email === email);
    
    if (!user) {
      setLoading(false);
      throw new Error('Invalid email or password');
    }
    
    // In a real app, we would verify the password here
    
    // Save to localStorage and state
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setLoading(false);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // Mock register function
  const register = async (userData: Partial<User>, password: string): Promise<User> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
      setLoading(false);
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser: User = {
      id: `${users.length + 1}`,
      email: userData.email!,
      name: userData.name!,
      role: userData.role || 'jobSeeker',
      company: userData.company,
      title: userData.title,
      location: userData.location,
      createdAt: new Date()
    };
    
    // In a real app, we would save the user to the database here
    // and hash the password
    
    // Save to localStorage and state
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
    setLoading(false);
    return newUser;
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};