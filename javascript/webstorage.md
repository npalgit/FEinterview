https://segmentfault.com/a/1190000002723469

特性 	Cookie 	localStorage 	sessionStorage
数据的生命期 	可设置失效时间，默认是关闭浏览器后失效 	除非被清除，否则永久保存 	仅在当前会话下有效，关闭页面或浏览器后被清除
存放数据大小 	4K左右 	一般为5MB 	一般为5MB
与服务器端通信 	每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题 	仅在客户端（即浏览器）中保存，不参与和服务器的通信 	仅在客户端（即浏览器）中保存，不参与和服务器的通信
易用性 	需要程序员自己封装，源生的Cookie接口不友好 	源生接口可以接受，亦可再次封装来对Object和Array有更好的支持 	源生接口可以接受，亦可再次封装来对Object和Array有更好的支持





cookie有secure属性，要求HTTPS传输。


1. 因为考虑到每个 HTTP 请求都会带着 Cookie 的信息， 因为考虑到每个 HTTP 请求都会带着 Cookie 的信息
2. localStorage 接替了 Cookie 管理购物车的工作，比如HTML5游戏通常会产生一些本地数据，localStorage 也是非常适用的
3. 为了优化用户体验，我们可能要把表单页面拆分成多个子页面，然后按步骤引导用户填写。这时候 sessionStorage 的作用就发挥出来了。

Storage
setItem（key,value）
getItem(key)
removeItem(key)
claer()
key(index)
length;
for(var i=0,len=local.Storage.length;i<len;++i){
     var name = localStorage.key(i);
     var value = localStorage.getItem(name);
}

Cookie
document.cookie = "name=qiu;max-age=999;path=/;domain=domain;secure"
max-age=0可以删除cookie
不同健值用;分割

http://www.jb51.net/article/55703.htm
PHP会话控制:Session与Cookie详解投稿：junjie 字体：[增加 减小] 类型：转载 时间：2014-09-27 我要评论
这篇文章主要介绍了PHP会话控制:Session与Cookie详解,本文详细讲解了PHP中Session与Cookie的相关知识,涵盖面较广,需要的朋友可以参考下
本文介绍了PHP会话控制，主要阐述以下几点内容：
• 会话控制的产生背景/概念
• cookie的维护与生命周期(有效时间)
• session的维护与生命周期(回收机制)
• cookie与session之间的区别与联系
• 问题1：禁用cookie后session为什么会失效？
• 问题2：IE浏览器下丢失session，每次刷新页面，都会生成新的sessionID（Firefox浏览器正常）
• session、cookie简单实例
理解会话控制的概念
理解一个概念就需要理解他的背景及产生的原因，这里引入WEB环境及其HTTP协议。会话控制产生的背景：
阅读过HTTP协议相关资料的同学都会知道HTTP协议是WEB服务器与客户端(浏览器)相互通信的协议，它是一种无状态协议，所谓无状态，指的是不会维 护http请求数据，http请求是独立的，不持久的。也就是说HTTP协议没有一个内建的机制来维护两个事务之间的状态或者说是关系吧。当一个用户在请 求一个页面后再去请求另外一个页面时，HTTP将无法告诉我们这两个请求是否来自同一个用户。
由此我们就会觉得很奇怪了，平时我们在论坛逛帖子或电商网站购物时，只要我们在这个站点内，不论我们怎么跳转，从一个页面跑到另一个页面，网站总会 记得我是谁，比如告诉你购买了哪些东西。这是怎么做到的呢，估计大家猜到了，这就是运用了HTTP会话控制。在网站中跟踪一个变量，通过对变量的跟踪，使 多个请求事物之间建立联系，根据授权和用户身份显示不同的内容、不同页面。
PHP Session会话控制：
PHP的session会话是通过唯一的会话ID来驱动的，会话ID是一个加密的随机数字，由PHP生成，在会话的生命周期中都会保存在客户端。我 们知道客户端（也就是浏览器）保存数据的地方只有cookie，所以PHP的会话ID一般保存在用户机器的cookie中。了解cookie后我们知道， 浏览器是可以禁用cookie的，这样会话就会失效。所以PHP会话控制还有一种模式，就是在URL中传递会话ID。如果在浏览网站时我们稍加留心的话， 有些URL中有一串看起来像随机数字的字符串，那么其实很有可能就是URL形式的会话控制。
讲到这里，有些人可能会有疑问了，客户端只是保存一个会话ID，那么会话控制中保存的会话变量比如你购物时买的物品列表等，它们是存放在哪个地方的 呢？很显然，会话变量是在服务器端使用的，那么这些会话变量必定存放在服务器端。默认情况下，会话变量保存在服务器的普通文件中（也可以自己配置使用数据 库来保存，可以Google一下），会话ID的作用就像是一把钥匙，在服务器端保存会话的文件中找到该会话ID对应的会话变量，比如购买物品的列表。
那么会话控制的整个过程可能就像这个样子，用户登录或者第一次浏览某个站点的页面时，该站点会生成一个PHP的会话ID并通过cookie发送到客 户端（浏览器）。当用户点击该站点的另一个页面时，浏览器开始连接这个URL。在连接之前，浏览器会先搜索本地保存的cookie，如果在cookie中 有任何与正在连接的URL相关的cookie，就将它提交到服务器。而刚好在登陆或第一次连接时，已经产生了一个与该网站URL相关的cookie（保存 的会话ID），所以当用户再次连接这个站点时，站点就可以通过这个会话ID识别出用户，从服务器的会话文件中取出与这个会话ID相关的会话变量，从而保持 事务之间的连续。
接下来我们了解下两个重要的概念：cookie和session
关于cookie的维护与生命周期
cookie是在服务器端被创建并写回到客户端浏览器，浏览器接到响应头中关于写cookie的指令则在本地临时文件夹中。
创建了一个cookie文件，其中保存了你的cookie内容，cookie内容的存储是键值对的方式，键和值都只能是字符串。例如：
文件：Cookie:administrator@localhost/
内容格式：voteID100101localhost/15361167667230343893360385046430343691*
cookie的创建：
复制代码 代码如下:

