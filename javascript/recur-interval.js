var Promise = require("bluebird")
function foo() {
    return new Promise((resolve, reject) => {
        to = setTimeout(() => {
            resolve();
        }, 10000);

        it = setInterval(() => {
            return new Promise((res, rej) => {
                resolve('success');
            });
        }, 1000);
    }).finally(() => {
        clearInterval(it);
        clearTimeout(to)
    });
}

foo().then((data)=>{
    console.log(data)
    console.log('finfished')
});

