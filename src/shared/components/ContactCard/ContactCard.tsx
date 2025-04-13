import styles from './ContactCard.module.scss'; // Импорт стилей

const ContactCard = () => {
    return (
        <div className={`${styles.container} ${styles.gap}`} id='contacts'>
            <div className={styles.h2__container}>
                <div className={styles.border}></div>
                <a
                    href="https://t.me/art_crazy"
                    className={styles.button}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Пиши мне
                </a>
                <div className={styles.border}></div>
            </div>

            <div className={styles.contact}>
                <a
                    className={styles.img}
                    href="https://t.me/art_crazy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img className={styles.img} src={'/photo_tg2.jpg'} alt={'photo'} />
                </a>
                <h3 className={styles.title}>Михаил Аржанников</h3>
                <p className={styles.login}>@art_crazy</p>
                <p className={styles.desc}>Frontend Developer</p>
                <a
                    href="https://t.me/art_crazy"
                    className={styles.button__tg}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    SEND MESSAGE
                </a>
            </div>
        </div>
    );
};

export default ContactCard;
