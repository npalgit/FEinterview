```
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open('GET','demo.php','true');

    xmlHttp.send()

    xmlHttp.onreadystatechange = function(){

        if(xmlHttp.readyState === 4 & xmlHttp.status === 200){

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
