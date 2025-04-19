import {useEffect, useState} from 'react';
import {FaChevronUp} from 'react-icons/fa';
import styles from './ScrollToTop.module.scss';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
            console.log('ТЕСТ-тест')
        };
    }, []);

    return (
        <div className={`${styles.scrollToTop} ${isVisible ? styles.visible : styles.hidden}`}>
            <div onClick={scrollToTop} className={styles.iconContainer}>
                <FaChevronUp className={styles.icon} />
            </div>
        </div>
    );
};

export default ScrollToTop;
