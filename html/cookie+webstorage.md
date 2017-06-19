# cookie localstorage sessionstorage区别
https://segmentfault.com/a/1190000002723469

| 特性 |	Cookie |	localStorage |	sessionStorage|
| ---: | ---: | ---: | ---: |
|数据的生命期 |	可设置失效时间，默认是关闭浏览器后失效 |	除非被清除，否则永久保存 |	仅在当前会话下有效，关闭页面或浏览器后被清除|
|存放数据大小 |	4K左右 |	一般为5MB| 	一般为5MB|
|与服务器端通信 |	每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题 |	仅在客户端（即浏览器）中保存，不参与和服务器的通信 |	仅在客户端（即浏览器）中保存，不参与和服务器的通信|
|易用性| 	需要程序员自己封装，源生的Cookie接口不友好 |	源生接口可以接受，亦可再次封装来对Object和Array有更好的支持 |	源生接口可以接受，亦可再次封装来对Object和Array有更好的支持
||cookie有secure属性，要求HTTPS传输。|


1. 因为考虑到每个 HTTP 请求都会带着 Cookie 的信息， 因为考虑到每个 HTTP 请求都会带着 Cookie 的信息
2. localStorage 接替了 Cookie 管理购物车的工作，比如HTML5游戏通常会产生一些本地数据，localStorage 也是非常适用的
3. 为了优化用户体验，我们可能要把表单页面拆分成多个子页面，然后按步骤引导用户填写。这时候 sessionStorage 的作用就发挥出来了。
---

1. cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。
2. 存储大小限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
3. 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
4. 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。
5. Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者。
6.  Web Storage 的 api 接口使用更方便。

7. sessionStorage的概念很特别，引入了一个“浏览器窗口”的概念。sessionStorage是在同源的同窗口（或tab）中，始终存在的数据。也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口后，sessionStorage即被销毁。同时“独立”打开的不同窗口，即使是同一页面，sessionStorage对象也是不同的


## Storage
setItem（key,value）
getItem(key)
removeItem(key)
clear()
key(index)
length;
for(var i=0,len=local.Storage.length;i<len;++i){
     var name = localStorage.key(i);
     var value = localStorage.getItem(name);
}

## Cookie
document.cookie = "name=qiu;max-age=999;path=/;domain=domain;secure"
max-age=0可以删除cookie
不同健值用;分割


## cookie session

http://www.jb51.net/article/55703.htm
## HTTP会话控制
在网站中跟踪一个变量，通过对变量的跟踪，使 多个请求事物之间建立联系，根据授权和用户身份显示不同的内容、不同页面。
## Session会话控制
session会话是通过唯一的会话ID来驱动的，会话ID是一个加密的随机数字，由PHP生成，在会话的生命周期中都会保存在客户端。

1. 客户端（也就是浏览器）保存数据的地方只有cookie，所以PHP的会话ID一般保存在用户机器的cookie中。
2. 了解cookie后我们知道， 浏览器是可以禁用cookie的，这样会话就会失效。所以PHP会话控制还有一种模式，就是在URL中传递会话ID。如果在浏览网站时我们稍加留心的话， 有些URL中有一串看起来像随机数字的字符串，那么其实很有可能就是URL形式的会话控制。

3. 在session会话期间，session会分别保存在客户端和服务器端两个文件，客户端可以是cookie方式保存的sessionID(默认的 保存方式)或通过url字符串形式传递。服务器端一般以文本的形式保存在指定的session目录中。

# 安全-Cookie