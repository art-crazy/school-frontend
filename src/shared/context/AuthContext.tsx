import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { login as apiLogin, register as apiRegister, loginWithTelegram as apiLoginWithTelegram, UserData } from '../api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null;
  loading: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string) => Promise<void>;
  loginWithTelegram: (data: never) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    const userData = Cookies.get('user_data');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await apiLogin({ email, password });
      Cookies.set('auth_token', response.token, { expires: 7 });
      Cookies.set('user_data', JSON.stringify(response.user), { expires: 7 });
      setIsAuthenticated(true);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName: string) => {
    setLoading(true);
    try {
      const response = await apiRegister({ email, password, firstName });
      Cookies.set('auth_token', response.token, { expires: 7 });
      Cookies.set('user_data', JSON.stringify(response.user), { expires: 7 });
      setIsAuthenticated(true);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  };

  const loginWithTelegram = async (data: never) => {
    setLoading(true);
    try {
      const userData = await apiLoginWithTelegram(data);
      setIsAuthenticated(true);
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('auth_token');
    Cookies.remove('user_data');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      loading,
      isLoading: loading,
      login,
      register,
      loginWithTelegram,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