setcookie()函数设置cookie,函数原型如下
setcookie(name, value, expire, path, domain);
注释：cookie标题头必须在发送其他标题头之前发送，否则就无效（这是cookie的限制，而不是PHP的限制）。在发送 cookie 时，cookie 的值会自动进行 URL 编码，在取回时进行自动解码（为防止 URL 编码，请使用 setrawcookie() 取而代之）。
cookie的维护：
cooke有四个标识符：cookie的name，domain，path，secure标记。要想在将来改变这个cookie的值，需要发送另一个具有相同cookie name,domain,path的Set-Cookie消息头，这将以一个新
的值来覆盖原来cookie的值。然而，如果仅仅只是改变这些选项的某一个也会创建一个完全不同的cookie，如只是更改了name值。
cookie失效时间：
可以设置过期时间，如果不设置则是会话级别的，即关闭浏览器就会消失。当cookie创建时包含了失效日期，这个失效日期则关联了以name- domain-path-secure为标识的cookie。要改变一个cookie的失效日期，你必须指定同样的组合。当改变一个cookie的值时， 你不必每次都设置失效日期，因为它不是cookie标识信息的组成部分。例如：
复制代码 代码如下:

setcookie(vote ,$id+1,time()+3600*24);
setcookie(vote,$id);
在cookie上的失效日期并没有改变，因为cookie的标识符是相同的。实际上，只有你手工的改变cookie的失效日期，否则其失效日期不会 改变。这意味着在同一个会话中，一个会话cookie可以变成一个持久化cookie（一个可以在多个会话中存在的），反之则不可。为了要将一个持久化 cookie变为一个会话cookie，你必须删除这个持久化cookie，这只要设置它的失效日期为过去某个时间之后再创建一个同名的会话cookie 就可以实现。
需要记得的是失效日期是以浏览器运行的电脑上的系统时间为基准进行核实的。没有任何办法来来验证这个系统时间是否和服务器的时间同步，所以当服务器时间和浏览器所处系统时间存在差异时这样的设置会出现错误。
cookie自动删除：
cookie会被浏览器自动删除，通常存在以下几种原因：
会话cooke(Session cookie)在会话结束时（浏览器关闭）会被删除
持久化cookie（Persistent cookie）在到达失效日期时会被删除，如：

复制代码 代码如下:

setcookie("vote", "", time()-3600);

