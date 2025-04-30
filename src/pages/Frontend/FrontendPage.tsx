import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { motion } from 'framer-motion';
import styles from './FrontendPage.module.scss';

const FrontendPage: React.FC = () => {
  const topics = [
    {
      title: 'HTML',
      description: 'Изучите основы HTML и создание структуры веб-страниц',
      tags: ['HTML5', 'Семантика', 'Формы'],
      link: '/frontend/html',
      gradient: 'from-blue-400 to-cyan-300'
    },
    {
      title: 'CSS',
      description: 'Научитесь стилизовать веб-страницы с помощью CSS',
      tags: ['CSS3', 'Flexbox', 'Grid'],
      link: '/frontend/css',
      gradient: 'from-purple-400 to-pink-300'
    },
    {
      title: 'JavaScript',
      description: 'Освойте программирование на JavaScript',
      tags: ['ES6+', 'DOM', 'Async'],
      link: '/frontend/javascript',
      gradient: 'from-yellow-400 to-orange-300'
    },
    {
      title: 'React',
      description: 'Изучите современный фреймворк для создания пользовательских интерфейсов',
      tags: ['Hooks', 'Components', 'State'],
      link: '/frontend/react',
      gradient: 'from-cyan-400 to-blue-300'
    },
    {
      title: 'TypeScript',
      description: 'Добавьте типизацию в ваш JavaScript код',
      tags: ['Types', 'Interfaces', 'Generics'],
      link: '/frontend/typescript',
      gradient: 'from-indigo-400 to-purple-300'
    },
    {
      title: 'Git',
      description: 'Научитесь работать с системой контроля версий',
      tags: ['Branches', 'Commits', 'Merge'],
      link: '/frontend/git',
      gradient: 'from-red-400 to-orange-300'
    },
    {
      title: 'Задачи на Promise',
      description: 'Практические задания для отработки работы с Promise',
      tags: ['Async', 'Await', 'Promises'],
      link: '/frontend/promise-tasks',
      gradient: 'from-green-400 to-emerald-300'
    }
  ];

  return (
    <div className={styles.frontendPage}>
      <div className={styles.container}>
        <Breadcrumbs title="Frontend" paths={[]} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.header}
        >
          <h1 className={styles.title}>Frontend Development</h1>
          <p className={styles.subtitle}>Изучите современную фронтенд разработку с нашими курсами</p>
        </motion.div>
        
        <div className={styles.divider} />
        
        <div className={styles.topicsGrid}>
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={topic.link} className={styles.block}>
                <Card className={`${styles.topicCard} group`}>
                  <CardHeader>
                    <div className={`${styles.icon} bg-gradient-to-br ${topic.gradient}`}>
                      {topic.title[0]}
                    </div>
                    <CardTitle className={styles.cardTitle}>{topic.title}</CardTitle>
                    <CardDescription className={styles.cardDescription}>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={styles.tags}>
                      {topic.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className={`${styles.button} group-hover:bg-gray-700/50`}>
                      Узнать больше →
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FrontendPage;