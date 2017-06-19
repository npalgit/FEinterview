# canvas vs svg
### 1. canvas使用js动态生成

1. Canvas是基于位图（像素）的图像，它不能够改变大小，只能缩放显示
2. Canvas更适合用来实现类似于Flash能做的事情

### 2. svg使用xml文档描述绘图

1. SVG是基于矢量的，所有它能够很好的处理图形大小的改变
2. SVG更适合用来做动态交互，而且SVG绘图很容易编辑，只需要增加或移除相应的元素就可以了。

# canvas
canvas元素本身没有任何外观，它就是一块空白画板，提供给JS的一套API，最早由Safari引入，IE9之前可以使用一些类库在IE中模拟canvas，大部分的API都不在canvas元素自身定义，canvas元素自身属性与常规的HTML元素并没有多大区别， 它的绘图API都定义在一个CanvasRenderingContext2D对象上(这里简单翻译成上下文对象)，该对象通过getContext()方法获得，
```js
var canvas = document.getElementById('square')
var ctx = canvas.getContext('2d')//2d表示画板维度，输入3d将得到一个更为复杂的3d图形API，也称WebGL
```

## 画圆
```js
    /**
     * 画一个圆
     */
    drawCicle: function (context, point, circle) {
        context.fillStyle = circle.borderColor;
        context.beginPath();
        context.arc(point.X, point.Y, canvasObj.R, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        context.fillStyle = circle.contendColor;
        context.beginPath();
        context.arc(point.X, point.Y, canvasObj.R - circle.borderWidth, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
},
```
## 画触摸线
```js
        var circleArr = canvasObj.circleCenterPosition;
        context.beginPath();
        for (var i = 0; i < selectCircleArr.length; i++) {
            var pointIndex = selectCircleArr[i];
            context.lineTo(circleArr[pointIndex].X, circleArr[pointIndex].Y);
        }
        context.lineWidth = canvasObj.touchLine.width;
        context.strokeStyle = canvasObj.touchLine.lineColor;
        context.stroke();
        context.closePath();
```

## 清除canvas上手势
```js
    clearTouched: function (canvas) {
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvasObj.width, canvasObj.height);
        canvasObj.drawCanvas(context, [], null);
},
```

## 监听
```js
        canvas.addEventListener("touchstart", function (e) {
            canvasObj.selectCircle(e.touches[0], selectCircleArr);
        }, false);

        canvas.addEventListener("touchmove", function (e) {
            e.preventDefault();
            var touches = e.touches[0];
            canvasObj.selectCircle(touches, selectCircleArr);
            canvasObj.clearTouched(canvas);
            canvasObj.drawCanvas(context, selectCircleArr, { X: touches.pageX, Y: touches.pageY });
        }, false);

        canvas.addEventListener("touchend", function (e) {
            canvasObj.clearTouched(canvas);
            canvasObj.drawCanvas(context, selectCircleArr, null);
            setTimeout(function () {
                handleAction(selectCircleArr.join(""));
                canvasObj.clearTouched(canvas);
                selectCircleArr = [];
            }, 1000);
        }, false);
},
```
