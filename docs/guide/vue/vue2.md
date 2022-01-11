---
title: vue2.0基础部分
date: 2022-01-07
categories:
  - vue框架
tags:
  - vue2
---

::: tip
vue2基础解释，基本内容，源于禹哥
:::

<!-- more -->

### markdown 正文


# Vue2.0_basic
## 初识Vue

```html
	引入Vue 的两个源文件
	<script type="text/javascript" src="../js/vue.js"></script>
	<script type="text/javascript" src="../js/vue.min.js"></script>

	大致模块-> root容器、Vue实例、
	<div id='#root'>{{uname}},{{address}}</div>
	
	<script type="text/javascript">
		Vue.config.productionTip = false // 阻止 vue 在启动时生成生产提示。

		new Vue({
			el: '.root2',
			data: {
				uname: 'aiguigu',
				address: '北京'
			}
		})
	</script>
```



## Vue模板语法

```js
	Vue模板语法有两大类
		1.插值语法
			写法：{{xxx}} xxx是js表达式，且可以直接读取到data中的所有属性。
		2.指令语法
			v-bind: ---> : 简写
```
## 数据绑定

```js
	Vue中有2种数据绑定的方式：
		1.单向绑定(v-bind)：数据只能从data流向页面。 v-bind: ---> :
		2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
			v-model:value ---> v-model
			v-model只能应用在表单类元素（输入类元素）上 <input>
```

## el于data的两张写法

```js
	1.el有2种写法
		(1).new Vue时候配置el属性。---> 
		(2).先创建Vue实例，随后再通过v.$mount('#root')指定el的值。
			1.el:'#root'	2.vm.$mount('#root)
	2.data有2种写法
		(1).对象式	data:{}
		(2).函数式	data(){}
		
```

## MVVM模型
```js
	MVVM模型
		1. M：模型(Model) ：data中的数据
		2. V：视图(View) ：模板代码
		3. VM：视图模型(ViewModel)：Vue实例
```

## 数据代理

```js
	Object.defineproperty方法 (四大属性)
		value: 值,
		enumerable:true, //控制属性是否可以枚举，默认值是false
		writable:true, //控制属性是否可以被修改，默认值是false
		configurable:true //控制属性是否可以被删除，默认值是false
		读：get()--->getter		写：set(value)--->setter
```
> 数据代理简单案例

```js
	<!-- 数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）-->
		<script type="text/javascript" >
			let obj = {x:100}
			let obj2 = {y:200}

			Object.defineProperty(obj2,'x',{
				get(){
					return obj.x
				},
				set(value){
					obj.x = value
				}
			})
		</script>
```

## 事件处理

```js
	事件的基本使用：
		1.使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名；
		2.事件的回调需要配置在methods对象中，最终会在vm上；
		3.methods中配置的函数，不要用箭头函数！否则this就不是vm了；
		4.methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象；
		5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；
			Vue点击事件 v-on:xx ---> @xx ：v-on:click ---> @click
```
> 事件修饰符

```js
	1.prevent：阻止默认事件（常用）；@click.prevent
	2.stop：阻止事件冒泡（常用）；@click.stop
	3.once：事件只触发一次（常用）；@click.once
	4.capture：使用事件的捕获模式；@click.capture
	5.self：只有event.target是当前操作的元素时才触发事件；@click.self
	6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；@scroll.passive
```
> 键盘事件

```js
	1.Vue中常用的按键别名：
		回车 => enter
		删除 => delete (捕获“删除”和“退格”键)
		退出 => esc
		空格 => space
		换行 => tab (特殊，必须配合keydown去使用)
		上 => up
		下 => down
		左 => left
		右 => right
	2.系统修饰键（用法特殊）：ctrl、alt、shift、meta
		(1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
		(2).配合keydown使用：正常触发事件。
```

## 计算属性

