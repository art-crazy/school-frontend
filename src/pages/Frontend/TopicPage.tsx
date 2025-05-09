import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TopicPage.module.scss';
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs/Breadcrumbs';
import { javascriptTasks } from './JavaScript/javascriptBasicsTasks';
import { TaskNavigation } from '@/shared/ui/TaskNavigation/TaskNavigation';

const TopicPage: React.FC = () => {
    const navigate = useNavigate();
    const { topicId } = useParams<{ topicId: string }>();
    const task = javascriptTasks.find(t => t.id === topicId);

    if (!task) {
        return (
            <div className={styles.promiseTasksPage}>
                <div className={styles.container}>
                    <Breadcrumbs
                        title="Тема не найдена"
                        paths={[
                            { title: 'Frontend', url: '/frontend' },
                            { title: 'JavaScript', url: '/frontend/javascript' }
                        ]}
                    />
                    <div className={styles.header}>
                        <h1 className={styles.title}>Тема не найдена</h1>
                        <p className={styles.subtitle}>
                            Запрошенная тема не существует или была удалена
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const currentIndex = javascriptTasks.findIndex(t => t.id === topicId);
    const nextTask = javascriptTasks[currentIndex + 1];
    const prevTask = javascriptTasks[currentIndex - 1];

    const handleNavigation = (direction: 'prev' | 'next') => {
        if (direction === 'next' && nextTask) {
            navigate(`/frontend/javascript/${nextTask.id}`);
        } else if (direction === 'prev' && prevTask) {
            navigate(`/frontend/javascript/${prevTask.id}`);
        }
    };

    return (
        <div className={styles.promiseTasksPage}>
            <div className={styles.container}>
                <Breadcrumbs
                    title={task.title}
                    paths={[
                        { title: 'Frontend', url: '/frontend' },
                        { title: 'JavaScript', url: '/frontend/javascript' }
                    ]}
                />

                <div className={styles.header}>
                    <h1 className={styles.title}>{task.title}</h1>
                    <p className={styles.subtitle}>
                        Изучите базовые концепции и синтаксис JavaScript
                    </p>
                </div>

                <div className={styles.tasksList}>
                    <div className={styles.taskContent}>
                        <p>{task.content.description}</p>
                        {task.content.code && (
                            <pre className={styles.codeBlock}>
                                <code>{task.content.code}</code>
                            </pre>
                        )}
                        {task.content.explanation && (
                            <div className={styles.explanation}>
                                <p>{task.content.explanation}</p>
                            </div>
                        )}
                        {task.content.hints && task.content.hints.length > 0 && (
                            <div className={styles.hints}>
                                <h3>Подсказки:</h3>
                                <ul>
                                    {task.content.hints.map((hint) => (
                                        <li key={hint.id}>{hint.text}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <TaskNavigation
                    currentIndex={currentIndex}
                    totalCount={javascriptTasks.length}
                    onPrev={() => handleNavigation('prev')}
                    onNext={() => handleNavigation('next')}
                    prevDisabled={!prevTask}
                    nextDisabled={!nextTask}
                />
            </div>
        </div>
    );
};

export default TopicPage;
