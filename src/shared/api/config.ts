// В режиме разработки используем localhost, в продакшн - относительный путь
export const API_URL = import.meta.env.PROD 
  ? '/api' 
  : (import.meta.env.VITE_API_URL || 'http://localhost:3000'); 