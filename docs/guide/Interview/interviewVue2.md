---
title: Vue常见面试题2
date: 2022-01-14
categories:
  - 面试题
tags:
  - Vue面试题2
---

::: tip
面试题整理自黑马--pink 的面试宝典（34-76）
:::

<!-- more -->

### #说明

访问面试宝典[pinkVue 常见面试题](https://ychzx.top/studyWeb/interview/pinkVue常见面试题.pdf)
面试宝典资源过大，需加载很长时间<br>
手机端用夸克浏览器可以直接打开pdf文件

# Vue 常见高频面试题(34-75)

## 34、你是怎么认识 vuex 的？（必会）

`Vuex`可以理解为**一种开发模式或框架**。**比如 PHP 有 thinkphp,java 有 spring**等，通过状态（数据源）**集中管理驱动组件的变化**（好比 spring 的 IOC 容器对 bean 进行集中管理）。

**1、应用级的状态集中放在 store 中;**

**2、改变状态的方式是提交 mutations，这是个同步的事物;**

**3、异步逻辑应该封装在 action 中。**

## 35、Vuex 的 5 个核心属性是什么？（必会）

**分别是：** `State, Getter, Mutation, Action, Module`

**1）state**

​ **state 为单一状态树**，在 state 中需要定义我们所需要的数组、对象、字符串等，只有在这里定义了，在 Vue.js 的组件中才能获取你定义的这个对象的状态

**2）getter**

​ **getter 有点类似 Vue.js 的计算属性**，当我们需要从 store 的 state 中派生出一些状态，那么我们就需要使用 getter,**getter 会接收 state 作为第一个参数**，而且 getter 的返回值**会根据它的依赖被缓存起来**，**只有 getter 中的依赖值**（state 中的某个需要派生状态的值）**发生改变的时候才会被重新计算**。

**3）mutation**

​ **更改 store 中 state 状态的唯一方法就是提交 mutation**，就很类似事件。每个 mutation 都有一个字符串类型的事件类型和一个回调函数，我们需要改变 state 的值就要在回调函数中改变。我们要执行这个回调函数，那么我们需要执行一个相应的调用方法：`store.commit`

**4）action**

​ **action 可以提交 mutation**，在 action 中可以执行`store.commit`，而且 action 中可以有任何的异步操作。在页面中如果我们要吊用这个 action，则需要执行`store.dispatch`

**5）module**

​ **module 其实只是解决了当 state 中很复杂臃肿的时候**，module 可以将 store**分割成模块**，**每个模块中拥有自己的 state、mutation、action 和 getter**

## 36、Vuex 的出现解决了什么问题？（必会）

主要解决了以下两个问题：

1，**多个组件依赖于同一状态时**，对于**多层嵌套的组件的传参将会非常繁琐**，并且**对于兄弟组件间的状态传递无能为力**。

2，**来自不同组件的行为需要变更同一状态**。以往采用**父子组件直接引用**或者通过**事件来变更和同步状态的多份拷贝**。以上的这些模式非常脆弱，通常会导致无法维护的代码。

## 37、简述 Vuex 的数据传递流程（必会）

​ 当组件进行**数据修改**的时候我们需要调用`dispatch`来触发`actions`里面的方法。actions 里面的每个方法中都会有一个`commit`方法，当方法执行的时候会通过 commit 来触发`mutations`里面的方法进行数据的修改。mutations 里面的每个函数都会有一个`state`参数，这样就可以在 mutations 里面进行 state 的数据修改，**当数据修改完毕后，会传导给页面。页面的数据也会发生改变**

## 38.Vuex 的 Mutation 和 Action 之间的区别是什么？（必会）

**1）流程顺序**

“相应视图一>修改`State`”拆分成两部分，**视图触发**`Action`,`Action`再触发`Mutation`。

**2）角色定位**

**基于流程顺序，二者扮演不同的角色。**
`Mutation`：专注于修改 State，理论上是修改 State 的唯一途径， `Action`：业务代码、异步请求。

**3）限制**

**角色不同，二者有不同的限制。**
`Mutation`：必须同步执行。
`Action`：可以异步，但**不能直接操作 State**。

## 39、Vue-Router 是干什么的，原理是什么（必会）

​ `Vue-Router`是 Vue.js 官方的**路由插件**，它和 Vue.js 是深度集成的，**适合用于构建单页面应用**。**Vue 的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来**。传统的页面应用，是用一些超链接来实现页面切换和跳转的。在`Vue-Router`单页面应用中，则是**路径之间的切换，也就是组件的切换**。**路由模块的本质就是建立起 u 和页面之间的映射关系**。
“**更新视图但不重新请求页面**”是前端路由原理的**核心**之一，目前在浏览器环境中这一功能的实现主要有两种方式：
**利用 URL 中的 hash（"#”）**
**利用 History interface 在 HTML5 中新增的方法**

## 40、路由之间是怎么跳转的？有哪些方式？（必会）

1. `<router-link to="需要跳转的页面路径">`
2. `this.$router.push()` 跳转到指定的 url ，并在 history 中添加记录，点击回退到上一个页面 `this.$router.back()`
3. `this.$router.replace()`跳转到指定的 url，但是 history 中不会添加记录，点击回退到上上个页面
4. `this.$router.go(n) ` 向前或者后跳转 n 个页面，n 可以是正数也可以是负数

## 41、Vue-Router 怎么配置路由（必会）

在 Vue 中配置路由分为五个步奏：

1. 安装

   `npm install --save Vue-Router`

2. 引用

   `import VueRouter from 'Vue-Router'`

3. 配置文件

   ```js
   var router = new VueRouter({
     routes: [{ path: '/home', component: Home }, {}]
   })
   ```

4. 视图加载的位置

   默认 `App.Vue` 文件中加 `<router-view></router-view>`

5.

6. 跳转导航

   `<router-link to="/hello">helloword</router-link>`（渲 s 染出来的是 a 标签）

## 42、Vue-Router 有哪几种路由守卫？（必会）

路由守卫为：

**全局守卫**：beforeEach

**后置守卫**：afterEach

**全局解析守卫**：beforeResolve

**路由独享守卫**：beforeEnter

## 43、Vue-Router 的钩子函数都有哪些？（必会）

关于`Vue-Router`中的钩子函数主要分为 3 类

**1）全局钩子函数**要包含`beforeEach`

​ `beforeEach`函数有三个参数分别是
​ **to**:router**即将进入**的路由对象
​ **from**：当前导航**即将离开**的路由
​ **next:function**，进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed（确认的）否则为 false.终止导航。

**2）单独路由独享组件**

​ `beforeEnter`，

**3）组件内钩子**

​ `beforeRouterEnter, beforeRouterUpdate, beforeRouterLeave`

## 44、路由传值的方式有那几种（必会）

`Vue-Router`传参可以分为两大类，**分别是编程式的导航`router.push`和声明式的导航**

**1）router.push**

​ **字符串：直接传递路由地址，但是不能传递参数** `this.$router.push('home')`

​ **对象：**
​ **命名路由**这种方式传递参数，目标页面刷新会报错`this.$router.push({name："news",params:{userId：123})`

​ **查询参数**和**name 配对的式 params**，和**path 配对的是 query** `this.Srouter.push({path："/news'，query:{uersld：123})`

​ **接收参数**`this.$route.query`

**2）声明式导航**

​ **字符串**`<router-link to:"news"></router-link>`

​ **命名路由** `<router-link :to:"{name:'news',params:{userId：1111}}"></route-link>`

​ **查询参数** `<router-link :to="{path:'/news',query:{userId：1111}}"></router-link>`

## 45、怎么定义 Vue-Router 的动态路由？怎么获取传过来的动态参数？

​ 我们经常需要**把某种模式匹配到的所有路由，全都映射到同个组件**。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在`Vue-Router`的路由路径中使用“**动态路径参数**”（dynamic segment）来达到这个效果。
​ **动态路径参数**，使用“冒号”开头，一个路径参数，使用冒号标记，当匹配到一个路由时，参数会被设置到`this.$router.params`中，并且可以在每个组件中使用。
​ 现在我们知道了可以通过动态路由传参，在路由中设置了，多段路径参数后，对应的值分别都会设置到`$router.query`和`$router.params`中

## 46、query 和 params 之间的区别是什么？（必会）

1、**quey 要用 path 来引入，params 要用 name 来引入，**

2、**接收参数时**，分别是`this.$route.query.name`和`this.$route.params.name`
（**注意：是$route而不是$router**）。

3、**query 更加类似于我们 ajax 中 get 传参**，params 则类似于 post，**前者在浏览器的地址栏中显示，params 不显示**

4、**params 传值一刷新就没了**，**query 传值刷新还存在**

## 47、$route和$router 的区别是什么？（必会）

`$route`是"**路由信息对象**”，包括`path,params,hash,query fullPath,matched,name`等**路由信息参数。**
`$router`：**为 VueRouter 的实例**，相当于一个全局的路由器对像，里面含有很多**属性和子对像**，例如 history 对象，经常用的跳转链接就可以用`this.router.push()`会往 history 栈中添加一个新的记录。返回上一个 history 也是使用`$router.go`方法

## 48、active-class 属于那个组件中的属性？该如何使用？

​ 首先`active-class`是`Vue-Router`模块中`router-link`组件中的属性，主要作用是用来**实现选中样式的切换**，在 Vue-Router 中要使用 active-class 有**两种方式**：

**1）在 router-link 中写入 active-class**

`active-class`选择样式时根据路由中的路径（to=“home”）去匹配，然后显示
`<router-link to="/home" class="menu-home" active-class="active"></router-link>`

**2）直接在路由 js 文件中配置 linkActiveClass**

```js
export default new Router({
    linkActiveClass：'active'
})
<div class="menu-btn">
  <router-link to ="/" class="menu-home" active-class="active">
    首页
  </router-link>
</div>
<div class="menu-btn">
  <router-link to="/my" class="menu-my" active-class="active">
    我的
  </router-link>
</div>
```

**3）引起的问题**

​ 因为 to="引起的，`active-class`选择样式时**根据路由中的路径去匹配**，然后显示，例如在 my 页面中，路由为 localhost:8081/#/my，那么 to="/”和 to=“/my"都可以匹配到，所有都会激活选中样式

**4）解决方法**

**l、在 router-link 中写入 exact**
`<router-link to="/" class="menu-home" active-class="active" exact></router-link>`
**2、在路由中加入重定向**

```js
<router-link
  to="/"
  class="menu-home"
  active-class="active"
  exact
></router-link>
{
  path: '/'
  redirect: '/home'
}
```

## 49、Vue 的路由实现模式：hash 模式和 history 模式（必会）

**1）hash 模式：** **在浏览器中符号“#”**，**#以及#后面的字符称之为 hash**，用`window.location.hash`读取。**特点：**hash 虽然在 URL 中，但**不被包括在 HTTP 请求中**；用来指导浏览器动作，**对服务端安全无用，hash 不会重加载页面**。

**2）history 模式： **`history`采用 **HTML5 的新特性** ；且提供了两个新方法：
`pushState(),replaceState()`可以**对浏览器历史记录栈进行修改**，以及 **popState 事件的监听到状态变更**

## 50、请说出路由配置项常用的属性及作用（必会）

path：跳转路由 component：路径相对应的组件 name：命名路由 children：子路由的配置参数(路由嵌套) props：路由解释 redirect：重定向路由

## 51、编程式导航使用的方法以及常用的方法（必会）

**路由跳转**：`this.$router.push()`

**路由替换**：`this.$router.replace()`

**后退**：`this.$router.back()`

**前进**：`this.$router.forward()`

## 52、Vue 怎么实现跨域（必会）

**1）什么是跨域**

​ **跨域指浏览器不允许当前页面的所在的源去请求另一个源的数据**。**源指协议，端口，域名**。只要这个 3 个中有一个不同就是跨域

**2）使用 Vue-cli 脚手架搭建项目时 proxyTable 解决跨域问题**

打开`config/index.js(vue.cofig.js)`在 proxyTable 中添写如下代码：

```js
proxyTable:{
  '/api': {// 使用"/api"来代替"http:/f.apiplus.c"
  target: 'http:/f.apiplus.cn',// 源地址
  changeOrigin:true, // 改变源
  pathRewrite:{
  '^/api':'http:/f.apiplus.cn'// 路径重写
  }
}
```

**3）使用 CORS（跨域资源共享）**

**1、前端设置：**

​ 前端 Vue 设置`axios`允许跨域携带`cookie`（默认是不带 cookie）`axios.defaults.withCredentials = true;`
**2、后端设置：**
​ 1、**跨域请求后的响应头中需要设置**

​ 2、`Access-Control-Alow-Origin`为**发起请求的主机地址**。

​ 3、`Access-Control-Allow-Credentials`，当它被**设置为 true 时**，**允许跨域带 cookie**，但此时`Access-Control-Allow-Origin`**不能为通配符\***。

​ 4、`Access-Control-Allow-Headers`，**设置跨域请求允许的请求头**。

​ 5、`Access-Control-Alow-Methods`，**设置跨域请求允许的请求方式**。

## 53、Vue 中动画如何实现（必会）

哪个元素需要动画就给那个元素加`transition`标签

进入时 class 的类型分为以下几种

```js
<name>-enter
<name>-enter-active
<name>-enter-to
```

离开时 class 的类型分为以下几种

```js
<name>-leave
<name>-leave-active
<name>-leave-to
```

**如果需要一组元素发生动画需要用标签**

`<transition-group><transition-group>`

## 54、你对 Vue.js 的 template 编译的理解？（必会）

​ 简而言之，就是**先转化成 AST 树**，再**得到的 render 函数返回 VNode**（Vue 的虚拟 DOM 节点）
首先，**通过 compile 编译器把 template 编译成 AST 语法树**（abstract syntax tree 即源代码的抽象语法结构的树状表现形式），**compile 是 createCompiler 的返回值，createCompiler 是用以创建编译器的。另外 compile 还负责合并 option**。
​ 然后，**AST 会经过 generate**（将 AST 语法树转化成 render funtion 字符串的过程）**得到 render 函数**，**render 的返回值是 VNode,VNode 是 Vue 的虚拟 DOM 节点**，里面有（**标签名、子节点、文本**等等）

## 55、Vue 渲染模板时怎么保留模板中的 HTML 注释呢？（必会）

在组件中将`comments`选项**设置为 true**

`<template comments>...<template>`

## 56、Vue2.0 兼容 IE 哪个版本以上吗？（必会）

​ **不支持 ie8 及以下**，部分兼容 ie9，**完全兼容 10 以上**，因为 Vue 的响应式原理是基于 es5 的`Object.defineProperty()`，而这个方法不支持 ie8 及以下。

## 57、Vue 如何去除 URL 中的#（必会）

​ `Vue-Router`默认使用`hash`模式，所以在路由加载的时候，**项目中的 URL 会自带”#”**。
如果不想使用“#”，**可以使用 Vue-Router 的另一种模式** `history:new Router({mode:'history',routes:[]})`
​ 需要注意的是，**当我们启用 history 模式的时候**，由于我们的项目是一个单页面应用，所以**在路由跳转的时候，就会出现访问不到静态资源而出现“404”的情况**，这时候就需要**服务端增加一个覆盖所有情况的候选资源**：如果 URL 匹配不到任何静态资源，则应该返回同一个“index.html”页面。

## 58、说一下你在 Vue 中踩过的坑（必会）

​ 1、**第一个是给对象添加属性的时候**，直接通过**给 data 里面的对象添加属性然后赋值**，**新添加的属性不是响应式的**
​ 【**解决办法**】通过`Vue.set(对象,属性,值)`这种方式就可以达到，**对象新添加的属性是响应式的**

2、**在 created 操作 dom 的时候，是报错的，获取不到 dom**，这个时候实例**Vue 实例没有挂载**
【**解决办法**】通过：`Vue.nextTick`（**回调函数进行获取**）

## 59、在 Vue 中使用插件的步骤（必会）

​ **采用 ES6**的`import ... from ... 语法`或 **CommonJS 的 require()方法**引入插件

​ **使用全局方法** `Vue.use(plugin)` 使用插件，可以传入一个选项对象 V`ue.use(MyPlugin,{someOption:true})`

## 60、Vue 项目优化的解决方案都有哪些？（必会）

**1、使用`mini-css-extract-plugin`插件抽离 css**

2、配置`optimization`把公共的 js 代码抽离出来

3、通过`webpack`处理文件压缩

4、不打包框架、库文件，**通过 cdn 的方式引入**

5、**小图片使用**`base64`

6、**配置项目文件懒加载**

7、**UI 库配置按需加载**

8、**开启 Gzip 压缩**

## 61、使用 Vue 的时候一下加载造成页面卡顿，该如何解决？（必会）

​ `Vue-Router`解决**首次加载缓慢**的问题。**懒加载简单来说就是按需加载**

​ 1、像 Vue 这种单页面应用，如果没有应用懒加载，运用 webpack 打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多，时间过长，会出现长时间的白屏，即使做了 loading 也是不利于用户体验。

​ 2、而**运用懒加载**则可以将页面进行划分，**需要的时候加载页面**，可以**有效的分担首页所承担的加载压力，减少首页加载用时**。

​ 3、**用法：在配置路由时使用：**
`component:resolve=>require('@components/路由的路径'],resolve)。`就是用了懒加载后打完包直接运行那个 index.html 会报错，报文件引用错误其实是打包时候路径配置有点问题，找到 build 下面的`webpack.prod.conf.js`添加`publicPath:"./"`

## 62、请说出 Vue-cli 项目中 src 目录每个文件夹和文件的用法？（必会）

1、assets 文件夹是放静态资源

2、components 是放组件

3、router 是定义路由相关的配置

4、view 视图

5、app.Vue 是一个应用主组件

6、main.js 是入口文件

## 63.你知道 style 上加 scoped 属性的原理吗？（必会）

**1）什么是 scoped**

​ 在 Vue 组件中，为了使**样式私有化（模块化）**，**不对全局造成污染**，**可以在 style 标签上添加 scoped 属性以表示它的只属于当下的模块**，**局部有效**。如果一个项目中的所有 Vue 组件 style 标签全部加上了 scoped，相当于实现了**样式的私有化**。如果引用了第三方组件，需要在当前组件中局部修改第三方组件的样式，而又不想去除 scoped 属性造成组件之间的样式污染。此时只能**通过穿透 scoped 的方式来解决，选择器**

**2）scoped 的实现原理：**

Vue 中的 scoped 属性的效果主要通过 PostCSS 转译实现，如下是转译前的 Vue 代码：

```html
<template><div>Vue.js scoped</div></template>
<style scoped>
  .scoped {font-size:14px;)
</style>
```

**浏览器渲染后的代码**：

```html
<div data-v-fed36922>Vue.js scoped</div>
.scoped[data-v-fed36922]{font-size:14px;}
```

即：PostCSS 给所有 dom**添加了一个唯一不重复的动态属性**，然后，给 CSS 选择器额外添加一个对应的属性选择器来选择该组件中 dom，这种做法使得样式私有化

## 64、说说你对 SPA 单页面的理解，它的优缺点分别是什么？（必会）

​ **单页 Web 应用**（single-page application 简称为 SPA）**是一种特殊的 Web 应用**。它将所有的活动**局限于一个 Web 页面中**，仅在该 Web 页面**初始化时加载**相应的`HTML、JavaScript和CSS`。一旦页面加载完成了，**SPA 不会因为用户的操作而进行页面的重新加载或跳转**。取而代之的是利用 JavaScript 动态的变换 HTML 的内容，从而实现 UI 与用户的交互。由于**避免了页面的重新加载**，SPA 可以提供较为**流畅**的用户体验。得益于 ajax，我们可以实现**无跳转刷新**，又多亏了浏览器的`histroy`机制，我们用`hash`的变化从而可以实现推动界面变化。从而模拟元素客户端的单页面切换效果：
​ SPA 被人追捧是有道理的，但是它也有不足之处。当然任何东西都有两面性，以下是卤煮总结的一些目前 SPA 的**优缺点**：

**1）优点：**

1、**无刷新界面**，给用户体验原生的应用感觉

2、**节省**原生（android 和 ios）app 开发**成本**

3、**提高发布效率**，无需每次安装更新包。这个对于 ios 开发人员来说印象尤其深吧。

4、容易借助其他知名平台更有利于营销和推广

5、**符合 web2.0 的趋势**

**2）缺点：**

1、**效果**和**性能**确实和原生的有较大**差距**

2、各个浏览器的版本**兼容性**不一样

3、业务随着代码量增加而增加，**不利于首屏优化**

4、某些平台对 hash 有偏见，有些甚至**不支持 pushstate**

5、**不利于搜索引擎抓取**

## 65.怎样理解 Vue 的单向数据流？（必会）

**数据从父级组件传递给子组件，只能单向绑定。**
**子组件内部不能直接修改从父级传递过来的数据。**
所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会**向下流动**到子组件中，但是反过来则不行。
这样会**防止从子组件意外改变父级组件的状态**，从而导致你的应用的数据流向难以理解。
额外的，**每次父级组件发生更新时**，**子组件**中所有的`props`都将会**刷新为最新的值**。
这意味着你不应该在一个子组件内部改变 prop。如果你这样做了，Vue 会在浏览器的控制台中发出警告。
**子组件想修改时，只能通过$emit 派发一个自定义事件，父组件接收到后，由父组件修改。**

## 66.VNode 是什么？什么是虚拟 DOM？（高薪常问）

**1）VNode 是什么**

VNode 是 JavaScript 对象，VNode 表示 Virtual DOM，**用 JavaScript 对象来描述真实的 DOM 把 DOM 标签，属性，内容都变成对象的属性**。就像使用 JavaScript 对象对一种动物进行说明一样 `{name:'Hello mike',age:18,children:null}`

**2）VNode 的作用**

通过`render`将`template`模版描述成 VNode，然后进行一系列操作之后形成真实的 DOM 进行挂载。

**3）VNode 的优点**

1、**兼容性强**，不受执行环境的影响。VNode 因为是 JS 对象，不管 Node 还是浏览器，都可以统一操作，从而**获得了服务端渲染、原生渲染、手写渲染函数等能力**。

2、**减少操作 DOM**，**任何页面的变化，都只使用 VNode 进行操作对比**，只需要在**最后一步挂载更新 DOM**，不需要频繁操作 DOM，从而**提高页面性能**。

**4）什么是虚拟 DOM？**

**文档对象模型或 DOM 定义了一个接口，该接口允许 JavaScript 之类的语言访问和操作 HTML 文档。** 元素由树中的节点表示，并且接口允许我们操纵它们。但是此接口需要付出代价，大量非常频繁的 DOM 操作会使页面速度变。
**Vue 通过在内存中实现文档结构的虚拟表示来解决此问题**，其中虚拟节点（VNode）表示 DOM 树中的节点。
当需要操纵时，**可以在虚拟 DOM 的内存中执行计算和操作**，而不是在真实 DOM 上进行操纵。这自然会更快，**并且允许虚拟 DOM 算法计算出最优化的方式来更新实际 DOM 结构**，一旦计算出，就将其应用于实际的 DOM 树，这就提高了性能，这就是为什么基于虚拟 DOM 的框架（例如 Vue 和 React）如此突出的原因。

## 67、Vue 中如何实现一个虚拟 DOM？说说你的思路（高薪常问）

**首先要构建一个 VNode 的类**，DOM 元素上的所有属性在 VNode 类实例化出来的对象上都存在对应的属性。例如 tag 表示一个元素节点的名称，text 表示一个文本节点的文本，chlidren 表示子节点等。**将 VNode 类实例化出来的对象进行分类**，例如注释节点、文本节点、元素节点、组件节点、函数式节点、克隆节点。
**然后通过编译将模板转成渲染函数 render，执行渲染函数 render，在其中创建不同类型的 VNode 类，最后整合就可以得到一个虚拟 DOM**（vnode））。
**最后通过 patch 将 vnode 和 oldVnode 进行比较后，生成真实 DOM。**

## 68、Vue 中操作 data 中数组的方法中哪些可以角触发视图更新，哪些不可以，不可以的话有什么解决办法？（高薪常问）

`push()、pop()、shift()、unshift()、splice()、sort()、reverse()` **这些方法会改变被操作的数组**；

`filter()、concat()、slice()` **这些方法不会改变被操作的数组，返回一个新的数组**。**以上方法都可以触发视图更新。**

**利用索引直接设置一个数组项**，例：`this.array[index]=newValue`

**直接修改数组的长度**，例：`this.array.length=newLength`

**以上两种方法不可以触发视图更新**；

可以用`this.$set(this.array,index,newValue)`或`this.array.splice(index,1,newValue)`解決方法 1

可以用`this.array.splice(newLength)`解决方法 2

## 69、Vue 中怎么重置 data？（高薪常问）

要初始化 data 中的数据，**可以使用`Object.assign()`方法**，**实现重置 data 中的数据**，以下就是对该方法的详细介绍，以及如何使用该方法，重置 data 中的数据

1）`Object.assign() `**方法基本定义**

`Object.assign()`方法用于**将所有可枚举属性的值从一个或多个源对象复制到目标对象**。**它将返回目标对象。**
**用法：** `Object.assign(target,sources`)，**第一个参数是目标对象**，**第二个参数是源对象**，**就是将源对象属性复制到目标对象，返回目标对象**

