# Zepto tap事件
zepto的tap通过兼听绑定在document上的touch事件来完成tap事件的模拟的,及tap事件是冒泡到document上触发的

再点击完成时的tap事件(touchstart\touchend)需要冒泡到document上才会触发，而在冒泡到document之前，用户手的接触屏幕(touchstart)和离开屏幕(touchend)是会触发click事件的,因为click事件有延迟触发(这就是为什么移动端不用click而用tap的原因)(大概是300ms,为了实现safari的双击事件的设计)，所以在执行完tap事件之后，弹出来的选择组件马上就隐藏了，此时click事件还在延迟的300ms之中，当300ms到来的时候，click到的其实不是完成而是隐藏之后的下方的元素，如果正下方的元素绑定的有click事件此时便会触发，如果没有绑定click事件的话就当没click，但是正下方的是input输入框(或者select选择框或者单选复选框)，点击默认聚焦而弹出输入键盘，也就出现了上面的点透现象。

一：click与tap比较

click与tap都会触发点击事件，但是在手机web端，click会有200-300ms的延迟，所以一般用tap代替click作为点击事件。singleTap 和doubleTap分别代表单次点击和双次点击

二：tap的穿透处理

使用zepto框架的tap的点击事件，来规避click事件的延迟响应，会出现穿透，即点击会触发**非当前层**的点击事件。

三：穿透原因

问题：在html5点击了q以后，弹出b的弹框

因为tap事件是通过document绑定了touchstart和touchend事件实现，$('.q')上，当touchend事件冒泡到document上以后执行$(this).hide();此时$('.b'),就处在了页面的最前面

现在touchend冒泡到了document上，并且$('.b')在页面的最前面，然后就触发了click事件

四：解决穿透问题

1.github上有一个叫做fastclick的库，它能规避移动设备上click事件的延迟响应https://github.com/ftlabs/fastclick将它用script标签引入页面(该库支持AMD，可按照AMD规范，用require.js的模块加载器引入)，并且在dom  ready时初始化在body上，如：

$(function(){

new FastClick(document.body);

})

然后给需要“无延迟点击”的元素绑定click事件（注意不再是绑定zepto的tap事件）即可。

也可以不在body上初始化它，而在某个dom上初始化，这样，只有设个dom和它的子元素才能享受"无延迟"的点击

实践开发中，当元素绑定fastclick后，click响应速度比tap还要快一点。

2.为元素绑定touchend事件，并在内部加上e.preventDefault();

$demo.on('touchend',function(e){

//改变了事件名称，tap是body上才被触发，而touchend是原生的事件，在dom本身上就会被捕获触发

$demo.hide();

e.preventDefault();//阻止“默认行为”

});

五：touch事件

touch是针对触屏手机上的触摸事件。现金大多数触屏手机webkit内核提供了touch事件的监听

包含：touchstart touchmove touchend touchcancel四个事件

touchstart touchmove touchend事件可以类比于mousedown mouseover mouseup的触发

# jQuery与Zepto的异同

一,同：

　　Zepto最初是为移动端开发的库，是jQuery的轻量级替代品，因为它的API和jQuery相似，而文件更小。Zepto最大的优势是它的文件大小，只有8k多，是目前功能完备的库中最小的一个，尽管不大，Zepto所提供的工具足以满足开发程序的需要。大多数在jQuery中·常用的API和方法Zepto都有，Zepto中还有一些jQuery中没有的。另外，因为Zepto的API大部分都能和jQuery兼容，所以用起来极其容易，如果熟悉jQuery，就能很容易掌握Zepto。你可用同样的方式重用jQuery中的很多方法，也可以方面地把方法串在一起得到更简洁的代码，甚至不用看它的文档。

二,异：

　　1,针对移动端程序，Zepto有一些基本的触摸事件可以用来做触摸屏交互（tap事件、swipe事件），Zepto是不支持IE浏览器的，这不是Zepto的开发者Thomas Fucks在跨浏览器问题上犯了迷糊，而是经过了认真考虑后为了降低文件尺寸而做出的决定，就像jQuery的团队在2.0版中不再支持旧版的IE（6 7 8）一样。因为Zepto使用jQuery句法，所以它在文档中建议把jQuery作为IE上的后备库。那样程序仍能在IE中，而其他浏览器则能享受到Zepto在文件大小上的优势，然而它们两个的API不是完全兼容的，所以使用这种方法时一定要小心，并要做充分的测试。

