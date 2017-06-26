## vue-cli
1. bulid目录
2. config目录
3. node_modules依赖
4. src源码
5. static第三方静态资源
.gitkeep空文件
6. .babelrc
presets预先安装，依赖
plugins依赖的插件，真正转换的代码
comments注释
7. editorconfig代码风格
8. eslintignore不对什么做es语法检查
9. eslintrc.js配置文件
extends:继承规则
rules:自定义，忽略规则检查

## package.json
1. script:可以执行的命令
通过script去配置脚本
2. dependencies依赖
^最低版本
3. devDependencies编译依赖


## webpack编译打包
npm run dev
1. dev-server.js
path nodejs的api，文件路径的操作方法
express nodejs框架，启动server
webpack 
config 配置文件
proxyMiddeware 代理中间件
express.Router()

2. wepack.dev.conf
entry 入口js文件
output
  path 路径
  publicPath 静态资源的绝对路径
  filename 文件名
resolve
  extension:自动补全文件后缀
  fallback:node_modules
  alias：别名缩短路径名长度
module
用各种loader对文件做处理
  preloader
  loader
  inclued包含什么文件
  exclude排除什么文件
  query
    urlloader,把img做base64打包
3. hot-reload热加载 



### webpack
1. stylus
>Module build failed: Error: Cannot find module 'stylus'

webpack 里面用了 stylus-loader 但是 loader 没有找到你的 modules 安装了 stylus

npm install stylus --save-dev
npm install stylus-loader --save-dev

2. alias别名
webpack.base.conf.js
```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),//
      'components': path.resolve(__dirname, '../src/components')//使用components,而不再去寻找路径
    }
  },
```

## icoMoon制作图标字体
svg图片->图标字体

## stylus
1. boder-1px($color)
```css
border-1px($color)
  position: relative
  &::after
    display: block
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    border-top: 1px solid $color
    content: ' '
```
2. border-none()
```css
border-none()
  position: relative
  &::after
    display: none
```
3. bg-image($url)
```css
bg-image($url)
  background-image: url($url + '@2x.png')
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3)
    background-image: url($url + '@3x.png')
```
4. media query
```css
@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5)
  .border-1px
    &::after
      -webkit-transform: scale(0.7)
      transform: scale(0.7)

@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2)
  .border-1px
    &::after
      -webkit-transform: scale(0.5)
      transform: scale(0.5)
```


## express.Router()
router.get('/seller', function(req, res) {
  res.json({
    errno: 0,
    data: seller
  })
})
app.use();


## vue-router
1. 修改默认linkActiveClass

## vue-resource 封装ajax

## vue
1. 无法操作不存在的对象属性，无法给其赋值
使用vue.set接口
2. 属性
```js
export default{
  props: {

  },
  data() {

  },
  created() {

  },
  computed: {
    Payprice() {

    }
  },
  methods: {
   clear() {

   }
  },
  components: {

  },
  filters: {

  }
}
```


## 开发
1. localhost->ip config :草料二维码
2. 实现真正的1px
3. 增大点击区域： padding
4. display:inline-block一定要font-size=0,vertical-algin:top
5. transition在vue中使用
name="", name-enter,name-enter-active

## vue组件通信

## better-scroll
1. 默认阻止click等
2. 



## vue-components

1. 注册组件
**组件传参：props接收参数**
```js
Vue.component('goods', {
   props:['detail'],
   template:`<div class="goods">`
})
```

```html
<template>
  <div class="goods"></div>
</template>

<script>
export default{
  props: {
    detail: {// 指定接收参数名，类型，默认值
      type: Number,
      default: 0
    }
  }
}
</script>

```
2. 创建vue实例，挂载
**组件传参：数据存储**

```js
let vm = new Vue({
  el: "#app",
  data: {
    seller:{} //数据存储在data中
  }
});
```

```js
import goods from "";

export default{
  components: {
    'goods': goods
  }
}
```

3. 使用组件
**组件传参：html中使用：传参**
```html
 <div id="app">
    <goods :detail="article"></goods>
 </div>
```



```js
<goods></goods>
```

# 八.商品详情页
food.vue
1. 顶部正方形
width: 100%
height: 0
padding-bottom: 100%
2. 使用cartcontrol组件
3. 设置购物车transition消失，以便小球做抛物线
4. 增加split组件
5. 增加ratingselect组件
默认值
传参，因为会重复调用组件，参数要重置，不然上次选择影响本次
子组件事件派发给父组件
6. better-scroll
this.$nextTick()中触发refresh()
7. 更新dom操作也要再来this.$nextTick()中
8. 计算时间
new Date()
正则匹配，test,replace

# 九
1. 高度固定，相对于视口
只有固定了高度，才可以使用better-scroll进行滚动
2. 组件外层最好包一层wrapper，使用wrapper进行块级或者行级展示，位置等
3. nextTick
4. filters
5. &:not(:last-child)
6. absolute相对于非static祖先元素的padding-box定位