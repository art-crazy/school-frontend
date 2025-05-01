import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PaginationButtons.module.scss';

interface PaginationButtonsProps {
    currentIndex: number;
    totalCount: number;
    onPrev: () => void;
    onNext: () => void;
    prevDisabled?: boolean;
    nextDisabled?: boolean;
}

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
    currentIndex,
    totalCount,
    onPrev,
    onNext,
    prevDisabled = false,
    nextDisabled = false
}) => {
    return (
        <div className={styles.pagination}>
            <button
                onClick={onPrev}
                disabled={prevDisabled}
                className={styles.paginationButton}
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
                className={styles.paginationButton}
            >
                <span>Следующая задача</span>
                <ChevronRight size={20} />
            </button>
        </div>
    );
}; 