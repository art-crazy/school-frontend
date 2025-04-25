import React from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './FrontendPage.module.scss';
import { useMaterials } from './hooks/useMaterials';
import { Filters } from './components/Filters';
import { MaterialList } from './components/MaterialList';
import { PracticeContent } from './components/PracticeContent';
import { PromiseTaskContent } from './components/PromiseTaskContent';

const FrontendPage: React.FC = () => {
  const { materialId } = useParams<{ materialId: string }>();
  const {
    selectedMaterial,
    setSelectedMaterial,
    filter,
    setFilter,
    userAnswer,
    setUserAnswer,
    isCorrect,
    setIsCorrect,
    currentTaskIndex,
    setCurrentTaskIndex,
    currentHintIndex,
    setCurrentHintIndex,
    showHints,
    setShowHints,
    currentMaterial,
    filteredMaterials,
    categories,
    levels,
    types,
    handleCheckAnswer,
    handleShowHints,
    handleNextHint,
  } = useMaterials(materialId || 'html-basics');

  if (!currentMaterial) {
    return <div>Материал не найден</div>;
  }

  const handleTaskSelect = (index: number) => {
    setCurrentTaskIndex(index);
    setUserAnswer('');
    setIsCorrect(null);
    setShowHints(false);
    setCurrentHintIndex(0);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Filters
          filter={filter}
          setFilter={setFilter}
          categories={categories}
          levels={levels}
          types={types}
        />
        <h2>Материалы</h2>
        <MaterialList
          materials={filteredMaterials}
          selectedMaterial={selectedMaterial}
          onSelectMaterial={setSelectedMaterial}
        />
      </aside>

      <main className={styles.content}>
        {currentMaterial.type === 'practice' ? (
          <PracticeContent material={currentMaterial} />
        ) : currentMaterial.type === 'promise-task' ? (
          <PromiseTaskContent
            material={currentMaterial}
            currentTaskIndex={currentTaskIndex}
            userAnswer={userAnswer}
            isCorrect={isCorrect}
            showHints={showHints}
            currentHintIndex={currentHintIndex}
            onTaskSelect={handleTaskSelect}
            onAnswerChange={setUserAnswer}
            onCheckAnswer={handleCheckAnswer}
            onShowHints={handleShowHints}
            onNextHint={handleNextHint}
          />
        ) : (
          <div className={styles.articleContent}>
            <h2>{currentMaterial.title}</h2>
            <ReactMarkdown>{currentMaterial.content as string}</ReactMarkdown>
          </div>
        )}
      </main>
    </div>
  );
};

export default FrontendPage;
