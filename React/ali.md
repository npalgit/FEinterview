
# 学习记录
## react
1. virtual dom
`creatElement()` -> `ReactElment()工厂方法` -> `{$$typeof, key, props, ref, type,...}`
render过程：
`根据传入的ReactElement生成对应的组件对象实例ReactComponent` -> `transaction.perform调用mountIntoNode` ->  `递归mountComponent，返回html` -> `innerHTML到container中` 

React的虚拟DOM，就是⽤用JS的执⾏行行时间，来换取减少Layout和Paint的时间。
2. dom diff
按层级
元素类型不相同
相同类型组件或dom元素
同一层级节点diff

3. react生命周期
![](http://efe.baidu.com/blog/the-inner-workings-of-virtual-dom/1.png)

初始化：`initial -> getDefaultProps -> getInitialState -> componentWillMount -> render -> componentDidMount`
更新： `update -> componentWillRecieveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate`
移除： `unmount -> componentWillUnmount`

## flux
>视图层组件不允许直接修改应用状态，只能触发 action。应用的状态必须独立出来放到 store 里面统一管理，通过侦听 action 来执行具体的状态操作。

**单向数据流**
View： 视图层
Action：视图层发出的动作
Dispatcher：用来接收Actions、执行回调函数
Store：用来存放应用的状态，一旦发生变动，就提醒Views要更新页面

## redux
实现了 state 和 reducer 的分离，而不是共同的杂糅于 store 中

store: 单一数据源
action: state是只读的
reducer: 纯函数改变state

store的职责
```
维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state；
通过 subscribe(listener) 注册监听器;
通过 subscribe(listener) 返回的函数注销监听器。
```
![](http://images2015.cnblogs.com/blog/593627/201604/593627-20160418100233882-504389266.png)

## react-redux
没有被connect的组件通过声明contextTypes属性也是可以获取store，使用store的方法的，但是这个时候，如果使用dispatch修改了store的state，React-Redux并不能把修改后的state作为props给React组件，可能会导致UI和数据不同步
```
container = connect(
  mapStateToProps,
  mapDispatchToProps
)(ui)
```
根组件外包一层Provider（利用context），子组件即可拿到state

## react-router
```
<Router history={browserHistory}>
  <Route path="/" component={App}/>
  <Route path="/repos" component={Repos}/>
</Router>

<Link>路由跳转
browserHistory.push(location)
```
browserHistory
hashHistory
createMemoryHistory（服务端）


## react-router-redux
让react-router与redux保持同步的绑定