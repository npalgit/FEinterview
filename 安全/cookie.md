# cookie

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
1. 将时间设为当前时间往前一点。

var date = new Date();

date.setDate(date.getDate() - 1);//真正的删除

setDate()方法用于设置一个月的某一天。

2. expires的设置
```
document.cookie = 'user='+ encodeURIComponent('name')  + ';expires = ' + new Date(0)
```

## cookie属性
在chrome控制台中的resources选项卡中可以看到cookie的信息。

一个域名下面可能存在着很多个cookie对象。

1. name字段为一个cookie的名称。
2. value字段为一个cookie的值。
3. domain字段为可以访问此cookie的域名。
```
非顶级域名，如二级域名或者三级域名，设置的cookie的domain只能为顶级域名或者二级域名或者三级域名本身，不能设置其他二级域名的cookie，否则cookie无法生成。

顶级域名只能设置domain为顶级域名，不能设置为二级域名或者三级域名，否则cookie无法生成。

二级域名能读取设置了domain为顶级域名或者自身的cookie，不能读取其他二级域名domain的cookie。所以要想cookie在多个二级域名中共享，需要设置domain为顶级域名，这样就可以在所有二级域名里面或者到这个cookie的值了。

顶级域名只能获取到domain设置为顶级域名的cookie，其他domain设置为二级域名的无法获取。
```
4. path字段为可以访问此cookie的页面路径。 比如domain是abc.com,path是/test，那么只有/test路径下的页面可以读取此cookie。
5. expires/Max-Age 字段为此cookie超时时间。若设置其值为一个时间，那么当到达此时间后，此cookie失效。不设置的话默认值是Session，意思是cookie会和session一起失效。当浏览器关闭(不是浏览器标签页，而是整个浏览器) 后，此cookie失效。
6. Size字段 此cookie大小。
7. http字段  cookie的httponly属性。若此属性为true，则只有在http请求头中会带有此cookie的信息，而不能通过document.cookie来访问此cookie。
8. secure 字段 设置是否只能通过https来传递此条cookie

## cookie应用
（1）保存用户登录状态。例如将用户id存储于一个cookie内，这样当用户下次访问该页面时就不需要重新登录了，现在很多论坛和社区都提供这样的功能。 cookie还可以设置过期时间，当超过时间期限后，cookie就会自动消失。因此，系统往往可以提示用户保持登录状态的时间：常见选项有一个月、三个 月、一年等。

（2）跟踪用户行为。例如一个天气预报网站，能够根据用户选择的地区显示当地的天气情况。如果每次都需要选择所在地是烦琐的，当利用了 cookie后就会显得很人性化了，系统能够记住上一次访问的地区，当下次再打开该页面时，它就会自动显示上次用户所在地区的天气情况。因为一切都是在后 台完成，所以这样的页面就像为某个用户所定制的一样，使用起来非常方便。

（3）定制页面。如果网站提供了换肤或更换布局的功能，那么可以使用cookie来记录用户的选项，例如：背景色、分辨率等。当用户下次访问时，仍然可以保存上一次访问的界面风格。

（4）创建购物车。正如在前面的例子中使用cookie来记录用户需要购买的商品一样，在结账的时候可以统一提交。例如淘宝网就使用cookie记录了用户曾经浏览过的商品，方便随时进行比较。 

## cookie的缺点主要集中于安全性和隐私保护

（1）cookie可能被禁用。当用户非常注重个人隐私保护时，他很可能禁用浏览器的cookie功能；
（2）cookie是与浏览器相关的。这意味着即使访问的是同一个页面，不同浏览器之间所保存的cookie也是不能互相访问的；
（3）cookie可能被删除。因为每个cookie都是硬盘上的一个文件，因此很有可能被用户删除；
（4）cookie安全性不够高。所有的cookie都是以纯文本的形式记录于文件中，因此如果要保存用户名密码等信息时，最好事先经过加密处理。 

