## Genneral 公共头部
Request URl:请求的域名
Request method:GET请求方式
Status code: 200ok
remote Address: 请求的远程IP地址


## Request 请求头
Accept: 浏览器支持的MIME类型（媒体类型）
Accept-Encoding: 支持的压缩类型
Accept-Language: 支持的语言
Cache-Control: 缓存机制
Connection：keep-alive当浏览器与服务器通信时对于长连接如何进行处理：close/keep-alive
Cookie: 向服务器返回cookie
Host: 请求的服务器url
Referer: 页面来源url
Pragma: no-cache(兼容http1.0, 在HTTP/1.1协议中，它的含义和Cache- Control:no-cache相同)
Upgrade-Insecure-Request:1
User-Agent: 客户端信息（操作系统、浏览器及版本、浏览器渲染引擎等）


## response 响应头
Access-Control-Allow-Origin: * 允许跨域
Cache-Control: max-age=600
Content-Encoding: 数据在传输过程中所使用的压缩编码方式
Content-Type:text/html; charset=utf-8 数据的类型
Connection: keep-alive
Last-Modified: Mon, 10 Apr 2017 08:55:55 GMT
Vary: Accept-Encoding ( Vary 字段用于列出一个响应字段列表，告诉缓存服务器遇到同一个 URL 对应着不同版本文档的情况时，如何缓存和筛选合适的版本。)
Date: 数据从服务器发送的时间
Expires: 应该在什么时候认为文档已经过期，从而不再缓存它
Etag: 0cc3ad6b6459efcc39d094137ea3e2fc
Server:nginx  服务器名字。Servlet一般不设置这个值，而是由Web服务器自己设置
Set-Cookie: 设置和页面关联的cookie
Transfer-Encoding: chunked数据传输的方式(chunked,identity，从字面意义可以理解，前者指把要发送传输的数据切割成一系列的块数据传输，后者指传输时不做任何处理，自身的本质数据形式传输)
Location: 表示客户应当到哪里去提取文档。Location通常不是直接设置的，而是通过HttpServletResponse的sendRedirect方法，该方法同时设置状态代码为302/301
