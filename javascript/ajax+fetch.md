# ajax：使用XMLHttpRequest对象发送一个ajax请求


```js
    var xhr = new XMLHttpRequest();

    xhr.open('GET','demo.php','true');

    xhr.send()

    xhr.onreadystatechange = function(){

        if(xhr.readyState === 4 & xhr.status === 200){
            alert(xhr.responseText);
        }

    }
    //更好的办法：
    xhr.onload = function () {
    //如果请求成功
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
        alert(xhr.responseText);
    }
  }
/*
    (1)创建`XMLHttpRequest`对象,也就是创建一个异步调用对象.

    (2)创建一个新的`HTTP`请求,并指定该`HTTP`请求的方法、`URL`及验证信息.

    (3)设置响应`HTTP`请求状态变化的函数.

    (4)发送`HTTP`请求.

    (5)获取异步调用返回的数据.

    (6)使用JavaScript和DOM实现局部刷新.

*/
```



## ajax的缺点

  1、ajax不支持浏览器back按钮。

  2、安全问题 AJAX暴露了与服务器交互的细节。

  3、对搜索引擎的支持比较弱。

  4、破坏了程序的异常机制。

  5、不容易调试。

## 细说XHR
https://segmentfault.com/a/1190000004322487

1. 设置requestHeader
```js
var client = new XMLHttpRequest();
client.open('GET', 'demo.cgi');
client.setRequestHeader('X-Test', 'one');
client.setRequestHeader('X-Test', 'two');
// 最终request header中"X-Test"为: one, two
client.send();
```
2. 获取responseheader
```js
getAllResponseHeaders
getResponseHeader
```
3. 获取response数据

xhr提供了3个属性来获取请求返回的数据，分别是：xhr.response、xhr.responseText、xhr.responseXML
```js
    xhr.response

        默认值：空字符串""

        当请求完成时，此属性才有正确的值

        请求未完成时，此属性的值可能是""或者 null，具体与 xhr.responseType有关：当responseType为""或"text"时，值为""；responseType为其他值时，值为 null

    xhr.responseText

        默认值为空字符串""

        只有当 responseType 为"text"、""时，xhr对象上才有此属性，此时才能调用xhr.responseText，否则抛错

        只有当请求成功时，才能拿到正确值。以下2种情况下值都为空字符串""：请求未完成、请求失败

    xhr.responseXML

        默认值为 null

        只有当 responseType 为"text"、""、"document"时，xhr对象上才有此属性，此时才能调用xhr.responseXML，否则抛错

        只有当请求成功且返回数据被正确解析时，才能拿到正确值。以下3种情况下值都为null：请求未完成、请求失败、请求成功但返回数据无法被正确解析时
```

4. readystate值：ajax请求处于哪种状态
   | 值        | 状态    |  描述  |
   | --------   | -----:   | :----: |
   | 0 |unsent 未打开    |  此时xhr对象被成功构造，open()方法还未被调用   |
   | 1 |opened  打开，未发送    |  open()方法已被成功调用，send()方法还未被调用。注意：只有xhr处于OPENED状态，才能调用xhr.setRequestHeader()和xhr.send(),否则会报错   |
   | 2 |headers_received  已获取响应头  | send()方法已经被调用, 响应头和响应状态已经返回   |
   | 3 |loading 正在下载响应体 | 响应体(response entity body)正在下载中，此状态下通过xhr.response可能已经有了响应数据   |
   | 4 |none  整个数据传输过程结束| 整个数据传输过程结束，不管本次请求是成功还是失败    |

5. 超时xhr.timeout

6. 事件
   | 事件 |	触发条件|
    | --------   | -----:   |
   | onreadystatechange |	每当xhr.readyState改变时触发；但xhr.readyState由非0值变为0时不触发。|
   |onloadstart |	调用xhr.send()方法后立即触发，若xhr.send()未被调用则不会触发此事件。|
   |onprogress |	xhr.upload.onprogress在上传阶段(即xhr.send()之后，xhr.readystate=2之前)触发，每50ms触发一次；xhr.onprogress在下载阶段（即xhr.readystate=3时）触发，每50ms触发一次。|
   | onload |	当请求成功完成时触发，此时xhr.readystate=4 |
   | onloadend |	当请求结束（包括请求成功和请求失败）时触发 |
   |onabort 	|当调用xhr.abort()后触发 |
   |ontimeout |	xhr.timeout不等于0，由请求开始即onloadstart开始算起，当到达xhr.timeout所设置时间请求还未结束即onloadend，则触发此事件。|
   |onerror |	在请求过程中，若发生Network error则会触发此事件（若发生Network error时，上传还没有结束，则会先触发xhr.upload.onerror，再触发xhr.onerror；若发生Network error时，上传已经结束，则只会触发xhr.onerror）。注意，只有发生了网络层级别的异常才会触发此事件，对于应用层级别的异常，如响应返回的xhr.statusCode是4xx时，并不属于Network error，所以不会触发onerror事件，而是会触发onload事件。|