```js
	计算属性：
		1.定义：要用的属性不存在，要通过已有属性计算得来。
		2.原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
		3.get函数什么时候执行？
			(1).初次读取时会执行一次。
			(2).当依赖的数据发生改变时会被再次调用。
		4.优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
		5.备注：
			1.计算属性最终会出现在vm上，直接读取使用即可。
			2.如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。
			
	代码演示 简写于全写
	computed:{
		//完整写法
		/* fullName:{
			get(){
				console.log('get被调用了')
				return this.firstName + '-' + this.lastName
			},
			set(value){
				console.log('set',value)
				const arr = value.split('-')
				this.firstName = arr[0]
				this.lastName = arr[1]
			}
		} */
		//简写
		fullName(){
			console.log('get被调用了')
			return this.firstName + '-' + this.lastName
		}
	}
```

## 监视(侦听)属性

```js
	监视属性watch：
		1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作
		2.监视的属性必须存在，才能进行监视！！
		3.监视的两种写法：
			(1).new Vue时传入watch配置
			methods:{
				isHot:{
					immediate:true,
					deep:true,
					handler(newValue,oldValue){
						console.log("isHot别修改了",newValue,oldValue)
						}
					}
				}
			简写
			isHot(newValue, oldValue) {
				console.log('isHot被修改了', newValue, oldValue)
			}
			
			(2).通过vm.$watch监视
			vm.$watch('isHot', {
				immediate: true, // 初始化让handler调用一下
				deep:true,
				handler(n1, n2) {
					console.log('isHot被修改了', n1, n2);
				}
			})
			vm.$watch('isHot', function (newValue, oldValue) {
				console.log('isHot被修改了', newValue, oldValue)
			})
			
```
> 深度监视

```js
	深度监视： deep:true
		(1).Vue中的watch默认不监测对象内部值的改变（一层）。
		(2).配置deep:true可以监测对象内部值改变（多层）。
	备注：
		(1).Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以！
		(2).使用watch时根据数据的具体结构，决定是否采用深度监视。
```

## 绑定样式

```js
	绑定样式：
		1. class样式
			写法:class="xxx" xxx可以是字符串、对象、数组。
				字符串写法适用于：类名不确定，要动态获取。
				对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
				数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
		2. style样式
			:style="{fontSize: xxx}"其中xxx是动态值。
			:style="[a,b]"其中a、b是样式对象。
```

## 条件渲染

```js
	条件渲染：v-if v-else-if v-else		v-show		显示/隐藏(true/false)
		1.v-if
			写法：
				(1).v-if="表达式" 
				(2).v-else-if="表达式"
				(3).v-else="表达式"
			适用于：切换频率较低的场景。
			特点：不展示的DOM元素直接被移除。
			注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。

		2.v-show
			写法：v-show="表达式"
			适用于：切换频率较高的场景。
			特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
			
		3.备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。
```
## 列表渲染
> 基本列表

```js
	v-for指令:
		1.用于展示列表数据
		2.语法：v-for="(item, index) in xxx" :key="yyy" v-for="(item,index) of xxx" :key="yyy"
		3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）
		4.你也可以用 of 替代 in 作为分隔符，因为它更接近 JavaScript 迭代器的语法：
```

```js
	Vue监视数据的原理：
		1. vue会监视data中所有层次的数据。

		2. 如何监测对象中的数据？
			通过setter实现监视，且要在new Vue时就传入要监测的数据。
				(1).对象中后追加的属性，Vue默认不做响应式处理
				(2).如需给后添加的属性做响应式，请使用如下API：
					Vue.set(target，propertyName/index，value) 或 
					vm.$set(target，propertyName/index，value)

		3. 如何监测数组中的数据？
			通过包裹数组更新元素的方法实现，本质就是做了两件事：
				(1).调用原生对应的方法对数组进行更新。
				(2).重新解析模板，进而更新页面。

		4.在Vue修改数组中的某个元素一定要用如下方法：
			1.使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
			2.Vue.set() 或 vm.$set()
		
		特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！
```

