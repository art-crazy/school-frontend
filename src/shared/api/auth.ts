import { API_URL } from './config';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
}

export interface UserData {
  id: number;
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
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
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

export const login = async (data: LoginData): Promise<{ token: string; user: UserData }> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const register = async (data: RegisterData): Promise<{ token: string; user: UserData }> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};

export const logout = async (): Promise<void> => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }
};

export const resendVerificationEmail = async (email: string): Promise<void> => {
  const response = await fetch('/api/auth/resend-verification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('Failed to resend verification email');
  }
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

export const loginWithTelegram = async (data: TelegramAuthData): Promise<UserData> => {
  const response = await fetch('/api/auth/telegram', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Telegram login failed');
  }

  return response.json();
};
