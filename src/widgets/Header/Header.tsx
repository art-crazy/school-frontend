import { useAuth } from '../../shared/context/AuthContext';
import styles from './Header.module.scss';
import React from "react";

type HeaderProps = {
  onAuthModeChange: (mode: 'login') => void;
};

const Header = ({ onAuthModeChange }: HeaderProps) => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = '/';
  };

  // Определяем, является ли пользователь Telegram-пользователем
  const isTelegramUser = user?.username && user.username.startsWith('@');

  return (
    <header className={styles.header}>
      <a
        href={'/'}
        onClick={handleClick}
      >
        <span className={styles.logo}>mentor hub</span>
      </a>

      {isLoading ? (
        <div>Загрузка...</div>
      ) : isAuthenticated ? (
        <>
          <div className={styles.userInfo}>
            {isTelegramUser ? (
              <>
                {user.photoUrl && (
                  <img
                    src={user.photoUrl}
                    alt={user.username}
                    className={styles.userAvatar}
                  />
                )}
                <span className={styles.userName}>{user.username}</span>
              </>
            ) : (
              <span className={styles.userEmail}>{user?.email}</span>
            )}
          </div>
          <button onClick={logout} className={styles.button}>
            Выйти
          </button>
        </>
      ) : (
        <button onClick={() => onAuthModeChange('login')} className={styles.button}>
          Войти
        </button>
      )}
    </header>
  );
};

export default Header;
