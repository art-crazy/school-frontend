import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ChevronRight } from 'lucide-react';
import styles from './JavaScriptPage.module.scss';

const topics = [
    {
        id: 1,
        title: 'Основы JavaScript',
        description: 'Изучите базовые концепции и синтаксис JavaScript',
        link: '/frontend/javascript/basics',
        completed: true
    },
    {
        id: 2,
        title: 'Работа с DOM',
        description: 'Научитесь манипулировать элементами веб-страницы',
        link: '/frontend/javascript/dom',
        completed: false
    },
    {
        id: 3,
        title: 'Асинхронное программирование',
        description: 'Промисы, async/await и работа с асинхронными операциями',
        link: '/frontend/javascript/async',
        completed: false
    }
];

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
                {topics.map((topic) => (
                    <motion.div
                        key={topic.id}
                        whileHover={{ x: 4 }}
                    >
                        <Link to={topic.link} className={styles.materialItem}>
                            <div className={styles.materialContent}>
                                <div className={styles.materialHeader}>
                                    <div className={`${styles.completionIcon} ${topic.completed ? styles.completed : styles.inProgress}`}>
                                        {topic.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
                                    </div>
                                    <h3 className={styles.materialTitle}>{topic.title}</h3>
                                </div>
                                <p className={styles.materialDescription}>{topic.description}</p>
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