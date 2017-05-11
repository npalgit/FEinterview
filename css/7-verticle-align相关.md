# vertical-align
http://snowcoal.com/SCBee/0w50.html

## 用法
vertical-align用于垂直inline元素（display=inline/inline-block）
```css
/* 关键字值 */
vertical-align: baseline;
vertical-align: sub;
vertical-align: super;
vertical-align: text-top;
vertical-align: text-bottom;
vertical-align: middle;
vertical-align: top;
vertical-align: bottom;

/* <长度> 值 */
vertical-align: 10em;
vertical-align: 4px;

/* <百分比> 值 */
vertical-align: 10%;
//vertical-align的百分比值不是相对于字体大小或者其他什么属性计算的，而是相对于line-height行高计算的

/* 全局值 */
vertical-align: inherit;
vertical-align: initial;
vertical-align: unset;

```
## 边界，baseline
行高，文字上下边界，baseline

### inline-block的baseline
1. 正常流中
baseline就是**最后一个**作为内容存在的元素的baseline，这个元素的baseline的确定就要根据他自身来确定了。
2. overflow不等于visible
baseline是margin-box的下边界
3. 没有内容但是内容区还有高度
baseline还是margin-box的下边界

### line-box
行的开头添加一个字母，比如'x'，这个字母的下边界默认就是baseline的位置

# line-height
两行baseline之间距离
```html
normal
    告诉用户代理根据该元素的字体把应用值设置为一个“合理的”值。该值与<number>的含义相同。我们推荐介于1.0到1.2的“常规”应用值。计算值为'normal' 
<length>
    指定的长度用来计算行盒的高度。负值是非法的 
<number>
    该属性的应用值为这个数字乘以该元素的字体大小。负值是非法的。计算值与指定值相同 
<percentage>
    该属性的计算值为这个百分比乘以该元素的字体大小的计算值。负值是非法的 

下例的这3条规则会产生相同的行高：

div { line-height: 1.2; font-size: 10pt }     /* number */
div { line-height: 1.2em; font-size: 10pt }   /* length */
div { line-height: 120%; font-size: 10pt }    /* percentage */

```


# line box内盒子摆放
https://github.com/webzhao/fe-camp/blob/master/slides/section-3/img/line-box.svg

# x-height
http://www.zhangxinxu.com/wordpress/2015/06/about-letter-x-of-css/

1. 字母x的下边缘(线)就是基线baseline
2. "x-height"就是指的小写字母'x'的高度
3. vertical-align:middle指相对于字符x的中心位置对齐
4. ex是CSS中的一个相对单位，指的的是小写字母x的高度，即x-height
5. ex用处：不受字体字号影响的内联元素的垂直居中对齐效果
```css
.icon-arrow {
    display: inline-block;
    width: 20px;
    height: 1ex;
    background: url(arrow.png) no-repeat center;
}
//http://www.zhangxinxu.com/study/201506/ex-vertical-align.html
```

