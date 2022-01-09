---
title: js原型链详解
date: 2022-01-08
author: 努力学习的汪 - MC猴
categories:
  - JS
tags:
  - js原型链
---

::: tip
原型链的具体讲解，单独抽出，整合自[努力学习的汪](https://gitee.com/hongjilin/hongs-study-notes),侵权删
:::

<!-- more -->

# #markdown 正文

# 原型与原型链的概念解读

## 1、原型与原型链

> ### 什么是原型呢?
>
> > 你可以这么理解: 每一个 JS 对象(除了 Null) 在创建时就会与之关联的另一个对象,这个对象就是我们所说的原型,每一个对象都会从自己的 '原型对象' 中继承属性
>
> > - 每个函数都有一个 prototype 属性,它默认指向一个 Object 空对象(即成为原型对象)
> > - Prototype 对象默认有两个属性: constructor 属性 和 `_proto_`属性
> > - prototype 上的 constructor 属性包含了一个指针,指回原函数(`fun.prototype.constructor-->fun`)
>
> ### prototype 属性的作用?
>
> > - 给原型对象添加属性(一般都是方法): 函数的所有 实例对象 自动拥有原型中的属性(方法)
> > - 所以说,JS 的继承机制就是通过原型对象实现继承的,原型对象的作用就是定义所有实例对象共享的属性与方法
>
> ###### 什么是原型链?
>
> > 每个对象都可以有一个隐式原型 `_proto_`, 这个原型还可以有它自己的原型,以此类推形成一个原型链:
>
> > - 查找特定属性的时候,我们先去这个对象里面去找
> > - 如果没有的话就去它的原型对象里面去找
> > - 如果还没有就再去原型对象的原型对象里去找..........
>
> > 这个操作被委托在整个原型链上,这个就是我们所说的原型链了
>
> ###### 原型链结论
>
> > - `_proto_`是原型链查询中实际用到的,它总是指向显式原型 `prototype`
> > - prototype 是函数独有的,在定义构造函数时自动创建,它总是被创建的实例的 `_proto_` 所指
> > - 所有对象都有`_proto_`属性,**函数这个特殊对象** 除了具有`_proto_`属性,还有特有的原型属性`Prototype`(因为它本身也是一种对象)

---

### 2、Prototype 与 `_proto_` 区别与关系

> - 每一个函数 function 都有一个 `prototype` ,即显式原型
>
> - 每个实例对象都有一个 `_proto_` ,即隐式原型
>
> - 对象的 隐式原型(`_proto_`) 的值 为其 对应构造函数的 显示原型(`prototype`) 的值
>
> > 可以这样理解 构造函数的 prototype <-- 默认创建的 Object(指向此地址值) --> 对象的`_proto_`
>
> - 隐式原型为对象独有的,而 显式原型(它是一个对象) 是函数独有的
>
> **总结**
>
> - 函数的 `prototype` 属性: 在定义函数时自动添加的,默认值时一个空 Object 对象
> - 对象的 `_proto_` 属性: 创建对象时自动添加的, 默认值为 `构造函数的 protopyte 属性值`
> - 程序员 可以直接操作 显式原型 而不能直接操作隐式原型(ES6 之前)
> - prototype 属性可以给函数和对象添加可共享(继承)的方法、属性,而`_proto_`是查找某函数或对象的原型链的方法
>
> ###### 图
>
> > ![image-20211025145849223](/img/image-20211025145849223.png)

---

### 3、如何理解构造函数，原型对象和实例的关系

> - 每个构造函数都有一个原型对象(prototype)
> - 原型对象都包含一个指向构造函数的指针(prototype 中有 constructor)
> - 而实例都包含一个原型对象的指针(实例的`_proto_` 的值 指向 原型对象 prototype 的值)
>
> ![image-20211025150900591](/img/image-20211025150900591.png)
>
> ###### 构造函数
>
> > 构造函数特点: 1. 函数体内使用 this 关键字,代表了所要生成的对象实例 2. 生成对象,必须使用 new 关键字实例化
>
> ###### instanceof 用法:可以忽略 new 用构造函数声明实例
>
> > ```js
> > function Person(name) {
> >   // 判断this是否指向了当前的实例
> >   if (this instanceof Person) {
> >     // this指向了当前的实例，外部使用了关键字new
> >     this.name = name
> >   } else {
> >     // this指向window，外部没有使用关键字new
> >     return new Person(name)
> >   }
> > }
> > var p1 = new Person('咚咚')
> > var p2 = Person('锵锵')
> > console.log('p1', p1)
> > console.log('p2', p2)
> > ```

---

# 原型与原型链具体讲解

## 1、原型与原型链

### Ⅰ-原型 [prototype]

> 1.  函数的`prototype`属性
>
> - 每个函数都有一个 prototype 属性, 它默认指向一个 Object 空对象(即称为: 原型对象)
> - 原型对象中有一个属性 constructor, 它指向函数对象
> - ![image-20210714201049312](/img/image-20210714201049312.png)
>
> 2.  给原型对象添加属性(`一般都是方法`)
>
> - 作用: 函数的所有实例对象自动拥有原型中的属性(方法)
>
> 3.  代码示例
>
> ```js
> // 每个函数都有一个prototype属性, 它默认指向一个Object空对象(即称为: 原型对象)
> console.log(Date.prototype, typeof Date.prototype)
> function Fun() {}
> console.log(Fun.prototype) // 默认指向一个Object空对象(没有我们的属性)
>
> // 原型对象中有一个属性constructor, 它指向函数对象
> console.log(Date.prototype.constructor === Date)
> console.log(Fun.prototype.constructor === Fun)
>
> //给原型对象添加属性(一般是方法) ===>实例对象可以访问
> Fun.prototype.test = function () {
>   console.log('test()')
> }
> var fun = new Fun()
> fun.test()
> ```

### Ⅱ-显式原型与隐式原型

> 1.  每个函数 function 都有一个`prototype`，即`显式`原型(属性)
>
> 2.  每个实例对象都有一个[`__ proto __`]，可称为`隐式`原型(属性)
>
> 3.  对象的隐式原型的值为其对应构造函数的显式原型的值
>
> 4.  内存结构
>
> ![image-20210714203043314](/img/image-20210714203043314.png)
>
> 5.  总结:
>
> - 函数的[`prototype`]属性: 在定义函数时自动添加的, 默认值是一个空 Object 对象
> - 对象的[`__ proto __`]属性: 创建对象时自动添加的, `默认值为构造函数的prototype属性值`
> - 程序员能直接操作显式原型, 但不能直接操作隐式原型(ES6 之前)
>
> 6.  代码示例:
>
> ```js
> //定义构造函数
> function Fn() {
>   // 内部默认执行语句: this.prototype = {}
> }
> // 1. 每个函数function都有一个prototype，即显式原型属性, 默认指向一个空的Object对象
> console.log(Fn.prototype)
> // 2. 每个实例对象都有一个__proto__，可称为隐式原型
> //创建实例对象
> var fn = new Fn() // 内部默认执行语句: this.__proto__ = Fn.prototype
> console.log(fn.__proto__)
> // 3. 对象的隐式原型的值为其对应构造函数的显式原型的值
> console.log(Fn.prototype === fn.__proto__) // true
> //给原型添加方法
> Fn.prototype.test = function () {
>   console.log('test()')
> }
> //通过实例调用原型的方法
> fn.test()
> ```

### Ⅲ-原型链

#### ① _原型链_

> 1.  原型链
>
> - 访问一个对象的属性时，
>   - 先在自身属性中查找，找到返回
>   - 如果没有, 再沿着[`__ proto __`]这条链向上查找, 找到返回
>   - 如果最终没找到, 返回 undefined
>   - ![image-20210714210912653](/img/image-20210714210912653.png)
> - 别名: 隐式原型链
> - 作用: 查找对象的属性(方法)

#### ②*构造函数/原型/实例对象的关系(图解)*

> 1.  ```js
>     var o1 = new Object()
>     var o2 = {}
>     ```
>
> ![image-20210714212928432](/img/image-20210714212928432.png)
>
> 2.  ```js
>     function Foo() {}
>     ```
>
> ![image-20210714212945164](/img/image-20210714212945164.png)
>
> ps:所有函数的[`__ proto __`]都是一样的

#### ③ _属性问题_

> - 读取对象的属性值时: 会自动到原型链中查找
>
> - 设置对象的属性值时: 不会查找原型链, 如果当前对象中没有此属性, 直接添加此属性并设置其值
>
> - 方法一般定义在原型中, 属性一般通过构造函数定义在对象本身上
>
> - 代码示例
>
> ```js
> function Fn() {}
> Fn.prototype.a = 'xxx'
> var fn1 = new Fn()
> console.log(fn1.a, fn1) //xxx Fn{}
>
> var fn2 = new Fn()
> fn2.a = 'yyy'
> console.log(fn1.a, fn2.a, fn2) //xxx yyy  Fn{a: "yyy"}
>
> function Person(name, age) {
>   this.name = name
>   this.age = age
> }
> Person.prototype.setName = function (name) {
>   this.name = name
> }
> var p1 = new Person('Tom', 12)
> p1.setName('Bob')
> console.log(p1) //Person {name: "Bob", age: 12}
>
> var p2 = new Person('Jack', 12)
> p2.setName('Cat')
> console.log(p2) //Person {name: "Cat", age: 12}
> console.log(p1.__proto__ === p2.__proto__) // true   -->所以方法一般定义在原型中
> ```

### Ⅳ-instanceof

> 1.  instanceof 是如何判断的?
>
> - 表达式: A instanceof B
> - 如果 B 函数的显式原型对象在 A 对象的原型链上, 返回 true, 否则返回 false
>
> 2.  Function 是通过 new 自己产生的实例
>
> ```js
> /*
>  案例1
>   */
> function Foo() {}
> var f1 = new Foo()
> console.log(f1 instanceof Foo) // true
> console.log(f1 instanceof Object) // true
>
> /*
>  案例2
>   */
> console.log(Object instanceof Function) // true
> console.log(Object instanceof Object) // true
> console.log(Function instanceof Function) // true
> console.log(Function instanceof Object) // true
>
> function Foo() {}
> console.log(Object instanceof Foo) // false
> ```

### Ⅴ-相关面试题

> 测试题 1:
>
> ```js
> /*
>  测试题1
>   */
> function A() {}
> A.prototype.n = 1
> let b = new A()
> A.prototype = { n: 2, m: 3 }
> let c = new A()
> console.log(b.n, b.m, c.n, c.m) // 1 undefined 2 3
> ```
>
> 测试题 2:原理看[②*构造函数/原型/实例对象的关系(图解)*](<#②*构造函数/原型/实例对象的关系(图解)*>)
>
> ```js
> /*
>   测试题2
>   */
> function F() {}
> Object.prototype.a = function () {
>   console.log('a()')
> }
> Function.prototype.b = function () {
>   console.log('b()')
> }
>
> let f = new F()
> f.a() //a()
> f.b() //f.b is not a function -->找不到
> F.a() //a()
> F.b() //b()
>
> console.log(f)
> console.log(Object.prototype)
> console.log(Function.prototype)
> ```
>
> 结果图例
>
> ![image-20210723173855550](/img/image-20210723173855550.png)
