import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs/Breadcrumbs';
import { motion } from 'framer-motion';
import {ArrowRight, Zap, Terminal, GitBranch, Type, Code, Layout} from 'lucide-react';
import styles from './FrontendPage.module.scss';

const topics = [
  //   НЕ УДАЛЯТЬ ЗАКОММЕНТИРОВАННЫЙ КОД
  {
    title: 'HTML',
    description: 'Изучите основы HTML и создание структуры веб-страниц',
    tags: ['HTML5', 'Семантика', 'Формы'],
    link: '/frontend/html',
    gradient: 'from-blue-400 to-cyan-300',
    icon: <Layout size={24} />
  },
  {
    title: 'CSS',
    description: 'Научитесь стилизовать веб-страницы с помощью CSS',
    tags: ['CSS3', 'Flexbox', 'Grid'],
    link: '/frontend/css',
    gradient: 'from-purple-400 to-pink-300',
    icon: <Code size={24} />
  },
  {
    title: 'JavaScript',
    description: 'Освойте программирование на JavaScript',
    tags: ['ES6+', 'DOM', 'Async'],
    link: '/frontend/javascript',
    gradient: 'from-yellow-400 to-orange-300',
    icon: <Zap size={24} />
  },
  {
    title: 'React',
    description: 'Изучите современный фреймворк для создания пользовательских интерфейсов',
    tags: ['Hooks', 'Components', 'State'],
    link: '/frontend/react',
    gradient: 'from-cyan-400 to-blue-300',
    icon: <Code size={24} />
  },
  {
    title: 'TypeScript',
    description: 'Добавьте типизацию в ваш JavaScript код',
    tags: ['Types', 'Interfaces', 'Generics'],
    link: '/frontend/typescript',
    gradient: 'from-indigo-400 to-purple-300',
    icon: <Type size={24} />
  },
  {
    title: 'Git',
    description: 'Научитесь работать с системой контроля версий',
    tags: ['Branches', 'Commits', 'Merge'],
    link: '/frontend/git',
    gradient: 'from-red-400 to-orange-300',
    icon: <GitBranch size={24} />
  },
  {
    title: 'Задачи на Promise',
    description: 'Практические задания для отработки работы с Promise',
    tags: ['Async', 'Await', 'Promises'],
    link: '/frontend/promise-tasks',
    gradient: 'from-green-400 to-emerald-300',
    icon: <Terminal size={24} />
  }
];

const FrontendPage: React.FC = () => {
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
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Frontend Development
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Изучи современную фронтенд разработку с помощью наших учебных материалов
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

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
                    <motion.div
                      className={`${styles.icon} bg-gradient-to-br ${topic.gradient}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {topic.icon}
                    </motion.div>
                    <CardTitle className={styles.cardTitle}>{topic.title}</CardTitle>
                    <CardDescription className={styles.cardDescription}>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={styles.tags}>
                      {topic.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          className={styles.tag}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className={`${styles.button} group-hover:bg-gray-700/50`}>
                      Узнать больше <ArrowRight className="ml-2 h-4 w-4" />
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
