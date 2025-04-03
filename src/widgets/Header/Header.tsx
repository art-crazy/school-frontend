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
          <span className={styles.button}>{user?.email}</span>
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
