import React from 'react';
import { Material } from '../materials';
import { LABELS } from '../types';
import styles from '../FrontendPage.module.scss';

interface MaterialListProps {
  materials: Material[];
  selectedMaterial: string;
  onSelectMaterial: (id: string) => void;
}

export const MaterialList: React.FC<MaterialListProps> = ({
  materials,
  selectedMaterial,
  onSelectMaterial,
}) => {
  return (
    <ul>
      {materials.map((material) => (
        <li
          key={material.id}
          className={selectedMaterial === material.id ? styles.active : ''}
          onClick={() => onSelectMaterial(material.id)}
        >
          <div className={styles.materialTitle}>{material.title}</div>
          <div className={styles.materialMeta}>
            <span className={styles.materialType}>
              {LABELS.type[material.type]}
            </span>
            <span className={styles.materialLevel}>
              {LABELS.level[material.level]}
            </span>
            {material.estimatedTime && (
              <span className={styles.materialTime}>
                ⏱ {material.estimatedTime}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}; 