# 业务
## 追溯码业务线
1. 缘于中国药品电子监管码，主要是为了对药品在生产及流通过程中进行监管
2. 目前，我们的业务分为 药和非药 两大块，商家后台*2, 运营端*2, 扫码页, 码上放心（企业入驻）
3. 如何培养用户的扫码意识，如何在扫码结果页做更多的内容，推广产品等，如何做到独特、与众不同
4. 用户随意扫不是未购买商品的码怎么办？
5. 目标：
完善追溯体系，使得更多商家入驻到码上放心平台，抢夺好货市场，在盈利的同时，承担起药品、商品的溯源责任，打击假货，给用户提供一个真实可信的消费场所。
无法进入商场超市等中小型企业，增强消费者信任（乐清），政府监管非药商品的手段渠道
在扫码页中提供给企业商家推销位置，在企业扩大营销范围的同时，给用户更多关于商品企业的知识。
同时，减轻公司运营人员压力，在网上进行各种审核操作，解放劳动力
6. 

## 1.非药商家二期项目
- 非药商品追溯，扫码，营销
- 主要包括商家后台、运营后台、扫码页，其中商家后台主要包括商品管理，追溯码设置，扫码页设置，品牌文章库；运营端可查看并审核商家配置

### 1. 主要工作
商家后台商品管理，运营端审核配置

### 2. 成长路程
1. 学习react, react-redux, react-router
   通过阮一峰老师react实例入门系列对react有一个简单直观的认识和了解
   官方文档学习语法，查api，看示例
   （见学习记录）
2. 看项目代码，理解项目组织架构
主要是react生命周期，redux数据流
见下面

3. 开发中遇到的问题
（1）search组件如何通知父组件用户的查询内容？如何在点击查询时将查询内容在url中表示出来？
search：查询条件

    父组件调用search组件时传入方法，得到查询内容，根据查询内容请求服务器
    在url中显示查询内容，可以调用`browserHistory.push()`,而且url和reduex通过react-router-redux绑定在了一起
    首次进入页面时，默认查询全部
    -> state保存当前查询内容，根据state更改url，保持url和查询内容一致
    因此可以在点击查询时，传入方法更改state，回调中更改url
    父组件在`componentWillRecieveProps`中，判断url变化，取出查询内容请求服务器

（2）选择ant-modal组件进行二次确认或信息提示（操作成功失败/警告）
    `<Modal>`对话框组件，可自定义内容、控制显示关闭
    `Modal.info()`信息提示,`Modal.confirm()`确认对话框
    前者可自定义内容更自由，方便控制，但需要自己维护`visibility`
    后者定位就是信息提示，对话框，省去了控制显示or关闭的过程
    最后选用后者

    render可以少写代码，提高渲染效率
    减少是否渲染，点击操作后控制显示的逻辑，

（3）ant-form 中商品编码选择`<input>` ，需要输入内容做正则校验
    问题：先触发校验错误，之后通过网络请求获取正确编码并设置为`value`，不会触发校验规则
    ->选择`getFieldDecorator`中`options.rules`做校验，form将监听`onchange`事件
    因此onchange事件是可以被校验的，但直接设置`value`，改变的只是input的值，`form.getFieldsValue`并不会随之变化
    ->问题在于如何改变表单的值，或者手动触发表单校验
    ->查api，`setFieldsValue`设置一组输入控件的值
    因此在`componentWillRecieveProps`中设置控件值，form自动校验

怎么分析的，怎么解决的

（4）ant-upload 中展示上传成功的文件，结果上传全部失败，显示为`file.status=uploading`->`error`(正常为`loading`->`done`)
    先看官网，找相关api，`fileList`已经上传的文件列表,`onChange`上传文件改变时的状态,没有找到原因
    源码找到`status=error`代码，找何时会触发`error`
    发现当`fileList=null`时，将触发
    回归到自己代码，我在`onChange`中设置只有`file.status=done`才`setState({fileList})`,导致uploading之后fileList为空
    因此在 `onChange` 中始终 `setState({fileList})`,而在status=done时，请求服务器发送文件
>使用各种框架插件，遇到问题先看api，找不到去看源码


4. fix bug
(1) 细节把控
列表为空的提示：没有对过文案，或者文案没有->找产品要文案，严格把控，文案是否关系法务（vs 实验室）
关键操作二次确认（编辑商品时返回确认， 删除元素、提交表单二次确认）
网络请求结果展示（删除、提交等，需要告知用户操作结果），用例没有提到，但是开发时应想到，及时反馈
操作返回重新请求服务器，刷新数据
->站在用户角度，体验产品的各项功能

