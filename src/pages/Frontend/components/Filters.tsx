import React from 'react';
import { FilterState } from '../types';
import { LABELS } from '../types';
import styles from '../FrontendPage.module.scss';

interface FiltersProps {
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
  categories: string[];
  levels: string[];
  types: string[];
}

export const Filters: React.FC<FiltersProps> = ({
  filter,
  setFilter,
  categories,
  levels,
  types,
}) => {
  return (
    <div className={styles.filters}>
      <h3>Фильтры</h3>
      <div className={styles.filterGroup}>
        <label>Категория:</label>
        <select
          value={filter.category || ''}
          onChange={(e) =>
            setFilter({ ...filter, category: e.target.value as FilterState['category'] || undefined })
          }
        >
          <option value="">Все</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {LABELS.category[category as keyof typeof LABELS.category]}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Уровень:</label>
        <select
          value={filter.level || ''}
          onChange={(e) =>
            setFilter({ ...filter, level: e.target.value as FilterState['level'] || undefined })
          }
        >
          <option value="">Все</option>
          {levels.map(level => (
            <option key={level} value={level}>
              {LABELS.level[level as keyof typeof LABELS.level]}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Тип:</label>
        <select
          value={filter.type || ''}
          onChange={(e) =>
            setFilter({ ...filter, type: e.target.value as FilterState['type'] || undefined })
          }
        >
          <option value="">Все</option>
          {types.map(type => (
            <option key={type} value={type}>
              {LABELS.type[type as keyof typeof LABELS.type]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}; 