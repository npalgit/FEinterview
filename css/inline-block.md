inline–block的bug
nline-block水平呈现的元素间，换行显示或空格分隔的情况下会有间距
原因：标签段之间的空格
1. 去掉空格
```
<div class="space">
    <a href="##">惆怅</a><!--
    --><a href="##">淡定</a><!--
    --><a href="##">热血</a>
</div>
```
2. margin负值
对于12像素大小的上下文，Arial字体的margin负值为-3像素

3. 让闭合标签吃胶囊
```
<div class="space">
    <a href="##">惆怅
    <a href="##">淡定
    <a href="##">热血</a>
</div>
```
4. 使用font-size:0
```
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