## 收集表单数据

```js
	收集表单数据：
		若：<input type="text"/>，则v-model收集的是value值，用户输入的就是value值。
		若：<input type="radio"/>，则v-model收集的是value值，且要给标签配置value值。
		若：<input type="checkbox"/>
			1.没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
			2.配置input的value属性:
				(1)v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
				(2)v-model的初始值是数组，那么收集的的就是value组成的数组
		备注：v-model的三个修饰符：
			lazy：失去焦点再收集数据
			number：输入字符串转为有效的数字
			trim：输入首尾空格过滤
```

## 过滤器

```js
	过滤器：
		定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
		语法：
			1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
			2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
		备注：
			1.过滤器也可以接收额外参数、多个过滤器也可以串联
			2.并没有改变原本的数据, 是产生新的对应的数据
```

## 内置指令
> v-text

```js
	我们学过的指令：
		v-bind	: 单向绑定解析表达式, 可简写为 :xxx
		v-model	: 双向数据绑定
		v-for  	: 遍历数组/对象/字符串
		v-on   	: 绑定事件监听, 可简写为@
		v-if 	: 条件渲染（动态控制节点是否存存在）
		v-else 	: 条件渲染（动态控制节点是否存存在）
		v-show 	: 条件渲染 (动态控制节点是否展示)
	v-text指令：
		1.作用：向其所在的节点中渲染文本内容。
		2.与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会。
```
> v-html

```js
	v-html指令：
		1.作用：向指定节点中渲染包含html结构的内容。
		2.与插值语法的区别：
			(1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
			(2).v-html可以识别html结构。
		3.严重注意：v-html有安全性问题！！！！
			(1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
			(2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！
```
> v-cloak

```js
	v-cloak指令（没有值）：
		1.本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
		2.使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。
```

> v-once

```js
	v-once指令：
		1.v-once所在节点在初次动态渲染后，就视为静态内容了。
		2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。
```

> v-pre

```js
	v-pre指令：
		1.跳过其所在节点的编译过程。
		2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。
```

## 自定义内置指令

```js
	需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。
	需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。
		自定义指令总结：
			一、定义语法：
				(1).局部指令：
					new Vue({	directives:{指令名:配置对象}		}) 		
					或  											
					new Vue({	directives{指令名:回调函数}		})
																		
				(2).全局指令：
					Vue.directive(指令名,配置对象) 或   Vue.directive(指令名,回调函数)

			二、配置对象中常用的3个回调：
				(1).bind：指令与元素成功绑定时调用。
				(2).inserted：指令所在元素被插入页面时调用。
				(3).update：指令所在模板结构被重新解析时调用。

			三、备注：
				1.指令定义时不加v-，但使用时要加v-；
				2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。
```

## 生命周期

```js
	常用的生命周期钩子：
		1.mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
		2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。
	
	关于销毁Vue实例
		1.销毁后借助Vue开发者工具看不到任何信息。
		2.销毁后自定义事件会失效，但原生DOM事件依然有效。
		3.一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。
	
	涉及到得生命周期钩子：beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed
```

## 非单文件组件
> 基本使用

```js
	Vue中使用组件的三大步骤：
		一、定义组件(创建组件)
		二、注册组件
		三、使用组件(写组件标签)

	一、如何定义一个组件？
		使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；
		区别如下：
			1.el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
			2.data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
		备注：使用template可以配置组件结构。

	二、如何注册组件？
		1.局部注册：靠new Vue的时候传入components选项
		2.全局注册：靠Vue.component('组件名',组件)

	三、编写组件标签：
		<school></school>	<组件名></组件名>
```

## 单文件组件

```js
	1.创建需要的组件（.vue）后缀
	2.创建main.js 引入组件，并创建vm
	3.创建html 容器root 并引入
```
