# BFC-Block formatting context

## 1.BFC是什么
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。
## 2.BFC布局规则 
1. 内部的Box会在垂直方向，一个接一个地放置。
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
3. 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
4. BFC的区域不会与float box重叠。
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
6. 计算BFC的高度时，浮动元素也参与计算

## 3.哪些元素会生成BFC
1. 根元素
2. float属性不为none
3. position为absolute或fixed
4. display为inline-block, table-cell, table-caption, flex, inline-flex
5. overflow不为visible

## 4. BFC的作用及原理
1. 自适应两栏布局

```
<style>
    body {
        width: 300px;
        position: relative;
    }
 
    .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: #f66;
    }
 
    .main {
        height: 200px;
        background: #fcc;
    }
</style>
<body>
    <div class="aside"></div>
    <div class="main"></div>
</body>
```

页面：
![这里写图片描述](http://img.blog.csdn.net/20170406145628660?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMjkzNzAyOQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
根据BFC布局规则第3条：
每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
因此，虽然存在浮动的元素aslide，但main的左边依然会与包含块的左边相接触。
根据BFC布局规则第四条：BFC的区域不会与float box重叠。
我们可以通过通过触发main生成BFC， 来实现自适应两栏布局
```
.main {
    overflow: hidden;
}
```
![这里写图片描述](http://img.blog.csdn.net/20170406145653929?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMjkzNzAyOQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
当触发main生成BFC后，这个新的BFC不会与浮动的aside重叠。因此会根据包含块的宽度，和aside的宽度，自动变窄。
　　
2. 清除内部浮动
```
<style>
    .par {
        border: 5px solid #fcc;
        width: 300px;
    }
 
    .child {
        border: 5px solid #f66;
        width:100px;
        height: 100px;
        float: left;
    }
</style>
<body>
    <div class="par">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</body>
```
![这里写图片描述](http://img.blog.csdn.net/20170406145713067?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMjkzNzAyOQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
根据BFC布局规则第六条：计算BFC的高度时，浮动元素也参与计算
为达到清除内部浮动，我们可以触发par生成BFC，那么par在计算高度时，par内部的浮动元素child也会参与计算。
```
.par {
    overflow: hidden;
}
```
![这里写图片描述](http://img.blog.csdn.net/20170406145731286?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMjkzNzAyOQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
3. 防止垂直 margin 重叠　
```
<style>
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p>
    <p>Hehe</p>
</body>
```
![这里写图片描述](http://img.blog.csdn.net/20170406145746020?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMjkzNzAyOQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
页面：
　　两个p之间的距离为100px，发送了margin重叠。
根据BFC布局规则第二条：Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
我们可以在p外面包裹一层容器，并触发该容器生成一个BFC。那么**两个P便不属于同一个**BFC，就不会发生margin重叠了。
```
<style>
    .wrap {
        overflow: hidden;
    }
    p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
</style>
<body>
    <p>Haha</p>
    <div class="wrap">
        <p>Hehe</p>
    </div>
</body>
```
![这里写图片描述](http://img.blog.csdn.net/20170406145802427?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMjkzNzAyOQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
## 总结　
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
　　因为BFC内部的元素和外部的元素绝对不会互相影响，因此， 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。

# IFC-Inline Formatting Context

## IFC布局规则
1. 盒子一个接一个水平放置
2. 盒之间的水平 margin，border和padding 都有效
3. 同一行的盒子所在的矩形区域叫行盒(Line box)
4. 当一个行盒放不下上下文内所有盒子时，会被分到多个垂直堆叠的行盒里
5. 行盒内的水平分布由'text-align'属性决定
6. 如果一个行级块无法分割(单词、inline-block)，该元素会被作为一个整体决定分布在哪一个行盒




