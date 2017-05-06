# vertical-align
http://snowcoal.com/SCBee/0w50.html

## 用法
vertical-align用于垂直inline元素（display=inline/inline-block）
```
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
//vertical-align的百分比值不是相对于字体大小或者其他什么属性计算的，而是相对于line-height计算的

/* 全局值 */
vertical-align: inherit;
vertical-align: initial;
vertical-align: unset;

```
## 边界，baseline
行高，文字上下边界，baseline

### inline-block的baseline
1. 正常流中
baseline就是最后一个作为内容存在的元素的baseline，这个元素的baseline的确定就要根据他自身来确定了。
2. overflow不等于visible
baseline是margin-box的下边界
3. 没有内容但是内容区还有高度
baseline还是margin-box的下边界

### line-box
行的开头添加一个字母，比如'x'，这个字母的下边界默认就是baseline的位置


# x-height
http://www.zhangxinxu.com/wordpress/2015/06/about-letter-x-of-css/

1. 字母x的下边缘(线)就是基线baseline
2. "x-height"就是指的小写字母'x'的高度
3. vertical-align:middle指相对于字符x的中心位置对齐
4. ex是CSS中的一个相对单位，指的的是小写字母x的高度，即x-height
5. ex用处：不受字体字号影响的内联元素的垂直居中对齐效果
```
.icon-arrow {
    display: inline-block;
    width: 20px;
    height: 1ex;
    background: url(arrow.png) no-repeat center;
}
//http://www.zhangxinxu.com/study/201506/ex-vertical-align.html
```