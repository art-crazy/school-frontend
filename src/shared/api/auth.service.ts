import { API_URL } from './config';

export const authService = {
  async verifyEmail(token: string) {
    const response = await fetch(`${API_URL}/auth/verify-email?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  }
}; 