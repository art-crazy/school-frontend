import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './PromiseTasksPage.module.scss';
import { promiseTasks } from "@/pages/Frontend/materials";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs/Breadcrumbs.tsx";
import {
    CheckCircle,
    ChevronRight,
    Code,
    Lightbulb,
    AlertCircle,
    ChevronLeft,
    ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

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
    const { taskId } = useParams<{ taskId?: string }>();
    const navigate = useNavigate();
    const [showHints, setShowHints] = useState<Record<string, boolean>>({});
    const [currentHintIndex, setCurrentHintIndex] = useState<Record<string, number>>({});
    const [userAnswers, setUserAnswers] = useState<Record<string, string[]>>({});
    const [isCorrect, setIsCorrect] = useState<Record<string, boolean | null>>({});

    // Find the material that contains the current task
    const material = promiseTasks.find(m => m.type === 'promise-task');
    const content = material?.content as TaskContent | undefined;
    const tasks = content?.tasks || [];
    const currentTask = tasks.find(t => t.id === taskId);
    const currentTaskIndex = currentTask ? tasks.indexOf(currentTask) : -1;

    useEffect(() => {
        if (!currentTask && tasks.length > 0) {
            // If no task is found, redirect to the first task
            navigate(`/frontend/promise-tasks/${tasks[0].id}`);
        }
    }, [currentTask, navigate, tasks]);

    if (!material) {
        return <div>Material not found</div>;
    }

    if (!currentTask) {
        return null;
    }

    const handleCheckAnswer = (taskId: string) => {
        console.log('taskId', taskId)
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const normalizeAnswer = (answer: string[]) => {
            if (!answer || answer.length === 0) return [];

            const combinedString = answer.join(' ');
            const splitBySpaces = combinedString.split(/[\s,]+/).filter(Boolean);

            if (splitBySpaces.length === 0) {
                return answer.map(line => line.trim()).filter(line => line.length > 0);
            }

            return splitBySpaces.sort();
        };

        const userAnswer = normalizeAnswer(userAnswers[taskId] || []);
        const expectedAnswer = normalizeAnswer(task.expectedOutput);

        const isAnswerCorrect = JSON.stringify(userAnswer) === JSON.stringify(expectedAnswer);
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

    const handleTaskNavigation = (direction: 'prev' | 'next') => {
        const newIndex = direction === 'prev' ? currentTaskIndex - 1 : currentTaskIndex + 1;
        const nextTask = tasks[newIndex];

        if (nextTask) {
            navigate(`/frontend/promise-tasks/${nextTask.id}`);
        }
    };

    return (
        <div className={styles.promiseTasksPage}>
            <div className={styles.container}>
                <Breadcrumbs
                    title={currentTask.title}
                    paths={[
                        { title: 'Frontend', url: '/frontend' },
                        { title: 'Задачи на Promise', url: '/frontend/promise-tasks' },
                    ]}
                />

                <div className={styles.header}>
                    <h1 className={styles.title}>Задачи на Promise</h1>
                    <p className={styles.subtitle}>
                        Практические задания для закрепления знаний о промисах в JavaScript
                    </p>
                </div>

                <div className={styles.tasksList}>
                    <div className={styles.taskItem}>
                        <div className={styles.taskHeader}>
                            <div className={styles.taskTitle}>
                                {currentTask.title}
                            </div>
                            <div className={styles.taskDifficulty}>
                                {currentTask.hints ? 'Средняя' : 'Легкая'}
                            </div>
                        </div>

                        <div className={styles.taskContent}>
                            <div className={styles.codeBlock}>
                                <Code size={20} className={styles.codeIcon} />
                                <pre>{currentTask.code}</pre>
                            </div>

                            <div className={styles.answerSection}>
                                <h3>Введите ожидаемый вывод (каждое значение с новой строки):</h3>
                                <textarea
                                    className={styles.answerInput}
                                    value={userAnswers[currentTask.id]?.join('\n') || ''}
                                    onChange={(e) => {
                                        const lines = e.target.value.split('\n');
                                        setUserAnswers(prev => ({
                                            ...prev,
                                            [currentTask.id]: lines
                                        }));
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            const textarea = e.target as HTMLTextAreaElement;
                                            const cursorPosition = textarea.selectionStart;
                                            const value = textarea.value;
                                            const newValue = value.slice(0, cursorPosition) + '\n' + value.slice(cursorPosition);
                                            setUserAnswers(prev => ({
                                                ...prev,
                                                [currentTask.id]: newValue.split('\n')
                                            }));
                                        }
                                    }}
                                    placeholder="Введите ожидаемый вывод..."
                                />
                                <button
                                    onClick={() => handleCheckAnswer(currentTask.id)}
                                    className={styles.checkButton}
                                >
                                    Проверить ответ
                                </button>
                                {isCorrect[currentTask.id] !== undefined && (
                                    <div className={`${styles.result} ${isCorrect[currentTask.id] ? styles.correct : styles.incorrect}`}>
                                        {isCorrect[currentTask.id] ? (
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
                                <ReactMarkdown>{currentTask.explanation}</ReactMarkdown>
                            </div>

                            {currentTask.hints && (
                                <div className={styles.hintsSection}>
                                    <button
                                        onClick={() => handleShowHints(currentTask.id)}
                                        className={styles.hintButton}
                                        disabled={showHints[currentTask.id]}
                                    >
                                        <Lightbulb size={20} />
                                        <span>Показать подсказки</span>
                                    </button>
                                    {showHints[currentTask.id] && (
                                        <div className={styles.hints}>
                                            <h3>Подсказка {currentHintIndex[currentTask.id] + 1}:</h3>
                                            <p>{currentTask.hints[currentHintIndex[currentTask.id]].text}</p>
                                            {currentHintIndex[currentTask.id] < currentTask.hints.length - 1 && (
                                                <button
                                                    onClick={() => handleNextHint(currentTask.id)}
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
                </div>

                <div className={styles.pagination}>
                    <button
                        onClick={() => handleTaskNavigation('prev')}
                        disabled={currentTaskIndex === 0}
                        className={styles.paginationButton}
                    >
                        <ChevronLeft size={20} />
                        <span>Предыдущая задача</span>
                    </button>
                    <div className={styles.pageInfo}>
                        Задача {currentTaskIndex + 1} из {tasks.length}
                    </div>
                    <button
                        onClick={() => handleTaskNavigation('next')}
                        disabled={currentTaskIndex === tasks.length - 1}
                        className={styles.paginationButton}
                    >
                        <span>Следующая задача</span>
                        <ChevronRightIcon size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromiseTasksPage;
