export interface Material {
  id: string;
  title: string;
  type: 'article' | 'practice' | 'quiz' | 'promise-task';
  category: 'html' | 'css' | 'javascript' | 'react' | 'typescript';
  level: 'beginner' | 'intermediate' | 'advanced';
  content: string | {
    files: Record<string, string>;
    instructions?: string;
  } | {
    description: string;
    code: string;
    expectedOutput: string[];
  } | {
    description: string;
    tasks: Array<{
      id: string;
      title: string;
      code: string;
      expectedOutput: string[];
      explanation: string;
      hints?: Array<{
        id: number;
        text: string;
      }>;
    }>;
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
selector {
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
  },
  {
    id: 'promise-tasks',
    title: 'Задачи на Promise',
    type: 'promise-task',
    category: 'javascript',
    level: 'intermediate',
    content: {
      description: 'В этом разделе вы найдете практические задачи на понимание порядка выполнения кода с Promise. Для каждой задачи вам нужно определить правильный порядок вывода в консоль.',
      tasks: [
        {
          id: 'promise-task-1',
          title: 'Базовый Promise',
          code: `console.log("start");

const testPromise = new Promise ((resolve, reject) => {
    console.log("1")
})

testPromise.then(res => console.log(2));`,
          expectedOutput: ["start", "1"],
          explanation: "Promise выполняется синхронно, поэтому сначала выводится 'start', затем '1'. Метод then не выполняется, так как Promise не был разрешен.",
          hints: [
            {
              id: 1,
              text: "Помните, что код внутри конструктора Promise выполняется синхронно."
            },
            {
              id: 2,
              text: "Обратите внимание, что метод then не будет выполнен, если Promise не был разрешен (resolve) или отклонен (reject)."
            }
          ]
        },
        {
          id: 'promise-task-2',
          title: 'Promise с setTimeout',
          code: `const promise = new Promise((resolve, reject) => {
    console.log(1);

    setTimeout(() => {
        console.log("timerStart");
        resolve("success");
        console.log("timerEnd");
    }, 0);

    console.log(2);
});

promise.then(console.log)
console.log(4);`,
          expectedOutput: ["1", "2", "4", "timerStart", "timerEnd", "success"],
          explanation: "Сначала выполняется синхронный код (1, 2, 4), затем макрозадача (setTimeout) и микрозадача (then).",
          hints: [
            {
              id: 1,
              text: "Помните о порядке выполнения: синхронный код -> микрозадачи -> макрозадачи."
            },
            {
              id: 2,
              text: "Обратите внимание, что setTimeout создает макрозадачу, а then создает микрозадачу."
            },
            {
              id: 3,
              text: "Код внутри setTimeout выполняется после того, как весь синхронный код завершится."
            }
          ]
        },
        {
          id: 'promise-task-3',
          title: 'Promise с внешним resolve',
          code: `console.log(1)
let res = null;
let p1 = new Promise((resolve) => {
    console.log(2)
    res = resolve;
});
console.log(3)

let p2 = p1.then(() => console.log(4));

console.log(7);
res();
console.log(8);`,
          expectedOutput: ["1", "2", "3", "7", "8", "4"],
          explanation: "Promise создается и сохраняет resolve в переменную. После вызова resolve() выполняется then.",
          hints: [
            {
              id: 1,
              text: "Обратите внимание, что resolve сохраняется в переменную res, но не вызывается сразу."
            },
            {
              id: 2,
              text: "Помните, что then выполнится только после вызова resolve()."
            }
          ]
        },
        {
          id: 'promise-task-4',
          title: 'Promise с setTimeout в функции',
          code: `function runCode() {
    console.log('before promise')
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Zero Promise')
            resolve()
        }, 0)
    })
}
setTimeout(() => {
    console.log('Zero')
}, 0)
runCode().then(() => console.log('Zero Promise Invoked'))
console.log('One')`,
          expectedOutput: ["before promise", "One", "Zero", "Zero Promise", "Zero Promise Invoked"],
          explanation: "Сначала выполняется синхронный код, затем макрозадачи (setTimeout) и микрозадачи (then).",
          hints: [
            {
              id: 1,
              text: "Помните о порядке выполнения: синхронный код -> микрозадачи -> макрозадачи."
            },
            {
              id: 2,
              text: "Обратите внимание, что setTimeout создает макрозадачу, а then создает микрозадачу."
            }
          ]
        },
        {
          id: 'promise-task-5',
          title: 'Два параллельных Promise',
          code: `Promise.resolve()
    .then(() => console.log(1))
    .then(() => console.log(2))

Promise.resolve()
    .then(() => console.log(11))
    .then(() => console.log(12))`,
          expectedOutput: ["1", "11", "2", "12"],
          explanation: "Параллельные Promise выполняются по очереди в рамках одного уровня микрозадач.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.resolve() создает уже разрешенный Promise."
            },
            {
              id: 2,
              text: "Обратите внимание, что then выполняются в порядке их создания."
            }
          ]
        },
        {
          id: 'promise-task-6',
          title: 'Promise с ошибками',
          code: `new Promise(res => res())
    .then(() => {
        throw new Error('Ошибка')
        console.log(2)
    })
    .catch(err => {
        console.log(1)
        throw err
    })
    .then(() => console.log(3))
    .catch(() => console.log(4))
    .then(() => console.log(5))
    .catch(() => console.log(6))`,
          expectedOutput: ["1", "4", "5"],
          explanation: "Ошибка перехватывается в catch, затем выполняется следующий then.",
          hints: [
            {
              id: 1,
              text: "Помните, что после catch можно продолжить цепочку с then."
            },
            {
              id: 2,
              text: "Обратите внимание, что код после throw не выполняется."
            }
          ]
        },
        {
          id: 'promise-task-7',
          title: 'Promise с циклом',
          code: `console.log(1)

const p = new Promise((resolve, reject) => {
    console.log(2)
    resolve(3)
})

console.log(4)

setTimeout(() => console.log(5), 0)

console.log(6)

for (let i = 0; i < 10; i++) {
    p.then(res => {
        console.log({i, res})
        return {i, res}
    })
}`,
          expectedOutput: ["1", "2", "4", "6", "5", "{i: 0, res: 3}", "{i: 1, res: 3}", "{i: 2, res: 3}", "{i: 3, res: 3}", "{i: 4, res: 3}", "{i: 5, res: 3}", "{i: 6, res: 3}", "{i: 7, res: 3}", "{i: 8, res: 3}", "{i: 9, res: 3}"],
          explanation: "Сначала выполняется синхронный код, затем макрозадача (setTimeout), затем все then в цикле.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise создается и разрешается синхронно, а then выполняется асинхронно."
            },
            {
              id: 2,
              text: "Обратите внимание, что все then в цикле будут выполнены после того, как Promise уже разрешен."
            },
            {
              id: 3,
              text: "setTimeout создает макрозадачу, которая выполняется после всех микрозадач (then)."
            }
          ]
        },
        {
          id: 'promise-task-8',
          title: 'Promise с ошибкой в try-catch',
          code: `try {
    new Promise((res, rej) => {
        a++
        console.log(a);
        res(a);
    })
        .then(i => {
            console.log(i);
            a++;
            console.log(a);
            return a + i;
        })
        .catch((error) => {
            console.log(error)
            a++;
            return a;
        })
        .then((value) => console.log(value))
        .catch((error) => console.log(error));
    var a = 1;
} catch (e) {
    console.log(e);
}`,
          expectedOutput: ["ReferenceError: a is not defined", "2"],
          explanation: "Ошибка перехватывается в catch, затем выполняется следующий then.",
          hints: [
            {
              id: 1,
              text: "Помните, что переменная a объявляется после её использования."
            },
            {
              id: 2,
              text: "Обратите внимание, что ошибка в Promise перехватывается в catch, а не в try-catch."
            }
          ]
        },
        {
          id: 'promise-task-9',
          title: 'Promise и setTimeout',
          code: `console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});
console.log('script end');`,
          expectedOutput: ["script start", "script end", "promise1", "promise2", "setTimeout"],
          explanation: "Сначала выполняется синхронный код, затем микрозадачи (Promise), затем макрозадачи (setTimeout).",
          hints: [
            {
              id: 1,
              text: "Помните о порядке выполнения: синхронный код -> микрозадачи -> макрозадачи."
            },
            {
              id: 2,
              text: "Обратите внимание, что Promise.resolve() создает уже разрешенный Promise."
            }
          ]
        },
        {
          id: 'promise-task-10',
          title: 'Вложенные Promise и setTimeout',
          code: `console.log('start');

const promise1 = Promise.resolve().then(() => {
    console.log('promise1');
    const timer2 = setTimeout(() => {
        console.log('timer2')
    }, 0)
});

const timer1 = setTimeout(() => {
    console.log('timer1')
    const promise2 = Promise.resolve().then(() => {
        console.log('promise2')
    })
}, 0)

console.log('end');`,
          expectedOutput: ["start", "end", "promise1", "timer1", "promise2", "timer2"],
          explanation: "Сначала выполняется синхронный код, затем микрозадачи первого уровня, затем макрозадачи, затем микрозадачи второго уровня.",
          hints: [
            {
              id: 1,
              text: "Помните о порядке выполнения: синхронный код -> микрозадачи -> макрозадачи."
            },
            {
              id: 2,
              text: "Обратите внимание, что вложенные Promise и setTimeout создают новые уровни задач."
            }
          ]
        },
        {
          id: 'promise-task-11',
          title: 'Promise с resolve и console.log',
          code: `console.log('start');

const promise1 = new Promise((resolve, reject) => {
    console.log(1)
    resolve(2)
    console.log(3)
})

promise1.then(res => {
    console.log(res)
})

console.log('end');`,
          expectedOutput: ["start", "1", "3", "end", "2"],
          explanation: "Сначала выполняется синхронный код в конструкторе Promise, затем resolve, затем оставшийся синхронный код, и только потом then.",
          hints: [
            {
              id: 1,
              text: "Помните, что код внутри конструктора Promise выполняется синхронно."
            },
            {
              id: 2,
              text: "Обратите внимание, что console.log(3) выполняется после resolve(2)."
            }
          ]
        },
        {
          id: 'promise-task-12',
          title: 'Promise без resolve',
          code: `console.log('start');

const promise1 = new Promise((resolve, reject) => {
    console.log(1)
})

console.log('end');`,
          expectedOutput: ["start", "1", "end"],
          explanation: "Promise выполняется синхронно, но без вызова resolve или reject then не выполняется.",
          hints: [
            {
              id: 1,
              text: "Помните, что код внутри конструктора Promise выполняется синхронно."
            },
            {
              id: 2,
              text: "Обратите внимание, что без вызова resolve или reject then не будет выполнен."
            }
          ]
        },
        {
          id: 'promise-task-13',
          title: 'Promise с вложенными setTimeout',
          code: `setTimeout(() => console.log('setTimeout 1'), 0);

new Promise((resolve, reject) => {
    console.log('Promise 1');
    resolve();
    console.log('Promise 2');
}).then(() => console.log('Promise 3'));

Promise.resolve().then(() => setTimeout(() => console.log('setTimeout 2'), 0));

Promise.resolve().then(() => console.log('Promise 4'));

setTimeout(() => console.log('setTimeout 3'), 0);

console.log('final');`,
          expectedOutput: ["Promise 1", "Promise 2", "final", "Promise 3", "Promise 4", "setTimeout 1", "setTimeout 3", "setTimeout 2"],
          explanation: "Сначала выполняется синхронный код, затем микрозадачи (Promise), затем макрозадачи (setTimeout).",
          hints: [
            {
              id: 1,
              text: "Помните о порядке выполнения: синхронный код -> микрозадачи -> макрозадачи."
            },
            {
              id: 2,
              text: "Обратите внимание, что setTimeout внутри then создает новую макрозадачу."
            }
          ]
        },
        {
          id: 'promise-task-14',
          title: 'Promise с вложенными setTimeout 2',
          code: `console.log(1);
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
Promise.resolve().then(() => setTimeout(() => console.log(4)));
Promise.resolve().then(() => console.log(5));
setTimeout(() => console.log(6));
console.log(7);`,
          expectedOutput: ["1", "7", "3", "5", "2", "6", "4"],
          explanation: "Сначала выполняется синхронный код, затем микрозадачи (Promise), затем макрозадачи (setTimeout).",
          hints: [
            {
              id: 1,
              text: "Помните о порядке выполнения: синхронный код -> микрозадачи -> макрозадачи."
            },
            {
              id: 2,
              text: "Обратите внимание, что setTimeout внутри then создает новую макрозадачу."
            }
          ]
        },
        {
          id: 'promise-task-15',
          title: 'Promise с функцией',
          code: `console.log('start')

const fn = () => (new Promise((resolve, reject) => {
    console.log(1);
    resolve('success')
}))

console.log('middle')

fn().then(res => {
    console.log(res)
})

console.log('end')`,
          expectedOutput: ["start", "middle", "1", "end", "success"],
          explanation: "Сначала выполняется синхронный код до вызова функции, затем код в Promise, затем оставшийся синхронный код, и только потом then.",
          hints: [
            {
              id: 1,
              text: "Помните, что функция fn возвращает новый Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения синхронного кода."
            }
          ]
        },
        {
          id: 'promise-task-16',
          title: 'Promise с resolve',
          code: `console.log('start');

const promise1 = new Promise((resolve, reject) => {
    console.log(1)
    resolve(2)
})

promise1.then(res => {
    console.log(res)
})

console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "Сначала выполняется синхронный код в конструкторе Promise, затем resolve, затем оставшийся синхронный код, и только потом then.",
          hints: [
            {
              id: 1,
              text: "Помните, что код внутри конструктора Promise выполняется синхронно."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения синхронного кода и then."
            }
          ]
        },
        {
          id: 'promise-task-17',
          title: 'Promise с двумя resolve',
          code: `console.log('start')

Promise.resolve()
    .then(() => console.log(1))
    .then(() => console.log(2))

Promise.resolve()
    .then(() => console.log(11))
    .then(() => console.log(12))

console.log('end')`,
          expectedOutput: ["start", "end", "1", "11", "2", "12"],
          explanation: "Параллельные Promise выполняются по очереди в рамках одного уровня микрозадач.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.resolve() создает уже разрешенный Promise."
            },
            {
              id: 2,
              text: "Обратите внимание, что then выполняются в порядке их создания."
            }
          ]
        },
        {
          id: 'promise-task-18',
          title: 'Promise с ошибкой и catch',
          code: `new Promise(res => res())
    .then(() => {
        throw new Error('Ошибка')
        console.log(2)
    })
    .catch(err => {
        console.log(1)
        throw err
    })
    .then(() => console.log(3))
    .catch(() => console.log(4))
    .then(() => console.log(5))
    .catch(() => console.log(6))`,
          expectedOutput: ["1", "4", "5"],
          explanation: "Ошибка перехватывается в catch, затем выполняется следующий then.",
          hints: [
            {
              id: 1,
              text: "Помните, что после catch можно продолжить цепочку с then."
            },
            {
              id: 2,
              text: "Обратите внимание, что код после throw не выполняется."
            }
          ]
        },
        {
          id: 'promise-task-19',
          title: 'Promise с setTimeout и resolve',
          code: `console.log('start')

setTimeout(() => {
    console.log('setTimeout')
})

Promise.resolve().then(() => {
    console.log('resolve')
})

console.log('end')`,
          expectedOutput: ["start", "end", "resolve", "setTimeout"],
          explanation: "Сначала выполняется синхронный код, затем микрозадачи (Promise), затем макрозадачи (setTimeout).",
          hints: [
            {
              id: 1,
              text: "Помните о порядке выполнения: синхронный код -> микрозадачи -> макрозадачи."
            },
            {
              id: 2,
              text: "Обратите внимание, что Promise.resolve() создает уже разрешенный Promise."
            }
          ]
        },
        {
          id: 'promise-task-20',
          title: 'Два Promise с resolve',
          code: `console.log('start')

Promise.resolve(1).then((res) => {
    console.log(res)
})

Promise.resolve(2).then((res) => {
    console.log(res)
})

console.log('end')`,
          expectedOutput: ["start", "end", "1", "2"],
          explanation: "Параллельные Promise выполняются по очереди в рамках одного уровня микрозадач.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.resolve() создает уже разрешенный Promise."
            },
            {
              id: 2,
              text: "Обратите внимание, что then выполняются в порядке их создания."
            }
          ]
        },
        {
          id: 'promise-task-21',
          title: 'Promise с условиями',
          code: `console.log('start');

const promise = new Promise((resolve, reject) => {
    console.log(1);
    if (Math.random() > 0.5) {
        resolve(2);
    } else {
        reject(3);
    }
    console.log(4);
});

promise
    .then(res => console.log(res))
    .catch(err => console.log(err));

console.log('end');`,
          expectedOutput: ["start", "1", "4", "end", "2 или 3"],
          explanation: "Promise выполняется синхронно, но результат зависит от условия.",
          hints: [
            {
              id: 1,
              text: "Помните, что код внутри Promise выполняется синхронно."
            },
            {
              id: 2,
              text: "Обратите внимание, что результат зависит от Math.random()."
            }
          ]
        },
        {
          id: 'promise-task-22',
          title: 'Promise с вложенными условиями',
          code: `console.log('start');

const promise = new Promise((resolve, reject) => {
    console.log(1);
    if (Math.random() > 0.5) {
        setTimeout(() => {
            console.log(2);
            resolve(3);
        }, 0);
    } else {
        console.log(4);
        reject(5);
    }
    console.log(6);
});

promise
    .then(res => console.log(res))
    .catch(err => console.log(err));

console.log('end');`,
          expectedOutput: ["start", "1", "6", "end", "4", "5 или 2", "3"],
          explanation: "Promise с вложенными условиями и setTimeout.",
          hints: [
            {
              id: 1,
              text: "Помните о порядке выполнения: синхронный код -> микрозадачи -> макрозадачи."
            },
            {
              id: 2,
              text: "Обратите внимание на разные пути выполнения в зависимости от условия."
            }
          ]
        },
        {
          id: 'promise-task-23',
          title: 'Promise с несколькими then',
          code: `console.log('start');

Promise.resolve(1)
    .then(res => {
        console.log(res);
        return res + 1;
    })
    .then(res => {
        console.log(res);
        return res + 1;
    })
    .then(res => {
        console.log(res);
        return res + 1;
    })
    .then(res => console.log(res));

console.log('end');`,
          expectedOutput: ["start", "end", "1", "2", "3", "4"],
          explanation: "Цепочка then с преобразованием данных.",
          hints: [
            {
              id: 1,
              text: "Помните, что then может возвращать новое значение."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения then."
            }
          ]
        },
        {
          id: 'promise-task-24',
          title: 'Promise с catch в середине цепочки',
          code: `console.log('start');

Promise.resolve(1)
    .then(res => {
        console.log(res);
        throw new Error('Ошибка');
    })
    .catch(err => {
        console.log(err.message);
        return 2;
    })
    .then(res => {
        console.log(res);
        return res + 1;
    })
    .then(res => console.log(res));

console.log('end');`,
          expectedOutput: ["start", "end", "1", "Ошибка", "2", "3"],
          explanation: "Обработка ошибки в середине цепочки Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что после catch можно продолжить цепочку с then."
            },
            {
              id: 2,
              text: "Обратите внимание, что catch возвращает новое значение."
            }
          ]
        },
        {
          id: 'promise-task-25',
          title: 'Promise с finally',
          code: `console.log('start');

Promise.resolve(1)
    .then(res => {
        console.log(res);
        return res + 1;
    })
    .finally(() => {
        console.log('finally');
    })
    .then(res => {
        console.log(res);
        return res + 1;
    })
    .then(res => console.log(res));

console.log('end');`,
          expectedOutput: ["start", "end", "1", "finally", "2", "3"],
          explanation: "Использование finally в цепочке Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что finally выполняется после then/catch."
            },
            {
              id: 2,
              text: "Обратите внимание, что finally не влияет на значение в цепочке."
            }
          ]
        },
        {
          id: 'promise-task-26',
          title: 'Promise с несколькими catch',
          code: `console.log('start');

Promise.resolve(1)
    .then(res => {
        console.log(res);
        throw new Error('Ошибка 1');
    })
    .catch(err => {
        console.log(err.message);
        throw new Error('Ошибка 2');
    })
    .catch(err => {
        console.log(err.message);
        return 2;
    })
    .then(res => console.log(res));

console.log('end');`,
          expectedOutput: ["start", "end", "1", "Ошибка 1", "Ошибка 2", "2"],
          explanation: "Множественная обработка ошибок в цепочке Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что catch может пробрасывать ошибку дальше."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения catch."
            }
          ]
        },
        {
          id: 'promise-task-27',
          title: 'Promise с Promise.all',
          code: `console.log('start');

const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
    .then(res => console.log(res));

console.log('end');`,
          expectedOutput: ["start", "end", "[1, 2, 3]"],
          explanation: "Использование Promise.all для параллельного выполнения.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.all ждет выполнения всех Promise."
            },
            {
              id: 2,
              text: "Обратите внимание, что результат - массив значений."
            }
          ]
        },
        {
          id: 'promise-task-28',
          title: 'Promise с Promise.race',
          code: `console.log('start');

const promise1 = new Promise(resolve => setTimeout(() => resolve(1), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve(2), 500));
const promise3 = new Promise(resolve => setTimeout(() => resolve(3), 1500));

Promise.race([promise1, promise2, promise3])
    .then(res => console.log(res));

console.log('end');`,
          expectedOutput: ["start", "end", "2"],
          explanation: "Использование Promise.race для получения первого выполненного Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.race возвращает результат первого выполненного Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на разные задержки в setTimeout."
            }
          ]
        },
        {
          id: 'promise-task-29',
          title: 'Promise с Promise.allSettled',
          code: `console.log('start');

const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(2);
const promise3 = Promise.resolve(3);

Promise.allSettled([promise1, promise2, promise3])
    .then(res => console.log(res));

console.log('end');`,
          expectedOutput: ["start", "end", "[{status: 'fulfilled', value: 1}, {status: 'rejected', reason: 2}, {status: 'fulfilled', value: 3}]"],
          explanation: "Использование Promise.allSettled для получения результатов всех Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.allSettled ждет выполнения всех Promise, даже с ошибками."
            },
            {
              id: 2,
              text: "Обратите внимание на структуру результата для успешных и неуспешных Promise."
            }
          ]
        },
        {
          id: 'promise-task-30',
          title: 'Promise с Promise.any',
          code: `console.log('start');

const promise1 = Promise.reject(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.reject(3);

Promise.any([promise1, promise2, promise3])
    .then(res => console.log(res))
    .catch(err => console.log(err.errors));

console.log('end');`,
          expectedOutput: ["start", "end", "2"],
          explanation: "Использование Promise.any для получения первого успешного Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.any возвращает первый успешный Promise."
            },
            {
              id: 2,
              text: "Обратите внимание, что ошибки игнорируются, если есть успешный Promise."
            }
          ]
        },
        {
          id: 'promise-task-31',
          title: 'Promise с классом',
          code: `console.log('start');

class MyPromise {
    constructor(executor) {
        console.log(1);
        executor(
            value => console.log(value),
            error => console.log(error)
        );
        console.log(2);
    }
}

new MyPromise((resolve, reject) => {
    console.log(3);
    resolve(4);
    console.log(5);
});

console.log('end');`,
          expectedOutput: ["start", "1", "3", "4", "5", "2", "end"],
          explanation: "Реализация простого класса Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что конструктор класса выполняется синхронно."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения кода в конструкторе и executor."
            }
          ]
        },
        {
          id: 'promise-task-32',
          title: 'Promise с async/await',
          code: `console.log('start');

async function test() {
    console.log(1);
    const result = await Promise.resolve(2);
    console.log(result);
    console.log(3);
}

test();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3"],
          explanation: "Использование async/await с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что async функция возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание, что код после await выполняется асинхронно."
            }
          ]
        },
        {
          id: 'promise-task-33',
          title: 'Promise с async/await и ошибками',
          code: `console.log('start');

async function test() {
    try {
        console.log(1);
        await Promise.reject(2);
        console.log(3);
    } catch (err) {
        console.log(err);
    }
    console.log(4);
}

test();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "4"],
          explanation: "Обработка ошибок в async/await.",
          hints: [
            {
              id: 1,
              text: "Помните, что try/catch работает с async/await как с синхронным кодом."
            },
            {
              id: 2,
              text: "Обратите внимание, что код после await с ошибкой не выполняется."
            }
          ]
        },
        {
          id: 'promise-task-34',
          title: 'Promise с async/await и finally',
          code: `console.log('start');

async function test() {
    try {
        console.log(1);
        await Promise.resolve(2);
        console.log(3);
    } catch (err) {
        console.log(err);
    } finally {
        console.log(4);
    }
    console.log(5);
}

test();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "3", "4", "5"],
          explanation: "Использование finally с async/await.",
          hints: [
            {
              id: 1,
              text: "Помните, что finally выполняется после try/catch."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения кода."
            }
          ]
        },
        {
          id: 'promise-task-35',
          title: 'Promise с async/await и Promise.all',
          code: `console.log('start');

async function test() {
    console.log(1);
    const [res1, res2] = await Promise.all([
        Promise.resolve(2),
        Promise.resolve(3)
    ]);
    console.log(res1, res2);
    console.log(4);
}

test();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2 3", "4"],
          explanation: "Использование Promise.all с async/await.",
          hints: [
            {
              id: 1,
              text: "Помните, что await можно использовать с Promise.all."
            },
            {
              id: 2,
              text: "Обратите внимание на деструктуризацию результата."
            }
          ]
        },
        {
          id: 'promise-task-36',
          title: 'Promise с async/await и циклом',
          code: `console.log('start');

async function test() {
    for (let i = 0; i < 3; i++) {
        console.log(i);
        await Promise.resolve(i + 1);
        console.log(i + 1);
    }
    console.log(4);
}

test();
console.log('end');`,
          expectedOutput: ["start", "0", "end", "1", "1", "2", "2", "3", "3", "4"],
          explanation: "Использование async/await в цикле.",
          hints: [
            {
              id: 1,
              text: "Помните, что await в цикле делает итерации последовательными."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения кода."
            }
          ]
        },
        {
          id: 'promise-task-37',
          title: 'Promise с async/await и условиями',
          code: `console.log('start');

async function test() {
    console.log(1);
    if (Math.random() > 0.5) {
        await Promise.resolve(2);
        console.log(3);
    } else {
        await Promise.reject(4);
        console.log(5);
    }
    console.log(6);
}

test().catch(err => console.log(err));
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3", "6 или 4"],
          explanation: "Использование async/await с условиями.",
          hints: [
            {
              id: 1,
              text: "Помните, что await можно использовать в условиях."
            },
            {
              id: 2,
              text: "Обратите внимание на обработку ошибок."
            }
          ]
        },
        {
          id: 'promise-task-38',
          title: 'Promise с async/await и вложенными функциями',
          code: `console.log('start');

async function outer() {
    console.log(1);
    await inner();
    console.log(4);
}

async function inner() {
    console.log(2);
    await Promise.resolve(3);
    console.log(3);
}

outer();
console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "3", "4"],
          explanation: "Использование async/await с вложенными функциями.",
          hints: [
            {
              id: 1,
              text: "Помните, что await можно использовать в любой async функции."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения вложенных функций."
            }
          ]
        },
        {
          id: 'promise-task-39',
          title: 'Promise с async/await и методами класса',
          code: `console.log('start');

class Test {
    async method1() {
        console.log(1);
        await this.method2();
        console.log(4);
    }

    async method2() {
        console.log(2);
        await Promise.resolve(3);
        console.log(3);
    }
}

new Test().method1();
console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "3", "4"],
          explanation: "Использование async/await в методах класса.",
          hints: [
            {
              id: 1,
              text: "Помните, что методы класса могут быть async."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения методов."
            }
          ]
        },
        {
          id: 'promise-task-40',
          title: 'Promise с async/await и статическими методами',
          code: `console.log('start');

class Test {
    static async method1() {
        console.log(1);
        await this.method2();
        console.log(4);
    }

    static async method2() {
        console.log(2);
        await Promise.resolve(3);
        console.log(3);
    }
}

Test.method1();
console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "3", "4"],
          explanation: "Использование async/await в статических методах класса.",
          hints: [
            {
              id: 1,
              text: "Помните, что статические методы могут быть async."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения статических методов."
            }
          ]
        },
        {
          id: 'promise-task-41',
          title: 'Promise с генератором',
          code: `console.log('start');

function* generator() {
    console.log(1);
    yield Promise.resolve(2);
    console.log(3);
    yield Promise.resolve(4);
    console.log(5);
}

const gen = generator();
gen.next().value.then(res => {
    console.log(res);
    return gen.next().value;
}).then(res => {
    console.log(res);
    gen.next();
});

console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3", "4", "5"],
          explanation: "Использование Promise с генератором.",
          hints: [
            {
              id: 1,
              text: "Помните, что генератор возвращает итератор."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения yield и then."
            }
          ]
        },
        {
          id: 'promise-task-42',
          title: 'Promise с итератором',
          code: `console.log('start');

const iterable = {
    [Symbol.iterator]() {
        let i = 0;
        return {
            next() {
                return {
                    value: Promise.resolve(i++),
                    done: i > 2
                };
            }
        };
    }
};

for (const promise of iterable) {
    promise.then(res => console.log(res));
}

console.log('end');`,
          expectedOutput: ["start", "end", "0", "1"],
          explanation: "Использование Promise с итератором.",
          hints: [
            {
              id: 1,
              text: "Помните, что итератор возвращает Promise как значение."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения for...of и then."
            }
          ]
        },
        {
          id: 'promise-task-43',
          title: 'Promise с прокси',
          code: `console.log('start');

const target = {
    value: Promise.resolve(1)
};

const proxy = new Proxy(target, {
    get(target, prop) {
        console.log(2);
        return target[prop];
    }
});

proxy.value.then(res => console.log(res));
console.log('end');`,
          expectedOutput: ["start", "2", "end", "1"],
          explanation: "Использование Promise с прокси.",
          hints: [
            {
              id: 1,
              text: "Помните, что прокси перехватывает доступ к свойствам."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения перехвата и then."
            }
          ]
        },
        {
          id: 'promise-task-44',
          title: 'Promise с декоратором',
          code: `console.log('start');

function delay(ms) {
    return function(target, name, descriptor) {
        const original = descriptor.value;
        descriptor.value = function(...args) {
            console.log(1);
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log(2);
                    resolve(original.apply(this, args));
                }, ms);
            });
        };
        return descriptor;
    };
}

class Test {
    @delay(0)
    method() {
        console.log(3);
        return 4;
    }
}

new Test().method().then(res => console.log(res));
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3", "4"],
          explanation: "Использование Promise с декоратором.",
          hints: [
            {
              id: 1,
              text: "Помните, что декоратор модифицирует метод класса."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения декоратора и then."
            }
          ]
        },
        {
          id: 'promise-task-45',
          title: 'Promise с паттерном Observer',
          code: `console.log('start');

class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

const observable = new Observable();
observable.subscribe(data => console.log(data));

Promise.resolve(1).then(res => {
    console.log(2);
    observable.notify(res);
    console.log(3);
});

console.log('end');`,
          expectedOutput: ["start", "end", "2", "1", "3"],
          explanation: "Использование Promise с паттерном Observer.",
          hints: [
            {
              id: 1,
              text: "Помните, что Observer уведомляет подписчиков о событиях."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения then и уведомлений."
            }
          ]
        },
        {
          id: 'promise-task-46',
          title: 'Promise с паттерном Factory',
          code: `console.log('start');

class PromiseFactory {
    static create(type) {
        console.log(1);
        return new Promise((resolve, reject) => {
            console.log(2);
            if (type === 'success') {
                resolve(3);
            } else {
                reject(4);
            }
        });
    }
}

PromiseFactory.create('success')
    .then(res => console.log(res))
    .catch(err => console.log(err));

console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "3"],
          explanation: "Использование Promise с паттерном Factory.",
          hints: [
            {
              id: 1,
              text: "Помните, что Factory создает объекты определенного типа."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения фабрики и then."
            }
          ]
        },
        {
          id: 'promise-task-47',
          title: 'Promise с паттерном Singleton',
          code: `console.log('start');

class Singleton {
    static instance;
    
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        console.log(1);
        Singleton.instance = this;
    }

    getPromise() {
        console.log(2);
        return Promise.resolve(3);
    }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

instance1.getPromise().then(res => console.log(res));
instance2.getPromise().then(res => console.log(res));

console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "3", "3"],
          explanation: "Использование Promise с паттерном Singleton.",
          hints: [
            {
              id: 1,
              text: "Помните, что Singleton создает только один экземпляр."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения методов разных экземпляров."
            }
          ]
        },
        {
          id: 'promise-task-48',
          title: 'Promise с паттерном Strategy',
          code: `console.log('start');

class Strategy {
    execute() {
        throw new Error('Not implemented');
    }
}

class SuccessStrategy extends Strategy {
    execute() {
        console.log(1);
        return Promise.resolve(2);
    }
}

class ErrorStrategy extends Strategy {
    execute() {
        console.log(3);
        return Promise.reject(4);
    }
}

const strategy = new SuccessStrategy();
strategy.execute()
    .then(res => console.log(res))
    .catch(err => console.log(err));

console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "Использование Promise с паттерном Strategy.",
          hints: [
            {
              id: 1,
              text: "Помните, что Strategy определяет семейство алгоритмов."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения стратегии и then."
            }
          ]
        },
        {
          id: 'promise-task-49',
          title: 'Promise с паттерном Chain of Responsibility',
          code: `console.log('start');

class Handler {
    constructor() {
        this.next = null;
    }

    setNext(handler) {
        this.next = handler;
        return handler;
    }

    handle(request) {
        if (this.next) {
            return this.next.handle(request);
        }
        return Promise.resolve(request);
    }
}

class Handler1 extends Handler {
    handle(request) {
        console.log(1);
        return super.handle(request + 1);
    }
}

class Handler2 extends Handler {
    handle(request) {
        console.log(2);
        return super.handle(request + 1);
    }
}

const handler1 = new Handler1();
const handler2 = new Handler2();
handler1.setNext(handler2);

handler1.handle(0).then(res => console.log(res));
console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "2"],
          explanation: "Использование Promise с паттерном Chain of Responsibility.",
          hints: [
            {
              id: 1,
              text: "Помните, что Chain of Responsibility передает запрос по цепочке."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения обработчиков."
            }
          ]
        },
        {
          id: 'promise-task-50',
          title: 'Promise с паттерном Command',
          code: `console.log('start');

class Command {
    execute() {
        throw new Error('Not implemented');
    }
}

class PromiseCommand extends Command {
    execute() {
        console.log(1);
        return Promise.resolve(2);
    }
}

class Invoker {
    constructor(command) {
        this.command = command;
    }

    execute() {
        return this.command.execute();
    }
}

const command = new PromiseCommand();
const invoker = new Invoker(command);

invoker.execute().then(res => console.log(res));
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "Использование Promise с паттерном Command.",
          hints: [
            {
              id: 1,
              text: "Помните, что Command инкапсулирует запрос как объект."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения команды и then."
            }
          ]
        },
        {
          id: 'promise-task-51',
          title: 'Promise с тестированием',
          code: `console.log('start');

function testPromise() {
    console.log(1);
    return new Promise((resolve, reject) => {
        console.log(2);
        setTimeout(() => {
            console.log(3);
            resolve(4);
        }, 0);
    });
}

testPromise()
    .then(res => {
        console.log(res);
        return res + 1;
    })
    .then(res => console.log(res));

console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "3", "4", "5"],
          explanation: "Тестирование Promise с таймером.",
          hints: [
            {
              id: 1,
              text: "Помните о порядке выполнения: синхронный код -> макрозадачи -> микрозадачи."
            },
            {
              id: 2,
              text: "Обратите внимание на цепочку then и преобразование данных."
            }
          ]
        },
        {
          id: 'promise-task-52',
          title: 'Promise с мокированием',
          code: `console.log('start');

function mockPromise(success) {
    console.log(1);
    return new Promise((resolve, reject) => {
        console.log(2);
        if (success) {
            resolve(3);
        } else {
            reject(4);
        }
    });
}

mockPromise(true)
    .then(res => console.log(res))
    .catch(err => console.log(err));

console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "3"],
          explanation: "Мокирование Promise с условием.",
          hints: [
            {
              id: 1,
              text: "Помните, что мок может эмулировать успешное и неуспешное выполнение."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения кода."
            }
          ]
        },
        {
          id: 'promise-task-53',
          title: 'Promise с оптимизацией',
          code: `console.log('start');

function optimizedPromise() {
    console.log(1);
    return Promise.resolve(2)
        .then(res => {
            console.log(res);
            return res + 1;
        })
        .then(res => {
            console.log(res);
            return res + 1;
        });
}

optimizedPromise().then(res => console.log(res));
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3", "4"],
          explanation: "Оптимизация цепочки Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что цепочка then может быть оптимизирована."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения then."
            }
          ]
        },
        {
          id: 'promise-task-54',
          title: 'Promise с отладкой',
          code: `console.log('start');

function debugPromise() {
    console.log(1);
    return new Promise((resolve, reject) => {
        console.log(2);
        try {
            throw new Error('Debug');
        } catch (err) {
            console.log(err.message);
            resolve(3);
        }
    });
}

debugPromise()
    .then(res => console.log(res))
    .catch(err => console.log(err));

console.log('end');`,
          expectedOutput: ["start", "1", "2", "Debug", "end", "3"],
          explanation: "Отладка Promise с обработкой ошибок.",
          hints: [
            {
              id: 1,
              text: "Помните, что try/catch может перехватывать ошибки в Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения кода."
            }
          ]
        },
        {
          id: 'promise-task-55',
          title: 'Promise с безопасностью',
          code: `console.log('start');

function securePromise(data) {
    console.log(1);
    return new Promise((resolve, reject) => {
        console.log(2);
        if (typeof data === 'number') {
            resolve(data + 1);
        } else {
            reject('Invalid data type');
        }
    });
}

securePromise(1)
    .then(res => console.log(res))
    .catch(err => console.log(err));

console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "2"],
          explanation: "Безопасная обработка данных в Promise.",
          hints: [
            {
              id: 1,
              text: "Помните о проверке типов данных в Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на обработку ошибок при неверных данных."
            }
          ]
        },
        {
          id: 'promise-task-56',
          title: 'Promise с производительностью',
          code: `console.log('start');

function performantPromise() {
    console.log(1);
    return Promise.all([
        Promise.resolve(2),
        Promise.resolve(3)
    ]).then(([res1, res2]) => {
        console.log(res1, res2);
        return res1 + res2;
    });
}

performantPromise().then(res => console.log(res));
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2 3", "5"],
          explanation: "Оптимизация производительности с Promise.all.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.all выполняет Promise параллельно."
            },
            {
              id: 2,
              text: "Обратите внимание на деструктуризацию результата."
            }
          ]
        },
        {
          id: 'promise-task-57',
          title: 'Promise с кэшированием',
          code: `console.log('start');

const cache = new Map();

function cachedPromise(key) {
    console.log(1);
    if (cache.has(key)) {
        console.log(2);
        return cache.get(key);
    }
    const promise = Promise.resolve(key + 1);
    cache.set(key, promise);
    return promise;
}

cachedPromise(1)
    .then(res => {
        console.log(res);
        return cachedPromise(1);
    })
    .then(res => console.log(res));

console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "2"],
          explanation: "Кэширование результатов Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что кэш может хранить Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на повторное использование кэшированного Promise."
            }
          ]
        },
        {
          id: 'promise-task-58',
          title: 'Promise с отменой',
          code: `console.log('start');

function cancellablePromise() {
    console.log(1);
    let cancel;
    const promise = new Promise((resolve, reject) => {
        console.log(2);
        cancel = () => {
            console.log(3);
            reject('Cancelled');
        };
        setTimeout(() => resolve(4), 0);
    });
    return { promise, cancel };
}

const { promise, cancel } = cancellablePromise();
promise
    .then(res => console.log(res))
    .catch(err => console.log(err));

cancel();
console.log('end');`,
          expectedOutput: ["start", "1", "2", "3", "end", "Cancelled"],
          explanation: "Отмена выполнения Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise можно отменить через reject."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения кода при отмене."
            }
          ]
        },
        {
          id: 'promise-task-59',
          title: 'Promise с таймаутом',
          code: `console.log('start');

function timeoutPromise(ms) {
    console.log(1);
    return new Promise((resolve, reject) => {
        console.log(2);
        setTimeout(() => {
            console.log(3);
            reject('Timeout');
        }, ms);
        Promise.resolve(4).then(resolve);
    });
}

timeoutPromise(1000)
    .then(res => console.log(res))
    .catch(err => console.log(err));

console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "4"],
          explanation: "Ограничение времени выполнения Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что таймаут можно реализовать через setTimeout."
            },
            {
              id: 2,
              text: "Обратите внимание на конкуренцию между resolve и reject."
            }
          ]
        },
        {
          id: 'promise-task-60',
          title: 'Promise с ретраями',
          code: `console.log('start');

function retryPromise(fn, retries = 3) {
    console.log(1);
    return fn().catch(err => {
        console.log(2);
        if (retries > 0) {
            return retryPromise(fn, retries - 1);
        }
        throw err;
    });
}

retryPromise(() => Promise.reject('Error'))
    .catch(err => console.log(err));

console.log('end');`,
          expectedOutput: ["start", "1", "2", "2", "2", "end", "Error"],
          explanation: "Повторные попытки выполнения Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что ретраи можно реализовать через рекурсию."
            },
            {
              id: 2,
              text: "Обратите внимание на количество попыток и порядок выполнения."
            }
          ]
        },
        {
          id: 'promise-task-61',
          title: 'Promise с Web Workers',
          code: `console.log('start');

const worker = new Worker('worker.js');
worker.postMessage(1);

worker.onmessage = (event) => {
    console.log(event.data);
};

console.log('end');`,
          expectedOutput: ["start", "end", "2"],
          explanation: "Использование Promise с Web Workers для параллельных вычислений.",
          hints: [
            {
              id: 1,
              text: "Помните, что Web Workers выполняются в отдельном потоке."
            },
            {
              id: 2,
              text: "Обратите внимание на асинхронную природу обмена сообщениями."
            }
          ]
        },
        {
          id: 'promise-task-62',
          title: 'Promise с Service Workers',
          code: `console.log('start');

navigator.serviceWorker.register('sw.js')
    .then(registration => {
        console.log(1);
        return registration.active;
    })
    .then(worker => {
        console.log(2);
        return worker.postMessage(3);
    })
    .then(() => console.log(4));

console.log('end');`,
          expectedOutput: ["start", "end", "1", "2", "4"],
          explanation: "Использование Promise с Service Workers для офлайн-функциональности.",
          hints: [
            {
              id: 1,
              text: "Помните, что Service Workers работают в фоновом режиме."
            },
            {
              id: 2,
              text: "Обратите внимание на цепочку Promise при регистрации."
            }
          ]
        },
        {
          id: 'promise-task-63',
          title: 'Promise с IndexedDB',
          code: `console.log('start');

const request = indexedDB.open('testDB', 1);

request.onsuccess = () => {
    console.log(1);
    const db = request.result;
    const transaction = db.transaction('store', 'readwrite');
    const store = transaction.objectStore('store');
    
    store.put(2, 'key').onsuccess = () => {
        console.log(3);
    };
    
    console.log(2);
};

console.log('end');`,
          expectedOutput: ["start", "end", "1", "2", "3"],
          explanation: "Использование Promise с IndexedDB для хранения данных.",
          hints: [
            {
              id: 1,
              text: "Помните, что IndexedDB операции асинхронны."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения операций с базой данных."
            }
          ]
        },
        {
          id: 'promise-task-64',
          title: 'Promise с WebSocket',
          code: `console.log('start');

const ws = new WebSocket('ws://example.com');

ws.onopen = () => {
    console.log(1);
    ws.send(2);
};

ws.onmessage = (event) => {
    console.log(event.data);
};

console.log('end');`,
          expectedOutput: ["start", "end", "1", "3"],
          explanation: "Использование Promise с WebSocket для двусторонней связи.",
          hints: [
            {
              id: 1,
              text: "Помните, что WebSocket устанавливает постоянное соединение."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок событий открытия и получения сообщений."
            }
          ]
        },
        {
          id: 'promise-task-65',
          title: 'Promise с File API',
          code: `console.log('start');

const file = new File(['content'], 'test.txt');
const reader = new FileReader();

reader.onload = () => {
    console.log(1);
    console.log(reader.result);
};

reader.readAsText(file);
console.log('end');`,
          expectedOutput: ["start", "end", "1", "content"],
          explanation: "Использование Promise с File API для работы с файлами.",
          hints: [
            {
              id: 1,
              text: "Помните, что FileReader работает асинхронно."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок чтения файла и получения результата."
            }
          ]
        },
        {
          id: 'promise-task-66',
          title: 'Promise с Streams API',
          code: `console.log('start');

const stream = new ReadableStream({
    start(controller) {
        console.log(1);
        controller.enqueue(2);
        controller.close();
    }
});

stream.getReader().read().then(({value}) => {
    console.log(value);
});

console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "Использование Promise с Streams API для обработки потоков данных.",
          hints: [
            {
              id: 1,
              text: "Помните, что Streams API позволяет обрабатывать данные по частям."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок создания и чтения потока."
            }
          ]
        },
        {
          id: 'promise-task-67',
          title: 'Promise с WebRTC',
          code: `console.log('start');

const pc = new RTCPeerConnection();

pc.onicecandidate = (event) => {
    console.log(1);
    if (event.candidate) {
        console.log(2);
    }
};

pc.createOffer()
    .then(offer => {
        console.log(3);
        return pc.setLocalDescription(offer);
    })
    .then(() => console.log(4));

console.log('end');`,
          expectedOutput: ["start", "end", "3", "4", "1", "2"],
          explanation: "Использование Promise с WebRTC для P2P соединений.",
          hints: [
            {
              id: 1,
              text: "Помните, что WebRTC требует обмена сигналами."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок создания и установки описания."
            }
          ]
        },
        {
          id: 'promise-task-68',
          title: 'Promise с Web Audio API',
          code: `console.log('start');

const audioContext = new AudioContext();

audioContext.decodeAudioData(arrayBuffer)
    .then(buffer => {
        console.log(1);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
        console.log(2);
    });

console.log('end');`,
          expectedOutput: ["start", "end", "1", "2"],
          explanation: "Использование Promise с Web Audio API для работы со звуком.",
          hints: [
            {
              id: 1,
              text: "Помните, что декодирование аудио происходит асинхронно."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок создания и воспроизведения звука."
            }
          ]
        },
        {
          id: 'promise-task-69',
          title: 'Promise с WebGL',
          code: `console.log('start');

const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl');

gl.compileShader(vertexShader);
gl.compileShader(fragmentShader);
gl.linkProgram(program);

gl.getProgramParameter(program, gl.LINK_STATUS)
    .then(status => {
        console.log(1);
        if (!status) {
            console.log(2);
        }
    });

console.log('end');`,
          expectedOutput: ["start", "end", "1", "2"],
          explanation: "Использование Promise с WebGL для 3D графики.",
          hints: [
            {
              id: 1,
              text: "Помните, что компиляция шейдеров происходит асинхронно."
            },
            {
              id: 2,
              text: "Обратите внимание на проверку статуса линковки программы."
            }
          ]
        },
        {
          id: 'promise-task-70',
          title: 'Promise с WebAssembly',
          code: `console.log('start');

WebAssembly.instantiateStreaming(fetch('module.wasm'))
    .then(result => {
        console.log(1);
        const exports = result.instance.exports;
        console.log(exports.add(2, 3));
    });

console.log('end');`,
          expectedOutput: ["start", "end", "1", "5"],
          explanation: "Использование Promise с WebAssembly для выполнения нативного кода.",
          hints: [
            {
              id: 1,
              text: "Помните, что загрузка и инициализация WebAssembly модуля асинхронны."
            },
            {
              id: 2,
              text: "Обратите внимание на доступ к экспортированным функциям."
            }
          ]
        },
        {
          id: 'promise-task-71',
          title: 'Promise с Web Components',
          code: `console.log('start');

customElements.define('my-element', class extends HTMLElement {
    constructor() {
        super();
        console.log(1);
    }
    
    connectedCallback() {
        console.log(2);
    }
});

const element = new MyElement();
document.body.appendChild(element);

console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "Использование Promise с Web Components для создания кастомных элементов.",
          hints: [
            {
              id: 1,
              text: "Помните, что жизненный цикл компонента включает несколько этапов."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок вызова конструктора и колбэков."
            }
          ]
        },
        {
          id: 'promise-task-72',
          title: 'Promise с Shadow DOM',
          code: `console.log('start');

const element = document.createElement('div');
const shadow = element.attachShadow({mode: 'open'});

Promise.resolve()
    .then(() => {
        console.log(1);
        shadow.innerHTML = '<p>content</p>';
        return shadow.querySelector('p');
    })
    .then(p => {
        console.log(2);
        console.log(p.textContent);
    });

console.log('end');`,
          expectedOutput: ["start", "end", "1", "2", "content"],
          explanation: "Использование Promise с Shadow DOM для инкапсуляции стилей.",
          hints: [
            {
              id: 1,
              text: "Помните, что Shadow DOM создает изолированное DOM-дерево."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок создания и заполнения теневого DOM."
            }
          ]
        },
        {
          id: 'promise-task-73',
          title: 'Promise с Custom Elements',
          code: `console.log('start');

class MyElement extends HTMLElement {
    static get observedAttributes() {
        return ['value'];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(1);
        console.log(newValue);
    }
}

customElements.define('my-element', MyElement);
const element = new MyElement();
element.setAttribute('value', 'test');

console.log('end');`,
          expectedOutput: ["start", "end", "1", "test"],
          explanation: "Использование Promise с Custom Elements для реактивности.",
          hints: [
            {
              id: 1,
              text: "Помните, что observedAttributes определяет отслеживаемые атрибуты."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок изменения атрибутов и вызова колбэков."
            }
          ]
        },
        {
          id: 'promise-task-74',
          title: 'Promise с Intersection Observer',
          code: `console.log('start');

const observer = new IntersectionObserver(entries => {
    console.log(1);
    entries.forEach(entry => {
        console.log(entry.isIntersecting);
    });
});

const target = document.createElement('div');
observer.observe(target);

Promise.resolve()
    .then(() => {
        console.log(2);
        target.style.height = '100px';
    });

console.log('end');`,
          expectedOutput: ["start", "end", "2", "1", "true"],
          explanation: "Использование Promise с Intersection Observer для отслеживания видимости.",
          hints: [
            {
              id: 1,
              text: "Помните, что Intersection Observer асинхронно отслеживает пересечения."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок изменения размера и срабатывания колбэка."
            }
          ]
        },
        {
          id: 'promise-task-75',
          title: 'Promise с Resize Observer',
          code: `console.log('start');

const observer = new ResizeObserver(entries => {
    console.log(1);
    entries.forEach(entry => {
        console.log(entry.contentRect.width);
    });
});

const target = document.createElement('div');
observer.observe(target);

Promise.resolve()
    .then(() => {
        console.log(2);
        target.style.width = '100px';
    });

console.log('end');`,
          expectedOutput: ["start", "end", "2", "1", "100"],
          explanation: "Использование Promise с Resize Observer для отслеживания размеров.",
          hints: [
            {
              id: 1,
              text: "Помните, что Resize Observer асинхронно отслеживает изменения размеров."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок изменения размера и срабатывания колбэка."
            }
          ]
        },
        {
          id: 'promise-task-76',
          title: 'Promise с Mutation Observer',
          code: `console.log('start');

const observer = new MutationObserver(mutations => {
    console.log(1);
    mutations.forEach(mutation => {
        console.log(mutation.type);
    });
});

const target = document.createElement('div');
observer.observe(target, { attributes: true });

Promise.resolve()
    .then(() => {
        console.log(2);
        target.setAttribute('test', 'value');
    });

console.log('end');`,
          expectedOutput: ["start", "end", "2", "1", "attributes"],
          explanation: "Использование Promise с Mutation Observer для отслеживания изменений DOM.",
          hints: [
            {
              id: 1,
              text: "Помните, что Mutation Observer асинхронно отслеживает изменения DOM."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок изменения атрибутов и срабатывания колбэка."
            }
          ]
        },
        {
          id: 'promise-task-77',
          title: 'Promise с Performance API',
          code: `console.log('start');

performance.mark('start');
Promise.resolve()
    .then(() => {
        console.log(1);
        performance.mark('end');
        performance.measure('duration', 'start', 'end');
        const measure = performance.getEntriesByName('duration')[0];
        console.log(measure.duration);
    });

console.log('end');`,
          expectedOutput: ["start", "end", "1", "число"],
          explanation: "Использование Promise с Performance API для измерения производительности.",
          hints: [
            {
              id: 1,
              text: "Помните, что Performance API позволяет измерять время выполнения."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок установки меток и получения измерений."
            }
          ]
        },
        {
          id: 'promise-task-78',
          title: 'Promise с Geolocation API',
          code: `console.log('start');

navigator.geolocation.getCurrentPosition(
    position => {
        console.log(1);
        console.log(position.coords.latitude);
    },
    error => console.log(error)
);

console.log('end');`,
          expectedOutput: ["start", "end", "1", "число"],
          explanation: "Использование Promise с Geolocation API для получения местоположения.",
          hints: [
            {
              id: 1,
              text: "Помните, что получение геолокации требует разрешения пользователя."
            },
            {
              id: 2,
              text: "Обратите внимание на асинхронную природу получения координат."
            }
          ]
        },
        {
          id: 'promise-task-79',
          title: 'Promise с Device Orientation API',
          code: `console.log('start');

window.addEventListener('deviceorientation', event => {
    console.log(1);
    console.log(event.alpha);
});

Promise.resolve()
    .then(() => {
        console.log(2);
        window.DeviceOrientationEvent.requestPermission();
    });

console.log('end');`,
          expectedOutput: ["start", "end", "2", "1", "число"],
          explanation: "Использование Promise с Device Orientation API для отслеживания ориентации.",
          hints: [
            {
              id: 1,
              text: "Помните, что доступ к ориентации устройства требует разрешения."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок запроса разрешения и получения данных."
            }
          ]
        },
        {
          id: 'promise-task-80',
          title: 'Promise с Battery API',
          code: `console.log('start');

navigator.getBattery()
    .then(battery => {
        console.log(1);
        console.log(battery.level);
        battery.onlevelchange = () => {
            console.log(2);
            console.log(battery.level);
        };
    });

console.log('end');`,
          expectedOutput: ["start", "end", "1", "число", "2", "число"],
          explanation: "Использование Promise с Battery API для отслеживания уровня заряда.",
          hints: [
            {
              id: 1,
              text: "Помните, что Battery API предоставляет информацию о состоянии батареи."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок получения начального уровня и отслеживания изменений."
            }
          ]
        }
      ]
    },
    estimatedTime: '2 часа',
    prerequisites: ['javascript-basics']
  }
];
