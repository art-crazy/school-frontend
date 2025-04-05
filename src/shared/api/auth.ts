import { API_URL } from './config';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface UserData {
  id: string;
  email: string;
  username: string;
  firstName: string;
  photoUrl?: string;
  role: string;
  isEmailVerified: boolean;
}

export interface AuthResponse {
  user: UserData;
  message: string;
}

export interface UserSession {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export interface TelegramAuthData {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
  auth_date: string;
  hash: string;
}

export interface TelegramAuthResponse {
  id: string;
  username: string;
  firstName: string;
  photoUrl?: string;
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`${response.status}: ${error || 'Unauthorized'}`);
  }
  return response.json();
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return handleResponse(response);
};

export const logout = async (): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(response);
};

export const resendVerificationEmail = async (email: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/resend-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  return handleResponse(response);
};

export const authenticateWithTelegram = async (data: TelegramAuthData): Promise<AuthResponse> => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_URL}/auth/telegram?${params.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(response);
};

export const loginWithTelegram = async (data: TelegramAuthData): Promise<TelegramAuthResponse> => {
  try {
    console.log('Sending Telegram auth data:', data);
    const response = await fetch(`${API_URL}/auth/telegram`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram auth error:', errorData);
      throw new Error(errorData.message || 'Ошибка при входе через Telegram');
    }

    const userData = await response.json();
    console.log('Telegram auth successful:', userData);
    return userData;
  } catch (error) {
    console.error('Error during Telegram authentication:', error);
    throw error;
  }
};
