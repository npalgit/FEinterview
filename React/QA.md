# props和state
props和state之间是紧密相关的。父组件的state常常转变子组件的props成下面我们通过一个父子组件从上至下来分析它们。

假如我们有个父组件，可以在父组件的state里定义子组件的数据比如：

`this.setState({ childData: 'Child Data' });`
紧接着，在父组件的render()方法里面，可以将父组件的state，作为子组件的props传递下去，如下

`<Child data = {this.state.childData}/>`
这样就可以父组件的state传递给子组件的props。从子组件的角度来看，props是不可变的。如何改变子组件的props？我们仅仅需要改变父组件内部的state即可，父组件的state改变之后，引起父组件重新渲染，在渲染的过程中，子组件的data变成父组件this.state.childDtat的值。这样父组件内部state改变，就会引起子组件的改变。

这样就形成里从上而下的数据流，也就是React常说的**单向数据流**，这个“向”是向下。
我们常常利用这个原理更新子组件，从而衍生出一种模式，父组件：处理复杂的业务逻辑、交互以及数据等。子组件：称它为Stateless组件即无状态组件，只用作展示。在我们开发过程中，尽可能多个使用无状态组件，可以缕清业务之间的逻辑关系,提高渲染效率。

如果子组件想要改变自身的data，这时候需要，父组件传递给子组件一个方法，改变父组件自身的state。
父组件：
```js
<Child data={this.state.childData} handleChange={this.handelChildChange}></Child>
```
子组件接收父组件方法
```js
let Chilid = ({data,handleChange}) =>
    <div onClick={handleChange}>{data.name}</div>
```

# jsx
在Javascript代码里直接写XML的语法，实质上这只是一个语法糖，每一个XML标签都会被JSX转换工具转换成纯Javascript代码，React 官方推荐使用JSX， 当然你想直接使用纯Javascript代码写也是可以的，只是使用JSX，组件的结构和组件之间的关系看上去更加清晰。

React JSX将类似XML的语法转化到原生的JavaScript，元素的标签、属性和子元素都会被当作参数传给React.createElement方法

# 什么时候应该选择用class实现一个组件，什么时候应该用一个函数实现一个组件？
1、只要有可能，尽量使用无状态组件创建形式。
2、否则（如需要state、生命周期方法等），使用`React.Component`这种es6形式创建组件

- 函数式定义的无状态组件
- es5原生方式React.createClass定义的组件
- es6形式的extends React.Component定义的组件

http://www.cnblogs.com/wonyun/p/5930333.html

## 无状态函数式组件-纯展示组件
只负责根据传入的`props`来展示，不涉及到要`state`状态的操作

无状态函数式组件形式上表现为一个**只带有一个**`render`方法的组件类，通过函数形式或者ES6 arrow function的形式在创建，并且该组件是无`state`状态的
```js
function HelloComponent(props, /* context */) {
  return <div>Hello {props.name}</div>
}
ReactDOM.render(<HelloComponent name="Sebastian" />, mountNode) 
```

1. 组件不会被实例化，整体渲染性能得到提升
因为组件被精简成一个render方法的函数来实现的，由于是无状态组件，所以无状态组件就不会在有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升。
2. 组件不能访问this对象
无状态组件由于没有实例化过程，所以无法访问组件this中的对象，例如：this.ref、this.state等均不能访问。若想访问就不能使用这种形式来创建组件
3. 组件无法访问生命周期的方法
因为无状态组件是不需要组件生命周期管理和状态管理，所以底层实现这种形式的组件时是不会实现组件的生命周期方法。所以无状态组件是不能参与组件的各个生命周期管理的。
4. 无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用

## React.createClass
```js
var InputControlES5 = React.createClass({
    propTypes: {//定义传入props中的属性各种类型
        initialValue: React.PropTypes.string
    },
    defaultProps: { //组件默认的props对象
        initialValue: ''
    },
    // 设置 initial state
    getInitialState: function() {//组件相关的状态对象
        return {
            text: this.props.initialValue || 'placeholder'
        };
    },
    handleChange: function(event) {
        this.setState({ //this represents react component instance
            text: event.target.value
        });
    },
    render: function() {
        return (
            <div>
                Type something:
                <input onChange={this.handleChange} value={this.state.text} />
            </div>
        );
    }
});
InputControlES6.propTypes = {
    initialValue: React.PropTypes.string
};
InputControlES6.defaultProps = {
    initialValue: ''
};
```

