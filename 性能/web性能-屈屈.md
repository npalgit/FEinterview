## web性能总结
1. 在现代 Web 应用中，请求数 / 请求的域名 / 资源大小 都在突飞猛进；
1. DNS 查询、TCP 连接、服务端处理、及网络传输共同决定了 TTFB；
1. 由于 TCP 的三次握手及慢启动，建立新连接成本很高（Keep-Alive）；
1. HTTP/1.1 中，一个 TCP 连接上只能有一个请求 / 响应（TCP 并发连接）；
1. 为了公平原则，浏览器针对同域名有并发连接数限制（通常为 6个 / 域名）；
1. 域名散列可以突破并发连接数限制，但需要权衡利弊；
1. 页面布局和渲染与执行 JavaScript 交错进行，关键资源的加载甚至会阻塞渲染（请回顾之前的课程）；

### 减少传输大小

去掉无用 / 冗余代码，精简异步接口；
代码压缩（HTML、CSS、JS）；
图片压缩（Webp、Guetzli）；
矢量图标（CSS 3 / Web Font / SVG）；
使用 Video 替换 Gif；
服务端开启响应压缩（Gzip，br）；
缓存（Cache）；
### 减少请求连接数

合并请求；
异步接口合并（Batch Ajax Request）；
图片合并（CSS Sprite）；
CSS、JS 合并（Concatenation）；
CSS、JS 内联（Inline）；
图片、音频内联（Data URI）；
缓存（Cache）；
异步加载 / 按需加载；

### http2


### HTTP 缓存机制

Last-Modified；
ETag；
Expires；
Cache-Control；