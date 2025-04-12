import styles from './HeroSection.module.scss';
import {FaBook, FaCode, FaMapMarkedAlt, FaPuzzlePiece, FaServer, FaTasks} from "react-icons/fa";

const HeroSection = () => {
    return (
        <div className={styles.main}>
            <div className={styles.heroWrapper}>
                <div className={styles.heroImage}></div>
            </div>
            <div className={styles.p}>
                <div className={styles.flex}>
                    <h2>Привет, я Миша — профессиональный React/Next.js разработчик и ментор. Помогу тебе освоить фронтенд на практике.</h2>

                    <p>На моём обучении ты получишь:</p>
                    <ul>
                        <li className={styles.li}><FaBook className={styles.icon}/>Актуальные знания по React 18+, Next.js 14+ и экосистеме (TypeScript, Redux, Zustand и др.)</li>
                        <li className={styles.li}><FaMapMarkedAlt className={styles.icon}/>Персональный план развития под твой уровень и цели</li>
                        <li className={styles.li}><FaCode className={styles.icon}/>Доступ к frontend и backend проектам для решения практических задач</li>
                        <li className={styles.li}><FaServer className={styles.icon}/>Тестовый бекенд для работы с REST/GraphQL API и многим другим</li>
                        <li className={styles.li}><FaServer className={styles.icon}/>Поддержку до трудоустройства + помощь на испыталке</li>
                        <li className={styles.li}><FaPuzzlePiece className={styles.icon}/>Опыт работы с микрофронтендами и продвинутыми паттернами</li>
                    </ul>

                    <p>Как проходит обучение:</p>
                    <ul>
                        <li className={styles.li}><FaTasks className={styles.icon}/>Работаем по методологиям реальных проектов: Scrum/Kanban</li>
                        <li className={styles.li}><FaTasks className={styles.icon}/>Всё как на работе: задачи в таск-трекере, код-ревью, git, CI/CD</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
