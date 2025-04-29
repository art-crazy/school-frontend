import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './PromiseTasksPage.module.scss';
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs/Breadcrumbs';
import { promiseTasks } from './materials/promise-tasks';

interface Task {
    id: string;
    title: string;
    code: string;
    expectedOutput: string[];
    explanation: string;
    hints?: Array<{
        id: number;
        text: string;
    }>;
}

interface TaskContent {
    description: string;
    tasks: Task[];
}

const PromiseTasksPage: React.FC = () => {
    const [showHints, setShowHints] = useState<Record<string, boolean>>({});
    const [currentHintIndex, setCurrentHintIndex] = useState<Record<string, number>>({});
    const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
    const [isCorrect, setIsCorrect] = useState<Record<string, boolean | null>>({});

    const material = promiseTasks[0];
    const content = material.content as TaskContent;
    const tasks = content.tasks;

    const handleCheckAnswer = (taskId: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const isAnswerCorrect = JSON.stringify(userAnswers[taskId]) === JSON.stringify(task.expectedOutput);
        setIsCorrect(prev => ({ ...prev, [taskId]: isAnswerCorrect }));
    };

    const handleShowHints = (taskId: string) => {
        setShowHints(prev => ({ ...prev, [taskId]: true }));
        setCurrentHintIndex(prev => ({ ...prev, [taskId]: 0 }));
    };

    const handleNextHint = (taskId: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task || !task.hints) return;

        if (currentHintIndex[taskId] < task.hints.length - 1) {
            setCurrentHintIndex(prev => ({ ...prev, [taskId]: prev[taskId] + 1 }));
        }
    };

    return (
        <div className={styles.container}>
            <Breadcrumbs
                title="Задачи на Promise"
                paths={[
                    { title: 'Frontend', url: '/frontend' }
                ]}
            />
            <div className={styles.content}>
                {tasks.map((task) => (
                    <div key={task.id} className={styles.task}>
                        <div className={styles.taskHeader}>
                            <h2>{task.title}</h2>
                        </div>

                        <div className={styles.codeBlock}>
                            <pre>{task.code}</pre>
                        </div>

                        <div className={styles.answerSection}>
                            <h3>Введите ожидаемый вывод (каждое значение с новой строки):</h3>
                            <textarea
                                className={styles.answerInput}
                                value={userAnswers[task.id]?.join('\n') || ''}
                                onChange={(e) => setUserAnswers(prev => ({
                                    ...prev,
                                    [task.id]: e.target.value.split('\n').filter(Boolean)
                                }))}
                                placeholder="Введите ожидаемый вывод..."
                            />
                            <button
                                onClick={() => handleCheckAnswer(task.id)}
                                className={styles.checkButton}
                            >
                                Проверить ответ
                            </button>
                            {isCorrect[task.id] !== undefined && (
                                <div className={isCorrect[task.id] ? styles.correct : styles.incorrect}>
                                    {isCorrect[task.id] ? 'Правильно!' : 'Неправильно. Попробуйте еще раз.'}
                                </div>
                            )}
                        </div>

                        <div className={styles.explanation}>
                            <h3>Объяснение:</h3>
                            <ReactMarkdown>{task.explanation}</ReactMarkdown>
                        </div>

                        <div className={styles.hintsSection}>
                            <button
                                onClick={() => handleShowHints(task.id)}
                                className={styles.hintButton}
                                disabled={showHints[task.id] || !task.hints}
                            >
                                Показать подсказки
                            </button>
                            {showHints[task.id] && task.hints && (
                                <div className={styles.hints}>
                                    <h3>Подсказка {currentHintIndex[task.id] + 1}:</h3>
                                    <p>{task.hints[currentHintIndex[task.id]].text}</p>
                                    {currentHintIndex[task.id] < task.hints.length - 1 && (
                                        <button
                                            onClick={() => handleNextHint(task.id)}
                                            className={styles.nextHintButton}
                                        >
                                            Следующая подсказка
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PromiseTasksPage;
