##ES6新增特性
ES6最常用的几个语法：let, const, class, extends, super, arrow functions, template string, destructuring, default, rest arguments
###1. let
新增了块级作用域。用它所声明的变量，只在let命令所在的代码块内有效。

###2. const
const也用来声明变量，但是声明的是常量。一旦声明，常量的值就不能改变

###3. class，super，extends
```javascript
class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        console.log(this.type + ' says ' + say)
    }
}

let animal = new Animal()
animal.says('hello') //animal says hello

class Cat extends Animal {
    constructor(){
        super()
        this.type = 'cat'
    }
}

let cat = new Cat()
cat.says('hello') //cat says hello
```
extends关键字实现继承
子类必须在constructor方法中调用super方法，否则新建实例时会报错

###4. => arrow function
参数 => 操作

```javascript
class Animal {
    constructor(){
        this.type = 'animal'
    }
    says(say){
        setTimeout( () => {
            console.log(this.type + ' says ' + say)
        }, 1000)
    }
}
 var animal = new Animal()
 animal.says('hi')  //animal says hi
```

当我们使用箭头函数时，函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，它的this是继承外面的，因此内部的this就是外层代码块的this。

###5. template string 字符串模板` `
**用反引号（`）来标识起始，用${}来引用变量**，而且所有的空格和缩进都会被保留在输出之中
```javascript
$("#result").append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

###6. destructuring 解构: 从对象中获取属性
```javascript
let cat = 'ken'
let dog = 'lili'
let zoo = {cat, dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}
```
数组：序号一一对应
对象：属性名一一对应


###7. default默认值
```javascript
function animal(type = 'cat'){
    console.log(type)
}
animal()
```

###8. rest ...展开运算符
```javascript
function animals(...types){
    console.log(types)
}
animals('cat', 'dog', 'fish') //["cat", "dog", "fish"]
```
将数组或者对象展开
解构的时候不确定有多少参数，利用展开运算符处理余下的数据
const{size, ...others} = props;

函数的参数不确定，放在最后表示函数的不定参
function add(a,b, ...more) {

}

###9. for of 遍历

```javascript
var someArray = [ "a", "b", "c" ];
for (v of someArray) {
    console.log(v);//输出 a,b,c
}
```
####10. 新增API
#####1. 字符串扩展
#####2. 正则扩展
#####3. 数值扩展
#####4. 数组扩展
#####5. 函数扩展
#####6. 对象扩展

###11.以下

####1. iterator遍历器
它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
作用有三个：
一是为各种数据结构，提供一个统一的、简便的访问接口；
二是使得数据结构的成员能够按某种次序排列；
三Iterator接口提供for...of遍历方法。
遍历过程：next

####2. generator函数：异步编程
特征：
一，function关键字与函数名之间有一个星号；
二是，函数体内部使用yield语句，定义不同的内部状态
```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();

```
上面代码定义了一个Generator函数helloWorldGenerator，它内部有两个yield语句“hello”和“world”，即该函数有三个状态：hello，world和return语句（结束执行）
调用Generator函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）
```javascript
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

####3. module模块
将不同功能的代码分别写在不同文件中，各模块只需导出公共接口部分，然后通过模块的导入的方式可以在其他地方使用
import, export
```javascript
// point.js
module "point" {
    export class Point {
        constructor (x, y) {
            public x = x;
            public y = y;
        }
    }
}
 
// myapp.js
//声明引用的模块
module point from "/point.js";
//这里可以看出，尽管声明了引用的模块，还是可以通过指定需要的部分进行导入
import Point from "point";
 
var origin = new Point(0, 0);
console.log(origin);
```

####4. Set,Weakset
```javascript
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;
```

WeakSet:作为属性键的对象如果没有别的变量在引用它们，则会被回收释放掉
```javascript
var ws = new WeakSet();
ws.add({ data: 42 });//因为添加到ws的这个临时对象没有其他变量引用它，所以ws不会保存它的值，也就是说这次添加其实没有意思
```

####5. Map,WeakMap
```javascript
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;
```

```javascript
// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined
```

####6. Proxies
可以监听对象身上发生了什么事情，并在这些事情发生后执行一些相应的操作。一下子让我们对一个对象有了很强的追踪能力，同时在数据绑定方面也很有用处
```javascript
//定义被侦听的目标对象
var engineer = { name: 'Joe Sixpack', salary: 50 };
//定义处理程序
var interceptor = {
  set: function (receiver, property, value) {
    console.log(property, 'is changed to', value);
    receiver[property] = value;
  }
};
//创建代理以进行侦听
engineer = Proxy(engineer, interceptor);
//做一些改动来触发代理
engineer.salary = 60;//控制台输出：salary is changed to 60
```

####7. Symbols

Symbol是一种基本类型，像数字，字符串还有布尔一样，它不是一个对象。Symbol 通过调用symbol函数产生，它接收一个可选的名字参数，该函数返回的symbol是唯一的。之后就可以用这个返回值做为对象的键了。Symbol还可以用来创建私有属性，外部无法直接访问由symbol做为键的属性值。

```javascript
(function() {

  // 创建symbol
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

})();

var c = new MyClass("hello")
c["key"] === undefined//无法访问该属性，因为是私有的
```

####8. Promises 处理异步操作
Promises是处理异步操作的一种模式，之前在很多三方库中有实现，比如jQuery的deferred 对象。当你发起一个异步请求，并绑定了.when(), .done()等事件处理程序时，其实就是在应用promise模式。
```javascript
//创建promise
var promise = new Promise(function(resolve, reject) {
    // 进行一些异步或耗时操作
    if ( /*如果成功 */ ) {
        resolve("Stuff worked!");
    } else {
        reject(Error("It broke"));
    }
});
//绑定处理程序
promise.then(function(result) {
	//promise成功的话会执行这里
    console.log(result); // "Stuff worked!"
}, function(err) {
	//promise失败会执行这里
    console.log(err); // Error: "It broke"
});
```
####9. async
内置执行器
更好的语义：
async表示函数内有异步操作

await 表示在这里等待promise返回结果了，再继续执行



### babel
Babel是一个广泛使用的ES6转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。
