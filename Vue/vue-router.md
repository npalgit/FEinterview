# vue-router
why?
对于SPA ( single pageapplication 单页面应用)，尤其是做移动端的网页应用，由于使用 <a/> 标签实现页面的切换和跳转，会有一定的加载时间消耗。、
what?
vue.js官方路由插件，适合用于构建SPA单页面应用
vue的单页面应用是基于路由和组件的，相当于传统页面是基于 <a/> 标签链接和页面，路由用于设定访问路径，并将路径和组件映射起来，这样就可以实现通过路由router来切换组件（视图）。

## 使用
```html
 使用a做链接导航
 <div id="app">
    <!--左侧导航栏区域-->
    <div class="nav">
        <a>简易vue</a>
        <a>趣味ES6</a>
        <a>人在职场</a>
    </div>

    <!--右侧内容区域-->
    <div class="content"></div>
 </div>

```

1. router-link to=""导航, router-view展示

```html
 <div id="app">
    <!--使用 router-link 组件来导航.-->
    <!-- 通过传入 `to` 属性指定链接. -->
    <div class="nav">

      <router-link to="/vue">
        简易vue
      </router-link>

      <router-link to="/es6">
        趣味ES6
      </router-link>

      <router-link to="/career">
        人在职场
   </router-link>

    </div>

    <div class="content">
       !--匹配到的组件将渲染在这里 -->
       <router-view></router-view>
    </div>

 </div>
 ```
2. 定义组件

 ```js
  //定义路由对应的组件。

  //1.简易vue 对应的视图组件
  const vueComponent = {
    template:`<div>
                这里是《简易vue》教程
              </div>`
  };

  //2.趣味ES6 对应的视图组件
  const es6Component = {
    template:`<div>
                这里是《趣味ES6》教程
              </div>`
  };

  //3.人在职场 对应的视图组件
  const careerComponent = {
    template:`<div>
                《混口饭吃》与《工资待遇》
              </div>`
  };
```

3. router实例关联组件和导航地址

```js
const router = new VueRouter({
    //配置routes
    routes:[
        //定义3个导航和组件的映射关系
        {
            path:"/vue",
            component:vueComponent
        },
        {
            path:"/es6",
            component:es6Component
        },
        {
            path:"/career",
            component:careerComponent
        },
    ]
});
```
4. new vue实例，注入路由

```js
 //创建vue实例，注入路由router
 const app = new Vue({
    el:"#app",
    router //此处是ES6语法，

      //相当于router:router
 });
 ```