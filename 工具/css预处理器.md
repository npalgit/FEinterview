区别：
http://efe.baidu.com/blog/revisiting-css-preprocessors/
http://www.w3cplus.com/css/css-preprocessor-sass-vs-less-stylus-2.html

stylus: http://www.zhangxinxu.com/wordpress/2012/06/stylus-nodejs-expressive-dynamic-robust-css/

# 历史
1. SASS2007年诞生，最早也是最成熟的CSS预处理器，拥有ruby社区的支持和compass这一最强大的css框架，目前受LESS影响，已经进化到了全面兼容CSS的SCSS。
2. LESS2009年出现，受SASS的影响较大，但又使用CSS的语法，让大部分开发者和设计师更容易上手，在ruby社区之外支持者远超过SASS，其缺点是比起SASS来，可编程功能不够，不过优点是简单和兼容CSS，反过来也影响了SASS演变到了SCSS的时代，著名的Twitter Bootstrap就是采用LESS做底层语言的。
3. Stylus，2010年产生，来自Node.js社区，主要用来给Node项目进行CSS预处理支持，在此社区之内有一定支持者，在广泛的意义上人气还完全不如SASS和LESS。

# sass 编译风格

* nested：嵌套缩进的css代码，它是默认值。
* expanded：没有缩进的、扩展的css代码。
* compact：简洁格式的css代码。
* compressed：压缩后的css代码。

```css
1. :nested
#main {
  color: #fff;
  background-color: #000; }
  #main p {
    width: 10em; }

.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline; }


2. :expanded
#main {
  color: #fff;
  background-color: #000;
}
#main p {
  width: 10em;
}

.huge {
  font-size: 10em;
  font-weight: bold;
  text-decoration: underline;
}

3. :compact
#main { color: #fff; background-color: #000; }
#main p { width: 10em; }

.huge { font-size: 10em; font-weight: bold; text-decoration: underline; }

4. :compressed
#main{color:#fff;background-color:#000}#main p{width:10em}.huge{font-size:10em;font-weight:bold;text-decoration:underline}
```

# 区别

## 基本语法
```css
Less & SCSS：

.box {
  display: block;
}

Sass：

.box
  display: block

Stylus：

.box
  display: block
```

## 嵌套
&引用父选择器

## 选择器引用
less会对选择器进行排列组合，而 Sass 和 Stylus 不会这么做

## 变量
```css
//Less：

@red: #c00;

strong {
  color: @red;
}

//Sass：

$red: #c00;

strong {
  color: $red;
}

//Stylus：

red = #c00

strong
  color: red
```

1. 变量作用域
Sass 的处理方式和 Stylus 相同，变量值输出时根据之前最近的一次定义计算。这其实代表了两种理念：Less 更倾向接近 CSS 的声明式，计算过程弱化调用时机；而 Sass 和 Stylus 更倾向于指令式。

## 插值
1. 变量名插值
2. 选择器插值
```css
Less：

@prefix: ui;
.@{prefix}-button {
  color: #333;
}

Sass：

$prefix: ui
.#{$prefix}-button
  color: #333;

Stylus：

prefix = ui
.{prefix}-button
  color #333
```

3. @import语句插值

4. 属性名插值

5. 其他插值

## @import

## 混入mixin
1. sass
```css
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}

Sass 用 @mixin 和 @include 两个指令清楚地描述了语义，不存在混入类样式的情况，但是书写时略显繁琐一些。当然，用 Sass 语法 而非 SCSS 语法的话可以简单地用 = 定义 mixin，用 + 引入 mixin：

=large-text
  font:
    family: Arial
    size: 20px
    weight: bold
  color: #ff0000

.page-title
  +large-text
  padding: 4px
  margin-top: 10px
```

2. stylus

```css
border-radius(n)
  -webkit-border-radius: n
  -moz-border-radius: n
  border-radius: n

.circle
  border-radius(50%)

Stylus 中还有一个「透明 mixin」的功能，也就是说引入 mixin 完全可以和引入普通属性一样！例如上面的这个 mixin，也可以这样引入：

.circle
  border-radius: 50%
```

## 继承
```css
.message
  padding: 10px
  border: 1px solid #eee

.warning
  @extend .message
  color: #e2e21e

输出是：

.message,
.warning {
  padding: 10px;
  border: 1px solid #eee;
}
.warning {
  color: #e2e21e;
}
```

## 函数
1. Sass 中自定义函数需要使用 @function 指令，并用 @return 指令返回结果：

```css
@function golden-ratio($n) {
  @return $n * 0.618;
}

.golden-box {
  width: 200px;
  height: golden-ratio(200px);
}
```

2. 在 Stylus 中，这些都是隐含的，最后一个表达式的值会作为返回值：
```css
golden-ratio(n)
  n * 0.618

.golden-box
  width: 200px
  height: golden-ratio(@width)
```

## 逻辑控制
@if @for