如果浏览器中的cookie限制到达，那么cookies会被删除以为新建cookies创建空间。
关于session的维护与生命周期
Session是由应用服务器维持的一个服务器端的存储空间，用户在连接服务器时，会由服务器创建生成一个唯一的sessionID，用该 sessionID为标识符来存取服务器端的Session存储空间，在会话期间，分配给客户端的唯一sessionID,用来标识当前用户，与其他用户 进行区分。通过SessionID接受每一次访问的请求,从而识别当前用户,跟踪和保持用户的具体资料,以及session变量，可在session中存 储数字或文字资料.比如session_name.这些信息都保存在服务器端。当然，sessionID也可以作为会话信息保存到数据库中，进行 session持久化。这样可以跟踪用户的登陆次数、在线与否、在线时间等从而维护HTTP无状态事物之间的关系。session的内容存储是键值对的列 表，键是字符串类型，session的存储更方便，值可以是对象。
在session会话期间，session会分别保存在客户端和服务器端两个文件，客户端可以是cookie方式保存的sessionID(默认的 保存方式)或通过url字符串形式传递。服务器端一般以文本的形式保存在指定的session目录中。在服务器端我们可以通过 session.use_cookies来控制客户端使用哪一种保存方式。如果定义为cookie保存方式，我们可以通过 session.cookie_lifetime(默认值0，闭浏览器就清除)来控制被保存在client上的cookie的有效期。而如果客户端用 cookie方式保存的sessionID，则使用“临时”的cookie保存(cookie的名称为PHPSESSID，通过Firebug你可以了解 到详细的信息，该名称你可以通过php.ini session.name进行更改)，用户提交页面时，会将这一SessionID提交到服务器端，来存取session数据。这一过程，是不用开发人员 干预的。
Session的创建：
复制代码 代码如下:

session_start()  //开始一个会话及返回已经存在会话

功能：初始化Session，也标识着session生命周期的开始。要使用session，必须初始化一个session环境，有点类似于OOP概念中 调用构造函数构创建对象实例一样。session初始化操作，声明一个全局数组$_SESSION，映射寄存在内存的session数据。如果 session文件已经存在，并且保存有session数据，session_start()则会读取session数据，填入$_SESSION中，开 始一个新的session生命周期。
说明：这个函数没有参数,且返回值为true，如果使用基于cookie的sessin，那么在session_satrt()之前不能有任何的输出，包括空白
如果在php.ini中session.auto_start=1开启,则在每个页面执行session_start()，不需要手工设置，该选项默认为关闭状态，开启后不能将对象放入session中。
Session ID：
用户session唯一标识符，随机生成的一串字符串，具有唯一性，随机性。主要用于区分其它用户的session数据。用户第一次访问web页面的时候，php的session初始化函数调用会分配给当前来访用户一个唯一的ID，也称之为session_id。
获得session_id()：
复制代码 代码如下:

echo $_COOKIE['PHPSESSID'].'<br/>';
echo $_COOKIE[session_name()].'<br/>';
echo session_id().'<br/>';
session数据：
我们把需要通过session保存的用户状态信息，称为用户session数据，也称为session data。一般是在当前session生命周期内，相应的$_SESSION数据。一旦调用了session_start()初始化session，就意 味着开始了一个session生命周期。也就是宣布了，可以使用相关函数操作$_SESSION来管理session数据。这个session生命周期产 生的数据并没有实时地写入session文件，而是通过$_SESSION变量寄存在内存中。$_SESSION是一个全局变量，类型是Array，映射 了session生命周期的session数据，寄存在内存中。在session初始化的时候，从session文件中读取数据，填入该变量中。在 session(生命周期)结束时，将$_SESSION数据写回session文件。
注册一个会话变量：
从PHP4.1以后，会话变量保存在超级全局数组$_SESSION中。要创建一会话变量，只需要在数组中设置一个元素，如：

复制代码 代码如下:

$_SESSION['domain'] = blog.jb51.net;
$_SESSION['poll']=$_SESSION[poll] + 1;

使用一个会话变量:
复制代码 代码如下:

echo $_SESSION['blogdomain'];   //打印出blog.jb51.net，使用会话前必须先使用session_start()函数启动一个会话
注销Session变量/销毁会话：
复制代码 代码如下:

