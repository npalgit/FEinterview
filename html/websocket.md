## 项目-websocket
### Websocket是什么样的协议，具体有什么优点
http://blog.csdn.net/frank_good/article/details/50856585

http://www.ruanyifeng.com/blog/2017/05/websocket.html

1. 首先，Websocket是一个持久化的协议，相对于HTTP这种非持久的协议来说。简单的举个例子吧，用目前应用比较广泛的PHP生命周期来解释。

HTTP的生命周期通过 Request 来界定，也就是一个 Request 一个 Response ，那么在 HTTP1.0 中，这次HTTP请求就结束了。

在HTTP1.1中进行了改进，使得有一个keep-alive，也就是说，在一个HTTP连接中，可以发送多个Request，接收多个Response。但是请记住 Request = Response ， 在HTTP中永远是这样，也就是说一个request只能有一个response。而且这个response也是被动的，不能主动发起。

2.  long poll 和 ajax轮询
轮询：让浏览器隔个几秒就发送一次请求，询问服务器是否有新信息
    :需要服务器有很快的处理速度和资源。（速度）
long poll: 阻塞模型（一直打电话，没收到就不挂电话），也就是说，客户端发起连接后，如果没消息，就一直不返回Response给客户端。直到有消息才返回，返回完之后，客户端再次建立连接，周而复始
    : 需要有很高的并发，也就是说同时接待客户的能力

3. websocket
```http
客户端到服务端： 
GET /demo HTTP/1.1 
Host: example.com 
Connection: Upgrade 
Sec-WebSocket-Key2: 12998 5 Y3 1 .P00 
Upgrade: WebSocket //表明这是一个申请协议升级的 HTTP 请求
Sec-WebSocket-Key1: 4@1 46546xW%0l 1 5 
Origin: http://example.com 
[8-byte security key] 
```
> ”Sec-WebSocket-Key1”、“Sec-WebSocket-Key2”和”[8-byte securitykey]”这样的头信息,客户端浏览器需要向服务器端提供的握手信息，服务器端解析这些头信息，并在握手的过程中依据这些信息生成一个 16 位的安全密钥并返回给客户端，以表明服务器端获取了客户端的请求，同意创建 WebSocket 连接

```http
服务端到客户端：
HTTP/1.1 101 WebSocket Protocol Handshake 
Upgrade: WebSocket //告诉客户端即将升级的是 Websocket 协议 
Connection: Upgrade 
WebSocket-Origin: http://example.com 
WebSocket-Location: ws://example.com/demo 
[16-byte hash response]
```
> Sec-WebSocket-Accept 这个则是经过服务器确认，并且加密过后的 Sec-WebSocket-Key 。 服务器：好啦好啦，知道啦，给你看我的ID CARD来证明行了吧。。
后面的， Sec-WebSocket-Protocol 则是表示最终使用的协议。

客户端：啦啦啦，我要建立Websocket协议，需要的服务：chat，Websocket协议版本：17（HTTP Request）
服务端：ok，确认，已升级为Websocket协议（HTTP Protocols Switched）

#### 缺点
WebSocket 的优点已经列举得很多了，但是作为一个正在演变中的 Web 规范，我们也要看到目前用 Websocket 构建应用程序的一些风险。首先，WebSocket 规范目前还处于草案阶段，也就是它的规范和 API 还是有变动的可能，另外的一个风险就是微软的 IE 作为占市场份额最大的浏览器，和其他的主流浏览器相比，对 HTML5 的支持是比较差的，这是我们在构建企业级的 Web 应用的时候必须要考虑的一个问题。

### 实现
```js
var ws = new WebSocket(url);
ws.onclose = function () {
    reconnect();
};
ws.onerror = function () {
    reconnect();    
};
        
ws.onopen = function () {
   //something
};
ws.onmessage = function (event) {
   //something
}
function reconnect () {
    ws = new ReconnectingWebSocket(url);
}
```

### 客户端断网重连
```js
var heartCheck = {
    timeout: 60000,//60ms
    timeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
　　　　 this.start();
    },
    start: function(){
        this.timeoutObj = setTimeout(function(){
            ws.send("HeartBeat");
        }, this.timeout)
    }
}

ws.onopen = function () {
   heartCheck.start();
};

ws.onmessage = function (event) {
    heartCheck.reset();
}
/*
1. open的时候开始60ms倒计时，send保持心跳
2. 每次收到message重置心跳（清理本次的，start下次的）
3. 当心跳检测send执行之后，如果当前websocket是断开状态，发送超时之后，onclose方法便会被执行，重连也执行了。
*/
```

### 后端主动断开
如果后端因为一些情况断开了ws，是可控情况下的话，会下发一个断连的消息通知，之后才会断开，我们便会重连。
如果因为一些异常断开了连接，我们是不会感应到的，所以如果我们发送了心跳一定时间之后，后端既没有返回心跳响应消息，前端又没有收到任何其他消息的话，我们就能断定后端主动断开了。
```js
var ws = new WebSocket(url);
var heartCheck = {
    timeout: 60000,//60ms
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
　　　　 this.start();
    },
    start: function(){
        var self = this;
        this.timeoutObj = setTimeout(function(){
            ws.send("HeartBeat");
            self.serverTimeoutObj = setTimeout(function(){
                ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }, self.timeout)
        }, this.timeout)
    },
}

ws.onopen = function () {
   heartCheck.start();
};
ws.onmessage = function (event) {
    heartCheck.reset();
}

ws.onclose = function () {
    reconnect();
};
ws.onerror = function () {
    reconnect();
};
function reconnect () {
    ws = new ReconnectingWebSocket(url);
}
```
发送心跳到后端，后端收到消息之后必须返回消息，否则超过60秒之后会判定后端主动断开了
先使用60ms去send到服务端，再判断60ms内有没有收到服务端的响应，没有收到则可以判断服务端断网执行close方法reconnect（）