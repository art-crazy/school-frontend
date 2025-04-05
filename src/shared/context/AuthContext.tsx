import React, { createContext, useContext, useState } from 'react';
import { login, register, logout, LoginData as ApiLoginData, RegisterData as ApiRegisterData, authenticateWithTelegram, TelegramAuthData } from '../api/auth';

interface User {
  id: number;
  email: string;
  role: string;
  isEmailVerified: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loginWithTelegram: (data: TelegramAuthData) => Promise<void>;
}

const AUTH_KEY = 'auth_data';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    return savedAuth ? JSON.parse(savedAuth) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: LoginData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await login(data as ApiLoginData);
      const userData = response.user;
      if (!userData.isEmailVerified) {
        throw new Error('Email не подтвержден. Пожалуйста, подтвердите email для входа.');
      }
      setUser(userData);
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Ошибка при входе:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при входе');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await register(data as ApiRegisterData);
      const userData = response.user;
      setUser(userData);
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при регистрации');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      setError(null);
      await logout();
      setUser(null);
      localStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при выходе');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithTelegram = async (data: TelegramAuthData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authenticateWithTelegram(data);
      const userData = response.user;
      setUser(userData);
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Ошибка при входе через Telegram:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при входе через Telegram');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isLoading: loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    loginWithTelegram: handleLoginWithTelegram,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
