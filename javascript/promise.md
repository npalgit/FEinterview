## promise：将异步操作以同步操作的流程表示出来，避免层层嵌套回调函数
解决回调地狱
代码更加具有可读性和可维护性，将数据请求和数据处理分来

```
//自己封装回调函数
function want() {
    console.log(`这里是要执行的代码`);
}
function fn(want) {
    want && setTimeout(want, 0);
    console.log(`这里表示已经执行了一大推代码`);
}
```
0. Promise 对象代表一个异步操作
有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）,状态只能从pending改变为resolved或者rejected，并且不可逆
```
new Promise(function(resolve, reject) {
    if(true) { resolve() };
    if(false) { reject() };
})
//匿名函数处理Promise
resolve和reject都为一个函数，他们的作用分别是将状态修改为resolved和rejected。
```
1. .then 第一个函数接收resolved状态的执行，第二个参数接收reject状态的执行
then方法的执行结果也会返回一个Promise对象。因此我们可以进行then的链式执行，这也是解决回调地狱的主要方式
```
function fn(num){
    return new Promise(function(resolve, reject) {
        if (typeof num === 'number) {
            resolve();
        } else {
            reject();
        }
    }).then(function() {
        console.log('arg is number');
    }, function() {
        console.log('arg is not number');
    });
}
fn('hhhh');
fn(4);
```
2. .catch指定reject的回调,相当于resolve的第二个参数，
但是，在执行resolve的回调（也就是上面then中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中
```
.then(function(data){
    console.log('resolved');
    console.log(data);
    console.log(somedata); //此处的somedata未定义
})
.catch(function(reason){
    console.log('rejected');
    console.log(reason);
});
//resolved
//data
//rejected
//somedata is not defined
```
3. Promise 数据传递
resovle将状态修改为resoleved,.then第一个函数接收resolved状态的执行
```
var fn = function(num) {
    return new Promise(function(resolve, reject) {
        if (typeof num == 'number') {
            resolve(num);
        } else {
            reject('TypeError');
        }
    })
}

fn(2).then(function(num) {
    console.log('first: ' + num);
    return num + 1;
})
.then(function(num) {
    console.log('second: ' + num);
    return num + 1;
})
.then(function(num) {
    console.log('third: ' + num);
    return num + 1;
});

// 输出结果
first: 2
second: 3
third: 4
```

4. 封装Ajax
```
let url="https://"

function getJSON(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readystate === 4) {
                if (xhr.status === 200) {
                    try{
                        let response = JSON.parse(xhr.responseText);
                        resolve(response);
                    } catch(e) {
                        reject(e);
                    }
                }else {
                    reject(new Error(xhr.statusText))
                }
            }
        }
    });
}

getJSON(url).then(function(response) {
    console.log(response);
})

```

5. Promise.all接受一个promise对象组成的数组作为参数，只有所有promise状态都变成resolve或者reject，才会调用then
let url1 = '';
let url2 = '';
function renderAll() {
    return Promise.all([getJSON(url1), getJSON(url2)]);
}
renderAll().then(function(value) {
    console.log(value);
})
//[object, object]

6. Promise.race接受一个promise对象组成的数组作为参数,只要当数组中的其中一个Promsie状态变成resolved或者rejected时，就可以调用.then方法了
```
function renderRace() {
    return Promise.race([getJSON(url1), getJSON(url2)]);
}
renderRace().then(value => {
    console.log(value);
})
//object
```