const Promise = require('bluebird');
const fiboTasks = [22, 42, 42, 43];

// Fibonacci sequence funciton
const fibo = (n) => {
    return n == 0 ? 0 : n > 1 ? fibo(n -1) + fibo(n - 2) : 1;
};

// Definced execute fibo function
const executeFibo = (seq, taskId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const st = Date.now();
            const result = fibo(seq);
            console.log(`Task ${taskId} was complete and using ${Date.now() - st} ms`);
            resolve(result);
        }, Math.random() * 10);
    });
};

// Testing execute
const st = Date.now();
Promise.map(fiboTasks, function(item, index) {
    return executeFibo(item, index)
}).then(function (result) {
    console.log(`All tasks ware complete and using ${Date.now() - st} ms`);
});
