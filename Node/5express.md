# express
- 设置中间件来响应http请求
- 定义路由表执行不同的http请求
- 通过向模板传递参数来动态渲染html页面

## 入门
1. 使用
```js
var express = require('express');//引入模块
var app = express();//执行express()得到一个app实例
//app实例中有get,post,use,listen方法

app.get('/', function(req, res) {
  res.send('hello world');
});
/* 当使用get方法访问路径path时，执行handler指定的方法，
而且handler方法还带有req和res两个参数供我们使用。
req是请求过来时带的信息，比如参数query, body, 头部header等； 
res是我们作为服务器想要返回给浏览器的信息设置。
res.send(‘hello world')表示是向页面中发送'hello world'字符串。
*/

app.listen(3000, function() {
  console.log('server run at port 3000');
});
//app.listen用来监听本地的端口后运行web程序，监听成功后执行回调函数
```
## 路由

app.get(path, handler) : get方式访问path路径 
app.post(path, handler) : post方式访问path路径 
app.put(path, handler) : put方式访问path路径 
app.delete(path, handler) : delete方式访问path路径 
app.all(path, handler) : 任何方式访问path路径 

## res响应
app.get('/', (req, res) => {
  res.send(html);
});
此外还有：
res.send()
res.sendFile()发送文件
res.download()下载文件
res.end() 终结响应处理流程
res.json() 发送一个 JSON 格式的响应 
res.jsonp() 发送一个支持 JSONP 的 JSON 格式的响应
res.redirect() 重定向请求
res.render() 渲染视图模板 
res.sendStatus() 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送

## 中间件:回调函数
中间件都可以调用req和res对象，如果多个中间件顺序向下执行的话，上一个中间还需要一个next变量，来调用下一个中间件。
app.use(path, fn);
```js
// 任何的请求，该中间件都会响应
app.use((req, res, next) => {
  console.log(req.url);
  next(); // 若没有next()，则请求就会被挂起，一直等待 
});

// /topic 下的请求都会响应，包括 /topic/1.html, /topic/c/1.html等 
app.use('/topic', function(req, res, next){ 
console.log('topic m url: '+req.url); 
next(); 
})

// 处理/根目录下的请求 
app.get('/', function(req, res, next){ 
res.send('index'); 
});

// 处理 /topic/1.html 这种类型的请求 
app.get('/topic/:id.html', function(req, res, next){ 
res.send('topic'); 
});
```

调用多个中间件依次执行，使用next()将控制权交由下一个中间件
```js
// 作为数组方式 
app.use([ 
function(req, res, next){ 
console.log('index m 1'); 
next(); 
}, function(req, res, next){ 
console.log('index m 2'); 
next(); 
}, function(req, res, next){ 
console.log('index m 3'); 
next(); 
} 
])

// 每个中间件作为一个参数 
app.get('/topic/:id.html', function(req, res, next){ 
// res.send('topic'); 
console.log('topic get 1'); 
next(); 
}, function(req, res, next){ 
console.log('topic get 2'); 
next(); 
}, function(req, res, next){ 
console.log('topic get 3'); 
res.send('topic'); 
});
```
当我们访问127.0.0.1/topic/1.html时，在控制台则会输出：

index m 1 
index m 2 
index m 3

topic get 1 
topic get 2 
topic get 3

- 说明中间件是依次向下执行的。我们可以在每个中间件都做不同的处理，不过要记得使用next()方法，不然页面就挂了。

- 我们在上面看到res中的方法，至少需要调用一个，不然请求就会被挂起，一直等待或404。如果对外没有任何的回复，也可以使用res.end()结束。同时，如果在某个中间件中使用了res中的方法，则后面的中间件不再调用。

## req对象
Request 对象 - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：
req.app：当callback为外部文件时，用req.app访问express的实例
req.baseUrl：获取路由当前安装的URL路径
req.body / req.cookies：获得「请求主体」/ Cookies
req.fresh / req.stale：判断请求是否还「新鲜」
req.hostname / req.ip：获取主机名和IP地址
req.originalUrl：获取原始请求URL
req.params：获取路由的parameters
req.path：获取请求路径
req.protocol：获取协议类型
req.query：获取URL的查询参数串
req.route：获取当前匹配的路由
req.subdomains：获取子域名
req.accepts()：检查可接受的请求的文档类型
req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
req.get()：获取指定的HTTP请求头
req.is()：判断请求头Content-Type的MIME类型

## res对象
Response 对象 - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：
res.app：同req.app一样
res.append()：追加指定HTTP头
res.set()在res.append()后将重置之前设置的头
res.cookie(name，value [，option])：设置Cookie
opition: domain / expires / httpOnly / maxAge / path / secure / signed
res.clearCookie()：清除Cookie
res.download()：传送指定路径的文件
res.get()：返回指定的HTTP头
res.json()：传送JSON响应
res.jsonp()：传送JSONP响应
res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
res.redirect()：设置响应的Location HTTP头，并且设置状态码302
res.send()：传送HTTP响应
res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
res.set()：设置HTTP头，传入object可以一次设置多个头
res.status()：设置HTTP状态码
res.type()：设置Content-Type的MIME类型