　　2,Dom操作的区别：添加id时jQuery不会生效而Zepto会生效。

```javascript
(function($) {
     $(function() {
         var $insert = $('<p>jQuery 插入</p>', {
             id: 'insert-by-jquery'
         });
         $insert.appendTo($('body'));
     });
})(window.jQuery);   
// <p>jQuery 插入<p>

Zepto(function($) {  
    var $insert = $('<p>Zepto 插入</p>', {
        id: 'insert-by-zepto'
    });
    $insert.appendTo($('body'));
});
// <p id="insert-by-zepto">Zepto 插入</p>
```

　　3,事件触发的区别：使用 jQuery 时 load 事件的处理函数不会执行；使用 Zepto 时 load 事件的处理函数会执行。
复制代码

```javascript
(function($) {
    $(function() {    
        $script = $('<script />', {
            src: 'http://cdn.amazeui.org/amazeui/1.0.1/js/amazeui.js',
            id: 'ui-jquery'
        });

        $script.appendTo($('body'));

        $script.on('load', function() {
            console.log('jQ script loaded');
        });
    });
})(window.jQuery);

Zepto(function($) {  
    $script = $('<script />', {
        src: 'http://cdn.amazeui.org/amazeui/1.0.1/js/amazeui.js',
        id: 'ui-zepto'
    });

    $script.appendTo($('body'));

    $script.on('load', function() {
        console.log('zepto script loaded');
    });
});
```

　　4,事件委托的区别：

```javascript
var $doc = $(document);
$doc.on('click', '.a', function () {
    alert('a事件');
    $(this).removeClass('a').addClass('b');
});
$doc.on('click', '.b', function () {
    alert('b事件');
});
```

　　在Zepto中，当a被点击后，依次弹出了内容为”a事件“和”b事件“，说明虽然事件委托在.a上可是却也触发了.b上的委托。但是在 jQuery 中只会触发.a上面的委托弹出”a事件“。Zepto中，document上所有的click委托事件都依次放入到一个队列中，点击的时候先看当前元素是不是.a，符合则执行，然后查看是不是.b，符合则执行。而在jQuery中，document上委托了2个click事件，点击后通过选择符进行匹配，执行相应元素的委托事件。

　　5,width()和height()的区别：Zepto由盒模型(box-sizing)决定，用.width()返回赋值的width，用.css('width')返回加border等的结果；jQuery会忽略盒模型，始终返回内容区域的宽/高(不包含padding、border)。

　　6,offset()的区别：Zepto返回{top,left,width,height}；jQuery返回{width,height}。

　　7,Zepto无法获取隐藏元素宽高，jQuery 可以。

　　8,Zepto中没有为原型定义extend方法而jQuery有。

　　9,Zepto 的each 方法只能遍历 数组，不能遍历JSON对象。

　　10,Zepto在操作dom的selected和checked属性时尽量使用prop方法，在读取属性值的情况下优先于attr。Zepto获取select元素的选中option不能用类似jQuery的方法$('option[selected]'),因为selected属性不是css的标准属性。应该使用$('option').not(function(){ return !this.selected })。

**Zepto选择器**

 基本选择器

    ID选择器：$("#foo")。
    class选择器：$(".foo")。
    标签(元素)选择器：$("div")、$("p")。
    通用选择器：$("*")。

层级选择器

    后代选择器：$("foo bar")。
    子元素选择器：$("foo > bar")。
    相邻且靠后选择器：$("foo + bar")。
    同辈且靠后选择器：$("foo ~ bar")。

不支持的选择器

    基本伪类:first、:not(selector) 、:even 、:odd 、:eq(index) 、:gt(index) 、:lang1.9+ 、:last 、:lt(index) 、:header、:animated 、:focus1.6+ 、:root1.9+ 、:target1.9+。
    内容伪类：:contains(text) 、:empty、 :has(selector)、 :parent 。
    可见性伪类：:hidden 、:visible 。
    属性选择器：[attribute!=value]。
    表单伪类：:input、 :text、 :password、 :radio、 :checkbox、 :submit、 :image、 :reset、 :button、 :file、 :hidden 。
    表单对象属性：:selected。

