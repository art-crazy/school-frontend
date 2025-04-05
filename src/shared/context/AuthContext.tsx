import React, { createContext, useContext, useState } from 'react';
import { login, register, logout, LoginData as ApiLoginData, RegisterData as ApiRegisterData, TelegramAuthData, loginWithTelegram, UserData } from '../api/auth';

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: ApiLoginData) => Promise<void>;
  register: (data: ApiRegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loginWithTelegram: (data: TelegramAuthData) => Promise<void>;
}

const AUTH_KEY = 'auth_data';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    return savedAuth ? JSON.parse(savedAuth) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const handleLogin = async (data: ApiLoginData) => {
    try {
      setLoading(true);
      setError('');
      const response = await login(data);
      const userData = response.user as UserData;
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Error during login:', err);
      setError(err instanceof Error ? err.message : 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: ApiRegisterData) => {
    try {
      setLoading(true);
      setError('');
      const response = await register(data);
      const userData = response.user as UserData;
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Error during registration:', err);
      setError(err instanceof Error ? err.message : 'Ошибка при регистрации');
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
      setError('');

      const userData = await loginWithTelegram(data);

      if (userData) {
        const fullUserData: UserData = {
          id: userData.id,
          email: data.username || '',
          username: userData.username,
          firstName: userData.firstName,
          photoUrl: userData.photoUrl,
          role: 'user',
          isEmailVerified: true,
        };
        setUser(fullUserData);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Error during Telegram login:', err);
      setError(err instanceof Error ? err.message : 'Ошибка при входе через Telegram');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
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
