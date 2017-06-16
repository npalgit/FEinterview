# input textarea
在HTML中有两种方式表达文本框，一个是input元素的单行文本框，一种是textarea的多行文本框。

1. input>元素：

  1.一定要指定type的值为text；

  2.通过size属性指定显示字符的长度，value属性指定初始值，Maxlength属性指定文本框可以输入的最长长度；

```html
<input type="text" value="入门狗" size="10" Maxlength="15">
```
2. textarea>元素
```html
  1.使用<textarea></textarea>标签对

  2.内容放在<textarea></textarea>标签对中

  3.使用row、col指定大小

  <textarea row="3" col="4">入门狗的博客园</textarea>
```
 区别：一个是单行文本框，一个是多行文本框。

 # div模拟textarea
```html
//设置可编辑
<div contenteditable="true"></div>

//使用div实现高度自适应
.test_box {
    width: 400px; 
    min-height: 120px; 
    max-height: 300px;
    _height: 120px; 
    margin-left: auto; 
    margin-right: auto; 
    padding: 3px; 
    outline: 0; 
    border: 1px solid #a0b3d6; 
    font-size: 12px; 
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    _overflow-y: visible;
}

```

# 移动设备忽略将页面中的数字识别为电话号码
```html
<meta name="format-detection" content="telephone=no" />
<meta name="format-detection" content="email=no" />
<meta name="format-detection" content="address=no" />
<meta name="format-detection" content="date=no" />
```
```html
<a href="tel:8602188888888">+86 021 88888888</a>
```
