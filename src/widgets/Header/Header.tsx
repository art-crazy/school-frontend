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
  const isTelegramUser = user?.username && user?.photoUrl;

  return (
    <header className={styles.header}>
      <a
        className={styles.button}
        href={'/'}
        onClick={handleClick}
      >
        {`<ХАБ />`}
      </a>

      {isLoading ? (
        <div>Загрузка...</div>
      ) : isAuthenticated ? (
        <>
          <div className={styles.userInfo}>
            {isTelegramUser ? (
              <>
                <img 
                  src={user.photoUrl} 
                  alt={user.username} 
                  className={styles.userAvatar} 
                />
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
