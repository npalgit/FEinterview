http://mp.weixin.qq.com/s?__biz=MzA3MDg1NzQyNA==&mid=2649654502&idx=1&sn=d29f3be1b746d0a5b12b79136977a354&chksm=872c4359b05bca4f89a7fd9fd6ddcae7c942548f46de70096e1b29de17d399c26d07170e0f5f&scene=21#wechat_redirect

## 绑定style
1. 对象语法
```html
 <p :class="{
        'active':isActive,
        'danger':isDanger,
        'error':isError
 }">这是文字</p>

 data:{
    isActive:true,
    isDanger:true,
    isError:false
 }
<!--渲染结果-->
 <p class="active danger">
```
根据isActive的真假渲染

2. 数组语法
```html
 <p :class="[activeClass,errorClass]">
    这是文字
 </p>

  data:{
    activeClass:'active',
    errorClass:'error'
 }
 <!--渲染结果-->
 <p class="active error">
```

## 绑定style
1. 对象语法
```html
 <p :style="{color:colorStyle}">
   这是文字
 </p>

 data:{
    colorStyle:'red'
 } 
<!--渲染结果-->
<p style="color: red">
```
