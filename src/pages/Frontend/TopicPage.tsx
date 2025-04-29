import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './TopicPage.module.scss';
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs/Breadcrumbs';

// Пример контента для темы
const topicContent = {
    title: 'Основы JavaScript',
    content: `
# Основы JavaScript

## Переменные
В JavaScript есть три способа объявления переменных:
- \`var\` (устаревший)
- \`let\`
- \`const\`

## Типы данных
JavaScript имеет следующие типы данных:
- Числа
- Строки
- Булевы значения
- null
- undefined
- Объекты
- Символы

## Операторы
Основные операторы в JavaScript:
- Арифметические (+, -, *, /)
- Сравнения (==, ===, !=, !==)
- Логические (&&, ||, !)
    `,
    nextTopic: 'functions',
    prevTopic: null
};

const TopicPage: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (direction: 'prev' | 'next') => {
        if (direction === 'next' && topicContent.nextTopic) {
            navigate(`/frontend/javascript/${topicContent.nextTopic}`);
        } else if (direction === 'prev' && topicContent.prevTopic) {
            navigate(`/frontend/javascript/${topicContent.prevTopic}`);
        }
    };

    return (
        <div className={styles.container}>
            <Breadcrumbs
                title={topicContent.title}
                paths={[
                    { title: 'Frontend', url: '/frontend' },
                    { title: 'JavaScript', url: '/frontend/javascript' }
                ]}
            />
            <div className={styles.content}>
                <ReactMarkdown>{topicContent.content}</ReactMarkdown>
            </div>
            <div className={styles.navigation}>
                <button
                    className={styles.navButton}
                    onClick={() => handleNavigation('prev')}
                    disabled={!topicContent.prevTopic}
                >
                    ← Предыдущая тема
                </button>
                <button
                    className={styles.navButton}
                    onClick={() => handleNavigation('next')}
                    disabled={!topicContent.nextTopic}
                >
                    Следующая тема →
                </button>
            </div>
        </div>
    );
};

export default TopicPage;
