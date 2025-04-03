const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const verifyEmail = async (token: string) => {
  const response = await fetch(`${API_URL}/auth/verify-email?token=${token}`, {
    method: 'POST',
  });
  return response.json();
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

export const register = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}; 