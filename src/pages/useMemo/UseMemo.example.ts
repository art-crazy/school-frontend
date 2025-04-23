export const USEMEMO_EXAMPLE = `const products = [
    { id: 1, name: 'MacBook Pro' },
    { id: 2, name: 'iPhone 15' },
    { id: 3, name: 'iPad Air' },
    { id: 4, name: 'Apple Watch' },
    { id: 5, name: 'AirPods Pro' }
];

const UseMemo: React.FC = () => {
    const [queryMemo, setQueryMemo] = useState('');
    const [queryNoMemo, setQueryNoMemo] = useState('');
    const [renderCountMemo, setRenderCountMemo] = useState(0);
    const [renderCountNoMemo, setRenderCountNoMemo] = useState(0);

    // ✅ С useMemo — фильтрация выполняется только при изменении queryMemo
    const filteredWithMemo = useMemo(() => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(queryMemo.toLowerCase())
        );
    }, [queryMemo]);

    // ❌ Без useMemo — фильтрация каждый ререндер
    const filteredWithoutMemo = products.filter((product) => {
        return product.name.toLowerCase().includes(queryNoMemo.toLowerCase());
    });

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Сравнение useMemo vs Без useMemo</h2>
            <div className={styles.grid}>
                {/* ✅ С useMemo */}
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
                        onClick={() => setRenderCountMemo((c) => c + 1)}
                    >
                        Принудительный ререндер
                    </button>
                    <ul className={styles.list}>
                        {filteredWithMemo.map((product) => (
                            <li key={product.id} className={styles.item}>{product.name}</li>
                        ))}
                    </ul>
                    <p className={styles.description}>
                        🔁 Рендеров: {renderCountMemo} <br/>
                        🔒 <code>useMemo</code> кэширует результат фильтрации.
                    </p>
                </div>

                {/* ❌ Без useMemo */}
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
                        onClick={() => setRenderCountNoMemo((c) => c + 1)}
                    >
                        Принудительный ререндер
                    </button>
                    <ul className={styles.list}>
                        {filteredWithoutMemo.map((product) => (
                            <li key={product.id} className={styles.item}>{product.name}</li>
                        ))}
                    </ul>
                    <p className={styles.description}>
                        🔁 Рендеров: {renderCountNoMemo} <br/>
                        ❗ Фильтрация происходит каждый раз.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UseMemo;
`;