**2）具体使用方式**

使用`Object.assign()`，`vm.$data`可以获取当前状态下的 data, `vm.$options.data(this)`可以**获取到组件初始化状态下的 data**，复制`Object.assign(this.$data,this.$options.data(this))` // **注意加 this，不然取不到**data(){a:this.methodA}中的 this.methodA。

## 70、如何对 Vue 首屏加载实现优化？（高薪常问）

1、**把不常改变的库放到 index.html 中，通过 cdn 引入**

2、 **Vue 路由的懒加载**

3、**不生成 map 文件**

4、 **Vue 组件尽量不要全局引入**

5、**使用更轻量级的工具库**

6、**开启 gzip 压缩**

7、**首页单独做服务端渲染**

## 71、Vue 的 nextTick 的原理是什么？（高薪常问）

1.为什么需要`nextTick`,Vue 是**异步修改 DOM 的并且不鼓励开发者直接接触 DOM**，但有时候业务需要必须对数据更改-- 刷新后的 DOM 做相应的处理，这时候就可以使用`Vue.nextTick(callback)`这个 api 了。

2.理解原理前的准备首先需要知道事件**循环中宏任务和微任务**这两个概念，**常见的宏任务有**： `script,setTimeout,setInterval,setImmediate,I/O,UI rendering` **常见的微任务有：** `process.nextTick(Nodejs)，Promise.then(),MutationObserver`

