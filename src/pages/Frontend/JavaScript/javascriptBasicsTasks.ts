export interface Task {
    id: string;
    title: string;
    content: {
        description: string;
        code?: string;
        expectedOutput?: string[];
        explanation?: string;
        hints?: Array<{
            id: number;
            text: string;
        }>;
    };
}

export const javascriptTasks: Task[] = [
    {
        id: 'variables',
        title: 'Переменные и типы данных',
        content: {
            description: 'В JavaScript есть три способа объявления переменных:',
            code: `// Объявление переменных
var oldVariable = 'устаревший способ';
let mutableVariable = 'можно изменять';
const constantVariable = 'нельзя изменять';

// Типы данных
const number = 42;
const string = 'Hello, World!';
const boolean = true;
const nullValue = null;
const undefinedValue = undefined;
const object = { key: 'value' };
const symbol = Symbol('unique');`,
            expectedOutput: ['42', 'Hello, World!', 'true', 'null', 'undefined', '{ key: "value" }', 'Symbol(unique)'],
            explanation: 'JavaScript имеет динамическую типизацию, что означает, что тип переменной определяется значением, которое она содержит.',
            hints: [
                {
                    id: 1,
                    text: 'Используйте let для переменных, которые будут изменяться, и const для констант.'
                },
                {
                    id: 2,
                    text: 'Помните, что typeof null возвращает "object" - это известная ошибка в JavaScript.'
                }
            ]
        }
    },
    {
        id: 'operators',
        title: 'Операторы',
        content: {
            description: 'Основные операторы в JavaScript:',
            code: `// Арифметические операторы
const sum = 5 + 3;      // 8
const difference = 5 - 3; // 2
const product = 5 * 3;   // 15
const quotient = 5 / 3;  // 1.666...

// Операторы сравнения
const isEqual = 5 == '5';    // true
const isStrictEqual = 5 === '5'; // false
const isNotEqual = 5 != '5'; // false
const isStrictNotEqual = 5 !== '5'; // true

// Логические операторы
const and = true && false; // false
const or = true || false;  // true
const not = !true;         // false`,
            expectedOutput: ['8', '2', '15', '1.666...', 'true', 'false', 'false', 'true', 'false', 'true', 'false'],
            explanation: 'Операторы в JavaScript позволяют выполнять различные операции с данными.',
            hints: [
                {
                    id: 1,
                    text: 'Всегда используйте строгое сравнение (=== и !==) для избежания неожиданных результатов.'
                },
                {
                    id: 2,
                    text: 'Логические операторы могут использоваться для условного выполнения кода.'
                }
            ]
        }
    },
    {
        id: 'functions',
        title: 'Функции',
        content: {
            description: 'Функции в JavaScript могут быть объявлены несколькими способами:',
            code: `// Function Declaration
function greet(name) {
    return 'Hello, ' + name;
}

// Function Expression
const greetExpression = function(name) {
    return 'Hello, ' + name;
};

// Arrow Function
const greetArrow = (name) => 'Hello, ' + name;

// Вызов функций
console.log(greet('World'));
console.log(greetExpression('World'));
console.log(greetArrow('World'));`,
            expectedOutput: ['Hello, World', 'Hello, World', 'Hello, World'],
            explanation: 'Функции являются основными строительными блоками в JavaScript.',
            hints: [
                {
                    id: 1,
                    text: 'Arrow functions не имеют своего this и arguments.'
                },
                {
                    id: 2,
                    text: 'Function declarations поднимаются (hoisted), а function expressions - нет.'
                }
            ]
        }
    },
    {
        id: 'objects',
        title: 'Объекты и массивы',
        content: {
            description: 'Объекты и массивы - это основные структуры данных в JavaScript:',
            code: `// Объект
const person = {
    name: 'John',
    age: 30,
    greet: function() {
        return 'Hello, ' + this.name;
    }
};

// Массив
const numbers = [1, 2, 3, 4, 5];

// Методы массивов
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

console.log(person.greet());
console.log(doubled);
console.log(sum);`,
            expectedOutput: ['Hello, John', '[2, 4, 6, 8, 10]', '15'],
            explanation: 'Объекты и массивы предоставляют мощные возможности для работы с данными.',
            hints: [
                {
                    id: 1,
                    text: 'Объекты используют ключи для доступа к значениям, а массивы используют индексы.'
                },
                {
                    id: 2,
                    text: 'Методы массивов, такие как map и reduce, позволяют трансформировать данные.'
                }
            ]
        }
    }
];