unset($_SESSION);  //销毁单个会话变量
如：unset($_SESSION['blogdomain']);
#unset($_SESSION)这个函数会将全局变量$_SESSION销毁，而且还没有可行的办法将其恢复。用户也不再可以注册$_SESSION变量，所以此函数千万不可使用。
session_unset(); //多项释放。将所有登陆在session文件里的变量释放出来
#在session生命周期，从当前session中注销全部session数据，让$_SESSION成为一个空数组。它与 unset($_SESSION)的区别在于:unset直接删除$_SESSION变量，释放内存资源;另一个区别在 于，session_unset()仅在session生命周期能够操作$_SESSION数组，而unset()则在整个页面(page)生命周期都能 操作$_SESSION数组。session_unset()同样不进行任何IO操作，只影响$_SESSION数组。
$_SESSION=array();  //多项释放，释放所有登录在$_SESSION参数里的变量
session_destroy();
#当使用完一个会话后，首先应该注销所有的变量，然后再调用该函数结束当前的会话,并清空会话中的所有资源，删除服务器上的session文件.该函数不会unset(释放)和当前session相关的全局变量,也不会删除客户端的session cookie
#如果说session_start()初始化一个session的话，而它则注销一个session。意味着session生命周期结束了。在 session生命周期结整后， session_unset, $_SESSION['domain'] 都将不能操作$_SESSION数组，而$_SESSION数组依然可以被unset()等函数操作。这时，session意味着是未定义的， 而$_SESSION依然是一个全局变量，他们脱离了关映射关系。
通过session_destroy()注销session,除了结束session生命周期外，它还会删除sesion文件，但不会影响当前$_SESSION变量。即它会产生一个IO操作。

备注：
1、php默认的session是基于cookie的,如果要删除cookie的话，必须借助setcookie()函数
2、session_unset()和unset()函数区别：
在session生命周期，session_unset()从当前session中注销全部session数据，让$_SESSION成为一个空数 组。它与unset($_SESSION)的区别在于：unset直接删除$_SESSION变量，释放内存资源；另一个区别在 于，session_unset()仅在session生命周期能够操作$_SESSION数组，而unset()则在整个页面(page)生命周期都能 操作$_SESSION数组。session_unset()同样不进行任何IO操作，只影响$_SESSION数组。
Session生命周期(session lifetime)：Session失效时间与过期回收机制
我们把初始化session开始，直到注销session这段期间，称为session生命周期
默认的，php会将session保存在php.ini配置中session.save_path设定的目录下，文件名为这个样 子：sess_ves0d7uvdsab9k6sig73mnn592。每一个文件对应了一个session（会话）。session文件格式大致如下：
复制代码 代码如下:

poll_200|i:1;poll_100|i:3;   //#变量名|类型:长度:值
设置SESSION的生命周期：
php session是基于cookie的，所以要设置session的生命周期，首先要设置cookie的失效时间。因为在客户端（如浏览器）登录网站 时，SESSION 是否有用，首先找客户端是否有 COOKIE，通过COOKIE 中的 SESSION ID 去找服务器上的文件。

复制代码 代码如下:

session_start();
$lifeTime = 24 * 3600; // 保存一天
setcookie(session_name(), session_id(), time() + $lifeTime, "/");
其实PHP5 Session还提供了一个函数 session_set_cookie_params(); 来设置PHP5 Session的生存期的，该函数必须在 session_start() 函数调用之前调用：

复制代码 代码如下:

$lifeTime = 24 * 3600; // 保存一天
session_set_cookie_params($lifeTime);
session_start();
在服务器端，php如何判断session文件是否过期？

复制代码 代码如下:

session.gc_maxlifetime = 1440 （初始值）
#设置session存活时间，单位是秒。每次GC启动后, 会通过stat得到session文件最后访问的unix时间,通过现在时间减去文件最后访问时间之间大于session.gc_maxlifetime,则会删除该文件。
如果"最后的修改时间"到"现在"超过了session.gc_maxlifetime（默认是1440）秒，也就是说在这里设置的时间内，该文件 没有被修改过，这个session文件就被认为是过期了，由于php5的session采用被动的回收机制，过期的session文件不会自己消失，而是 通过触发“回收”来处理过期的session，那么在下一次session回收的时候，如果这个文件仍然没有被更改过，这个session文件就会被删除 （session就过期了）。
session回收何时发生？
默认情况下，每一次php请求，就会有1%的概率发生回收，所以可能简单的理解为“每100次php请求就可能有一次回收概率发生”。这个概率是通过以下参数控制的：
复制代码 代码如下:

