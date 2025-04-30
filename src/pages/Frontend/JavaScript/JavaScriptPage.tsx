import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../../../shared/ui/Breadcrumbs/Breadcrumbs';
import { motion } from 'framer-motion';

const topics = [
    {
        id: 'basics',
        title: 'Основы JavaScript',
        description: 'Изучите базовые концепции и синтаксис JavaScript',
        icon: '📚',
        materials: [
            { id: 'variables', title: 'Переменные и типы данных', icon: '🔤' },
            { id: 'operators', title: 'Операторы', icon: '➕' },
            { id: 'functions', title: 'Функции', icon: '⚡' },
            { id: 'objects', title: 'Объекты и массивы', icon: '📦' },
        ]
    },
    {
        id: 'advanced',
        title: 'Продвинутый JavaScript',
        description: 'Углубленное изучение возможностей JavaScript',
        icon: '🚀',
        materials: [
            { id: 'closures', title: 'Замыкания', icon: '🔒' },
            { id: 'prototypes', title: 'Прототипы и наследование', icon: '🧬' },
            { id: 'async', title: 'Асинхронное программирование', icon: '⏳' },
            { id: 'promises', title: 'Promise и async/await', icon: '🤝' },
        ]
    },
    {
        id: 'dom',
        title: 'Работа с DOM',
        description: 'Взаимодействие с HTML-документом',
        icon: '🌳',
        materials: [
            { id: 'selectors', title: 'Селекторы и навигация', icon: '🔍' },
            { id: 'events', title: 'События', icon: '🎯' },
            { id: 'manipulation', title: 'Манипуляции с DOM', icon: '🛠️' },
        ]
    }
];

const JavaScriptPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumbs
                    title="JavaScript"
                    paths={[
                        { title: 'Frontend', url: '/frontend' }
                    ]}
                />
                <div className="mt-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {topics.map((topic, index) => (
                            <motion.div
                                key={topic.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <div className="relative h-full p-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                    <div className="relative">
                                        <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-xl bg-orange-50 text-orange-600 text-3xl">
                                            {topic.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{topic.title}</h3>
                                        <p className="text-gray-600 mb-6">{topic.description}</p>
                                        <div className="space-y-3">
                                            {topic.materials.map((material) => (
                                                <Link
                                                    key={material.id}
                                                    to={`/frontend/javascript/${material.id}`}
                                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                                                >
                                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-50 text-orange-600 text-lg">
                                                        {material.icon}
                                                    </span>
                                                    <span className="text-gray-700">{material.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JavaScriptPage; 