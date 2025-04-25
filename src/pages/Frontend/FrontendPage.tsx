import React, { useState } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { useParams } from 'react-router-dom';
import styles from './FrontendPage.module.scss';
import { materials, Material } from './materials';
import ReactMarkdown from 'react-markdown';

function isPracticeMaterial(
    content: Material['content']
): content is Extract<Material['content'], { files: Record<string, string>; instructions?: string }> {
  return typeof content !== 'string' && 'files' in content;
}

function isTaskMaterial(
    content: Material['content']
): content is Extract<Material['content'], { tasks: Array<{
    id: string;
    title: string;
    code: string;
    expectedOutput: string[];
    explanation: string;
    hints?: Array<{ text: string }>;
  }> }> {
  return typeof content !== 'string' && 'tasks' in content;
}

const FrontendPage: React.FC = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const [selectedMaterial, setSelectedMaterial] = useState(materialId || 'html-basics');
  const [filter, setFilter] = useState<{
    category?: Material['category'];
    level?: Material['level'];
    type?: Material['type'];
  }>({});
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);

  const currentMaterial = materials.find(m => m.id === selectedMaterial);
  const filteredMaterials = materials.filter(material => {
    if (filter.category && material.category !== filter.category) return false;
    if (filter.level && material.level !== filter.level) return false;
    if (filter.type && material.type !== filter.type) return false;
    return true;
  });

  const categories = Array.from(new Set(materials.map(m => m.category)));
  const levels = Array.from(new Set(materials.map(m => m.level)));
  const types = Array.from(new Set(materials.map(m => m.type)));

  const categoryLabels: Record<Material['category'], string> = {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    react: 'React',
    typescript: 'TypeScript',
  };

  const levelLabels: Record<Material['level'], string> = {
    beginner: 'Начинающий',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  };

  const typeLabels: Record<Material['type'], string> = {
    article: 'Статья',
    practice: 'Практика',
    quiz: 'Тест',
    'promise-task': 'Задача на Promise',
  };

  const handleCheckAnswer = () => {
    if (currentMaterial?.type === 'promise-task' && isTaskMaterial(currentMaterial.content)) {
      const currentTask = currentMaterial.content.tasks[currentTaskIndex];
      const userOutput = userAnswer.split('\n').filter(line => line.trim());
      const isAnswerCorrect =
          JSON.stringify(userOutput) === JSON.stringify(currentTask.expectedOutput);
      setIsCorrect(isAnswerCorrect);
    }
  };

  const handleNextTask = () => {
    if (currentMaterial?.type === 'promise-task' && isTaskMaterial(currentMaterial.content)) {
      if (currentTaskIndex < currentMaterial.content.tasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setUserAnswer('');
        setIsCorrect(null);
        setShowHints(false);
        setCurrentHintIndex(0);
      }
    }
  };

  const handleShowHints = () => {
    if (currentMaterial?.type === 'promise-task' && isTaskMaterial(currentMaterial.content)) {
      const currentTask = currentMaterial.content.tasks[currentTaskIndex];
      if (currentTask.hints && currentTask.hints.length > 0) {
        setShowHints(true);
        setCurrentHintIndex(0);
      }
    }
  };

  const handleNextHint = () => {
    if (currentMaterial?.type === 'promise-task' && isTaskMaterial(currentMaterial.content)) {
      const currentTask = currentMaterial.content.tasks[currentTaskIndex];
      if (currentTask.hints && currentHintIndex < currentTask.hints.length - 1) {
        setCurrentHintIndex(currentHintIndex + 1);
      }
    }
  };

  if (!currentMaterial) {
    return <div>Материал не найден</div>;
  }

  return (
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.filters}>
            <h3>Фильтры</h3>
            <div className={styles.filterGroup}>
              <label>Категория:</label>
              <select
                  value={filter.category || ''}
                  onChange={(e) =>
                      setFilter({ ...filter, category: e.target.value as Material['category'] || undefined })
                  }
              >
                <option value="">Все</option>
                {categories.map(category => (
                    <option key={category} value={category}>{categoryLabels[category]}</option>
                ))}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label>Уровень:</label>
              <select
                  value={filter.level || ''}
                  onChange={(e) =>
                      setFilter({ ...filter, level: e.target.value as Material['level'] || undefined })
                  }
              >
                <option value="">Все</option>
                {levels.map(level => (
                    <option key={level} value={level}>{levelLabels[level]}</option>
                ))}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label>Тип:</label>
              <select
                  value={filter.type || ''}
                  onChange={(e) =>
                      setFilter({ ...filter, type: e.target.value as Material['type'] || undefined })
                  }
              >
                <option value="">Все</option>
                {types.map(type => (
                    <option key={type} value={type}>{typeLabels[type]}</option>
                ))}
              </select>
            </div>
          </div>

          <h2>Материалы</h2>
          <ul>
            {filteredMaterials.map((material) => (
                <li
                    key={material.id}
                    className={selectedMaterial === material.id ? styles.active : ''}
                    onClick={() => setSelectedMaterial(material.id)}
                >
                  <div className={styles.materialTitle}>{material.title}</div>
                  <div className={styles.materialMeta}>
                    <span className={styles.materialType}>{typeLabels[material.type]}</span>
                    <span className={styles.materialLevel}>{levelLabels[material.level]}</span>
                    {material.estimatedTime && (
                        <span className={styles.materialTime}>⏱ {material.estimatedTime}</span>
                    )}
                  </div>
                </li>
            ))}
          </ul>
        </aside>

        <main className={styles.content}>
          {currentMaterial.type === 'practice' && isPracticeMaterial(currentMaterial.content) ? (
              <div className={styles.practiceContainer}>
                <div className={styles.instructions}>
                  <h2>{currentMaterial.title}</h2>
                  {currentMaterial.content.instructions && (
                      <p>{currentMaterial.content.instructions}</p>
                  )}
                </div>
                <Sandpack
                    template="react"
                    files={currentMaterial.content.files}
                    options={{
                      showLineNumbers: true,
                      showInlineErrors: true,
                      showNavigator: true,
                      showTabs: true,
                    }}
                />
              </div>
          ) : currentMaterial.type === 'promise-task' && isTaskMaterial(currentMaterial.content) ? (
              <div className={styles.promiseTaskContainer}>
                <h2>{currentMaterial.title}</h2>
                <p>{currentMaterial.content.description}</p>
                <div className={styles.taskList}>
                  {currentMaterial.content.tasks.map((task, index) => (
                      <div
                          key={task.id}
                          className={`${styles.taskItem} ${index === currentTaskIndex ? styles.activeTask : ''}`}
                          onClick={() => {
                            setCurrentTaskIndex(index);
                            setUserAnswer('');
                            setIsCorrect(null);
                            setShowHints(false);
                            setCurrentHintIndex(0);
                          }}
                      >
                        {task.title}
                      </div>
                  ))}
                </div>
                <div className={styles.currentTask}>
                  <h3>{currentMaterial.content.tasks[currentTaskIndex].title}</h3>
                  <div className={styles.codeBlock}>
                    <pre>{currentMaterial.content.tasks[currentTaskIndex].code}</pre>
                  </div>
                  <div className={styles.answerSection}>
                    <h3>Введите ожидаемый вывод (каждый console.log с новой строки):</h3>
                    <textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        rows={4}
                        className={styles.answerInput}
                    />
                    <div className={styles.buttons}>
                      <button onClick={handleCheckAnswer} className={styles.checkButton}>
                        Проверить ответ
                      </button>
                      {currentMaterial.content.tasks[currentTaskIndex].hints &&
                          currentMaterial.content.tasks[currentTaskIndex].hints!.length > 0 && (
                              <button onClick={handleShowHints} className={styles.hintButton}>
                                Показать подсказку
                              </button>
                          )}
                    </div>
                    {showHints && (
                        <div className={styles.hintsSection}>
                          <div className={styles.hint}>
                            <p>{currentMaterial.content.tasks[currentTaskIndex].hints?.[currentHintIndex].text}</p>
                            {currentHintIndex < (currentMaterial.content.tasks[currentTaskIndex].hints?.length || 0) - 1 && (
                                <button onClick={handleNextHint} className={styles.nextHintButton}>
                                  Следующая подсказка
                                </button>
                            )}
                          </div>
                        </div>
                    )}
                    {isCorrect !== null && (
                        <>
                          <p className={isCorrect ? styles.correct : styles.incorrect}>
                            {isCorrect ? 'Правильно!' : 'Неверно. Попробуйте еще раз.'}
                          </p>
                          {isCorrect && (
                              <div className={styles.explanation}>
                                <p>{currentMaterial.content.tasks[currentTaskIndex].explanation}</p>
                                {currentTaskIndex < currentMaterial.content.tasks.length - 1 && (
                                    <button onClick={handleNextTask} className={styles.nextButton}>
                                      Следующая задача
                                    </button>
                                )}
                              </div>
                          )}
                        </>
                    )}
                  </div>
                </div>
              </div>
          ) : (
              <article>
                <h1>{currentMaterial.title}</h1>
                <div className={styles.materialMeta}>
                  <span className={styles.materialType}>{typeLabels[currentMaterial.type]}</span>
                  <span className={styles.materialLevel}>{levelLabels[currentMaterial.level]}</span>
                  {currentMaterial.estimatedTime && (
                      <span className={styles.materialTime}>⏱ {currentMaterial.estimatedTime}</span>
                  )}
                </div>
                <div className={styles.articleContent}>
                  <ReactMarkdown>
                    {typeof currentMaterial.content === 'string' ? currentMaterial.content : ''}
                  </ReactMarkdown>
                </div>
                {currentMaterial.prerequisites && currentMaterial.prerequisites.length > 0 && (
                    <div className={styles.prerequisites}>
                      <h3>Предварительные требования</h3>
                      <ul>
                        {currentMaterial.prerequisites.map(prereq => {
                          const prereqMaterial = materials.find(m => m.id === prereq);
                          return (
                              <li key={prereq} onClick={() => setSelectedMaterial(prereq)}>
                                {prereqMaterial?.title || prereq}
                              </li>
                          );
                        })}
                      </ul>
                    </div>
                )}
              </article>
          )}
        </main>
      </div>
  );
};

export default FrontendPage;
