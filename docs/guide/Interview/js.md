---
title: JS·烧脑面试 20 
date: 2022-01-10
categories:
  - 面试题
tags:
  - js20题
---

::: tip
源于黑马的20道js面试练习题
:::

<!-- more -->

# #markdown 正文

## 一
```js
let a = 1
function b(a) {
  a = 2
  console.log(a)
}
b(a)
console.log(a)
```
答案：
::: details
1
**解析：**
首先基本类型数据是按值传递的，所以执行 b 函数时，b 的参数 a 接收的值为 1，参数 a 相
当于函数内部的变量，当本作用域有和上层作用域同名的变量时，无法访问到上层变量，所
以函数内无论怎么修改 a，都不影响上层，所以函数内部打印的 a 是 2，外面打印的仍是 1
:::

<hr>

## 二
```js
function a (b = c, c = 1) {			
  console.log(b, c)
}
a()
```
答案
::: details
报错
**解析**
给函数多个参数设置默认值实际上跟按顺序定义变量一样，所以会存在暂时性死区的问题，
即前面定义的变量不能引用后面还未定义的变量，而后面的可以访问前面的。
:::

<hr>

## 三
```js
let a = b = 10				==> let a = b; let b = 10;
;(function(){
  let a = b = 20			==> let a = b; let b = 20;
})()
console.log(a)
console.log(b)
```
答案
:::details
10、20
**解析**
连等操作是从右向左执行的，相当于 b = 10、let a = b，很明显 b 没有声明就直接赋值了，
所以会隐式创建为一个全局变量，函数内的也是一样，并没有声明 b，直接就对 b 赋值了，
因为作用域链，会一层一层向上查找，找了到全局的 b，所以全局的 b 就被修改为 20 了，
而函数内的 a 因为重新声明了，所以只是局部变量，不影响全局的 a，所以 a 还是 10。
:::

<hr>

## 四
```js
var a = {n:1}
var b = a 
a.x = a = {n:2}				==> ({n: 1, x: undefined}).x = b.x = a = {n: 2}
console.log(a.x)
console.log(b.x)
```
答案
:::details
undefined、{n: 2}
**解析**
因为.运算符优先级最高，所以会先执行 a.x，此时 a、b 共同指向的{n: 1}变成了{n: 1, x:
undefined}，然后按照连等操作从右到左执行代码，a = {n: 2}，显然，a 现在指向了一个新对象，
然后 a.x = a，因为 a.x 最开始就执行过了，所以这里其实等价于：({n: 1, x: undefined}).x = b.x = a = {n: 2}
:::

<hr>

## 五
```js
var arr = [0, 1, 2]
arr[10] = 10
console.log(arr.filter(function (item) {		item ==> 代表arr的每个元素
  return item === undefined
}))
```
答案
:::details
[]
**解析**
这题比较简单，arr[10]=10，那么索引 3 到 9 位置上都是 undefined，arr[3]等打印出来也确
实是 undefined，但是，这里其实涉及到 ECMAScript 版本不同对应方法行为不同的问题，
ES6 之前的遍历方法都会跳过数组未赋值过的位置，也就是空位，但是 ES6 新增的 for of
方法就不会跳过。
:::

filter也是一个常用的操作，它用于把Array的某些元素过滤掉，然后返回剩下的元素。
和map()类似，Array的filter()也接收一个函数。和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是true还是false决定保留还是丢弃该元素。

filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
注意： filter() 不会对空数组进行检测。
注意： filter() 不会改变原始数组

<hr>

## 六
```js
var name = 'World' 
;(function () {
if (typeof name === 'undefined') {
  var name = "Jack"
  console.info('Goodbye ' + name)
} else {
  console.info('Hello ' + name)
}
})()
```
答案
:::details
Goodbye Jack
**解析**
这道题考察的是`变量提升`的问题，var 声明变量时会把变量自动提升到当前作用域顶部，所
以函数内的 name 虽然是在 if 分支里声明的，但是也会提升到外层，因为和全局的变量 name
重名，所以访问不到外层的 name，最后因为已声明未赋值的变量的值都为 undefined，导
致 if 的第一个分支满足条件