(2）编辑商品A，返回列表，再次编辑时商品B，显示的是商品A的图片
定位bug：`uploadFile`组件只接收一次file
bug原因：在组件render时，拿到的是上次reducerh处理后的state，直接渲染到了uploadfile中。而本次真正reducer处理后的结果，无法触发uploadfile重新渲染
->退出编辑商品页面时，触发`cleanProductDetail`action,reducer处理将state清空，这样在组件render时，没有对应的img地址，在后续触发重新渲染

（3）接上面uploadfile组件使用问题，tab页切换使用中1（展示图片），待审核2（需要用户上传），存在1到2切换，显示1的图片
此时不能发action使reducer返回空state
->在父组件切换时，强制重新mount uploadfile组件

5. 收获
（0）细心，自测
不细心，不熟悉api -> 
自测直接影响到后面提测fix bug
自测发现需求缺陷

（1）组件化思维的培养：高内聚，低耦合
降低耦合度
减少冗余，可复用
方便调试，bug快速定位
提高可维护性，只需要修改组件不需要每个页面都去修改

在做4个tab页切换时，可以做4个单独的组件，也可以在一个组件中根据传入props渲染不同元素
如果用4个组件，每次切换需要umount-mount
操作人，操作时间，生效时间，都是一样的，不需要修改
->选择使用一个组件实现

（2）bug排查、定位。
在点击商品编码请求服务器时，整个编辑商品页面会闪烁，props接收字段会由空再填充
开始不知道从哪里入手，觉得程序不可思议，后面在点击事情后可能走的函数中，打log定位bug原因，发现在父组件render方法中定义子组件，子组件的操作会触发父组件re-render，此时将重新定义子组件，页面闪烁，再次请求服务器之后填充字段

遇到bug莫慌
bug复现，确认bug在哪一段代码，清除无关代码只调试bug相关代码，写demo对比
debugger，log大法好
stackoverflow是好网站
应该形成自己的fix bug记录册
查api，看如何使用

（3）随时清理缓存
同时做商家后台和运营端，需要不同的用户登录信息，及时清理cookie

（4）站在用户角度去开发
产品最终是要服务于用户的，功能也不是凭空捏造的，各种交互逻辑都是基于用户去设计的
当自己站在用户角度去看，很容易能发现一些bug，我点了提交怎么反应，为什么禁用按钮，我哪里没有填

（5）培养产品思维
m2c评审，文章和标签如何对应
思考为什么要这么做，这么做是要解决什么问题，那么这样做能不能解决问题，有没有更好的方案
而不是接到一个任务就直接开始想要怎么做，怎么实现，代码怎么写

（6）需求的理解和沟通
在产品功能。交互。开发中需要平衡点

开始只关心自己的模块，不知道来源于哪个模块，服务于哪个模块，上传的这个图片是做什么，哪里会用到（使用中和已失效的两个商品图片，其实是一个，在商品管理中修改，商家修改立即生效）
一个产品或者一个系统是相互连接的，模块功能之间存在相互影响，对一个功能模块的把控会影响到另一个，所以要有全局整体意识
作为产品考虑到的一般是主要使用场景，而作为开发则要考虑所有逻辑上的可能性，所以要把场景可能性前置，在交互、接口、测试的时候充分沟通

### 3. 思考
- container
    container统一处理错误（props.errorMessage）,Loading态处理

- actions太多
参考`Flux Standard Action`
```js
    let FSA = {
        type: 'action-name',
        payload: <boolean | number | string | object>, //action的负载，可以是数据或 error 对象
        error: <boolean>, // 指明该action是否是一个以 error 为负载的action
        meta: <string> // action元数据， 包含解释该action含义的信息
    }
```
这样设计可以大大减少action type的数量，用meta表征一个action具有的不同的含义

- immutable
setState会触发re-render，在`shouldComponentUpdate`中进行深度比较，用递归的方式来进行比较，这样的代价同样很大，并不是一个有效的解决方案。
可以引入另一个库——`immutable`，其思想是强调不可变数据，一个`Immutable Data`的创建就是一个不可变的，需要变化时不是利用深拷贝，而是仅仅改变这个变化的节点和其父节点，其余节点仍是共享内存。

>Immutable Data 就是⼀一旦创建，就不不能再被更更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回⼀一个新的 Immutable 对象。Immutable 实现的原理理是 Persistent Data Structure（持久化数据结构），也就是使⽤用旧数据创建新数据时，要保证旧数据同时可⽤用且不不变。同时为了了避免 deepCopy 把所有节点都复制⼀一遍带来的性能损耗，Immutable 使⽤用了了 Structural Sharing（结构共享），即如果对象树中⼀一个节点发⽣生变化，只修改这个节点和受它影响的⽗父节点，其它节点则进⾏行行共享。

引入之后，可以封装一个基类统一处理`shouldComponentUpdate`
purerender, pureComponent

- reselect
mapStateToProps也被叫做selector，在store发生变化的时候就会被调用，而不管是不是selector关心的数据发生改变它都会被调用，所以如果selector计算量非常大，每次更新都重新计算可能会带来性能问题

`reselect` 提供 `createSelector` 函数来创建可记忆的 `selector`。`createSelector` 接收一个 `input-selectors` 数组和一个转换函数作为参数。如果` state tree `的改变会引起 `input-selector` 值变化，那么 `selector` 会调用转换函数，传入 `input-selectors` 作为参数，并返回结果。如果 `input-selectors `的值和前一次的一样，它将会直接返回前一次计算的数据，而不会再调用一次转换函数。这样就可以避免不必要的计算，为性能带来提升。


## 2. 赛诺菲扫码页
源于扫码页，企业需要自定义个性化配置
1. 主要工作：
扫码页开发，埋点
2. 学习：
学习React，react-router
埋点，onEnter的时候，`goldlog_queue.push({action, arguments})`

埋点：将用户特定行为数据记录并发送到日志服务器，通过分析埋点日志来观察产品效果。
Aplus：使用的埋点系统，包括埋点方案以及日志管理；
    在页面中引入的埋点脚本 aplus.js，用于客户端的数据收集（埋点脚本不仅仅指 aplus.js，还包含一些扩展功能的脚本如 spm.js 等）

3. 思考：
本质是自定义扫码页内容，如何定制个性化，解放开发或者统一化管理
通过一个赛诺菲扫码，推广更多的企业入驻到码上放心平台


## 3. 官网资料更新，接switch
- 接switch
midway config中启用switch、diamond插件，引入默认值
route中读取config，switch.on()读取持久化数据覆盖到内存
后端render时传入config，生成html


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

# 开发流程
- prd，各阶段工作的依据与目标，看文档熟悉需求，在评审前心中有数
- 需求评审，功能的实现逻辑与可行性方案，确定需求，提出疑惑，异常以及非主要场景
- 需求反讲，通过rd反讲，确定最终需求，达到理解一致
- 粗估工期，根据功能粗工期，20%误差，最终决定项目优先级
- 交互评审，交互逻辑是否正确，在交互与实现上选择最优方案
- 视觉评审，
- 细评工期，wbs(Work Breakdown Structure）细化需求，项目排期，工期
- 接口评审，根据之前的功能、交互等确定请求和响应字段，名称，是否一定存在，方便之后mock数据进行开发

- 用例评审，用例设计是否合理
- 开发:根据接口mock -> 基于mock本地开发 -> 半天/一天查看接口变更
对需求进一步了解，需求/交互变更，进行接口订正
开发60%，用例评审，
20%,需求，交互，用例 => 自测, 反馈
模块功能分工，设计拆分组件（只写一个，大家一起用），
- 自测！！！：对照文案，对照测试用例，站在用户角度完整走一遍
自测要在外网测一遍，（oss在外网无法下载）

- 联调：
- 代码review：发现可能存在的问题，逻辑缜密性，优化，代码风格
- 提测：（外网！！）
- fix bug
- 日常-预发-线上-线上回归（外网！！）
- 复盘总结

外网无法下载oss文件，使用node做中转

# 集团工具
## rap
接口入参出参的协定，先用rap提供的mock接口去开发，等后端开发完接口切换一下即可，提升项目开发和维护效率
webpack配置请求域，local走rap接口，否则走development
使用自定义函数来扩展mock能力

## tbpass
同步登录态
（上传图片没有ignore）
1. 原理
通过302跳转将taobao域或者alibaba.com的cookie同步到其他域名
login.taobao.com/jump？target=xxx到淘宝域名下面获取cookie 
pass.xxx.com/add?cooke=... 将cookie写到非淘宝域名下面完成cookie同步

2. 具体流程
(1)访问a.com，midway/egg判断是否需要同步，需要则返回`302`，login.taobao.com/jump?target=a
(2)访问login.taobao.com/jump?target=a，到tbpass服务器，`302`到pass.a.com/add?token=。。。，url中包含cookie信息
(3)访问pass.a.com,`302`到a.com/tbpm=1&cookie,并在header中setcookie，tbpm为同步标记位，
(4)访问a.com/tbpm=1,`302`到a.com,删除tbpm
(5)访问a.com,`200`到最终页面

3. midway-plugin-tbpass 中间层tbpass同步
配置config.tbpass中ignore(哪些路由不需要同步)，domains(需要同步tbsession的域名)
ignore先过滤 -> 判断是否符合同步条件 -> 处理tbpm标记位 -> redirect到jump?target=url

4. 同步条件
配置了同步cookie的域名，若请求域名与配置的域名不一致，则不同步
请求的url，包含在需要被过滤的url中，则不进行同步
如果请求url的参数中包含tbpm并且值大于3，则不进行同步
如果cookie中cookie2、t、_tb_token_有一个为空，则进行同步
如果用户已经登录（从tair中获取login进行判断），并且_nk_ 或cookie17有一个为空，则进行同步

5. 单点登录
（1）登录父应用，返回加密cookie；访问子应用时，直接解密校验。-> 安全，不能跨域
（2）登录子应用，请求父应用的jsonp接口，父应用返回加密信息。 -> 安全
（3）登录子应用，重定向请求到父应用，父应用生成加密token，再次重定向到子应用


## aone
研发协同平台
产品、应用、项目、需求、任务、代码、缺陷、测试、集成、变更、发布等研发全生命周期管理服务

## switch
开关平台
无需写死的URL, 接口名, 读取文件用的编码等,都可以使用switch来管理
1. 线上控制台直接推送到内存
2. 线上控制台持久化推送,走Diamond方式
3. 采用注解的方式把开关统一的管理



移动端
学习midway