## React.Component
```js
class InputControlES6 extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
            text: props.initialValue || 'placeholder'
        };

        // ES6 类中函数必须手动绑定
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <div>
                Type something:
                <input onChange={this.handleChange}
               value={this.state.text} />
            </div>
        );
    }
}
InputControlES6.propTypes = {
    initialValue: React.PropTypes.string
};
InputControlES6.defaultProps = {
    initialValue: ''
};
```
## createClass和Component区别
1. 函数this自绑定
React.createClass创建的组件，其每一个成员函数的this都有React自动绑定，任何时候使用，直接使用this.method即可，函数中的this会被正确设置

React.Component创建的组件，其成员函数不会自动绑定this，需要开发者手动绑定，否则this不能获取当前组件实例对象

2. 组件属性类型propTypes及其默认props属性defaultProps配置不同
React.createClass在创建组件时，有关组件props的属性类型及组件默认的属性会作为组件实例的属性来配置，其中defaultProps是使用getDefaultProps的方法来获取默认组件属性的
```js
const TodoItem = React.createClass({
    propTypes: { // as an object
        name: React.PropTypes.string
    },
    getDefaultProps(){   // return a object
        return {
            name: ''    
        }
    }
    render(){
        return <div></div>
    }
})
```
React.Component在创建组件时配置这两个对应信息时，他们是作为组件类的属性，不是组件实例的属性，也就是所谓的类的静态属性来配置的。
```js
class TodoItem extends React.Component {
    static propTypes = {//类的静态属性
        name: React.PropTypes.string
    };

    static defaultProps = {//类的静态属性
        name: ''
    };

    ...
}
```
3. 组件初始状态state的配置不同
React.createClass创建的组件，其状态state是通过getInitialState方法来配置组件相关的状态；
```js
const TodoItem = React.createClass({
    // return an object
    getInitialState(){ 
        return {
            isEditing: false
        }
    }
    render(){
        return <div></div>
    }
})
```
React.Component创建的组件，其状态state是在constructor中像初始化组件属性一样声明的。

```js
class TodoItem extends React.Component{
    constructor(props){
        super(props);
        this.state = { // define this.state in constructor
            isEditing: false
        } 
    }
    render(){
        return <div></div>
    }
}
```

# 能描述一下React组件的各个生命周期函数吗？（可能并不需要全部列举出来，但是主要的几个必须要知道）

# 什么是shouldComponentUpdate函数？有什么作用？（React性能提高可主要靠这个了）

# React中key的必要性
key是一个字符串，用来唯一标识同父同层级的兄弟元素。当React作diff时，只要子元素有key属性，便会去原v-dom树中相应位置（当前横向比较的层级）寻找是否有同key元素，比较它们是否完全相同，若是则复用该元素，免去不必要的操作。

# setState 接收函数作为参数
每次 React 从 setState 执行函数，并通过传递已更新状态的新副本来更新您的状态。 这使得功能 setState 可以基于先前状态设置状态

https://www.oschina.net/translate/functional-setstate-is-the-future-of-react?print
http://www.lupaworld.com/article-262859-1.html


# 什么是HoC（Higher-Order Component）？适用于什么场景？
HOC最终返回的是一个新的ReactComponent


# 什么是Fiber？是为了解决什么问题？
同步操作时间过长，进行分片

# 两个并不是父子关系的组件，如何实现相互的消息传递？请想出尽量多的办法，并说说各自的优缺点。
## 父子组件
ReactJS中数据的流动是单向的，父组件的数据可以通过设置子组件的props传递数据给子组件。
如果想让子组件改变父组件的数据，可以在父组件中传一个callback(回调函数)给子组件，子组件内调用这个callback即可改变父组件的数据。
## 兄弟组件
将数据挂载在父组件中，由两个组件共享
如果组件需要数据渲染，则由父组件通过props传递给该组件；
如果组件需要改变数据，则父组件传递一个改变数据的回调函数给该组件，并在对应事件中调用。

## 组件层次太深
- 全局事件
    全局事件可以让组件直接沟通，但频繁使用事件会让数据流动变得很乱
- context
    在这个父组件设置context从而直接传递数据和callback到这两个兄弟组件中
- redux


# 如果你能够改进React的一样功能，那会是哪一个功能？