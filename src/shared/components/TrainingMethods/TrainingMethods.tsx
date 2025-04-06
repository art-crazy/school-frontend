import styles from './TrainingMethods.module.scss';
import {SectionHeader} from "@/shared/components/SectionHeader/SectionHeader.tsx";
const TrainingMethods = () => {
    const trainingMethods = [
        {
            title: 'Персональный подход',
            content: 'Я не веду потоки и у меня нет штата наёмных обучаторов. Только индивидуальный подход к каждому ученику и общение лично со мной.',
            img: '',
        },
        {
            title: 'Условия приближенные к реальным',
            content: 'Все полученные знания мы отрабатываем на проектах. Для своих учеников я поднял собственные Jira и Confluence.',
            img: '',
        },
        {
            title: 'Собственная база знаний',
            content: '',
            img: '',
        },
        {
            title: 'Регулярные code review',
            content: 'Лично разбираю ваш код, чтобы выявить ошибки и помочь повысить качество кода.',
            img: '',
        },
        {
            title: 'Мок-собеседования',
            content: 'Это одно из самых эффективных инструментов подготовки к реальному собесу. Его провожу я, а так же при необходимости привлекаю специалистов – руководителей отделов IT-компаний.',
            img: '',
        },
    ];
    return (
        <div className={`${styles.container} ${styles.gap}`}>

            <SectionHeader title={'МЕТОДЫ ОБУЧЕНИЯ'} id={'methods'}/>

            <ul className={styles.list}>
                {trainingMethods.map((obj, index) => (
                    <li key={index}
                        className={`${styles.block} ${styles.block__size}`}>
                        <h3 className={styles.h3}>{obj.title}</h3>
                        <p className={styles.p__content}>{obj.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainingMethods;