## cookie操作
```
1. [代码]1．添加一个cookie    
<script language="JavaScript" type="text/javascript"> 
  
function addCookie(name,value,expiresHours){ 
    var cookieString=name+"="+escape(value); 
    //判断是否设置过期时间,0代表关闭浏览器时失效
    if(expiresHours>0){ 
        var date=new Date(); 
        date.setTime(date.getTime+expiresHours*3600*1000); 
        cookieString=cookieString+"; expires="+date.toGMTString(); 
    } 
    document.cookie=cookieString; 
} 
 
</script> 
2. [代码]2 . 根据指定名称的cookie修改cookie的值    
<script language="JavaScript" type="text/javascript"> 
   
function editCookie(name,value,expiresHours){ 
    var cookieString=name+"="+escape(value); 
    //判断是否设置过期时间,0代表关闭浏览器时失效
    if(expiresHours>0){ 
        var date=new Date(); 
        date.setTime(date.getTime+expiresHours*3600*1000); //单位是多少小时后失效
        cookieString=cookieString+"; expires="+date.toGMTString(); 
    } 
    document.cookie=cookieString; 
} 
  
</script>
3. [代码]3．获取指定名称的cookie值    
<script language="JavaScript" type="text/javascript"> 
 
function getCookie(name){ 
    var strCookie=document.cookie; 
    var arrCookie=strCookie.split("; "); 
    for(var i=0;i<arrCookie.length;i++){ 
        var arr=arrCookie[i].split("="); 
        if(arr[0]==name){
            return unescape(arr[1]);
        }else{
            return ""; 
        } 
    } 
} 
 
</script> 
4. [代码]4．删除指定名称的cookie    
<script language="JavaScript" type="text/javascript"> 
 
function deleteCookie(name){ 
    var date=new Date(); 
    date.setTime(date.getTime()-10000); //设定一个过去的时间即可
    document.cookie=name+"=v; expires="+date.toGMTString(); 
} 

```
## 设置cookie时 cookie默认的domain为html文件所在的域名，path为html文件所在的路径
domain规则，
- 设置cookie——设置cookie的时候，domain要符合域名的规则，比如可以设置成www1.pclady.com.cn和pclady.com.cn 但是不能设置成pclady。要有.com.cn或者其他域名做结尾。 通过js手动设置cookie的domain都是以.开头的。比如设置domain=pclady.com.cn,实际的domain名为.pclady.com.cn；删除cookie时加不加.都可以。
- 获取cookie——js只能获取domian大于等于当前页面域名的cookie。比如http://www1.pclady.com.cn/zt/20160623/testCookie.html页面中的js能获取domain为“www1.pclady.com.cn”和“.www1.pclady.com.cn”和“.pclady.com.cn”但是获取不到“g.pclady.com.cn”中的cookie；
- 删除cookie——要删除一个cookie，domain值必须跟要删除cookie的domain相同，默认的domain为html文件的domain。
- 跨域domain——js不可以把cookie设置成不同与html域名的domian。cookie设置不会成功，但不会影响后面程序对cookie的操作。
- 错误——如果domain设置错误，该cookie将不会被创建，并且后续对cookie的操作不论正确与否都会被浏览器禁止。

path规则

- 设置cookie——js设置path要以"/"开头，比如html路径为"/zt/20160623/",路径可以设置成"/"或"/zt"。
-  获取cookie——使用js只能获取path大于等于当前页面path的cookie，比如html路径为/zt/20160623/,使用js只能获取“/zt/20160623/”和“/zt”和“/”路径下的cookie。不能获取其他路径下的cookie
- 删除cookie——删除cookie的时候路径也必须相同，默认的路径是html的path路径。
- 错误——如果path不是以"/"开头的则创建cookie的path使用默认的path；如果是以"/"开头但是设置错了，路径名不存在或者直接设置成子路径。比如设置成"/20160623"或者"/zt1",该cookie将不会被创建，并且后续对cookie的操作不论正确与否都会被浏览器禁止。


## cookie跨域
https://segmentfault.com/a/1190000006932934
### 修改cookie：
顶级域名

顶级域名的cookie在顶级域名或者非顶级域名【需要设置domain为顶级域名才可以】都可以修改。代码如下：

- 为所有二级域名设置一个cookie
setcookie("name", "yangbai", time() + 1000, "/", "yangbai.com");

- 在game.yangbai.com下面修改这个cookie值
setcookie("name", "yangbai11", time() + 1000, "/", "yangbai.com");

