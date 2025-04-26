import { Material } from './types';

export const promiseTasks: Material[] = [
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
          title: 'Promise с async/await',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    await Promise.resolve(2);
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "3"],
          explanation: "async/await преобразуется в Promise, где await приостанавливает выполнение функции.",
          hints: [
            {
              id: 1,
              text: "Помните, что async функция всегда возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание, что код после await выполняется асинхронно."
            }
          ]
        },
        {
          id: 'promise-task-32',
          title: 'Promise с несколькими async/await',
          code: `console.log('start');

async function asyncFunction1() {
    console.log(1);
    await Promise.resolve(2);
    console.log(3);
}

async function asyncFunction2() {
    console.log(4);
    await Promise.resolve(5);
    console.log(6);
}

asyncFunction1();
asyncFunction2();
console.log('end');`,
          expectedOutput: ["start", "1", "4", "end", "3", "6"],
          explanation: "Несколько async функций выполняются параллельно до первого await.",
          hints: [
            {
              id: 1,
              text: "Помните, что async функции выполняются параллельно до первого await."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения синхронного кода."
            }
          ]
        },
        {
          id: 'promise-task-33',
          title: 'Promise с вложенными async/await',
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
          explanation: "Вложенные async функции выполняются последовательно.",
          hints: [
            {
              id: 1,
              text: "Помните, что await приостанавливает выполнение всей цепочки функций."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения вложенных функций."
            }
          ]
        },
        {
          id: 'promise-task-34',
          title: 'Promise с try/catch в async/await',
          code: `console.log('start');

async function asyncFunction() {
    try {
        console.log(1);
        await Promise.reject('error');
        console.log(2);
    } catch (err) {
        console.log(err);
    }
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "error", "3"],
          explanation: "try/catch в async функции перехватывает ошибки из await.",
          hints: [
            {
              id: 1,
              text: "Помните, что try/catch в async функции работает с await."
            },
            {
              id: 2,
              text: "Обратите внимание, что код после await не выполняется при ошибке."
            }
          ]
        },
        {
          id: 'promise-task-35',
          title: 'Promise с finally в async/await',
          code: `console.log('start');

async function asyncFunction() {
    try {
        console.log(1);
        await Promise.resolve(2);
        console.log(3);
    } catch (err) {
        console.log(err);
    } finally {
        console.log(4);
    }
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "3", "4"],
          explanation: "finally в async функции выполняется после try/catch.",
          hints: [
            {
              id: 1,
              text: "Помните, что finally выполняется независимо от результата try/catch."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения с await."
            }
          ]
        },
        {
          id: 'promise-task-36',
          title: 'Promise с Promise.all и async/await',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const [res1, res2] = await Promise.all([
        Promise.resolve(2),
        Promise.resolve(3)
    ]);
    console.log(res1, res2);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2 3"],
          explanation: "Promise.all с await ожидает выполнения всех Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что await с Promise.all ждет выполнения всех Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на деструктуризацию результата."
            }
          ]
        },
        {
          id: 'promise-task-37',
          title: 'Promise с Promise.race и async/await',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const res = await Promise.race([
        new Promise(resolve => setTimeout(() => resolve(2), 100)),
        new Promise(resolve => setTimeout(() => resolve(3), 50))
    ]);
    console.log(res);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "3"],
          explanation: "Promise.race с await возвращает первый выполненный Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.race возвращает первый выполненный Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на разные задержки в setTimeout."
            }
          ]
        },
        {
          id: 'promise-task-38',
          title: 'Promise с Promise.allSettled и async/await',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const results = await Promise.allSettled([
        Promise.resolve(2),
        Promise.reject(3)
    ]);
    console.log(results);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "[{status: 'fulfilled', value: 2}, {status: 'rejected', reason: 3}]"],
          explanation: "Promise.allSettled с await возвращает результаты всех Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.allSettled ждет выполнения всех Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на структуру результата для успешных и неуспешных Promise."
            }
          ]
        },
        {
          id: 'promise-task-39',
          title: 'Promise с Promise.any и async/await',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    try {
        const res = await Promise.any([
            Promise.reject(2),
            Promise.resolve(3)
        ]);
        console.log(res);
    } catch (err) {
        console.log(err.errors);
    }
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "3"],
          explanation: "Promise.any с await возвращает первый успешный Promise.",
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
          id: 'promise-task-40',
          title: 'Promise с async/await и setTimeout',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    await new Promise(resolve => setTimeout(resolve, 0));
    console.log(2);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "await с setTimeout создает макрозадачу.",
          hints: [
            {
              id: 1,
              text: "Помните, что setTimeout создает макрозадачу."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения с await."
            }
          ]
        },
        {
          id: 'promise-task-41',
          title: 'Promise с async/await и микротасками',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    await Promise.resolve();
    console.log(2);
    await Promise.resolve();
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3"],
          explanation: "await с Promise.resolve создает микротаску.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.resolve создает микротаску."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения с await."
            }
          ]
        },
        {
          id: 'promise-task-42',
          title: 'Promise с async/await и вложенными Promise',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    await new Promise(resolve => {
        console.log(2);
        resolve(new Promise(res => {
            console.log(3);
            res(4);
        }));
    });
    console.log(5);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "5"],
          explanation: "Вложенные Promise в async/await выполняются последовательно.",
          hints: [
            {
              id: 1,
              text: "Помните, что вложенные Promise разрешаются последовательно."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения с await."
            }
          ]
        },
        {
          id: 'promise-task-43',
          title: 'Promise с async/await и throw',
          code: `console.log('start');

async function asyncFunction() {
    try {
        console.log(1);
        throw new Error('error');
        console.log(2);
    } catch (err) {
        console.log(err.message);
    }
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "error", "3"],
          explanation: "throw в async функции перехватывается в catch.",
          hints: [
            {
              id: 1,
              text: "Помните, что throw в async функции работает как в обычной функции."
            },
            {
              id: 2,
              text: "Обратите внимание, что код после throw не выполняется."
            }
          ]
        },
        {
          id: 'promise-task-44',
          title: 'Promise с async/await и return',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    return 2;
}

asyncFunction().then(console.log);
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "return в async функции возвращает Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что async функция всегда возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения с then."
            }
          ]
        },
        {
          id: 'promise-task-45',
          title: 'Promise с async/await и await Promise',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const promise = Promise.resolve(2);
    console.log(3);
    const res = await promise;
    console.log(res);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "3", "end", "2"],
          explanation: "await с уже созданным Promise выполняется асинхронно.",
          hints: [
            {
              id: 1,
              text: "Помните, что await выполняется асинхронно, даже с уже созданным Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения синхронного кода."
            }
          ]
        },
        {
          id: 'promise-task-46',
          title: 'Promise с async/await и await setTimeout',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    await new Promise(resolve => setTimeout(resolve, 0));
    console.log(2);
    await new Promise(resolve => setTimeout(resolve, 0));
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3"],
          explanation: "await с setTimeout создает макрозадачи.",
          hints: [
            {
              id: 1,
              text: "Помните, что setTimeout создает макрозадачи."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения с await."
            }
          ]
        },
        {
          id: 'promise-task-47',
          title: 'Promise с async/await и await Promise.resolve',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    await Promise.resolve(2);
    console.log(3);
    await Promise.resolve(4);
    console.log(5);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "3", "5"],
          explanation: "await с Promise.resolve создает микротаски.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.resolve создает микротаски."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения с await."
            }
          ]
        },
        {
          id: 'promise-task-48',
          title: 'Promise с async/await и await Promise.reject',
          code: `console.log('start');

async function asyncFunction() {
    try {
        console.log(1);
        await Promise.reject(2);
        console.log(3);
    } catch (err) {
        console.log(err);
    }
    console.log(4);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "4"],
          explanation: "await с Promise.reject перехватывается в catch.",
          hints: [
            {
              id: 1,
              text: "Помните, что await с Promise.reject перехватывается в catch."
            },
            {
              id: 2,
              text: "Обратите внимание, что код после await не выполняется при ошибке."
            }
          ]
        },
        {
          id: 'promise-task-49',
          title: 'Promise с async/await и await new Promise',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    await new Promise(resolve => {
        console.log(2);
        resolve(3);
    });
    console.log(4);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "2", "end", "4"],
          explanation: "await с new Promise выполняется асинхронно.",
          hints: [
            {
              id: 1,
              text: "Помните, что await выполняется асинхронно, даже с new Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения синхронного кода."
            }
          ]
        },
        {
          id: 'promise-task-50',
          title: 'Promise с async/await и await Promise.all',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const [res1, res2] = await Promise.all([
        new Promise(resolve => setTimeout(() => resolve(2), 100)),
        new Promise(resolve => setTimeout(() => resolve(3), 50))
    ]);
    console.log(res1, res2);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2 3"],
          explanation: "await с Promise.all ждет выполнения всех Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.all ждет выполнения всех Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения с разными задержками."
            }
          ]
        },
        {
          id: 'promise-task-51',
          title: 'Promise с рекурсивным async/await',
          code: `console.log('start');

async function recursiveAsync(n) {
    console.log(n);
    if (n > 0) {
        await recursiveAsync(n - 1);
    }
    console.log(n);
}

recursiveAsync(2);
console.log('end');`,
          expectedOutput: ["start", "2", "1", "0", "end", "0", "1", "2"],
          explanation: "Рекурсивные async функции создают цепочку Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что рекурсивные async функции создают цепочку Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения при входе и выходе из рекурсии."
            }
          ]
        },
        {
          id: 'promise-task-52',
          title: 'Promise с параллельными async/await',
          code: `console.log('start');

async function asyncFunction1() {
    console.log(1);
    await Promise.resolve(2);
    console.log(3);
}

async function asyncFunction2() {
    console.log(4);
    await Promise.resolve(5);
    console.log(6);
}

Promise.all([asyncFunction1(), asyncFunction2()]);
console.log('end');`,
          expectedOutput: ["start", "1", "4", "end", "3", "6"],
          explanation: "Promise.all с async функциями выполняет их параллельно.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.all выполняет async функции параллельно."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения синхронного кода."
            }
          ]
        },
        {
          id: 'promise-task-53',
          title: 'Promise с async/await и генераторами',
          code: `console.log('start');

async function* asyncGenerator() {
    console.log(1);
    yield Promise.resolve(2);
    console.log(3);
    yield Promise.resolve(4);
}

(async () => {
    const gen = asyncGenerator();
    console.log(await gen.next());
    console.log(await gen.next());
})();

console.log('end');`,
          expectedOutput: ["start", "1", "end", "{value: 2, done: false}", "3", "{value: 4, done: false}"],
          explanation: "Async генераторы создают последовательность Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что async генераторы создают последовательность Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на структуру результата next()."
            }
          ]
        },
        {
          id: 'promise-task-54',
          title: 'Promise с async/await и for await',
          code: `console.log('start');

async function* asyncGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

(async () => {
    for await (const value of asyncGenerator()) {
        console.log(value);
    }
})();

console.log('end');`,
          expectedOutput: ["start", "end", "1", "2", "3"],
          explanation: "for await обрабатывает async итерируемые объекты.",
          hints: [
            {
              id: 1,
              text: "Помните, что for await обрабатывает async итерируемые объекты."
            },
            {
              id: 2,
              text: "Обратите внимание на порядок выполнения с await."
            }
          ]
        },
        {
          id: 'promise-task-55',
          title: 'Promise с async/await и Promise.race',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const res = await Promise.race([
        new Promise(resolve => setTimeout(() => resolve(2), 100)),
        new Promise((_, reject) => setTimeout(() => reject(3), 50))
    ]).catch(err => err);
    console.log(res);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "3"],
          explanation: "Promise.race с await возвращает первый выполненный Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.race возвращает первый выполненный Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на обработку ошибок с catch."
            }
          ]
        },
        {
          id: 'promise-task-56',
          title: 'Promise с async/await и Promise.allSettled',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const results = await Promise.allSettled([
        Promise.resolve(2),
        Promise.reject(3),
        Promise.resolve(4)
    ]);
    console.log(results);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "[{status: 'fulfilled', value: 2}, {status: 'rejected', reason: 3}, {status: 'fulfilled', value: 4}]"],
          explanation: "Promise.allSettled с await возвращает результаты всех Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что Promise.allSettled ждет выполнения всех Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на структуру результата для успешных и неуспешных Promise."
            }
          ]
        },
        {
          id: 'promise-task-57',
          title: 'Promise с async/await и Promise.any',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    try {
        const res = await Promise.any([
            Promise.reject(2),
            Promise.reject(3),
            Promise.resolve(4)
        ]);
        console.log(res);
    } catch (err) {
        console.log(err.errors);
    }
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "4"],
          explanation: "Promise.any с await возвращает первый успешный Promise.",
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
          id: 'promise-task-58',
          title: 'Promise с async/await и AbortController',
          code: `console.log('start');

async function asyncFunction(controller) {
    try {
        console.log(1);
        await new Promise((resolve, reject) => {
            controller.signal.addEventListener('abort', () => reject('aborted'));
            setTimeout(resolve, 100);
        });
        console.log(2);
    } catch (err) {
        console.log(err);
    }
}

const controller = new AbortController();
asyncFunction(controller);
controller.abort();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "aborted"],
          explanation: "AbortController позволяет отменить Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что AbortController позволяет отменить Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на обработку события abort."
            }
          ]
        },
        {
          id: 'promise-task-59',
          title: 'Promise с async/await и EventEmitter',
          code: `console.log('start');

