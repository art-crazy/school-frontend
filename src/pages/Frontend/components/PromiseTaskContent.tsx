import React from 'react';
import { Material } from '../materials';
import styles from '../FrontendPage.module.scss';

interface PromiseTaskContentProps {
  material: Material;
  currentTaskIndex: number;
  userAnswer: string;
  isCorrect: boolean | null;
  showHints: boolean;
  currentHintIndex: number;
  onTaskSelect: (index: number) => void;
  onAnswerChange: (answer: string) => void;
  onCheckAnswer: () => void;
  onShowHints: () => void;
  onNextHint: () => void;
}

export const PromiseTaskContent: React.FC<PromiseTaskContentProps> = ({
  material,
  currentTaskIndex,
  userAnswer,
  isCorrect,
  showHints,
  currentHintIndex,
  onTaskSelect,
  onAnswerChange,
  onCheckAnswer,
  onShowHints,
  onNextHint,
}) => {
  if (material.type !== 'promise-task' || typeof material.content === 'string' || !('tasks' in material.content)) {
    return null;
  }

  const currentTask = material.content.tasks[currentTaskIndex];

  return (
    <div className={styles.promiseTaskContainer}>
      <h2>{material.title}</h2>
      <p>{material.content.description}</p>
      <div className={styles.taskList}>
        {material.content.tasks.map((task, index) => (
          <div
            key={task.id}
            className={`${styles.taskItem} ${index === currentTaskIndex ? styles.activeTask : ''}`}
            onClick={() => onTaskSelect(index)}
          >
            {task.title}
          </div>
        ))}
      </div>
      <div className={styles.currentTask}>
        <h3>{currentTask.title}</h3>
        <div className={styles.codeBlock}>
          <pre>{currentTask.code}</pre>
        </div>
        <div className={styles.answerSection}>
          <h3>Введите ожидаемый вывод (каждый console.log с новой строки):</h3>
          <textarea
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            rows={4}
            className={styles.answerInput}
          />
          <div className={styles.buttons}>
            <button onClick={onCheckAnswer} className={styles.checkButton}>
              Проверить ответ
            </button>
            {currentTask.hints && currentTask.hints.length > 0 && (
              <button onClick={onShowHints} className={styles.hintButton}>
                Показать подсказку
              </button>
            )}
          </div>
          {isCorrect !== null && (
            <div className={`${styles.result} ${isCorrect ? styles.correct : styles.incorrect}`}>
              {isCorrect ? 'Правильно!' : 'Неправильно. Попробуйте еще раз.'}
            </div>
          )}
          {showHints && currentTask.hints && (
            <div className={styles.hints}>
              <div className={styles.hintContent}>
                {currentTask.hints[currentHintIndex].text}
              </div>
              {currentHintIndex < currentTask.hints.length - 1 && (
                <button onClick={onNextHint} className={styles.nextHintButton}>
                  Следующая подсказка
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 