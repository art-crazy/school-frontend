import React, { useState, useCallback } from 'react';
import styles from './UseCallback.module.scss';
import ExampleCode from "@/shared/components/ExampleCode/ExampleCode.tsx";
import {USECALLBACK_EXAMPLE} from "@/pages/Memo/UseCallback.example.ts";

interface ButtonProps {
    onClick: () => void;
}

// Компонент без useCallback
const WithoutUseCallback: React.FC<ButtonProps> =
    React.memo(
        ({ onClick }) => {
    console.log('***')
    console.log('Компонент без useCallback');
    console.log('***')
    return (
        <button className={styles.button} onClick={onClick}>
            Увеличить счетчик без useCallback
        </button>
    );
}
)
;

// Компонент с useCallback
const WithUseCallback: React.FC<ButtonProps> =
    React.memo(
    ({ onClick }) => {
        console.log('***')
        console.log('Компонент с useCallback');
        console.log('***')
        return (
        <button className={styles.button} onClick={onClick}>
            Увеличить счетчик с useCallback
        </button>
    );
}
)
;

// Основной компонент UseCallback
const UseCallback: React.FC = () => {
    console.log('')
    console.log('Render родителя');
    const [count, setCount] = useState<number>(0); // Тип состояния count
    const [isUsingCallback, setIsUsingCallback] = useState<boolean>(true); // Тип состояния isUsingCallback
    const [clicksWithCallback, setClicksWithCallback] = useState(0); // Для отслеживания кликов с useCallback
    const [clicksWithoutCallback, setClicksWithoutCallback] = useState(0); // Для отслеживания кликов без useCallback

    // Обработчик, который обновляет счетчик
    const handleClick = useCallback((): void => {
        setCount((prevCount) => prevCount + 1);
        setClicksWithCallback((prevClicks) => prevClicks + 1); // Увеличиваем счетчик кликов с useCallback
    }, []);

    // Обработчик без использования useCallback
    const handleClickWithoutCallback = (): void => {
        setCount((prevCount) => prevCount + 1);
        setClicksWithoutCallback((prevClicks) => prevClicks + 1); // Увеличиваем счетчик кликов без useCallback
    };

    // Используем useCallback для кнопки увеличения счета
    const handleSimpleClick = useCallback((): void => {
        setCount((prevCount) => prevCount + 1); // Просто увеличиваем счетчик
    }, []); // Пустой массив зависимостей, чтобы функция не пересоздавалась

    return (
        <div className={styles.container}>
            <h1>Счетчик: {count}</h1>
            <div className={styles.buttons}>
                <button
                    className={styles.toggleButton}
                    onClick={() => setIsUsingCallback(!isUsingCallback)}
                >
                    Переключить на {isUsingCallback ? 'без useCallback' : 'с useCallback'}
                </button>
            </div>

            <WithUseCallback onClick={handleClick} />
            <WithoutUseCallback onClick={handleClickWithoutCallback} />

            {/* Дополнительная кнопка для проверки работы useCallback с использованием useCallback */}
            <div>
                <h3>Количество кликов с useCallback: {clicksWithCallback}</h3>
                <h3>Количество кликов без useCallback: {clicksWithoutCallback}</h3>
                <button
                    className={styles.button}
                    onClick={handleSimpleClick}
                >
                    Простое увеличение с useCallback
                </button>
            </div>

            <ExampleCode code={USECALLBACK_EXAMPLE}/>

        </div>
    );
};

export default UseCallback;
