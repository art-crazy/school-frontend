export const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://mentor-hub.ru/api'
  : 'http://localhost:3000';

export const API_CONFIG = {
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}; 