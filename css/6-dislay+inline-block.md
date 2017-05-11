# display 
Formal syntax: none | inline | block | list-item | inline-list-item | inline-block | inline-table | table | table-cell | table-column | table-column-group | table-footer-group | table-header-group | table-row | table-row-group | flex | inline-flex | grid | inline-grid | run-in | ruby | ruby-base | ruby-text | ruby-base-container | ruby-text-container | contents

# block
1. 独占一行，宽度自动填充父元素宽度
2. 设置width,height
3. 设置margin,padding
块级元素只能出现在 body 元素内。
**display:block,list-item,table将元素变成块级元素**
```html
<div>, <p>, <h1-h6>, 
<form>, 
<ul>,<li>,<ol>,<dl>,<dd>
<table>
<header> <article><aside><section><footer>
<video><audio><canvas>
```

# inline
1. 不会独占一行，多个相邻的行内元素会排在同一行，直到排不下换行
2. width,height无效， 宽度随内容变化
3. margin,padding水平方向有效，竖直方向有效
```html
<span><a><input><label>
<br><i><em><string>

b, big, i, small, tt
abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var
a, bdo, br, img, map, object, q, script, span, sub, sup
button, input, label, select, textarea
```

# inline-block
1. 对象为inline，对象的内容为block
2. 具有block的宽度高度特性，又具有inline的同行特性。

>推荐阅读：inline-block的前世今生http://blog.sina.com.cn/s/blog_877284510101bp1c.html

>inline-block的未来http://www.iyunlu.com/view/css-xhtml/79.html
```html
<img>
<button>
<input>
```
>This value causes an element to generate an inline-level block container. The inside of an inline-block is formatted as a block box, and the element itself is formatted as an atomic inline-level box.

大致意思就是：inline-block 后的元素创建了一个行级的块容器，该元素内部（内容）被格式化成一个块元素，同时元素本身则被格式化成一个行内元素。

直白一点的意思就是：inline-block 的元素既具有 block 元素可以设置宽高的特性，同时又具有 inline 元素默认不换行的特性。当然不仅仅是这些特性，比如 inline-block 元素也可以设置 vertical-align 属性。简而言之：
**inline-block 后的元素就是一个格式化为行内元素的块容器( Block container )**

IE6、IE7对inline-block的支持
```css
display:inline-block;
*display:inline;
*zoom:1;
/*
inline元素需要触发haslayout(display:inline-block或者zoom:1)
block元素需要先转化为inline,然后触发haslayout
*/
```


# inline–block的bug
nline-block水平呈现的元素间，换行显示或空格分隔的情况下会有间距
## 原因：
标签段之间的空格, 即浏览器对HTML中存在的空白符（whitespace）的处理
0. 使用css level4
```css
ul{ 
    white-space-collapse:discard; //抛弃所有空白。
}
li{ 
    display: inline-block;
}
```

| white-space取值   | white-space-collapsing取值   | text-wrap|换行| 空白和制表符 | 文字换行 | 
|:--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
|normal	|collapse|	normal|	折叠|	折叠|	换行|
|pre	|preserve|	none|	保留|	保留|	不换行|
|nowrap	|collapse|	none|	折叠|	折叠|	不换行|
|pre-wrap|	preserve|	normal|	保留|	保留|	换行|
|pre-line|	preserve-breaks|	normal|	保留|	折叠	|换行|

其中，white-space-collapsing 专门用来控制元素中的空白如何折叠，取值如下：

「collapse」该值要求用户代理将一系列空白折叠为一个单独的字符（或者在某些情况下，没有字符）。

「preserve」该值阻止用户代理折叠空白，换行符保留为强制换行符。

「preserve-breaks」该值将与「collapse」一样折叠空白字符，但保留换行符为强制换行符。

「discard」该值要求用户代理”丢弃（discard）”元素中的所有空白符。

「trim-inner」对于块容器，该值要求用户代理丢弃所有在元素开始处的空白符，直到并包含在第一个非空白字符之前的最后一个换行符；同时丢弃在元素结尾处的所有空白符，其从最后一个非空白字符之后的第一个换行符开始。

「consume-before」该值要求用户代理折叠紧邻元素开始（位置）之前的所有可折叠空白符。

「consume-after」该值要求用户代理折叠紧邻元素开始（位置）之后的所有可折叠空白符。


1. 去掉空格
```html
<div class="space">
    <a href="##">惆怅</a><!--
    --><a href="##">淡定</a><!--
    --><a href="##">热血</a>
</div>
```
2. margin负值
对于12像素大小的上下文，Arial字体的margin负值为-3像素

3. 让闭合标签吃胶囊
```html
<div class="space">
    <a href="##">惆怅
    <a href="##">淡定
    <a href="##">热血</a>
</div>
```
4. 使用font-size:0
父元素设置「font-size:0」，那么所有子元素必须重置一遍，带来严重的耦合问题。
```css
.space {
    font-size: 0;
    -webkit-text-size-adjust:none;//Chrome, 其默认有最小字体大小限制
}
```
5. letter-spacing字符间距
```
.space {
    letter-spacing: -3px;
}
.space a {
    letter-spacing: 0;
}
```
6. word-spacing单词间距
```
.space {
    word-spacing: -6px;
}
.space a {
    word-spacing: 0;
}
```