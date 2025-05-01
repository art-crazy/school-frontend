import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import styles from './BasicsPage.module.scss';
import { javascriptTasks } from './javascriptBasicsTasks';

const BasicsPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const task = javascriptTasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <div className={styles.promiseTasksPage}>
        <div className={styles.container}>
          <Breadcrumbs
            title="Задача не найдена"
            paths={[
              { title: 'Frontend', url: '/frontend' },
              { title: 'JavaScript', url: '/frontend/javascript' }
            ]}
          />
          <div className={styles.header}>
            <h1 className={styles.title}>Задача не найдена</h1>
            <p className={styles.subtitle}>
              Запрошенная задача не существует или была удалена
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          <div className={styles.taskItem}>
            <h2 className={styles.taskTitle}>{task.title}</h2>
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
        </div>
      </div>
    </div>
  );
};

export default BasicsPage; 