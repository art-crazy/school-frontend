import { PromiseTask } from './types';

export const promiseTasks: PromiseTask[] = [
    {
        id: 1,
        title: "Promise #1",
        description: "Определите порядок выполнения кода",
        code: `console.log("start");

const testPromise = new Promise ((resolve, reject) => {
    console.log("1")
})

testPromise.then(res => console.log(2));`,
        expectedOutput: ["start", "1"]
    },
    {
        id: 2,
        title: "Promise #2",
        description: "Определите порядок выполнения кода",
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
        expectedOutput: ["1", "2", "4", "timerStart", "timerEnd", "success"]
    },
    {
        id: 3,
        title: "Promise #3",
        description: "Определите порядок выполнения кода",
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
        expectedOutput: ["1", "2", "3", "7", "8", "4"]
    },
    {
        id: 4,
        title: "Promise #4",
        description: "Определите порядок выполнения кода",
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
        expectedOutput: ["before promise", "One", "Zero Promise", "Zero Promise Invoked", "Zero"]
    },
    {
        id: 5,
        title: "Promise #5",
        description: "Определите порядок выполнения кода",
        code: `Promise.resolve()
    .then(() => console.log(1))
    .then(() => console.log(2))

Promise.resolve()
    .then(() => console.log(11))
    .then(() => console.log(12))`,
        expectedOutput: ["1", "11", "2", "12"]
    },
    {
        id: 6,
        title: "Promise #6",
        description: "Определите порядок выполнения кода",
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
        expectedOutput: ["1", "4", "5"]
    },
    {
        id: 7,
        title: "Promise #7",
        description: "Определите порядок выполнения кода",
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
        expectedOutput: ["1", "2", "4", "6", "5"]
    },
    {
        id: 8,
        title: "Promise #8",
        description: "Определите порядок выполнения кода",
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
        expectedOutput: ["script start", "script end", "promise1", "promise2", "setTimeout"]
    }
]; 