session.gc_probability = 1 （初始值）
session.gc_divisor = 100 （初始值）
#由这二个函数决定了启用GC的概率，默认是1/1000。也就是说,每一千次用户请求中有一次会启动GC回收session。启动GC进程不宜过于频 繁。过于频繁访问的网站，并发量大的网站，可减小PHP GC的启动频率。PHP GC回收session会降低php的执行效率。
这两个合起来就是启动Gabadge Collection(gc)进程管理概率的，在session初使化时(session_start())。Gabadge Collection启动后跟踪session信息文件。其启动概率为 session.gc_probability/session.gc_divisor。也就是说不是每个session信息文件都有100%的被系统当 作垃圾来处理的。如果直接关闭浏览器的话，session信息文件很多情况下都是留在了服务器上，如果把概率改成了100%，虽然Gabadge Collection百分之百被启动了，但是这会对服务器添加负荷，也就失去了GC本身的意义了。
补充说明：
1、假设这种情况session.gc_maxlifetime=1440，如果某个session文件最后修改时间是1440秒之前，那么在下一次回收（1/100的概率）发生前，这个session仍然是有效的；
2、如果你的session使用session.save_path中使用别的地方保存session，session回收机制有可能不会自动处理 过期session文件。这时需要定时手动（或者crontab）的删除过期的session：cd /path/to/sessions; find -cmin +24 | xargs rm；
3、注意，当服务器端session文件数量没有得到有效的回收，逐渐增长到GB或更大级别时可能你的站点在存取session时就会越来越缓慢，多见于站点登入登出会受到影响；
4、写日志、周报、月报等时候我们最后提交的关头，有时会出现”无效的操作，请登陆后重试”等消息，其原因也不言而喻，可能就是session失效，gc清除那些已经“超时”的session文件。
一些特殊情况：
因为回收机制会检查文件的“最后修改时间”，所以如果某个会话是活跃的，但是session的内容没有改变过，那么对应的session文件也就没 有改变过，回收机制会认为这是一个长时间没有活跃的session而将其删除。这是我们不愿看到的，可以通过增加如下的简单代码解决这个问题：

复制代码 代码如下:

<?php
if(!isset($_SESSION['last_access'])||(time()-$_SESSION['last_access'])>120)
  $_SESSION['last_access'] = time();
?>   //代码会每隔120秒，尝试修改修改一次session
了解cookie与session之间的区别与联系
相同点：都可以在解决HTTP无状态的问题,使同一个客户端在访问网站的多次请求中,可以保存,设置信息,并且在请求事物之间建立联系。
不同点：简单的说cookie的信息保存在客户端，session的信息保存在服务器端。
Session采用键值对,也就是说ID存放客户端,而值放在服务器端,是通过用户的ID去找服务器上对应的值,这种方式值放置在服务器端,有个时间限制,时间到则服务器自动回收/释放。
Cookies则有两种方法,一种方法是把值保存在浏览器的变量中,当浏览器关闭时结束,另一种方法是保存在硬盘中,只要时间不过期,下次还可使用。
联系：当客户端使用基于Cookie方式保存的SessionID时,SessionID一般保存在cookie中。
备注：cookie在相同内核的浏览器之间是共享的，不同内核浏览器是不共享的例如火狐和IE（存放位置都不同，当然不共享）。不同内核浏览器不能共享cookie，也会产生不同sessionid。
问题1：禁用cookie后session为什么会失效？
首先说明一点：session不一定必须依赖cookie，只是php默认客户端sessionid基于cookie方式保存。
到此，我想你也应该了解了php默认的session客户端保存方式是基于cookie的，所以一旦客户端禁用Cookie，那么session跨 页将会失效，不知道这么描述是否合适，通俗的说无状态的东西要变的有状态，只能两边都进行比对，如果用cookie方式保存的SessionID，客户端 这边的比对条件就放到cookie里，所以客户端禁用cookie，session便也会随之失效。php的session客户端ID一般有两种保存方 式：cookie和url方式。如果是cookie中保存session ID，就可以看到浏览器的cookie中有一个PHPSESID变量(可以通过firefox查看)。如果是URL传递的(建议使用隐藏表单传递)，就可 以看到形如:index.php?PHPSESID=ves0d7uvdsab9k6sig73mnn592的URL。例如：

复制代码 代码如下:

demo1.php
<?php
session_start();
$_SESSION['blog']='http://blog.jb51.net';
echo "<a href='demo2.php'>test2</a>";
?>
demo2.php
<?php
session_start();
echo 'session值为'.$_SESSION['blog'];
?>

