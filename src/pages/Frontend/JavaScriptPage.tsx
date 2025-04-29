import React from 'react';
import { Link } from 'react-router-dom';
import styles from './JavaScriptPage.module.scss';
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs/Breadcrumbs';

const topics = [
    {
        id: 'basics',
        title: 'Основы JavaScript',
        description: 'Переменные, типы данных, операторы и основы синтаксиса',
        icon: '📚'
    },
    {
        id: 'functions',
        title: 'Функции',
        description: 'Объявление функций, параметры, возвращаемые значения и замыкания',
        icon: '🔧'
    },
    {
        id: 'objects',
        title: 'Объекты и массивы',
        description: 'Работа с объектами, массивами и их методами',
        icon: '📦'
    },
    {
        id: 'dom',
        title: 'DOM и события',
        description: 'Работа с DOM-деревом и обработка событий',
        icon: '🌳'
    },
    {
        id: 'async',
        title: 'Асинхронное программирование',
        description: 'Promise, async/await и работа с асинхронным кодом',
        icon: '⏳'
    },
    {
        id: 'oop',
        title: 'ООП в JavaScript',
        description: 'Классы, наследование и принципы ООП',
        icon: '🏗️'
    }
];

const JavaScriptPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <Breadcrumbs 
                title="JavaScript"
                paths={[
                    { title: 'Frontend', url: '/frontend' }
                ]}
            />
            <div className={styles.topicsGrid}>
                {topics.map((topic) => (
                    <Link 
                        key={topic.id} 
                        to={`/frontend/javascript/${topic.id}`}
                        className={styles.topicCard}
                    >
                        <div className={styles.topicIcon}>{topic.icon}</div>
                        <h2 className={styles.topicTitle}>{topic.title}</h2>
                        <p className={styles.topicDescription}>{topic.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default JavaScriptPage; 