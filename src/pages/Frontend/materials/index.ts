import { Material } from './types';
import { articles } from './articles';
import { practices } from './practices';
import { promiseTasks } from './promise-tasks';

// Объединяем все материалы в один массив
export const materials: Material[] = [
  ...articles,
  ...practices,
  ...promiseTasks
];

// Экспортируем тип Material и отдельные массивы материалов
export type { Material };
export { articles, practices, promiseTasks }; 