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
            title: 'Созвон-знакомство, оценка текущей ситуации/скилов',
            content: 'Встреча по видеосвязи для обсуждения ожидаемых результатов, оценки скиллов и постановки целей для совместной работы. Это бесплатно.',
        },
        {
            title: 'Персональный роадмап',
            content: 'Для каждого ученика я составляю персональную дорожную карту: что нужно выучить, какие хард и софт скиллы подтянуть.',
        },
        {
            title: 'Изучение теории, лекции, практика',
            content: 'Для прогеров с нуля учим основы: вёрстка на чистых HTML и CSS, логика на JS и DOM API.' +
                'Для тех, кто уже работает, но хочет повысить квалификацию, копаем глубже: React, стейт-менеджеры, TypeScript, фреймворки для тестирования, сборщики, линтеры, CSS-процессоры, дизайн-системы, UI-киты и прочие важные штуки + методологии - Scrum, Lean, Agile.' +
                'Вопросы про сети станут для тебя простыми, перестанешь бояться настройки CI/CD',
        },
        {
            title: 'Готовим историю, позиционирование себя на рынке труда',
            content: 'Найду, что не так в твоем резюме, какие проблемы ты можешь словить в прохождении собеседований, в каких навыках есть белые пятна и всё поправим.',
        },
        {
            title: 'Составление резюме',
            content: 'Прокачаю твое резюме, чтобы оно эффективно отражало твои компетенции и было заметным для работодателя.',
        },
        {
            title: 'Собеседования',
            content: 'Перед прохождением настоящих собесов, я погоняю тебя по мокам – тестовым собеседованиям, на которых позадаю те же самые вопросы, что и на настоящих интервью. На настоящих собесах при возможности помогу удалённо.'
        },
        {
            title: 'Оффер и адаптация',
            content: 'Когда получишь оффер, наше общение не закончится. Я помогу влиться в работу и осилить свалившиеся задачи, чтобы ты мог приспособиться и работать в комфортных условиях, без лишнего стресса.',
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
                            {activeIndex === index ? <FaChevronUp className={styles.icon}/> : <FaChevronDown className={styles.icon}/>}
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
