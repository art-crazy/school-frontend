export interface Material {
  id: string;
  title: string;
  type: 'article' | 'practice' | 'quiz';
  category: 'html' | 'css' | 'javascript' | 'react' | 'typescript';
  level: 'beginner' | 'intermediate' | 'advanced';
  content: string | {
    files: Record<string, string>;
    instructions?: string;
  };
  estimatedTime?: string;
  prerequisites?: string[];
}

export const materials: Material[] = [
  {
    id: 'html-basics',
    title: 'Основы HTML',
    type: 'article',
    category: 'html',
    level: 'beginner',
    content: `# Основы HTML

HTML (HyperText Markup Language) - это стандартный язык разметки для создания веб-страниц.

## Базовая структура
\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Моя первая веб-страница</title>
  </head>
  <body>
    <h1>Привет, мир!</h1>
    <p>Это параграф.</p>
  </body>
</html>
\`\`\`

## Основные HTML элементы
- Заголовки: от \`<h1>\` до \`<h6>\`
- Параграфы: \`<p>\`
- Ссылки: \`<a href="...">\`
- Изображения: \`<img src="..." alt="...">\`
- Списки: \`<ul>\`, \`<ol>\`, \`<li>\`
- Формы: \`<form>\`, \`<input>\`, \`<button>\`

## Семантический HTML
Современный HTML5 вводит семантические элементы, которые четко описывают их назначение:
- \`<header>\` - шапка страницы
- \`<nav>\` - навигационное меню
- \`<main>\` - основное содержимое
- \`<section>\` - секция документа
- \`<article>\` - независимый контент
- \`<footer>\` - подвал страницы
`,
    estimatedTime: '30 минут',
    prerequisites: []
  },
  {
    id: 'css-fundamentals',
    title: 'Основы CSS',
    type: 'article',
    category: 'css',
    level: 'beginner',
    content: `# Основы CSS

CSS (Cascading Style Sheets) - это язык стилей, используемый для описания внешнего вида документа.

## Базовый синтаксис
\`\`\`css
селектор {
  свойство: значение;
}
\`\`\`

## Основные свойства
- Цвет: \`color\`, \`background-color\`
- Типографика: \`font-family\`, \`font-size\`, \`font-weight\`
- Расположение: \`display\`, \`position\`, \`margin\`, \`padding\`
- Блочная модель: \`width\`, \`height\`, \`border\`, \`box-sizing\`

## CSS селекторы
- По элементу: \`p {}\`
- По классу: \`.class {}\`
- По ID: \`#id {}\`
- По атрибуту: \`[type="text"] {}\`
- Псевдоклассы: \`:hover\`, \`:focus\`, \`:active\`
`,
    estimatedTime: '45 минут',
    prerequisites: ['html-basics']
  },
  {
    id: 'javascript-basics',
    title: 'Основы JavaScript',
    type: 'practice',
    category: 'javascript',
    level: 'beginner',
    content: {
      files: {
        '/index.js': `// Напишите ваш код здесь
/**
 * Функция для приветствия пользователя
 * @param {string} name - Имя пользователя
 * @returns {string} Приветственное сообщение
 */
function greeting(name) {
  return \`Hello, \${name}!\`;
}

// Выводим результат на страницу
document.write(greeting('World'));`,
        '/index.html': `<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript Practice</title>
  </head>
  <body>
    <script src="index.js"></script>
  </body>
</html>`,
        '/sandpack.config.json': `{
  "template": "vanilla",
  "files": {
    "/index.js": {
      "active": true,
      "hidden": false
    },
    "/index.html": {
      "active": true,
      "hidden": false
    }
  },
  "environment": "web",
  "entry": "/index.html",
  "options": {
    "showLineNumbers": true,
    "showInlineErrors": true,
    "showNavigator": true,
    "showTabs": true,
    "closableTabs": true,
    "externalResources": []
  }
}`
      },
      instructions: 'Создайте функцию, которая принимает имя в качестве параметра и возвращает приветственное сообщение. Вы можете изменить имя в поле ввода и нажать кнопку "Запустить код" для проверки результата.'
    },
    estimatedTime: '1 час',
    prerequisites: ['html-basics']
  },
  {
    id: 'react-intro',
    title: 'Введение в React',
    type: 'practice',
    category: 'react',
    level: 'beginner',
    content: {
      files: {
        '/App.js': `import React from 'react';

function App() {
  return (
    <div>
      <h1>Hello, React!</h1>
    </div>
  );
}

export default App;`,
        '/index.js': `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        '/index.html': `<!DOCTYPE html>
<html>
  <head>
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
        '/package.json': `{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`
      },
      instructions: 'Создайте простой React компонент, который отображает приветственное сообщение.'
    },
    estimatedTime: '1.5 часа',
    prerequisites: ['javascript-basics']
  },
  {
    id: 'react-hooks',
    title: 'React Hooks',
    type: 'practice',
    category: 'react',
    level: 'intermediate',
    content: {
      files: {
        '/App.js': `import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Counter: \${count}\`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`
      },
      instructions: 'Создайте компонент счетчика, используя React хуки (useState и useEffect).'
    },
    estimatedTime: '1 час',
    prerequisites: ['react-intro']
  }
]; 