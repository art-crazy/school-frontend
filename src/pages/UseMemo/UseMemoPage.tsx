import { useMemo, useState, useRef } from 'react';
import styles from './UseMemoPage.module.scss';
import ExampleCode from "@/shared/components/ExampleCode/ExampleCode.tsx";
import { USEMEMO_EXAMPLE } from "@/pages/UseMemo/UseMemoPage.example.ts";

const products = [
    { id: 1, name: 'MacBook Pro' },
    { id: 2, name: 'iPhone 15' },
    { id: 3, name: 'iPad Air' },
    { id: 4, name: 'Apple Watch' },
    { id: 5, name: 'AirPods Pro' },
];

export default function UseMemoPage() {
    console.log('Рендер компонента');
    const [queryMemo, setQueryMemo] = useState('');
    const [queryNoMemo, setQueryNoMemo] = useState('');
    const [renderCountMemo, setRenderCountMemo] = useState(0);
    const [renderCountNoMemo, setRenderCountNoMemo] = useState(0);

    // Используем ref для хранения счетчиков, которые не должны вызывать ререндер
    const filterCounters = useRef({
        memo: 0,
        noMemo: 0
    });

    // ✅ С useMemo — фильтрация выполняется только при изменении queryMemo
    const filteredWithMemo = useMemo(() => {
        console.log('*** [useMemo] Фильтрация товаров... ***');
        filterCounters.current.memo += 1;
        return products.filter(product =>
            product.name.toLowerCase().includes(queryMemo.toLowerCase())
        );
    }, [queryMemo]);

    // ❌ Без useMemo — фильтрация каждый ререндер
    const filteredWithoutMemo = products.filter(product => {
        console.log('*** [no useMemo] Фильтрация товаров... ***');
        filterCounters.current.noMemo += 1;
        return product.name.toLowerCase().includes(queryNoMemo.toLowerCase());
    });

    // Функции для принудительного ререндера с сохранением счетчиков
    const triggerRerenderMemo = () => {
        setRenderCountMemo(c => c + 1);
    };

    const triggerRerenderNoMemo = () => {
        setRenderCountNoMemo(c => c + 1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.instructions}>
                <h2 className={styles.instructionsTitle}>Инструкция: использование useMemo</h2>
                <div className={styles.instructionsContent}>
                    <p>Этот пример демонстрирует разницу между использованием <code>useMemo</code> и обычными
                        вычислениями при рендере.</p>

                    <h3>Что делать:</h3>
                    <ol>
                        <li>Используйте поле поиска в обеих колонках</li>
                        <li>Нажимайте кнопки "Принудительный ререндер"</li>
                        <li>Смотрите количество операций фильтрации в счетчике либо в консоли</li>
                    </ol>

                    <h3>Официальная документация:
                    </h3>
                    <a target="_blank"
                       rel="noopener noreferrer"
                       className={styles.a}
                       href={'https://ru.react.dev/reference/react/useMemo'}>
                        https://ru.react.dev/reference/react/useMemo
                    </a>
                </div>
            </div>

            <h2 className={styles.title}>Сравнение useMemo vs Без useMemo</h2>
            <div className={styles.grid}>
                <div className={styles.column}>
                    <h3 className={styles.h3}>С useMemo</h3>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Поиск..."
                        value={queryMemo}
                        onChange={(e) => setQueryMemo(e.target.value)}
                    />
                    <button
                        className={styles.button}
                        onClick={triggerRerenderMemo}
                    >
                        Принудительный ререндер
                    </button>
                    <ul className={styles.list}>
                        {filteredWithMemo.map(product => (
                            <li key={product.id} className={styles.item}>{product.name}</li>
                        ))}
                    </ul>
                    <p className={styles.description}>
                        🔁 Рендеров: {renderCountMemo} <br/>
                        🔄 Фильтраций: {filterCounters.current.memo} <br/>
                        🔒 Результат кэшируется
                    </p>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.h3}>Без useMemo</h3>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Поиск..."
                        value={queryNoMemo}
                        onChange={(e) => setQueryNoMemo(e.target.value)}
                    />
                    <button
                        className={styles.button}
                        onClick={triggerRerenderNoMemo}
                    >
                        Принудительный ререндер
                    </button>
                    <ul className={styles.list}>
                        {filteredWithoutMemo.map(product => (
                            <li key={product.id} className={styles.item}>{product.name}</li>
                        ))}
                    </ul>
                    <p className={styles.description}>
                        🔁 Рендеров: {renderCountNoMemo} <br/>
                        🔄 Фильтраций: {filterCounters.current.noMemo} <br/>
                        ❗ Фильтрация при каждом рендере
                    </p>
                </div>
            </div>

            <ExampleCode code={USEMEMO_EXAMPLE}/>
        </div>
    );
};