运行上面的代码，在客户端cookie正常情况下，我么可以在demo2.php中打印出$_SESSION['blog']的值 为：http://blog.jb51.net。但是，现在如果你手动禁用客户端的cookie，再运行该实例，可能就得不到结果了。因为默认的客户端 sessionid保存方式在跨页后，读取不到前一页的sessionid，当执行session_start();将又会产生一个session文件， 与之对应产生相应的session id，用这个session id是取不出前面提到的第一个session文件中的变量的，因为这个session id不是打开它的“钥匙”。如果在session_start();之前加代码session_id($sessionid);将不产生新的 session文件，直接读取与这个id对应的session文件。简单的说就是在前一页取得session id，然后想办法传递到下一页，在下一页的session_start();代码之前加代码session_id(传过来的sessionid); 例如：

复制代码 代码如下:

demo.php
<?php
$sid = $_GET['sid'];
if(!empty($sid)){
  session_id($sid);
  session_start();
}else{
  session_start();
  $sid = session_id();
}
?>
<form action="demo2.php?sid=<?php echo $sid ?>" method="post">
<input type="text" name="id" value="100" />
<input type="submit" value="提交"/>
</form>
demo2.php
<?php
$sid = $_GET['sid'];
if(!empty($sid)){
  session_id($sid);
  session_start();
}else{
  session_start();
  $sid = session_id();
}
$id = $_POST['id'];
$key = 'poll_'.$id;
if($id!=''){
  echo $key = 'poll'.$id;
  if(!empty($_SESSION[$key])){
    $_SESSION[$key]=$_SESSION[$key] + 1;
  }else{
    $_SESSION[$key]=1;
    setcookie($key ,$id+1,time()+3600*24);
  }
  echo '<script>alert("success");javascript:location.href="demo.php?sid='.$sid.'";</script>';
}else{
  echo '<script>alert("failed！ID Null");javascript:history.back(-1);</script>';
}
?>

除此之外，我们还可以将客户端PHPSESID存放到文件中，如：

复制代码 代码如下:

demo.php
session_start();
$_SESSION['blogdomain']= 'http://blog.jb51.net';
$sid=session_id();
$fp=fopen("D:\tmp\websid.txt","w+");
fwrite($fp,$sid);
fclose($fp);
echo '<a href="demo2.php">demo2</a>';
demo2.php
$fp=fopen("D:\tmp\websid.txt","r");
$sid=fread($fp,1024);
fclose($fp);
session_id($sid);
session_start();
print_r($_SESSION);

当客户端禁用cookie，可以通过以下几种方式改变session对客户端cookie的依赖，使session抛开客户端cookie：
1、设置php.ini中的session.use_trans_sid = 1或者编译时打开打开了--enable-trans-sid选项，让PHP自动跨页传递session id。当session.use_trans_sid为有效时，ession.use_only_cookies一定要设置为无效0。
2、手动通过URL传值、隐藏表单传递session id。
3、用文件、数据库等形式保存session_id,在跨页过程中手动调用。
PHP也提供一个函数：

复制代码 代码如下:

