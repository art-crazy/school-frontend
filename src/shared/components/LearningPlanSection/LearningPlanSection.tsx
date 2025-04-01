import { useState} from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import styles from './LearningPlanSection.module.scss';
import {SectionHeader} from "@/shared/components/SectionHeader/SectionHeader.tsx";

const LearningPlanSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const sections = [
        {
            title: 'Старт с любого уровня',
            content: 'Неважно, начинаете ли вы с нуля или уже прошли другие курсы — программа обучения адаптируется под ваш уровень. Мы поможем заполнить пробелы в знаниях и выстроить четкий путь к цели.',
        },
        {
            title: 'Персональный роадмап',
            content: 'Каждый ученик получает индивидуальный план развития, который учитывает его текущие навыки, цели и желаемую специализацию. Это не шаблонный подход, а четкий пошаговый план, который ведет к результату.',
        },
        {
            title: 'Реальные рабочие условия',
            content: 'Мы моделируем процессы, максимально приближенные к реальным IT-компаниям. Вы будете работать с задачами, которые встречаются в повседневной практике разработчиков, что позволит вам быстрее адаптироваться на новой работе.',
        },
        {
            title: 'Работа с методологиями',
            content: 'Вы освоите популярные методологии управления проектами, такие как Scrum, Agile, Kanban и Lean. Это поможет вам не только в разработке, но и в эффективной организации рабочего процесса.',
        },
        {
            title: 'Подготовка к трудоустройству',
            content: 'Мы не просто учим, а ведем вас до оффера. Это включает помощь в составлении резюме, подготовку к собеседованиям и поддержку на испытательном сроке, чтобы вы уверенно чувствовали себя на новом месте.',
        },
    ];

    return (
        <div className={`${styles.container} ${styles.gap}`}>
            <SectionHeader title={'ПЛАН ОБУЧЕНИЯ'} id={'plan'}/>

            <div className={styles.accordion}>
                {sections.map((section, index) => (
                    <button
                        className={`${styles.section} ${activeIndex === index ? styles.section__active : ''}`}
                        key={index}
                        onClick={() => handleClick(index)}
                    >
                        <div
                            className={styles.section__title}
                            style={{
                                cursor: 'pointer',
                                width: '100%',
                                background: 'none',
                                border: 'none',
                                color: 'inherit',
                                textAlign: 'left',
                                padding: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            {index + 1}. {section.title}
                            {activeIndex === index ? <FaChevronUp/> : <FaChevronDown/>}
                        </div>
                        <div
                            className={`${styles.section__content} ${activeIndex === index ? styles.active : ''}`}
                            id={`content-${index}`}
                        >
                            <div>{section.content}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LearningPlanSection;
