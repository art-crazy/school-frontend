import { Material } from './types';

export const practices: Material[] = [
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