# flex布局
display:flex;
        -webkit-flex;
主轴
交叉轴

## 容器
1. flex-direction: row column row-reverse column-reverse
2. flex-wrap: nowrap wrap(换行) wrap-reverse
3. juestify-content: 主轴对齐方式
flex-start
flex-end
center
space-between
space-around
4. align-item: 交叉轴对齐方式
flex-start
flex-end
center
baseline
stretch
默认值：stretch
5. aling-content:多根轴线对齐方式
flex-start | flex-end | center | space-between | space-around | stretch



## 项目
1. order：数值小靠前

默认 0
```html
<ul>
  <li class="item-1">Item 1</li>
  <li class="item-2">Item 2</li>
  <li class="item-3">Item 3</li>
</ul>

<style>
  ul {
    display: flex;
    padding: 0;
    background: lightgray;
  }
  li {
    list-style: none;
    padding: 1em;
  }
  .item-1 {
    background: lightblue;
  }
  .item-2 {
    background: lightgreen;
    order: 1;
  }
  .item-3 {
    background: coral;
  }
</style>
```


2. flex-grow:放大比例

定义每一个子元素在盒子内的弹性

拓展盒子剩余空间的能力

取值：，默认 0

3. flex-shrink:缩小比例
元素收缩的能力

取值：，默认 1

4. flex-basis：占据主轴空间
其中，2、3、4可以合并为 **flex**

5. align-self: 交叉轴对齐方式
```html
<ul>
  <li class="item-1">Item 1 content</li>
  <li class="item-2">Item 2 content</li>
  <li class="item-3">Item 3 content Item 3 content Item 3 content
    Item 3 content</li>
</ul>

<style>
  ul {
    display: flex;
    padding: 0;
    background: lightgray;
    align-items: flex-start;
  }
  li {
    list-style: none;
    padding: 1em;
  }
  .item-1 {
    background: lightblue;
    flex-shrink: 0;
    align-self: flex-end;
  }
  .item-2 {
    background: lightgreen;
    flex-shrink: 0;
  }
  .item-3 {
    background: coral;
  }
</style>
```

# grid 网格布局
http://chris.house/blog/a-complete-guide-css-grid-layout/
http://www.w3cplus.com/css3/a-complete-guide-css-grid-layout.html

## display:grid | inline-grid  
注: column, float, clear, 和 vertical-align 元素对网格容器不起作用。


## 概念
1. 网格容器(Grid Container)
2. 网格项(Grid Item)
3. 网格线(Grid Line)
4. 网格轨道(Grid Track)
5. 网格单元格(Grid Cell)
6. 网格区域(Grid Area)

## 容器
1. grid-template-columns:网格指定列的宽度
```css
   grid-template-columns：1fr 2fr 1fr;
```
**fr可以自动根据网格容器的宽度来计算列的宽度**

2. grid-template-rows:创建行网格线
```css
.container{ 
　　grid-template-columns: 40px 50px auto 50px 40px; 　　grid-template-rows: 25% 100px auto; 
}
```
3. grid-area-name: 使用grid-area属性定义网格区域名称
```css
    .item-a {
        grid-area: header;
    }
    
    .item-b {
        grid-area: main;
    }
    
    .item-c {
        grid-area: sidebar;
    }
    
    .item-d {
        grid-area: footer;
    }
    
    .container {
        grid-template-columns: 50px 50px 50px 50px;
        grid-template-rows: auto;
        grid-template-areas: "header header header header" "main main . sidebar" "footer footer footer footer"
    }
```
四列三行的网格。
最上面的一行为header区域。
中间一行由两个main区域，一个空单元格和一个sidebar区域。
最后一行是footer区域。

**使用任意数量的句点(.)声明单个空单元格。只要句点之间没有空格就表示一个空单元格**

4. grid-gap:指定列（或行）的间距
- grid-column-gap
- grid-column-gap
- grid-gap: 10px;
- grid-gap: 10px 5px;column-gap为10px，row-gap为5px

5. justify-items 网格中内容 沿列轴对齐
6. align-items 网格中内容 沿行轴对齐
7. justify-content 容器内网格对齐方式，列轴
8. align-content 容器内网格对齐方式，行轴
9. grid-auto-columns 指定网格轨道大小
10. grid-auto-rows 指定网格轨道大小
11. grid-auto-flow 自动布局
12. grid 合并


## 项目
1. grid-column-start 网格线起始位置
2. grid-column-end 网格线终止位置
3. grid-row-start 网格线起始位置
4. grid-row-end 网格线终止位置
5. grid-column：  grid-column-start+  grid-column-end
6. grid-row
7. grid-area 网格项命名
8. justify-self 沿列轴对齐
9. align-self 沿行轴对齐