3.**理解 nextTick 的原理正是 Vue 通过异步队列控制 DOM 更新和 nextTick 回调函数先后执行的方式**。如果大家看过这部分的源码，会发现其中做了很多 `isNative()` 的判断，因为这里还存在兼容性优雅降级的问题。可见 Vue 开发团队的深思熟虑，对性能的良苦用心。

## 72、在 Vue 实例中编写生命周期 hook 或其他 option/。propertie 时，为什么不使用箭头函数？（高薪常问）

**箭头函数自己没有定义 this 上下文，而是绑定到其父函数的上下文中**。当你在 Vue 程序中使用箭头函数（=>）时，**this 关键字病不会绑定到 Vue 实例**，因此会引发错误。所以**强烈建议改用标准函数声明**。

## 73、is 这个特性你有用过吗？主要用在哪些方面？（高薪常问）

**1）动态组件**
`<component :is="componentName"></component>`，`componentName`可以是在本页面已经注册的**局部组件名和全局组件名**，也可以是一个**组件的选项对象**。**当控制 componentName 改变时就可以动态切换选择组件。**

**2）is 的用法**

有些 HTML 元素，诸如`<ul>、<ol>、<table>`和`<select>`，对于哪些元素可以出现在其内部是有严格限制的。
而有些 HTML 元素，诸如`<i>、<tr>`和`<option>`，**只能出现在其它某些特定的元素内部。**

