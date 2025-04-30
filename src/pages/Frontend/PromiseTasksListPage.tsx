import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { motion } from 'framer-motion';
import { Circle, ChevronRight } from 'lucide-react';
import styles from './PromiseTasksListPage.module.scss';
import { promiseTasks } from './materials/promise-tasks';

interface Task {
    id: string;
    title: string;
    explanation: string;
}

const PromiseTasksListPage: React.FC = () => {
    const tasks = (promiseTasks[0].content as { tasks: Task[] }).tasks;

    console.log('All tasks in list:', tasks);

    return (
        <div className={styles.container}>
            <Breadcrumbs
                title="Задачи на Promise"
                paths={[
                    { title: 'Frontend', url: '/frontend' }
                ]}
            />

            <div className={styles.materialsList}>
                {tasks.map((task) => {
                    console.log('Task link:', `/frontend/promise-tasks/${task.id}`);
                    return (
                        <motion.div
                            key={task.id}
                            whileHover={{ x: 4 }}
                        >
                            <Link to={`/frontend/promise-tasks/${task.id}`} className={styles.materialItem}>
                                <div className={styles.materialContent}>
                                    <div className={styles.materialHeader}>
                                        <div className={`${styles.completionIcon} ${styles.inProgress}`}>
                                            <Circle size={20} />
                                        </div>
                                        <h3 className={styles.materialTitle}>{task.title}</h3>
                                    </div>
                                    <p className={styles.materialDescription}>{task.explanation}</p>
                                </div>
                                <div className={styles.materialAction}>
                                    <ChevronRight size={20} />
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default PromiseTasksListPage;
