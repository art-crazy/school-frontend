// В режиме разработки используем боевой домен, в продакшн - относительный путь
export const API_URL = import.meta.env.PROD 
  ? '/api' 
  : (import.meta.env.VITE_API_URL || 'https://mentor-hub.ru/api'); 