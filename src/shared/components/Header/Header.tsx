import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import React from "react";

export default function Header() {
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

            <Link
                className={styles.button}
                to={'/'}
            >
                Войти
            </Link>
        </header>
    )
}
