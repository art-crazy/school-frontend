import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FrontendPage.module.scss';
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs/Breadcrumbs';

const sections = [
    {
        id: 'html',
        title: 'HTML',
        description: 'Изучите основы HTML и создание структуры веб-страниц',
        icon: '📄'
    },
    {
        id: 'css',
        title: 'CSS',
        description: 'Научитесь стилизовать веб-страницы с помощью CSS',
        icon: '🎨'
    },
    {
        id: 'javascript',
        title: 'JavaScript',
        description: 'Освойте программирование на JavaScript',
        icon: '⚡'
    },
    {
        id: 'react',
        title: 'React',
        description: 'Изучите современный фреймворк для создания пользовательских интерфейсов',
        icon: '⚛️'
    },
    {
        id: 'typescript',
        title: 'TypeScript',
        description: 'Добавьте типизацию в ваш JavaScript код',
        icon: '📝'
    },
    {
        id: 'git',
        title: 'Git',
        description: 'Научитесь работать с системой контроля версий',
        icon: '📚'
    },
    {
        id: 'promise-tasks',
        title: 'Задачи на Promise',
        description: 'Практические задания для отработки работы с Promise',
        icon: '🎯'
    }
];

const FrontendPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <Breadcrumbs
                title="Frontend"
                paths={[]}
            />
            <div className={styles.content}>
                <div className={styles.sectionsGrid}>
                    {sections.map((section) => (
                        <Link
                            key={section.id}
                            to={section.id === 'promise-tasks' ? '/frontend/promise-tasks' : `/frontend/${section.id}`}
                            className={styles.sectionCard}
                        >
                            <div className={styles.sectionIcon}>{section.icon}</div>
                            <h2 className={styles.sectionTitle}>{section.title}</h2>
                            <p className={styles.sectionDescription}>{section.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FrontendPage;
