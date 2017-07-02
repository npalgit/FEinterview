# 难点

## 调试难
设计mock-native-bridge.js
```js
(function(){
  'use strict';
  if (typeof window.creatNativeBridge === 'undefined') {
    window.createNativeBridge = function(cb) {
      var bridge = {
        createWidget: function() {},
        // ...一系列操作
      };
      cb(bridge);
    }
  }

})()
```

native-bridge.js中，createNativeBridge()函数调用创建nativeBridge

## 根据功能，划分模块
1. 工具类：unilty，解析url，正则匹配url
2. nbridge相关
3. websocket类：
creatSocket()调用new WebSocket("ws://1.2.1.2:1234")
bindMessageListener()
sendMessage() cmd字段表明本条消息是什么类型的
4. network类
5. network-error类
6. comment类处理弹幕
7. 播放器处理
```
数组保存[
  {playerid, data, attr},
  {}...
]
```
是否需要插入，插入位置，静音，双击放大

8. 16:9播放器背景
开始选择
```html
<div class="container">
  <div class="wrapper">
    <div class="content">content</div>
  </div>
</div>

<style>
.container{ 
  width:400px; 
}
.wrapper{
  position:relative;
  padding-bottom:56.25%;   // 16/9 = 0.5625;
  height:0;
  border: 1px solid red;
}
.content{
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  background:gray;
}
```

但是，考虑到9路div之间的margin,上述方案pass
之后考虑flex布局
```html
  <style>
    html, body {
      width: 100%;
      height: 100%;
    }
    .wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .row {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: row;
      background: blue;
    }
    .list {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: red;
      margin: 5px 5px;
    }
    .item {
      width: 100%;
      height: 0;
      padding-bottom: 56.25%;
      background: green;
    }

  </style>

</head>

<body>
  <div class="wrap">
    <div class="row">
      <div class="list">
        <div class="item"></div>
      </div>
      <div class="list"></div>
      <div class="list"></div>
    </div>
    <div class="row">
      <div class="list"></div>
      <div class="list"></div>
      <div class="list"></div>
    </div>
    <div class="row">
      <div class="list"></div>
      <div class="list"></div>
      <div class="list"></div>      
    </div>

  </div>
```
可以实现margin存在情况下，16:9，但是这个也是以宽固定为基准，宽>>>高的时候，iten将撑破外面的list，方案pass

window.resize(() = {
  初始化div，根据容器（宽-30）,（高-20）最小值，确定基准进行计算;
  设置player位置
})

## 学生端群消息
群组里莫名有消息，默认一堂课对应一个群，群不解散
一个学生之前加入到一个群，之后加入到另一个群，学生身份不变
所以可以接收到之前群的消息
解决方法：
  知道现在所在群id，可以接收到所有消息，过滤不属于现在群的消息