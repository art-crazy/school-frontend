import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import { Material } from '../materials';
import styles from '../FrontendPage.module.scss';

interface PracticeContentProps {
  material: Material;
}

export const PracticeContent: React.FC<PracticeContentProps> = ({ material }) => {
  if (material.type !== 'practice' || typeof material.content === 'string' || !('files' in material.content)) {
    return null;
  }

  return (
    <div className={styles.practiceContainer}>
      <div className={styles.instructions}>
        <h2>{material.title}</h2>
        {material.content.instructions && (
          <p>{material.content.instructions}</p>
        )}
      </div>
      <Sandpack
        template="react"
        files={material.content.files}
        options={{
          showLineNumbers: true,
          showInlineErrors: true,
          showNavigator: true,
          showTabs: true,
        }}
      />
    </div>
  );
}; 