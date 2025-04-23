import React, { useState, useCallback } from 'react';
import styles from './UseCallback.module.scss';
import ExampleCode from "@/shared/components/ExampleCode/ExampleCode.tsx";
import {USECALLBACK_EXAMPLE} from "@/pages/UseCallback/UseCallback.example.ts";

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


export default function UseCallbackPage() {
    console.log('')
    console.log('Render родителя');
    const [count, setCount] = useState<number>(0); // Тип состояния count
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
}
