import React, { useState } from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { useParams } from 'react-router-dom';
import styles from './FrontendPage.module.scss';
import { materials, Material } from './materials';
import ReactMarkdown from 'react-markdown';

const FrontendPage: React.FC = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const [selectedMaterial, setSelectedMaterial] = useState(materialId || 'html-basics');
  const [filter, setFilter] = useState<{
    category?: Material['category'];
    level?: Material['level'];
    type?: Material['type'];
  }>({});

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
    'html': 'HTML',
    'css': 'CSS',
    'javascript': 'JavaScript',
    'react': 'React',
    'typescript': 'TypeScript'
  };

  const levelLabels: Record<Material['level'], string> = {
    'beginner': 'Начинающий',
    'intermediate': 'Средний',
    'advanced': 'Продвинутый'
  };

  const typeLabels: Record<Material['type'], string> = {
    'article': 'Статья',
    'practice': 'Практика',
    'quiz': 'Тест'
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.filters}>
          <h3>Фильтры</h3>
          <div className={styles.filterGroup}>
            <label>Категория:</label>
            <select 
              value={filter.category || ''} 
              onChange={(e) => setFilter({ ...filter, category: e.target.value as Material['category'] || undefined })}
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
              onChange={(e) => setFilter({ ...filter, level: e.target.value as Material['level'] || undefined })}
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
              onChange={(e) => setFilter({ ...filter, type: e.target.value as Material['type'] || undefined })}
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
        {currentMaterial && (
          currentMaterial.type === 'practice' ? (
            <div className={styles.practiceContainer}>
              <div className={styles.instructions}>
                <h2>{currentMaterial.title}</h2>
                {typeof currentMaterial.content !== 'string' && currentMaterial.content.instructions && (
                  <p>{currentMaterial.content.instructions}</p>
                )}
              </div>
              <Sandpack
                template="react"
                files={typeof currentMaterial.content !== 'string' ? currentMaterial.content.files : {}}
                options={{
                  showLineNumbers: true,
                  showInlineErrors: true,
                  showNavigator: true,
                  showTabs: true,
                }}
              />
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
                <ReactMarkdown>{typeof currentMaterial.content === 'string' ? currentMaterial.content : ''}</ReactMarkdown>
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
          )
        )}
      </main>
    </div>
  );
};

export default FrontendPage; 