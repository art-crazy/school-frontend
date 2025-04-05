import React, { useState } from 'react';
import { useAuth } from '@/shared/context/AuthContext';
import styles from './AuthModal.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | React.ReactNode>('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login({ email, password });
        onClose();
      } else {
        await register({ email, password });
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
            {loading ? 'Загрузка...' : (isLogin ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>
        <div className={styles.switchMode}>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  );
} 