output_add_rewrite_var  ( string $name , string $value ) # 变量名 变量值
说明：此函数给URL重写机制添加名/值对。 这种名值对将被添加到URL（以GET参数的形式）和表单（以input隐藏域的形式），当透明URL重写用 session.use_trans_sid 开启时同样可以添加到session ID。 要注意，绝对URL(http://jb51.net/..)不能被重写。此函数的行为由url_rewriter.tags php.ini 参数控制。
复制代码 代码如下:

<?
session_start();
output_add_rewrite_var('PHPSESSID',session_id ());
echo '<a href="demo2.php">demo</a>';
?>
这样sessionID会跟在URL后面而且from中会出现sessionID的hidden值。
改变session客户端ID保存方式：
session.use_cookies //控制客户端保存SessionID时使用哪一种方式，当它为“1”时，就说明启动了session cookie（初始值为1）
可以使用上面我们提到的函数来查询得到目前的session id：echo $_COOKIE["PHPSESSID"];
但是，如果client的浏览器不支持cookie的话，即使session.use_cookies这个参数的值等于“1”，用上述的查询也只会得到null。
php.ini中两个和该选项相关的配置参数：

复制代码 代码如下:

session.use_cookies = 1  //是否使用cookies(默认值为1)
session.use_only_cookies=1  //为1时只使用cookie；为0时可使用cookie和其它方式，这时如果客户端cookie可用，则session还是默认用cookie(默认值为1)
注意：如果客户的浏览器是支持cookie的，强烈推荐“session.use_only_cookies = 1”，当session.use_only_cookies为有效时，即使想通过URL来传递session id也会被认为无效，这样可以减少通过sessionid被攻击的可能性。上面两个配置，在php代码页面中设置方式：

复制代码 代码如下:

ini_set('session.use_cookies','1');
ini_set('session.use_only_cookies','1');
IE下丢失session，每次刷新页面，都会生成新的sessionID（Firefox浏览器都正常）
如果你的服务器或站点出现这种问题，请正确配置session.cookie_path网站域，如果配置错误可能会引起以下常见故障：
（1）客户端的每个PHPSESSID在服务器端都会一对一的对应生成一个独立的session记录存储在服务器端，故服务器端session文件冗余将会增多（GC回收机制异常时、站点访问量较大时）
（2）使用session记录相关信息的站点可能在除Firefox(Chrome未测试)之外的浏览器下访问出现问题，例如：购物车无法记录选购项目、站点登录失败等
复制代码 代码如下:

session.cookie_path 是指 session 生效的网站域;
session.save_path 是指存储 session 临时文件的路径。
例如：session.cookie_path= /        //cookie的有效路径
补充：如果所有浏览器访问刷新产生新sessionID，请检查客户端是否禁用了cookie。
session简单实例
使用session防止表单重复提交：

复制代码 代码如下:

<?php
session_start();
$_SESSION["num"] = 0;
if(isset($_POST["action"] && $_POST["action"]=="post")){
if($_SESSION["num"] == 0){
    echo "提交成功！";
   $_SESSION["num"] = 1;
}else{
   echo "请勿重复提交！";
}
}
?>
使用session方式的登录验证实例代码：

复制代码 代码如下:

<?php
session_start();//启动session，必须放在第一句，否则会出错。
if($_GET['out']){
unset($_SESSION['id']);
unset($_SESSION['pass']);
}
if($_POST['name']&&$_POST['password']){
<span style="font-family: 微软雅黑;"><span style="font-size: 16px;line-height:2.5em;">//用于设置session</span></span>
$_SESSION['id']=$_POST['name'];
$_SESSION['pass']=$_POST['password'];
}
if($_SESSION['id']&&$_SESSION['pass']){
echo "登录成功！
用户ID：".$_SESSION['id']."<br />用户密码：".$_SESSION['pass'];
echo "<br />";
echo "<a href='login.php?out=out'>注销session</a>";
}
 
?>
<form action="login.php" method="post">
用户ID：<input type="text" name="name" />
密码：<input type="password" name="password" />
<br />
<input type="submit" name="submit">
</form>
使用cookie方式的登录验证实例代码：

复制代码 代码如下:

if($_GET['out']){ //用于注销cookies
setcookie('id',"");
setcookie('pass',"");
echo "<script>location.href='login.php'</script>"; //因为cookies不是及时生效的，只有你再次刷新时才生效，所以，注销后让页面自动刷新。
}
if($_POST['name']&&$_POST['password']) //如果变量用户名和密码存在时，在下面设置cookies
{ //用于设置cookies
setcookie('id',$_POST['name'],time()+3600);
setcookie('pass',$_POST['password'],time()+3600);
echo "<script>location.href='login.php'</script>"; //让cookies及时生效
}
if($_COOKIE['id']&&$_COOKIE['pass']){ //cookies设置成功后，用于显示cookies
echo "登录成功！<br />用户名：".$_COOKIE['id']."
密码：".$_COOKIE['pass'];
echo "<br />";
echo "<a href='login.php?out=out'>注销cookies</a>";
}
?>
<form action="" method="post">
用户ID：<input type="text" name="name" />
密 码：<input type="password" name="password" />
<br />
<input type="submit" name="submit">
</form>

使用session随机码验证投票合法性：
复制代码 代码如下:

list.php 选项页面
session_start();
$tokenKey = md5(rand(1,100));
$_SESSION['tokenKey'] = $tokenKey;
注意：在传值时同时传入随机码$tokenKey
vote.php  投票动作执行页面
$tokenKey = $_SESSION['tokenKey'];
if($_POST['tokenKey'] !=  $tokenKey){     //判断随机码是否和上一页相同
  echo "<script>alert('请重新投票！');location.href='list.php';</script>";   //随机码无效
  exit;
}else{
  执行投票操作;
  清空session存储的随机码
}

