import React, { useState, useEffect } from 'react';
import { useAuth } from '@/shared/context/AuthContext';
import styles from './AuthModal.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import { TelegramAuthData } from '@/shared/api/auth';

// Объявляем тип для window.onTelegramAuth
declare global {
  interface Window {
    onTelegramAuth: (user: TelegramAuthData) => void;
  }
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState<string | React.ReactNode>('');
  const [loading, setLoading] = useState(false);
  const { login, register, loginWithTelegram } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Загружаем скрипт Telegram
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'MentorHubAuthBot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.async = true;

    // Добавляем обработчики событий для отладки
    script.onload = () => {
      console.log('Telegram script loaded successfully');
      // Очищаем ошибку, если она была установлена ранее
      setError('');
    };
    script.onerror = (error) => {
      console.error('Error loading Telegram script:', error);
      setError('Ошибка при загрузке виджета Telegram');
    };

    const container = document.querySelector(`.${styles.telegramLogin}`);
    if (container) {
      console.log('Found Telegram container');
      container.innerHTML = '';
      container.appendChild(script);
      // Очищаем ошибку, если контейнер найден
      setError('');
    } else {
      console.error('Telegram container not found');
      setError('Ошибка при инициализации виджета Telegram');
    }

    // Добавляем глобальную функцию для обработки данных от Telegram
    window.onTelegramAuth = (user: TelegramAuthData) => {
      try {
        console.log('Telegram auth data received:', user);
        if (!user || !user.id) {
          throw new Error('Неверные данные от Telegram');
        }

        // Показываем индикатор загрузки
        setLoading(true);
        setError('');

        // Вызываем функцию аутентификации
        loginWithTelegram(user)
          .then(() => {
            console.log('Telegram auth successful');
            onClose();
          })
          .catch((err: Error) => {
            console.error('Error during Telegram login:', err);
            setError(err.message);
          });
      } catch (err) {
        console.error('Ошибка при обработке данных от Telegram:', err);
        setError('Ошибка при входе через Telegram');
        setLoading(false);
      }
    };

    return () => {
      if (container) {
        container.innerHTML = '';
      }
      window.onTelegramAuth = () => {}; // Очищаем обработчик пустой функцией
    };
  }, [loginWithTelegram, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        onClose();
      } else {
        await register(email, password, firstName);
        onClose();
        navigate('/email-verification', { state: { email } });
      }
    } catch (err: any) {
      if (err.message?.includes('Email не подтвержден')) {
        setError(
          <div>
            Email не подтвержден. Пожалуйста, подтвердите email для входа.
            <Button
              variant="text"
              onClick={() => {
                onClose();
                navigate('/email-verification', { state: { email } });
              }}
              sx={{ ml: 1, p: 0, minWidth: 'auto' }}
            >
              Отправить письмо повторно
            </Button>
          </div>
        );
      } else {
        const errorMessage = err.message?.split(': ')?.[1];
        try {
          const errorData = JSON.parse(errorMessage);
          setError(errorData.message);
        } catch {
          setError(errorMessage || 'Произошла ошибка');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="firstName">Имя</label>
              <input
                id="firstName"
                className={styles.input}
                type="text"
                placeholder="Введите ваше имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              className={styles.input}
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">Пароль</label>
            <input
              id="password"
              className={styles.input}
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.button} type="submit" disabled={loading}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
        <Divider sx={{ my: 2 }}>или</Divider>
        <div className={styles.telegramLogin}>
          {/* Скрипт будет добавлен через useEffect */}
        </div>
        {loading && <div className={styles.loading}>Загрузка...</div>}
        <div className={styles.switchMode}>
          <button
            className={styles.switchButton}
            onClick={() => setIsLogin(!isLogin)}
            type="button"
          >
            {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт?'}
          </button>
        </div>
      </div>
    </div>
  );
}
