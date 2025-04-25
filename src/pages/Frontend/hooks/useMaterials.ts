import { useState, useMemo } from 'react';
import { materials } from '../materials';
import { FilterState } from '../types';

export const useMaterials = (initialMaterialId: string) => {
  const [selectedMaterial, setSelectedMaterial] = useState(initialMaterialId);
  const [filter, setFilter] = useState<FilterState>({});
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);

  const currentMaterial = useMemo(
    () => materials.find(m => m.id === selectedMaterial),
    [selectedMaterial]
  );

  const filteredMaterials = useMemo(
    () => materials.filter(material => {
      if (filter.category && material.category !== filter.category) return false;
      if (filter.level && material.level !== filter.level) return false;
      if (filter.type && material.type !== filter.type) return false;
      return true;
    }),
    [filter]
  );

  const categories = useMemo(
    () => Array.from(new Set(materials.map(m => m.category))),
    []
  );

  const levels = useMemo(
    () => Array.from(new Set(materials.map(m => m.level))),
    []
  );

  const types = useMemo(
    () => Array.from(new Set(materials.map(m => m.type))),
    []
  );

  const handleCheckAnswer = () => {
    if (currentMaterial?.type === 'promise-task' && 
        typeof currentMaterial.content !== 'string' && 
        'tasks' in currentMaterial.content) {
      const currentTask = currentMaterial.content.tasks[currentTaskIndex];
      const userOutput = userAnswer.split('\n').filter(line => line.trim());
      const isAnswerCorrect =
        JSON.stringify(userOutput) === JSON.stringify(currentTask.expectedOutput);
      setIsCorrect(isAnswerCorrect);
    }
  };

  const handleNextTask = () => {
    if (currentMaterial?.type === 'promise-task' && 
        typeof currentMaterial.content !== 'string' && 
        'tasks' in currentMaterial.content) {
      if (currentTaskIndex < currentMaterial.content.tasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
        setUserAnswer('');
        setIsCorrect(null);
        setShowHints(false);
        setCurrentHintIndex(0);
      }
    }
  };

  const handleShowHints = () => {
    if (currentMaterial?.type === 'promise-task' && 
        typeof currentMaterial.content !== 'string' && 
        'tasks' in currentMaterial.content) {
      const currentTask = currentMaterial.content.tasks[currentTaskIndex];
      if (currentTask.hints && currentTask.hints.length > 0) {
        setShowHints(true);
        setCurrentHintIndex(0);
      }
    }
  };

  const handleNextHint = () => {
    if (currentMaterial?.type === 'promise-task' && 
        typeof currentMaterial.content !== 'string' && 
        'tasks' in currentMaterial.content) {
      const currentTask = currentMaterial.content.tasks[currentTaskIndex];
      if (currentTask.hints && currentHintIndex < currentTask.hints.length - 1) {
        setCurrentHintIndex(currentHintIndex + 1);
      }
    }
  };

  return {
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
    handleNextTask,
    handleShowHints,
    handleNextHint,
  };
};
