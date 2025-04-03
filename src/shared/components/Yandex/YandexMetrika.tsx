import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface YmFunctionWithProps {
    (id: number, action: string, ...args: unknown[]): void;
    a?: unknown[][];
    l?: number;
}

declare global {
    interface Window {
        ym?: YmFunctionWithProps;
        Ya?: {
            Metrika2?: object;
        };
    }
}

interface YandexMetrikaConfig {
    id: number;
    options?: {
        clickmap?: boolean;
        trackLinks?: boolean;
        accurateTrackBounce?: boolean | number;
        webvisor?: boolean;
        trackHash?: boolean;
        defer?: boolean;
    };
}

const DEFAULT_CONFIG: YandexMetrikaConfig = {
    id: import.meta.env.VITE_YANDEX_METRIKA_ID
        ? Number(import.meta.env.VITE_YANDEX_METRIKA_ID)
        : 0, // 0 отключает метрику в development
    options: {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true,
        defer: true, // По умолчанию отключено
    },
};

export const YandexMetrika = ({ config = DEFAULT_CONFIG }: { config?: YandexMetrikaConfig }) => {
    useEffect(() => {
        if (typeof window === 'undefined' || window.ym || config.id === 0) return;

        // Создаем функцию с методами
        const ymFunction: YmFunctionWithProps = Object.assign(
            (id: number, action: string, ...args: unknown[]) => {
                try {
                    ymFunction.a = ymFunction.a || [];
                    ymFunction.a.push([id, action, ...args]);
                } catch (e) {
                    console.error('Yandex Metrika error:', e);
                }
            },
            {
                a: [] as unknown[][],
                l: Date.now(),
            }
        );

        window.ym = ymFunction;

        const loadMetrikaScript = () => {
            const script = document.createElement('script');
            script.src = 'https://mc.yandex.ru/metrika/tag.js';

            // Настройка defer/async
            if (config.options?.defer) {
                script.defer = true;
            } else {
                script.async = true;
            }

            script.onerror = () => console.error('Yandex Metrika script failed to load');

            // Вставка скрипта
            const firstScript = document.getElementsByTagName('script')[0];
            if (firstScript?.parentNode) {
                firstScript.parentNode.insertBefore(script, firstScript);
            } else {
                document.head.appendChild(script);
            }

            // Инициализация после загрузки скрипта
            script.onload = () => {
                if (window.ym && config.options) {
                    window.ym(config.id, 'init', {
                        ...config.options,
                        accurateTrackBounce: Number(config.options.accurateTrackBounce),
                    });
                }
            };
        };

        // Стратегия загрузки
        if (config.options?.defer) {
            if (document.readyState === 'complete') {
                loadMetrikaScript();
            } else {
                window.addEventListener('load', loadMetrikaScript);
            }
        } else {
            loadMetrikaScript();
        }

        return () => {
            if (config.options?.defer) {
                window.removeEventListener('load', loadMetrikaScript);
            }
        };
    }, [config.id, config.options]);

    // Автоматическое отслеживание страниц
    const TrackPageView = () => {
        const location = useLocation();

        useEffect(() => {
            if (config.id !== 0 && typeof window.ym === 'function') {
                console.log('Отправка hit:', window.location.href);
                window.ym(config.id, 'hit', window.location.href);
            }
        }, [location.pathname, location.search, config.id]);

        return null;
    };

    return (
        <>
            <TrackPageView />
            <noscript>
                <div>
                    <img
                        src={`https://mc.yandex.ru/watch/${config.id}`}
                        style={{ position: 'absolute', left: '-9999px' }}
                        alt=""
                    />
                </div>
            </noscript>
        </>
    );
};
