import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './PromiseTasksPage.module.scss';
import { promiseTasks } from "@/pages/Frontend/materials";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs/Breadcrumbs.tsx";
import { CheckCircle, ChevronRight, Code, Lightbulb, AlertCircle } from 'lucide-react';

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
        <div className={styles.promiseTasksPage}>
            <div className={styles.container}>
                <Breadcrumbs
                    title="Задачи на Promise"
                    paths={[
                        { title: 'Frontend', url: '/frontend' }
                    ]}
                />

                <div className={styles.header}>
                    <h1 className={styles.title}>Задачи на Promise</h1>
                    <p className={styles.subtitle}>
                        Практические задания для закрепления знаний о промисах в JavaScript
                    </p>
                </div>

                <div className={styles.tasksList}>
                    {tasks.map((task) => (
                        <div key={task.id} className={styles.taskItem}>
                            <div className={styles.taskHeader}>
                                <div className={styles.taskTitle}>
                                    {task.title}
                                </div>
                                <div className={styles.taskDifficulty}>
                                    {task.hints ? 'Средняя' : 'Легкая'}
                                </div>
                            </div>

                            <div className={styles.taskContent}>
                                <div className={styles.codeBlock}>
                                    <Code size={20} className={styles.codeIcon} />
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
                                        <div className={`${styles.result} ${isCorrect[task.id] ? styles.correct : styles.incorrect}`}>
                                            {isCorrect[task.id] ? (
                                                <>
                                                    <CheckCircle size={20} />
                                                    <span>Правильно!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <AlertCircle size={20} />
                                                    <span>Неправильно. Попробуйте еще раз.</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className={styles.explanation}>
                                    <h3>Объяснение:</h3>
                                    <ReactMarkdown>{task.explanation}</ReactMarkdown>
                                </div>

                                {task.hints && (
                                    <div className={styles.hintsSection}>
                                        <button
                                            onClick={() => handleShowHints(task.id)}
                                            className={styles.hintButton}
                                            disabled={showHints[task.id]}
                                        >
                                            <Lightbulb size={20} />
                                            <span>Показать подсказки</span>
                                        </button>
                                        {showHints[task.id] && (
                                            <div className={styles.hints}>
                                                <h3>Подсказка {currentHintIndex[task.id] + 1}:</h3>
                                                <p>{task.hints[currentHintIndex[task.id]].text}</p>
                                                {currentHintIndex[task.id] < task.hints.length - 1 && (
                                                    <button
                                                        onClick={() => handleNextHint(task.id)}
                                                        className={styles.nextHintButton}
                                                    >
                                                        <ChevronRight size={20} />
                                                        <span>Следующая подсказка</span>
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PromiseTasksPage;
