import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Button as NavButton} from "school-ui";
import styles from './Navigation.module.scss';

export default function Navigation() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    console.log('master: commit 2')
    console.log('master: commit 3')
    console.log('master: commit 5')
    console.log('master: commit 7')


    useEffect(() => {
        if (isMenuOpen) {
            setScrollPosition(window.scrollY);
            document.body.classList.add(styles['body-lock']);
        } else {
            document.body.classList.remove(styles['body-lock']);
            window.scrollTo(0, scrollPosition);
        }

        return () => {
            document.body.classList.remove(styles['body-lock']);
        };
    }, [isMenuOpen, scrollPosition]);

    const navContents = [
        { content: 'О МЕНТОРЕ', to: 'about' },
        { content: 'ПЛАН ОБУЧЕНИЯ', to: 'plan' },
        { content: 'МЕТОДЫ ОБУЧЕНИЯ', to: 'methods' },
        { content: 'УСЛУГИ', to: 'services' },
        { content: 'КОНТАКТЫ', to: 'contacts' }
    ];

    const handleNavClick = (to: string) => {
        navigate(`/#${to}`);
        setIsMenuOpen(false);
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.burger} ${isMenuOpen ? styles.fixed : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            <div className={`${styles.nav__container} ${isMenuOpen ? styles.open : ''}`}>
                <div className={styles.menuContent}>
                    {navContents.map((nav, index) => (
                        <NavButton key={index} content={nav.content} navigateTo={() => handleNavClick(nav.to)}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
