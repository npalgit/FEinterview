## promise 原理浅析
1. 一个promise对象代表着一个还未完成，但是预期将来会完成的操作，允许你为异步操作的成功或失败指定处理方法


https://segmentfault.com/a/1190000009478377
http://imweb.io/topic/565af932bb6a753a136242b0



## promise：将异步操作以同步操作的流程表示出来，避免层层嵌套回调函数
解决回调地狱
代码更加具有可读性和可维护性，将数据请求和数据处理分来

```js
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
```js
new Promise(function(resolve, reject) {
    if(true) { resolve() };
    if(false) { reject() };
})
//匿名函数处理Promise
resolve和reject都为一个函数，他们的作用分别是将状态修改为resolved和rejected。
```
1. .then 第一个函数接收resolved状态的执行，第二个参数接收reject状态的执行
then方法的执行结果也会返回一个Promise对象。因此我们可以进行then的链式执行，这也是解决回调地狱的主要方式
```js
function fn(num){
    return new Promise(function(resolve, reject) {
        if (typeof num === 'number') {
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
```js
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
```js
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
```js
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
```js
let url1 = '';
let url2 = '';
function renderAll() {
    return Promise.all([getJSON(url1), getJSON(url2)]);
}
renderAll().then(function(value) {
    console.log(value);
})
//[object, object]
```
6. Promise.race接受一个promise对象组成的数组作为参数,只要当数组中的其中一个Promsie状态变成resolved或者rejected时，就可以调用.then方法了
```js
function renderRace() {
    return Promise.race([getJSON(url1), getJSON(url2)]);
}
renderRace().then(value => {
    console.log(value);
})
//object
```

http://www.cnblogs.com/lvdabao/p/es6-promise-1.html

## async

封装ajax
```js
var fetchDoubanApi = function() {  
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          var response;
          try {
            response = JSON.parse(xhr.responseText);
          } catch (e) {
            reject(e);
          }
          if (response) {
            resolve(response, xhr.status, xhr);
          }
        } else {
          reject(xhr);
        }
      }
    };
    xhr.open('GET', 'https://api.douban.com/v2/user/aisk', true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.send(data);
  });
};

(async function() {
  try {
    let result = await fetchDoubanApi();
    console.log(result);
  } catch (e) {
    console.log(e);
  }
})();
```

```js
//推箱子加载图片:promise
function loadImage(url) {
    return new Promise((resolve, reject) => {
        let dom = document.createElement('img');
        dom.src = url;
        dom.onload = () => {
            resolve(dom);
        }
    })
}

function render() {
    let wall = loadImage('xxx');
    let floor = loadImage('xxx');
    Promise.all([wall, floor]).then((data) => {
        let wallDom = data[0];
        let floorDom = data[1];
    })
}
```

```js
//推箱子加载图片:async
function loadImage(url) {
    return new Promise((resolve, reject) => {
        let dom = document.createElement('img');
        dom.src = url;
        dom.onload = () => {
            resolve(dom);
        }
    })
}

async function render() {
    let wall = loadImage('xxx');
    let floor = loadImage('xxx');
    let [wallDom, floorDom] = await Promise.all([wall, floor]);
}
```

# Generator



https://segmentfault.com/a/1190000008254704
