http://www.jb51.net/article/46224.htm

在jQuery1.7中,.delegate()已被.on()取代

1. select和event顺序不一样
```js
$("table").delegate("td","click",function(){
 alert("hello");
});

$("table").on("click", "td", function() {
        alert("hi");
});
```
2. on(events,[selector],[data],fn)，参数[selector]是可选，
一个选择器字符串用于过滤器的触发事件的选择器元素的后代。
```js
//过滤class为td1的table子元素
$("table").on("click", ".td1", function() {
       alert("hi");
});
```