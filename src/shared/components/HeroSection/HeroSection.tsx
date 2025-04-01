import styles from './HeroSection.module.scss';

const HeroSection = () => {
    return (
        <div className={styles.main}>
            <div className={styles.heroWrapper}>
                <div className={styles.heroImage}></div>
            </div>
            <div className={styles.p}>
                <div>
                    Привет! Меня зовут [Ваше имя], и я — фронтенд-ментор с passion к созданию красивых,
                    функциональных и удобных веб-интерфейсов. С [количество] лет опыта в разработке и
                    наставничестве,
                    я помогаю начинающим и уже практикующим разработчикам прокачивать свои навыки, осваивать
                    современные технологии и становиться уверенными профессионалами в мире фронтенда.
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