```html
<ul>
  <card-list></card-list>
</ul>
```

所以上面`<card-ist></card-ist>`会被作为无效的内容提升到外部，并导致最终渲染结果出错。应该这么写：

```html
<ul>
  <li is="cardList"></li>
</ul>
```

## 74、scss 是什么？在 Vue.cli 中的安装使用步骤是？有哪几大特性？（高薪常问）

**答：css 的预编译。**

**使用步骤：**

**第一步：** 先装`css-loader、node-loader、sass-loader`等加截器模块

**第二步**：在 build 目录找到`webpack.base.config.js`，在那个 extends 属性中加个拓展 scss

**第三步**：在同一个文件，配置一个 module 属性

**第四步**：然后在组件的 style 标签加上 lang 属性，例如：ang=”scss” 特性可以用变量，例如（$变量名称=值）；可以用混合器，例如（）可以嵌套

## 75、请详细个绍一些 package.json 中的配置的作用（了解）

1、**Name 项目名称**

2、**Version：项目版本**

3、**Description：项目描述**

4、**Author：作者**

5、**Prinate：项目是否私有**

6、**Scripts:npm run 命令用于调用 node 执行的 js 文件**

## 76、简述 Vue3 和 Vue2 有哪些差异？

**1、Vue3 的新特性**

- 性能的提升
- Tree-shaking 支持
- Composition API
- Fragment、Teleport、。Suspense
- 更好的 TS 支持，自定义渲染 AP

**2、Vue3 关于性能方面的优化**

- 引入 tree-shaking 的技术，减少打包体积。
- 数据劫持优化，使用 Proy 代替 defineProperty 实现数据响应式，
- renderTriggered 生命周期
- 输出代码将更易于针对 JavaScript 编译器进行优化
- 输出代码通常会更好地进行优化
- 由于改进了补丁算法，将避免不必要的 parent/children 重新渲染
