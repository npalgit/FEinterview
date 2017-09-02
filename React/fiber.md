## react更新过程是同步的
当React决定要加载或者更新组件树时，会做很多事，比如调用各个组件的生命周期函数，计算和比对Virtual DOM，最后更新DOM树，这整个过程是同步进行的，也就是说只要一个加载或者更新过程开始，那React就一鼓作气运行到底。
但是更新过程中，浏览器那个唯一的主线程都在专心运行更新操作，无暇去做任何其他的事情。想象一下，在这200毫秒内，用户往一个input元素中输入点什么，敲击键盘也不会获得响应，因为渲染输入按键结果也是浏览器主线程的工作，但是浏览器主线程被React占着呢，抽不出空，最后的结果就是用户敲了按键看不到反应，等React更新过程结束之后，咔咔咔那些按键一下子出现在input元素里了。
![](https://pic1.zhimg.com/v2-d8f4598c70df94d69825f11dfbf2ca2c_b.png)
因为JavaScript单线程的特点，每个同步任务不能耗时太长，不然就会让程序不会对其他输入作出相应，React的更新过程就是犯了这个禁忌，而React Fiber就是要改变现状。


## react fiber - 同步操作时间过长：分片
把一个耗时长的任务分成很多小片，每一个小片的运行时间很短，虽然总时间依然很长，但是在每个小片执行完之后，都给其他任务一个执行的机会，这样唯一的线程就不会被独占，其他任务依然有运行的机会。

React Fiber把更新过程碎片化，执行过程如下面的图所示，每执行完一段更新过程，就把控制权交还给React负责任务协调的模块，看看有没有其他紧急任务要做，如果没有就继续去更新，如果有紧急任务，那就去做紧急任务。
![](https://pic1.zhimg.com/v2-78011f3365ab4e0b6184e1e9201136d0_b.png)


## fiber
在React Fiber中，一次更新过程会分成多个分片完成，所以完全有可能一个更新任务还没有完成，就被另一个更高优先级的更新过程打断，这时候，优先级高的更新任务会优先处理完，而低优先级更新任务所做的工作则会完全作废，然后等待机会重头再来

React Fiber一个更新过程被分为两个阶段(Phase)：
1. 第一个阶段Reconciliation Phase
React Fiber会找出需要更新哪些DOM，这个阶段是可以被打断的
```js
componentWillMount
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
```
2. 第二阶段Commit Phase
一鼓作气把DOM更新完，绝不会被打断
```js
componentDidMount
componentDidUpdate
componentWillUnmount
```

在现有的React中，每个生命周期函数在一个加载或者更新过程中绝对只会被调用一次；
在React Fiber中，不再是这样了，**第一阶段中的生命周期函数在一次加载和更新过程中可能会被多次调用！**


http://www.infoq.com/cn/articles/what-the-new-engine-of-react