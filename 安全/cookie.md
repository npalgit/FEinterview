## cookie 和session 的区别：

 1、cookie数据存放在客户的浏览器上，session数据放在服务器上。

 2、cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗

    考虑到安全应当使用session。

 3、session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能

     考虑到减轻服务器性能方面，应当使用COOKIE。

 4、单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。

 5、所以个人建议：

    将登陆信息等重要信息存放为SESSION
    其他信息如果需要保留，可以放在COOKIE中
## 如何删除一个cookie

    1.将时间设为当前时间往前一点。

var date = new Date();

date.setDate(date.getDate() - 1);//真正的删除

setDate()方法用于设置一个月的某一天。

    2.expires的设置

    document.cookie = 'user='+ encodeURIComponent('name')  + ';expires = ' + new Date(0)


## cookie属性
在chrome控制台中的resources选项卡中可以看到cookie的信息。

一个域名下面可能存在着很多个cookie对象。

name字段为一个cookie的名称。

value字段为一个cookie的值。

domain字段为可以访问此cookie的域名。

非顶级域名，如二级域名或者三级域名，设置的cookie的domain只能为顶级域名或者二级域名或者三级域名本身，不能设置其他二级域名的cookie，否则cookie无法生成。

顶级域名只能设置domain为顶级域名，不能设置为二级域名或者三级域名，否则cookie无法生成。

二级域名能读取设置了domain为顶级域名或者自身的cookie，不能读取其他二级域名domain的cookie。所以要想cookie在多个二级域名中共享，需要设置domain为顶级域名，这样就可以在所有二级域名里面或者到这个cookie的值了。
顶级域名只能获取到domain设置为顶级域名的cookie，其他domain设置为二级域名的无法获取。

path字段为可以访问此cookie的页面路径。 比如domain是abc.com,path是/test，那么只有/test路径下的页面可以读取此cookie。

expires/Max-Age 字段为此cookie超时时间。若设置其值为一个时间，那么当到达此时间后，此cookie失效。不设置的话默认值是Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此cookie失效。

Size字段 此cookie大小。

http字段  cookie的httponly属性。若此属性为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie。

secure 字段 设置是否只能通过https来传递此条cooki