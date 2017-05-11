# Sass使用
### 1. sass-ruby
   sass使用ruby编写，必须先安装ruby再安装sass

**安装ruby，下载ruby installer for windows，记得next后勾选
   gem install sass**
### 2. 使用
1. sass test.scss屏幕显示css代码
2. sass test.scss dest.css保存为dest.css
3. sass --style compressed test.scss dest.css选择compressed编译风格

>     　　* nested：嵌套缩进的css代码，它是默认值。
> 
>     　　* expanded：没有缩进的、扩展的css代码。
> 
>     　　* compact：简洁格式的css代码。
> 
>     　　* compressed：压缩后的css代码。

4. sass --watch test.scss:out.css监听文件
5. sass --watch app/sass:public/style监听目录
# 语法
1. 变量$开头，$blue : #173
   使用变量要嵌套在字符串中，写在**#{}**中，border-#{$side}-radius: 5px;
2. 计算
```css
　　body {
　　　　margin: (14px/2);
　　　　top: 50px + 100px;
　　　　right: $var * 10%;
　　}
```
3. 嵌套
使用 & 引用父元素
```css
//比如a:hover伪类
　　a {
　　　　&:hover { color: #ffb3ff; }
　　}
```
4. 注释
   1. 标准的CSS注释 /* comment */ ，会保留到编译后的文件。

   2. 单行注释 // comment，只保留在SASS源文件中，编译后被省略。

   3. 在/*后面加一个感叹号!，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息
5. 代码重用
   1. 继承：@extend
```css
　　.class2 {
　　　　@extend .class1;
　　　　font-size:120%;
　　}
```
   2. 重用代码块minxin
```css
　　@mixin left {
　　　　float: left;
　　　　margin-left: 10px;
　　}

　　div {
　　　　@include left;
　　}
```

**可以指定参数和缺省值**

```css
//用来生成浏览器前缀
　　@mixin rounded($vert, $horz, $radius: 10px) {
　　　　border-#{$vert}-#{$horz}-radius: $radius;
　　　　-moz-border-radius-#{$vert}#{$horz}: $radius;
　　　　-webkit-border-#{$vert}-#{$horz}-radius: $radius;
　　}


 　 #navbar li { @include rounded(top, left); }

   #footer { @include rounded(top, left, 5px); }
```
   3. 颜色函数?
   4. 插入文件
```css
   @import "path/filename.scss";
```

----------

## 高级用法
1. 条件 @if @else
```css
　　@if lightness($color) > 30% {
　　　　background-color: #000;
　　} @else {
　　　　background-color: #fff;
　　}
```
2. 循环 @for @while @each in
SASS支持for循环：
```css
    　　@for $i from 1 to 10 {
    　　　　.border-#{$i} {
    　　　　　　border: #{$i}px solid blue;
    　　　　}
    　　}
```
也支持while循环：
```css
    　　$i: 6;

    　　@while $i > 0 {
    　　　　.item-#{$i} { width: 2em * $i; }
    　　　　$i: $i - 2;
    　　}
```
each命令，作用与for类似：
```css
    　　@each $member in a, b, c, d {
    　　　　.#{$member} {
    　　　　　　background-image: url("/image/#{$member}.jpg");
    　　　　}
    　　}
```
3. 自定义 @function
```css
    　　@function double($n) {
    　　　　@return $n * 2;
    　　}

    　　#sidebar {
    　　　　width: double(5px);
    　　}
```
http://www.ruanyifeng.com/blog/2012/06/sass.html?20131101171639

# Sass 和 Scss 有什么区别？

Scss 是 Sass 3 引入新的语法，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 SCSS 文件。
Sass 和 Scss 其实是同一种东西，我们平时都称之为 Sass，两者之间不同之处有以下两点：

1. 文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 Scss 是以“.scss”后缀为扩展名
2. 语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 SCSS 的语法书写和我们的 CSS 语法书写方式非常类似。

Sass 语法
```css
    $font-stack: Helvetica, sans-serif  //定义变量
    $primary-color: #333 //定义变量

    body
      font: 100% $font-stack
      color: $primary-color
```
SCSS 语法
```css
    $font-stack: Helvetica, sans-serif;
    $primary-color: #333;

    body {
      font: 100% $font-stack;
      color: $primary-color;
    }
```
最后，推荐.scss





