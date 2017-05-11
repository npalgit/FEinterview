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