```js
var name;
()(); 		name ==> undefined
name = 'world'
```
:::
<hr>

## 七
```js
console.log(1 + NaN)
console.log("1" + 3)
console.log(1 + undefined)
console.log(1 + null)
console.log(1 + {})
console.log(1 + [])
console.log([] + {})
```
答案
:::details
NaN、13(string)、NaN、1、1[object Object]、1、[object Objec]
解析
这道题考察的显然是+号的行为：
1.如果有一个操作数是`字符串`，那么把另一个操作数转成字符串执行连接
2.如果有一个操作数是`对象`，那么调用对象的 `valueOf` 方法转成原始值，如果没有该方法或调用后仍是**非原始值**，则调用 `toString` 方法
3.**其他情况下**，两个操作数都会被转成数字执行加法操作
:::

<hr>

## 八
```js
var a={}, 
    b={key:'b'},  
    c={key:'c'}
a[b]=123
a[c]=456
console.log(a[b])
```
答案
:::details
456
解析
对象有两种方法设置和引用属性，`obj.name` 和 `obj['name']`，方括号里可以字符串、数字和变量设置是表达式等，
但是最终计算出来得是一个字符串，对于上面的 b 和 c，它们两个都是对象，**所以会调用 toString()方法转成字符串**，对象转成字符串和数组不一样，和内容无关，结果都是**[object Obejct]**，所以 `a[b]=a[c]=a['[object Object]']`。
:::

<hr>

## 九 ★
```js
var out = 25
var inner = {
  out: 20,
  func: function () {
    var out = 30
    return this.out
  }
};
console.log((inner.func, inner.func)())
console.log(inner.func())
console.log((inner.func)())
console.log((inner.func = inner.func)())
```
答案
:::details
答案
25、20、20、25
**解析**
这道题考察的是 **this 指向问题：**
1.逗号操作符会返回表达式中的最后一个值，这里为 **inner.func 对应的函数**，注意是**函数本身**，然后执行该函数，该函数并不是通过对象的方法调用，而是在**全局环境下调用**，所以 this指向 window，打印出来的当然是 window 下的 out
function () { var out = 30  return this.out }
2.这个显然是以对象的方法调用，那么 **this 指向该对象**
3.加了个括号，看起来有点迷惑人，但实际上**(inner.func)和 inner.func** 是完全相等的，所以还是作为对象的方法调用
4.**赋值表达式和逗号表达式相似**，都是返回的值本身，所以也相对于在全局环境下调用函数

:::
<hr>

## 十
```js
1. let {a,b,c} = { c:3, b:2, a:1 }
2. console.log(a, b, c)
```
答案
:::details
1、2、3
**解析**
这题考察的是变量解构赋值的问题，数组解构赋值是按位置对应的，而对象只要变量与属性
同名，顺序随意。
:::

<hr>