# fetch
接收一个URL参数，返回一个promise来处理response。response参数带着一个Response对象
https://fetch.spec.whatwg.org/#concept-request-initiator
## 简单示例
```js
//ajax
var xhr = new XMLHttpRequst();
xhr.open('get', url, true);
xhr.send();
xhr.onload = function() {
    console.log(xhr.responseText)
}
xhr.onerror = function() {
    console.log("error");
}

//fetch
fetch(url).then(function(response) {
    return response.json();
}).then(function(data) {
    console.log(data);
}).catch(function(e) {
    console.log("error");
});
/*
将URL传递给全局的fetch()方法，它会立刻返回一个Promise， 
当Promise被通过，它会返回一个Response对象，通过该对象的json()方法可以将结果作为JSON对象返回。
response.json()同样会返回一个Promise对象，因此在我们的例子中可以继续链接一个then()方法。
*/


//async
async function getjson() {
    try {
        let response = await fetch(url);
        let data = response.json();
        console.log(data);
    } catch (e) {
        console.log("error");
    }
}
```

## 方法
1. fetch函数参数
```js
fetch("http://blog.parryqiu.com", {
    headers: {
        'Cache-Control': 'no-cache'//不缓存请求
    }
})  
.then(function(response){
   // do something...
})
//更多
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

var myInit = { 
                method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' 
             };
               
fetch("http://blog.parryqiu.com", myInit)
.then(function(response){
    // do something...
})
```
2. 返回的reponse
Response.status 也就是 StatusCode，如成功就是 200；
Response.statusText 是 StatusCode 的描述文本，如成功就是 OK；
Response.ok 一个 Boolean 类型的值，判断是否正常返回，也就是 StatusCode 为 200-299
```js
fetch("http://blog.parryqiu.com")
.then(function(response){
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.ok);
})
```


## 接口
1. Headers
自定义请求头
```js
var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());
myHeaders.append("X-Custom-Header", "ProcessThisImmediately");

var myInit = { 
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' 
};
               
fetch("http://blog.parryqiu.com", myInit)
.then(function(response){
    // do something...
})
```

2. Request
Request对象代表了一次fetch请求中的请求体部分

    method - 使用的HTTP动词，GET, POST, PUT, DELETE, HEAD

    url - 请求地址，URL of the request

    headers - 关联的Header对象

    referrer - referrer

    mode - 请求的模式，主要用于跨域设置，cors, no-cors, same-origin

    credentials - 是否发送Cookie omit, same-origin

    redirect - 收到重定向请求之后的操作，follow, error, manual

    integrity - 完整性校验

    cache - 缓存模式(default, reload, no-cache)

```js
var request = new Request('/users.json', {
    method: 'POST', 
    mode: 'cors', 
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});
fetch(request).then(function() { 
    /* handle response */ 
});
```

post请求+body
```js
fetch('/users', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})
```

3. response
响应处理


    type - basic, cors

    url

    useFinalURL - 是否为最终地址

    status - 状态码 (ex: 200, 404, etc.)

    ok - 是否成功响应 (status in the range 200-299)

    statusText - status code (ex: OK)

    headers - 响应头


```js
var reponse = new Response('...', {
    ok:false,
    statueA:404,
    url:'/'
});


fetch('/').then(function(responseObj) {
    console.log('status: ', responseObj.status);

});
```

- response方法

    clone() - Creates a clone of a Response object.

    error() - Returns a new Response object associated with a network error.

    redirect() - Creates a new response with a different URL.

    arrayBuffer() - Returns a promise that resolves with an ArrayBuffer.

    blob() - Returns a promise that resolves with a Blob.

    formData() - Returns a promise that resolves with a FormData object.

    json() - Returns a promise that resolves with a JSON object.

    text() - Returns a promise that resolves with a USVString (text).


## fetch优点
语法简洁，更加语义化
基于标准 Promise 实现，支持 async/await
同构方便，使用isomorphic-fetch

## polifill

    由于 IE8 是 ES3，需要引入 ES5 的 polyfill:es5-shim, es5-sham
    引入 Promise 的 polyfill:es6-promise
    引入 fetch 探测库：fetch-detector
    引入 fetch 的 polyfill:fetch-ie8
    可选：如果你还使用了 jsonp，引入fetch-jsonp
    可选：开启 Babel 的 runtime 模式，现在就使用 async/await

## 坑
1. Fetch 请求默认是不带 cookie 的，需要设置 `fetch(url, {credentials: 'include'})`
2. 服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
```js
fetch('xx.png')
.then(() => {
  console.log('ok');
})
.catch(() => {
  console.log('error');
});
```
打印出 「ok」
>fetch 只有在遇到网络错误的时候才会 reject 这个 promise，比如用户断网或请求地址的域名无法解析等。只要服务器能够返回 HTTP 响应（甚至只是 CORS preflight 的 OPTIONS 响应），promise 一定是 resolved 的状态。
判断一个 fetch 请求是否成功使用**`response.ok`**
```js
fetch('xx.png')
.then((response) => {
  if (response.ok) {
    console.log('ok');
  } else {
    console.log('error');
  }
})
.catch(() => {
  console.log('error');
});
```

3. fetch 不支持同步请求
4. fetch 不支持取消一个请求

总结：在实际项目使用中，需要做各种各样的封装和异常处理，而并非开箱即用fetch，更做不到直接替换 $.ajax 或其他请求库