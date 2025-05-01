import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './TaskNavigation.module.scss';

interface TaskNavigationProps {
    currentIndex: number;
    totalCount: number;
    onPrev: () => void;
    onNext: () => void;
    prevDisabled?: boolean;
    nextDisabled?: boolean;
}

export const TaskNavigation: React.FC<TaskNavigationProps> = ({
    currentIndex,
    totalCount,
    onPrev,
    onNext,
    prevDisabled = false,
    nextDisabled = false
}) => {
    return (
        <div className={styles.navigation}>
            <button
                onClick={onPrev}
                disabled={prevDisabled}
                className={styles.navButton}
            >
                <ChevronLeft size={20} />
                <span>Предыдущая задача</span>
            </button>
            <div className={styles.pageInfo}>
                Задача {currentIndex + 1} из {totalCount}
            </div>
            <button
                onClick={onNext}
                disabled={nextDisabled}
                className={styles.navButton}
            >
                <span>Следующая задача</span>
                <ChevronRight size={20} />
            </button>
        </div>
    );
}; 