## 十一
```js
1. console.log(Object.assign([1, 2, 3], [4, 5]))
```
答案
:::details
[4, 5, 3]
**解析**
是不是从来没有用 assign 方法合并过数组？assign 方法可以用于处理数组，不过会把数组视为对象，比如这里会把目标数组视为是属性为 0、1、2 的对象，所以源数组的 0、1 属性的值覆盖了目标对象的值。
:::
`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象
**Object.assign(target, ...sources)**	target：目标对象；	sources：源对象
如果目标对象中的属性**具有相同的键**，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。
**Object.assign** 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。

String类型和 Symbol 类型的属性都会被拷贝。
<hr>

## 十二
```js
var x=1
switch(x++)
{
  case 0: ++x 
  case 1: ++x 
  case 2: ++x 
}
console.log(x)
```
答案
:::details
4
**解析**
这题考查的是自增运算符的前缀版和后缀版，以及 switch 的语法，后缀版的自增运算符会在语句被求值后才发生，
所以 x 会仍以 1 的值去匹配 case 分支，那么显然匹配到为 1 的分支，x=1
此时，x++生效，x 变成 2，再执行++x，变成 3，因为没有 break 语句，
所以会进入当前 case 后面的分支(case 2: ==> x=4)，所以再次++x，最终变成 4
:::

<hr>

## 十三
```js
console.log(typeof undefined == typeof NULL)
console.log(typeof function () {} == typeof class {})
```
答案
:::details
true、true
**解析**
1.首先不要把 **NULL 看成是 null**，js 的关键字是区分大小写的，所以这就是一个**普通的变量**，
而且没有声明，typeof 对没有声明的变量使用是不会报错的，返回'undefined'，
typeof 对undefined 使用也是'undefined'，所以两者相等
2.typeof 对函数使用返回'function'，class 只是 es6 新增的语法糖，本质上还是**函数**，所以两者相等  ==> function -- function
:::

<hr>

## 十四
```js
var count = 0
console.log(typeof count === "number")
console.log(!!typeof count === "number")
```
答案
:::details
true、false
**解析**
1.没啥好说的，typeof 对数字类型返回'number'。
2.这题考查的是运算符优先级的问题，逻辑非!的优先级比全等===高，所以先执行!!typeof count，
`typeof count ==> number ( !number) == false  !false == true`
结果为 true，然后执行 true === 'number'，结果当然为 false。
:::

<hr>

## 十五
```js
"use strict" 
a = 1
var a = 2
console.log(window.a)
console.log(a)
```
答案
:::details
2、2
**解析**
var 声明会把**变量提升**到当前作用域顶部，所以 a=1 并不会报错，另外在全局作用域下使用
var 声明变量，该变量会变成 window 的一个属性，以上两点都和是否在**严格模式下无关**。
**把var改成let时**，则会报错
:::

<hr>

## 十六 ★
```js
var i = 1
function b() {
  console.log(i)
}
function a() {
  var i = 2
  b()
}
a()
```
答案
:::details
**1**
**解析**
这道题考察的是作用域的问题，作用域其实就是一套变量的查找规则，每个函数在执行时都会创建一个执行上下文，

其中会关联一个变量对象，也就是它的作用域，上面保存着该函数能访问的所有变量，

另外上下文中的代码在执行时还会创建一个作用域链，如果某个标识符在当前作用域中没有找到，

会沿着外层作用域继续查找，直到最顶端的全局作用域，因为 js是词法作用域，在写代码阶段就作用域就已经确定了，

换句话说，是在函数定义的时候确定的，而不是执行的时候，所以 a 函数是在全局作用域中定义的，虽然在 b 函数内调用，

但是它只能访问到全局的作用域而不能访问到 b 函数的作用域。
:::

<hr>

## 十七
```js
var obj = {
  name: 'abc',
  fn: () => {
      console.log(this.name)
  }
}
obj.name = 'bcd'
obj.fn()
```
答案
:::details
undefined  /  空
解析
这道题考察的是 **this 的指向问题**，**箭头函数**执行的时候上下文是**不会绑定 this 的**，所以它
里面的 this 取决于外层的 this，这里函数执行的时候外层是全局作用域，所以 this 指向
window，window 对象下没有 name 属性，所以是 undefined
:::

<hr>

## 十八
```js
const obj = {
  a: {
    a: 1
  }
};
const obj1 = {
  a: {
    b: 1
  }
};
console.log(Object.assign(obj, obj1))
```
答案
:::details
{a: {b: 1}}
解析
这道题很简单，因为 **assign** 方法执行的是**浅拷贝**，所以源对象的 a 属性会**直接覆盖**目标对象的 a 属性
:::

<hr>

## 十九
```js
setTimeout(function() {
  console.log(1)
}, 0)
new Promise(function(resolve) {
  console.log(2)
  for( var i=0 ; i<10000 ; i++ ) {
  i == 9999 && resolve()
  }
  console.log(3)
}).then(function() {
  console.log(4)
})
console.log(5)
```
答案
:::details
**2、3、5、4、1**
**解析**
**这道题显然考察的是事件循环的知识点。**
js 是一门单线程的语言，但是为了执行一些异步任务时不阻塞代码，以及避免等待期间的资源浪费，

js 存在事件循环的机制，单线程指的是执行 js 的线程，称作主线程，其他还有一些比如网络请求的线程、定时器的线程，

主线程在运行时会产生执行栈，栈中的代码如果调用了异步 api 的话则会把事件添加到事件队列里，

只要该异步任务有了结果便会把对应的回调放到【任务队列】里，当执行栈中的代码执行完毕后会去读取任务队列里的任务，

放到主线程执行，当执行栈空了又会去检查，如此往复，也就是所谓的事件循环。

异步任务又分为【宏任务】（比如 setTimeout、setInterval）和【微任务】（比如 promise），
它们分别会进入不同的队列，执行栈为空完后会优先检查微任务队列，如果有微任务的话会一次性执行完所有的微任务，

然后去宏任务队列里检查，如果有则取出一个任务到主线程执行，执行完后又会去检查微任务队列，如此循环。

回到这题，首先整体代码作为一个宏任务开始执行，遇到 setTimeout，相应回调会进入宏任务队列，

然后是 promise，promise 的回调是同步代码，所以会打印出 2，for 循环结束后调用了 resolve，

所以 then 的回调会被放入微任务队列，然后打印出 3，最后打印出 5，到这里当前的执行栈就空了，那么先检查微任务队列，

发现有一个任务，那么取出来放到主线程执行，打印出 4，最后检查宏任务队列，把定时器的回调放入主线程执行，打印出 1。

:::
<hr>

## 二十 ★
```js
function Foo() {
  getName = function () { console.log(1) }
  return this 
}
Foo.getName = function () { console.log(2) }
Foo.prototype.getName = function () { console.log(3) }
var getName = function () { console.log(4) }
function getName() { console.log(5) }
//请写出以下输出结果：
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()
```
答案
:::details
**2、4、1、1、2、3、3**
**解析**
这是一道综合性题目，首先 **getName** 函数声明会先**提升**，然后 getName 函数表达式提升，但是因为函数声明提升在线，

所以忽略函数表达式的提升，然后开始执行代码，执行到 var getName= ...时，修改了 getName 的值，赋值成了**打印 4** 的新函数。

1.执行 Foo 函数的静态方法，打印出 2。  `Foo.getName = function () { console.log(2) }`

2.执行 getName，当前 getName 是打印出 4 的那个函数。

3.执行 Foo 函数，修改了全局变量 getName，赋值成了打印 1 的函数，然后返回 this，因为是在全局环境下执行，
所以 **this 指向 window**，因为 getName 已经被修改了，所以**打印出 1**。

4.因为 getName 没有被重新赋值，所以再执行仍然打印出 1。

5.new 操作符是用来调用函数的，所以 new Foo.getName()相当于 new (Foo.getName)()，
所以 **new 的是 Foo 的静态方法 getName**，打印出 2。

6.因为点运算符（.）的优先级和 new 是一样高的，所以从左往右执行，相当于**(newFoo()).getName()**，
对 Foo 使用 new 调用会返回一个新创建的对象，然后执行该对象的getName 方法，该对象本身并没有该方法，
所以会从 Foo 的原型对象上查找，找到了，所以打印出 3。

7.和上题一样，点运算符（.）的优先级和 new 一样高，另外 new 是用来调用函数的，所以
new new Foo().getName()相当于 **new ((new Foo()).getName)()**，括号里面的就是上一题，
所以最后找到的是 Foo 原型上的方法，无论是直接调用，还是通过 new 调用，都会执行该方法，所以打印出 3
:::

<hr>

