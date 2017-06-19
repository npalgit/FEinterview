# postMessage
## 1. postMessage(data, origin)
1.data:要传递的数据，html5规范中提到该参数可以是JavaScript的任意基本类型或可复制的对象，然而并不是所有浏览器都做到了这点儿，部分浏览器只能处理字符串参数，所以我们在传递参数的时候需要使用JSON.stringify()方法对对象参数序列化，在低版本IE中引用json2.js可以实现类似效果。

2.origin：字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL会被忽略，所以可以不写，这个参数是为了安全考虑，postMessage()方法只会将message传递给指定窗口，当然如果愿意也可以建参数设置为"*"，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

3. demo
```js
window.postMessage('getColor', 'http://aaaa.com');
```
## 2. 接收消息

```js
window.addEventListener('message', (e) => {

}, false);
```
e的属性
data：顾名思义，是传递来的message
source：发送消息的窗口对象
origin：发送消息窗口的源（协议+主机+端口号）


## 3. 跨域
