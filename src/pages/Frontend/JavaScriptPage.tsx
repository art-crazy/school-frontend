import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { motion } from 'framer-motion';
import { Circle, ChevronRight } from 'lucide-react';
import styles from './JavaScriptPage.module.scss';
import { javascriptTasks } from './JavaScript/javascriptBasicsTasks';

const JavaScriptPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <Breadcrumbs
                title="JavaScript"
                paths={[
                    { title: 'Frontend', url: '/frontend' }
                ]}
            />

            <div className={styles.materialsList}>
                {javascriptTasks.map((task) => (
                    <motion.div
                        key={task.id}
                        whileHover={{ x: 4 }}
                    >
                        <Link to={`/frontend/javascript/${task.id}`} className={styles.materialItem}>
                            <div className={styles.materialContent}>
                                <div className={styles.materialHeader}>
                                    <div className={`${styles.completionIcon} ${styles.inProgress}`}>
                                        <Circle size={20} />
                                    </div>
                                    <h3 className={styles.materialTitle}>{task.title}</h3>
                                </div>
                                <p className={styles.materialDescription}>{task.content.description}</p>
                            </div>
                            <div className={styles.materialAction}>
                                <ChevronRight size={20} />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default JavaScriptPage;
