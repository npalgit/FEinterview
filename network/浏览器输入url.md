## 浏览器地址栏输入url到显示页面步骤
1. 查看缓存
无缓存，发起请求
有缓存，且可用（cache-control:max-age, expires过期时间），直接解析转码
有缓存，过期（Etag+If-None-Match， Last-Modified+If-Modified-since），发起请求
参考：
2. 解析url:协议、网络地址、资源路径
协议是从该计算机获取资源的方式，常见的是HTTP、FTP，不同协议有不同的通讯内容格式；
网络地址指示该连接网络上哪一台计算机，可以是域名或者IP地址，可以包括端口号；
资源路径指示从服务器上获取哪一项资源
eg:
协议部分：http
网络地址：www.guokr.com
资源路径：/question/554991/
3. 获取主机IP地址
浏览器缓存-浏览器会缓存DNS记录一段时间。 有趣的是，操作系统没有告诉浏览器储存DNS记录的时间，这样不同浏览器会储存个自固定的一个时间（2分钟到30分钟不等）。
系统缓存-如果在浏览器缓存里没有找到需要的记录，浏览器会做一个系统调用（windows里是gethostbyname）。这样便可获得系统缓存中的记录。
hosts文件
路由器缓存
ISP DNS缓存
DNS递归搜索

4. 封装一个HTTP请求报文
 GET http://facebook.com/ HTTP/1.1
 Accept: application/x-ms-application, image/jpeg, application/xaml+xml, [...]
 User-Agent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; [...]
 Accept-Encoding: gzip, deflate
 Connection: Keep-Alive
 Host: facebook.com
 Cookie: datr=1265876274-[...]; locale=en_US; lsd=WW[...]; c_user=2101[...]

5. 建立TCP连接，三次握手
SYN=1, Seq=x
SYN=1, ACK=x+1, Seq=y
ACK=y+1, Seq=z
6. 发送HTTP请求
7. 服务器接受请求并处理请求
8. 检查HTTP请求头是否包含缓存验证信息，是否返回304
9. 服务器封装一个HTTP响应报文
HTTP/1.1 200 OK
 Cache-Control: private, no-store, no-cache, must-revalidate, post-check=0,
 pre-check=0
 Expires: Sat, 01 Jan 2000 00:00:00 GMT
 P3P: CP="DSP LAW"
 Pragma: no-cache
 Content-Encoding: gzip
 Content-Type: text/html; charset=utf-8
 X-Cnection: close
 Transfer-Encoding: chunked
 Date: Fri, 12 Feb 2010 09:05:55 GMT
10. 浏览器接收HTTP响应报文，根据情况选择关闭TCP连接（四次挥手）或者重用（connetion:keep-alive)
FIN=1, ACK=z, Seq=x
ACK=z+1, Seq=z
FIN=1, ACK=x, Seq=y
ACK=y+1, Seq=x
11. 检查响应状态码，分别进行处理
12. 3XX重定向响应
Location: http://www.facebook.com/：服务器给浏览器响应一个301永久重定向响应，这样浏览器就会访问“http://www.facebook.com/”而非“http://facebook.com/”
重定向的一个原因跟搜索引擎排名有关
浏览器则会重新发送请求
13. 资源缓存
14. 解码（gzip）
15. 解析html文档，增量构建DOM树，下载资源，构建CSSOM，执行js脚本
16. 根据DOM树和CSSOM树，构建RenderTree（渲染树）
17. Layout计算需要渲染的节点的大小和位置
节点位置和大小是基于viewport计算的。
在移动端通常将viewport设为浏览器推荐的理想视口，以保证字体显示大小易于阅读
旋转屏幕、修改浏览器窗口大小，修改位置大小相关的CSS属性，都可能触发Layout
18. Paint绘制像素点
根据background, border, box-shadow等样式，将Layout生成的区域填充为最终将显示在屏幕上的像素