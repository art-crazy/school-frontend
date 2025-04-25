import { Material } from './materials';

export type FilterState = {
  category?: Material['category'];
  level?: Material['level'];
  type?: Material['type'];
};

export type Labels = {
  category: Record<Material['category'], string>;
  level: Record<Material['level'], string>;
  type: Record<Material['type'], string>;
};

export const LABELS: Labels = {
  category: {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    react: 'React',
    typescript: 'TypeScript',
  },
  level: {
    beginner: 'Начинающий',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
  },
  type: {
    article: 'Статья',
    practice: 'Практика',
    quiz: 'Тест',
    'promise-task': 'Задача на Promise',
  },
}; 