const { EventEmitter } = require('events');

async function asyncFunction(emitter) {
    console.log(1);
    await new Promise(resolve => {
        emitter.once('event', resolve);
    });
    console.log(2);
}

const emitter = new EventEmitter();
asyncFunction(emitter);
emitter.emit('event');
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "EventEmitter может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что EventEmitter может быть использован с Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на использование once для однократного события."
            }
          ]
        },
        {
          id: 'promise-task-60',
          title: 'Promise с async/await и fetch',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const response = await fetch('https://api.example.com/data');
    console.log(2);
    const data = await response.json();
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3"],
          explanation: "fetch возвращает Promise, который можно использовать с await.",
          hints: [
            {
              id: 1,
              text: "Помните, что fetch возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на последовательность await для response и data."
            }
          ]
        },
        {
          id: 'promise-task-61',
          title: 'Promise с async/await и FileReader',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const file = new Blob(['Hello, World!'], { type: 'text/plain' });
    const reader = new FileReader();
    const result = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
    console.log(result);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "Hello, World!"],
          explanation: "FileReader может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что FileReader использует события для асинхронного чтения."
            },
            {
              id: 2,
              text: "Обратите внимание на обертку событий в Promise."
            }
          ]
        },
        {
          id: 'promise-task-62',
          title: 'Promise с async/await и WebSocket',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const ws = new WebSocket('wss://echo.websocket.org');
    await new Promise(resolve => ws.onopen = resolve);
    console.log(2);
    ws.send('Hello');
    const message = await new Promise(resolve => {
        ws.onmessage = event => resolve(event.data);
    });
    console.log(message);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "Hello"],
          explanation: "WebSocket может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что WebSocket использует события для асинхронной коммуникации."
            },
            {
              id: 2,
              text: "Обратите внимание на обертку событий в Promise."
            }
          ]
        },
        {
          id: 'promise-task-63',
          title: 'Promise с async/await и IndexedDB',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const request = indexedDB.open('testDB');
    const db = await new Promise((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = reject;
    });
    console.log(2);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "IndexedDB может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что IndexedDB использует события для асинхронных операций."
            },
            {
              id: 2,
              text: "Обратите внимание на обертку событий в Promise."
            }
          ]
        },
        {
          id: 'promise-task-64',
          title: 'Promise с async/await и ServiceWorker',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log(2);
    await navigator.serviceWorker.ready;
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3"],
          explanation: "ServiceWorker может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что ServiceWorker регистрация и готовность возвращают Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на последовательность await для регистрации и готовности."
            }
          ]
        },
        {
          id: 'promise-task-65',
          title: 'Promise с async/await и Notification',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const permission = await Notification.requestPermission();
    console.log(2);
    if (permission === 'granted') {
        new Notification('Hello');
    }
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "Notification API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что requestPermission возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на проверку разрешения перед показом уведомления."
            }
          ]
        },
        {
          id: 'promise-task-66',
          title: 'Promise с async/await и Battery API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const battery = await navigator.getBattery();
    console.log(2);
    console.log(battery.level);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "число"],
          explanation: "Battery API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что getBattery возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на доступ к свойствам батареи после await."
            }
          ]
        },
        {
          id: 'promise-task-67',
          title: 'Promise с async/await и Clipboard API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const text = await navigator.clipboard.readText();
    console.log(2);
    console.log(text);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "текст из буфера обмена"],
          explanation: "Clipboard API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что readText возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на необходимость разрешения для доступа к буферу обмена."
            }
          ]
        },
        {
          id: 'promise-task-68',
          title: 'Promise с async/await и Geolocation API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    console.log(2);
    console.log(position.coords);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "объект с координатами"],
          explanation: "Geolocation API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что getCurrentPosition использует колбэки, которые можно обернуть в Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на необходимость разрешения для доступа к геолокации."
            }
          ]
        },
        {
          id: 'promise-task-69',
          title: 'Promise с async/await и MediaDevices API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    console.log(2);
    console.log(stream.getTracks());
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "массив треков"],
          explanation: "MediaDevices API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что getUserMedia возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на необходимость разрешения для доступа к медиаустройствам."
            }
          ]
        },
        {
          id: 'promise-task-70',
          title: 'Promise с async/await и Payment Request API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const payment = new PaymentRequest([{
        supportedMethods: 'basic-card'
    }], {
        total: {
            label: 'Total',
            amount: { currency: 'USD', value: '1.00' }
        }
    });
    const response = await payment.show();
    console.log(2);
    console.log(response);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "объект с данными платежа"],
          explanation: "Payment Request API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что show возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на необходимость поддержки браузером и настройки платежных методов."
            }
          ]
        },
        {
          id: 'promise-task-71',
          title: 'Promise с async/await и SharedArrayBuffer',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const buffer = new SharedArrayBuffer(1024);
    const view = new Int32Array(buffer);
    await Atomics.waitAsync(view, 0, 0).value;
    console.log(2);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "SharedArrayBuffer и Atomics могут быть использованы с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что Atomics.waitAsync возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на необходимость поддержки SharedArrayBuffer браузером."
            }
          ]
        },
        {
          id: 'promise-task-72',
          title: 'Promise с async/await и WebAssembly',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const wasm = await WebAssembly.instantiateStreaming(
        fetch('module.wasm')
    );
    console.log(2);
    console.log(wasm.instance.exports);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "объект с экспортируемыми функциями"],
          explanation: "WebAssembly может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что instantiateStreaming возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на последовательность загрузки и инициализации модуля."
            }
          ]
        },
        {
          id: 'promise-task-73',
          title: 'Promise с async/await и WebRTC',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const peer = new RTCPeerConnection();
    stream.getTracks().forEach(track => peer.addTrack(track, stream));
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    console.log(2);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "WebRTC может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что методы WebRTC возвращают Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на последовательность установки соединения."
            }
          ]
        },
        {
          id: 'promise-task-74',
          title: 'Promise с async/await и Web Audio API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const audioContext = new AudioContext();
    await audioContext.audioWorklet.addModule('processor.js');
    console.log(2);
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.start();
    await new Promise(resolve => setTimeout(resolve, 1000));
    oscillator.stop();
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3"],
          explanation: "Web Audio API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что addModule возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на последовательность создания и управления аудио."
            }
          ]
        },
        {
          id: 'promise-task-75',
          title: 'Promise с async/await и Web MIDI API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const midi = await navigator.requestMIDIAccess();
    console.log(2);
    const inputs = midi.inputs.values();
    for (const input of inputs) {
        input.onmidimessage = console.log;
    }
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "Web MIDI API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что requestMIDIAccess возвращает Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на необходимость поддержки MIDI браузером."
            }
          ]
        },
        {
          id: 'promise-task-76',
          title: 'Promise с async/await и Web Bluetooth API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
    });
    console.log(2);
    const server = await device.gatt.connect();
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3"],
          explanation: "Web Bluetooth API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что методы Bluetooth API возвращают Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на необходимость поддержки Bluetooth браузером."
            }
          ]
        },
        {
          id: 'promise-task-77',
          title: 'Promise с async/await и Web USB API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const device = await navigator.usb.requestDevice({
        filters: []
    });
    console.log(2);
    await device.open();
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3"],
          explanation: "Web USB API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что методы USB API возвращают Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на необходимость поддержки USB браузером."
            }
          ]
        },
        {
          id: 'promise-task-78',
          title: 'Promise с async/await и Web NFC API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const ndef = new NDEFReader();
    await ndef.scan();
    console.log(2);
    ndef.onreading = event => console.log(event.message);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2"],
          explanation: "Web NFC API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что методы NFC API возвращают Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на необходимость поддержки NFC браузером."
            }
          ]
        },
        {
          id: 'promise-task-79',
          title: 'Promise с async/await и Web Serial API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const port = await navigator.serial.requestPort();
    console.log(2);
    await port.open({ baudRate: 9600 });
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3"],
          explanation: "Web Serial API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что методы Serial API возвращают Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на необходимость поддержки Serial браузером."
            }
          ]
        },
        {
          id: 'promise-task-80',
          title: 'Promise с async/await и Web HID API',
          code: `console.log('start');

async function asyncFunction() {
    console.log(1);
    const devices = await navigator.hid.requestDevice({
        filters: []
    });
    console.log(2);
    const device = devices[0];
    await device.open();
    console.log(3);
}

asyncFunction();
console.log('end');`,
          expectedOutput: ["start", "1", "end", "2", "3"],
          explanation: "Web HID API может быть использован с Promise.",
          hints: [
            {
              id: 1,
              text: "Помните, что методы HID API возвращают Promise."
            },
            {
              id: 2,
              text: "Обратите внимание на необходимость поддержки HID браузером."
            }
          ]
        }
      ]
    },
    estimatedTime: '2 часа',
    prerequisites: ['javascript-basics']
  }
]; 