---
title: js进阶面向对象
date: 2022-01-07
categories:
  - JS
tags:
  - js进阶
---

::: tip
主要涉及：面向对象、构造函数，递归、等...，选取至 pink 老师
:::

<!-- more -->

### markdown 正文

# JavaScript 面向对象

## 面向对象编程介绍

### 面向过程

    面向过程编程 POP(Process-oriented programming)

    面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个的依  	次调用就可以了

    面向过程，就是按照我们分析好了的步骤，按照步骤解决问题。

### 面向对象

     面向对象编程 OOP (Object Oriented Programming)

     面向对象是把事务分解成为一个个对象，然后由对象之间分工与合作。

     面向对象是以对象功能来划分问题，而不是步骤。


> 面向对象的特性：1.封装性 2.继承性 3.多态性
> 两者对比：
> 面向过程
> 优点：性能比面向对象高，适合跟硬件联系很紧密的东西，例如单片机就采用的面向过程编程
> 缺点：没有面向对象易维护、易复用、易扩展
>
> 面向对象
> 优点：易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统 更加灵活、更加易于维护
> 缺点：性能比面向过程低

## ES6 中的类和对象

### 对象

    对象是由属性和方法组成的
    	1.属性：事物的特征，在对象中用属性来表示（常用名词）
    	2.方法：事物的行为，在对象中用方法来表示（常用动词）
    在 JavaScript 中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象

### 类 class

> 创建类和对象

```html
<script>
  // 1. 创建类 class  创建一个 明星类
  class Star {
    constructor(uname, age, ssex) {
      this.uname = uname
      this.age = age
      this.ssex = ssex
    }
  }

  // 2. 利用类创建对象 new
  var ldh = new Star('刘德华', 18, '男')
  var pink = new Star('pink老师', 16, '男')

  //(1) 通过class 关键字创建类, 类名我们还是习惯性定义首字母大写
  //(2) 类里面有个constructor 函数,可以接受传递过来的参数,同时返回实例对象
  //(3) constructor 函数 只要 new 生成实例时,就会自动调用这个函数, 如果我们不写这个函数,类也会自动生成这个函数
  //(4) 生成实例 new 不能省略
  //(5) 最后注意语法规范, 创建类 类名后面不要加小括号,生成实例 类名后面加小括号, 构造函数不需要加function
</script>
```

> 类中添加方法

```html
<script>
  // 1. 创建类 class  创建一个 明星类
  class Star {
    // 类的共有属性放到 constructor 里面
    constructor(uname, age) {
      this.uname = uname
      this.age = age
    }
    sing(song) {
      console.log(this.uname + ' - ' + this.age + ' - ' + song)
    }
  }

  // 2. 利用类创建对象 new
  var ldh = new Star('刘德华', 18)
  var zxy = new Star('张学友', 20)
  // (1) 我们类里面所有的函数不需要写function
  //(2) 多个函数方法之间不需要添加逗号分隔
</script>
```

## 类的继承

> 类的继承

```html
<script>
  // 语法：
  class Father{ // 父类}
  class Son extends Father { // 子类继承父类}
  // 实例：
  class Father {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
            sum() {
                console.log(this.x * this.y);
            }
        }
        class Son extends Father {
            constructor(x, y) {
                super(x, y); //调用了父类中的构造函数
            }
        }
        var son = new Son(2, 3);
        var father = new Father(11, 10);
        son.sum();
        father.sum();
</script>
```

> super 关键字

```html
<script>
  // super 关键字用于访问和调用对象父类上的函数。可以调用父类的构造函数，也可以调用父类的普通函数
  // super 关键字调用父类普通函数
  class Father {
    say() {
      return '我是爸爸'
    }
  }
  class Son extends Father {
    say() {
      console.log(super.say() + '的儿子')
      // super.say() 就是调用父类中的普通函数 say()
    }
  }
  var son = new Son()
  son.say()
  // 继承中的属性或者方法查找原则: 就近原则
  // 1. 继承中,如果实例化子类输出一个方法,先看子类有没有这个方法,如果有就先执行子类的
  // 2. 继承中,如果子类里面没有,就去查找父类有没有这个方法,如果有,就执行父类的这个方法(就近原则)
  // 子类在构造函数中使用super, 必须放到 this 前面 (必须先调用父类的构造方法,在使用子类构造方法)
</script>
```

> 子类继承父类方法同时扩展自己方法

```html
<script>
  // 父类有加法方法
  class Father {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
    sum() {
      console.log(this.x + this.y)
    }
  }
  // 子类继承父类加法方法 同时 扩展减法方法
  class Son extends Father {
    constructor(x, y) {
      // 利用super 调用父类的构造函数
      // super 必须在子类this之前调用
      super(x, y)
    }
    subtract() {
      console.log(this.x - this.y)
    }
  }
  var son = new Son(5, 3)
  son.subtract()
  son.sum()
</script>
```

> 注意事项

```html
1. 在 ES6 中类没有变量提升，所以必须先定义类，才能通过类实例化对象. 2.
类里面的共有属性和方法一定要加this使用. 3. 类里面的this指向问题. 4. constructor
里面的this指向实例对象, 方法里面的this 指向这个方法的调用者

<script>
  var that
  var _that
  class Star {
    constructor(uname, age) {
      // constructor 里面的this 指向的是 创建的实例对象
      that = this
      this.uname = uname
      this.age = age
      this.btn = document.querySelector('button')
      this.btn.addEventListener('click', this.sing)
    }
    sing() {
      // 这个sing方法里面的this 指向的是 btn 这个按钮,因为这个按钮调用了这个函数
      console.log(that.uname) // that里面存储的是constructor里面的this
    }
    dance() {
      // 这个dance里面的this 指向的是实例对象 ldh 因为ldh 调用了这个函数
      _that = this
      console.log(this)
    }
  }

  var ldh = new Star('刘德华', 52)
  console.log(that === ldh)
  ldh.dance()
  console.log(_that === ldh)
  // 1. 在 ES6 中类没有变量提升，所以必须先定义类，才能通过类实例化对象
  // 2. 类里面的共有的属性和方法一定要加this使用.
</script>
```

## 面向对象案例

### 面向对象版 tab 栏切换

```html
功能需求: 1. 点击 tab栏,可以切换效果. 2. 点击 + 号, 可以添加 tab 项和内容项. 3.
点击 x 号, 可以删除当前的tab项和内容项. 4.
双击tab项文字或者内容项文字,可以修改里面的文字内容 抽象对象: Tab 对象 1.
该对象具有切换功能 2. 该对象具有添加功能 3. 该对象具有删除功能 4.
该对象具有修改功能 js部分
<script>
  window.addEventListener('load', function () {
    var that
    class Tab {
      constructor(id) {
        // 获取元素
        that = this
        this.main = document.querySelector(id)
        this.add = this.main.querySelector('.tabadd')
        // li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child')
        // section 父元素
        this.fsection = this.main.querySelector('.tabscon')
        this.init()
      }
      init() {
        this.updateNode()
        // init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab
        for (var i = 0; i < this.lis.length; i++) {
          this.lis[i].index = i
          this.lis[i].onclick = this.toggleTab
          this.remove[i].onclick = this.removeTab
          this.spans[i].ondblclick = this.editTab
          this.sections[i].ondblclick = this.editTab
        }
      }
      // 因为我们动态添加元素 需要从新获取对应的元素
      updateNode() {
        this.lis = this.main.querySelectorAll('li')
        this.sections = this.main.querySelectorAll('section')
        this.remove = this.main.querySelectorAll('.icon-guanbi')
        this.spans = this.main.querySelectorAll(
          '.fisrstnav li span:first-child'
        )
      }
      // 1. 切换功能
      toggleTab() {
        // console.log(this.index);
        that.clearClass()
        this.className = 'liactive'
        that.sections[this.index].className = 'conactive'
      }
      // 清除所有li 和section 的类
      clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
          this.lis[i].className = ''
          this.sections[i].className = ''
        }
      }
      // 2. 添加功能
      addTab() {
        that.clearClass()
        // (1) 创建li元素和section元素
        var random = Math.random()
        var li =
          '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>'
        var section = '<section class="conactive">测试 ' + random + '</section>'
        // (2) 把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li)
        that.fsection.insertAdjacentHTML('beforeend', section)
        that.init()
      }
      // 3. 删除功能
      removeTab(e) {
        e.stopPropagation() // 阻止冒泡 防止触发li 的切换点击事件
        var index = this.parentNode.index
        console.log(index)
        // 根据索引号删除对应的li 和section   remove()方法可以直接删除指定的元素
        that.lis[index].remove()
        that.sections[index].remove()
        that.init()
        // 当我们删除的不是选中状态的li 的时候,原来的选中状态li保持不变
        if (document.querySelector('.liactive')) return
        // 当我们删除了选中状态的这个li 的时候, 让它的前一个li 处于选定状态
        index--
        // 手动调用我们的点击事件  不需要鼠标触发
        that.lis[index] && that.lis[index].click()
      }
      // 4. 修改功能
      editTab() {
        var str = this.innerHTML
        // 双击禁止选定文字
        window.getSelection
          ? window.getSelection().removeAllRanges()
          : document.selection.empty()
        // alert(11);
        this.innerHTML = '<input type="text" />'
        var input = this.children[0]
        input.value = str
        input.select() // 文本框里面的文字处于选定状态
        // 当我们离开文本框就把文本框里面的值给span
        input.onblur = function () {
          this.parentNode.innerHTML = this.value
        }
        // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function (e) {
          if (e.keyCode === 13) {
            // 手动调用表单失去焦点事件  不需要鼠标离开操作
            this.blur()
          }
        }
      }
    }
    new Tab('#tab')
  })
</script>
```

![面向对象版 tab 栏切换](https://img-blog.csdnimg.cn/849bd7f5c6f24ad38670bd9e6f451eb3.gif#pic_center)

# 构造函数和原型

## 构造函数和原型

### 构造函数

> 利用构造函数创建对象

```html
<script>
  // 1. 利用 new Object() 创建对象
  var p = new Object()
  p = {} //此时内部数据是不确定的
  // 再动态添加属性/方法
  p.name = 'Tom'
  p.age = 12
  p.setName = function (name) {
    this.name = name
  }
  //测试
  console.log(p.name, p.age) // Tom 12
  p.setName('Bob')
  console.log(p.name, p.age) // Bob 12
</script>
```

```html
<script type="text/javascript">
  // 使用{}创建对象, 同时指定属性/方法
  // 适用场景: 起始时对象内部数据是确定的
  // 问题: 如果创建多个对象, 有重复代码
  var p = {
    name: 'Tom',
    age: 12,
    setName: function (name) {
      this.name = name
    }
  }

  //测试
  console.log(p.name, p.age) // Tom 12
  p.setName('JACK')
  console.log(p.name, p.age) // JACK 12

  var p2 = {
    //如果创建多个对象代码很重复
    name: 'Bob',
    age: 13,
    setName: function (name) {
      this.name = name
    }
  }
</script>
```

```html
<script>
  // 3. 利用构造函数创建对象
  function Star(uname, age) {
    this.uname = uname
    this.age = age
    this.sing = function () {
      console.log('我会唱歌')
    }
  }
  var ldh = new Star('刘德华', 18)
  var zxy = new Star('张学友', 19)
  console.log(ldh)
  ldh.sing()
  zxy.sing()
</script>
```

> 静态成员和实例成员

```html
<script>
  // 构造函数中的属性和方法我们称为成员, 成员可以添加
  function Star(name, age) {
    this.uname = name
    this.age = age
    this.sing = function () {
      console.log('我会唱歌')
    }
  }
  var ldh = new Star('刘德华', 18)
  // 1.实例成员就是构造函数内部通过this添加的成员 uname age sing 就是实例成员
  // 实例成员只能通过实例化的对象来访问
  console.log(ldh.uname)
  ldh.sing()
  // console.log(Star.uname); // 不可以通过构造函数来访问实例成员

  // 2. 静态成员 在构造函数本身上添加的成员  sex 就是静态成员
  Star.sex = '男'
  Star.hobby = '美女'
  // 静态成员只能通过构造函数来访问
  console.log(Star.sex)
  console.log(Star.hobby)
  console.log(ldh.sex) // 不能通过对象来访问
</script>
```

### 构造函数原型 prototype

    构造函数通过原型分配的函数是所有对象所共享的。
    	JavaScript 规定，每一个构造函数都有一个 prototype 属性，指向另一个对象。
    注意这个 prototype 就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有。
    我们可以把那些不变的方法，直接定义在 prototype 对象上，这样所有对象的实例就可以共享这些方法。

```html
<script>
  // 1. 构造函数的问题.
  function Star(uname, age) {
    this.uname = uname
    this.age = age
  }
  Star.prototype.sing = function () {
    console.log('我不会唱歌，我会跳舞')
  }
  var ldh = new Star('刘德华', 18)
  var zxy = new Star('张学友', 19)
  console.log(ldh.sing === zxy.sing)
  ldh.sing()
  zxy.sing()
  // 2. 一般情况下,我们的公共属性定义到构造函数里面, 公共的方法我们放到原型对象身上
</script>
```

### 对象原型 **proto**

    对象都会有一个属性 __proto__ 指向构造函数的 prototype 原型对象，之所以我们对象可以使用构造函数 prototype 原型对象的属性和方法，就是因为对象有 __proto__ 原型的存在。
    __proto__对象原型和原型对象 prototype 是等价的

![对象原型__proto__](https://img-blog.csdnimg.cn/014321c797bb49f2957fd48239c87191.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

```html
<script>
  function Star(uname, age) {
    this.uname = uname
    this.age = age
  }
  Star.prototype.sing = function () {
    console.log('我会唱歌')
  }
  var ldh = new Star('刘德华', 18)
  var zxy = new Star('张学友', 19)
  ldh.sing()
  console.log(ldh) // 对象身上系统自己添加一个 __proto__ 指向我们构造函数的原型对象 prototype
  console.log(ldh.__proto__ === Star.prototype)
  // 方法的查找规则: 首先先看ldh 对象身上是否有 sing 方法,如果有就执行这个对象上的sing
  // 如果么有sing 这个方法,因为有__proto__ 的存在,就去构造函数原型对象prototype身上去查找sing这个方法
</script>
```

### constructor 构造函数

    对象原型（ __proto__）和构造函数（prototype）原型对象里面都有一个属性 constructor 属性 ，constructor 我们称为构造函数，因为它指回构造函数本身
    constructor 主要用于记录该对象引用于哪个构造函数，它可以让原型对象重新指向原来的构造函数。

> 构造函数、实例、原型对象三者之间的关系
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/cc4ecca9f851409f9c9dcf4d29aab7e7.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

### 原型链

![原型链](https://img-blog.csdnimg.cn/13dc1d3efd2e45e8857222e59dd57bef.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

```html
<script>
  function Star(uname, age) {
    this.uname = uname
    this.age = age
  }
  Star.prototype.sing = function () {
    console.log('我会唱歌')
  }
  var ldh = new Star('刘德华', 18)
  // 1. 只要是对象就有__proto__ 原型, 指向原型对象
  console.log(Star.prototype)
  console.log(Star.prototype.__proto__ === Object.prototype)
  // 2.我们Star原型对象里面的__proto__原型指向的是 Object.prototype
  console.log(Object.prototype.__proto__)
  // 3. 我们Object.prototype原型对象里面的__proto__原型  指向为 null
</script>
```

> JavaScript 的成员查找机制(规则)

    ① 当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。
    ② 如果没有就查找它的原型（也就是 __proto__指向的 prototype 原型对象）。
    ③ 如果还没有就查找原型对象的原型（Object的原型对象）。
    ④ 依此类推一直找到 Object 为止（null）。
    ⑤ __proto__对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线。

> 原型对象 this 指向：
> 构造函数中的 this 指向我们实例对象.

    原型对象里面放的是方法, 这个方法里面的this 指向的是 这个方法的调用者, 也就是这个实例对象

### 扩展内置对象

    注意：数组和字符串内置对象不能给原型对象覆盖操作 Array.prototype = {} ，只能是 Array.prototype.xxx = function(){} 的方式。

```html
<script>
  // 原型对象的应用 扩展内置对象方法
  Array.prototype = {
    sum: function () {
      var sum = 0
      for (var i = 0; i < this.length; i++) {
        sum += this[i]
      }
      return sum
    }
  }
  var arr = [8, 10, 3]
  console.log(arr.sum())
  console.log(Array.prototype)
  var arr1 = new Array(11, 22, 33)
  console.log(arr1.sum())
</script>
```

## 继承

### call() 方法

```html
调用这个函数, 并且修改函数运行时的 this 指向 fun.call(thisArg, arg1, arg2, ...)
thisArg ：当前调用函数 this 的指向对象 arg1，arg2：传递的其他参数
```

```html
<script>
  // call 方法
  function fn(x, y, m, n) {
    console.log('我想喝手磨咖啡')
    console.log(this)
    console.log(x + y)
    console.log(m * n)
  }
  var o = {
    name: 'andy',
    age: 18,
    ssex: '女'
  }
  // fn();
  // 1. call() 可以调用函数
  // fn.call();
  // 2. call() 可以改变这个函数的this指向 此时这个函数的this 就指向了o这个对象
  fn.call(o, 5, 8, 2, 3)
</script>
```

    ES6之前并没有给我们提供 extends 继承。我们可以通过构造函数+原型对象模拟实现继承，被称为组合继承。

### 借用构造函数继承父类型属性

```html
核心原理： 通过 call() 把父类型的 this 指向子类型的 this
，这样就可以实现子类型继承父类型的属性。
<script>
  // 借用父构造函数继承属性
  // 1. 父构造函数
  function Father(uname, age, hobby) {
    // this 指向父构造函数的对象实例
    this.uname = uname
    this.age = age
    this.hobby = hobby
  }
  // 2 .子构造函数
  function Son(uname, age, hobby, score, ssex) {
    // this 指向子构造函数的对象实例
    Father.call(this, uname, age, hobby)
    this.score = score
    this.ssex = ssex
  }
  var son = new Son('刘德华', 18, '美女', 100, '难')
  var father = new Father('张学友', 19, 55)
  console.log(son)
  console.log(father)
</script>
```

### 借用原型对象继承父类型方法

```html
一般情况下，对象的方法都在构造函数的原型对象中设置，通过构造函数无法继承父类方法。
核心原理： ① 将子类所共享的方法提取出来，让子类的 prototype 原型对象 = new
父类() ②
本质：子类原型对象等于是实例化父类，因为父类实例化之后另外开辟空间，就不会影响原来父类原型对象
③ 将子类的 constructor 从新指向子类的构造函数

<script>
  // 借用父构造函数继承属性
  // 1. 父构造函数
  function Father(uname, age) {
    // this 指向父构造函数的对象实例
    this.uname = uname
    this.age = age
  }
  Father.prototype.money = function () {
    console.log(100000)
  }
  // 2 .子构造函数
  function Son(uname, age, score) {
    // this 指向子构造函数的对象实例
    Father.call(this, uname, age)
    this.score = score
  }
  // Son.prototype = Father.prototype;  这样直接赋值会有问题,如果修改了子原型对象,父原型对象也会跟着一起变化
  Son.prototype = new Father()
  // 如果利用对象的形式修改了原型对象,别忘了利用constructor 指回原来的构造函数
  Son.prototype.constructor = Son
  // 这个是子构造函数专门的方法
  Son.prototype.exam = function () {
    console.log('孩子要考试')
  }
  var son = new Son('刘德华', 18, 100)
  console.log(son)
  console.log(Father.prototype)
  console.log(Son.prototype.constructor)
</script>
```

### 类的本质

```html
<script>
  // ES6 之前通过 构造函数+ 原型实现面向对象 编程
  // (1) 构造函数有原型对象prototype
  // (2) 构造函数原型对象prototype 里面有constructor 指向构造函数本身
  // (3) 构造函数可以通过原型对象添加方法
  // (4) 构造函数创建的实例对象有__proto__ 原型指向 构造函数的原型对象

  // ES6 通过 类 实现面向对象编程
  class Star {}
  console.log(typeof Star)
  // 1. 类的本质其实还是一个函数 我们也可以简单的认为 类就是 构造函数的另外一种写法
  // (1) 类有原型对象prototype
  console.log(Star.prototype)
  // (2) 类原型对象prototype 里面有constructor 指向类本身
  console.log(Star.prototype.constructor)
  // (3)类可以通过原型对象添加方法
  Star.prototype.sing = function () {
    console.log('冰雨')
  }
  var ldh = new Star()
  console.dir(ldh)
  // (4) 类创建的实例对象有__proto__ 原型指向 类的原型对象
  console.log(ldh.__proto__ === Star.prototype)
  i = i + 1
  i++
</script>
```

## ES5 新增方法

### 数组方法

> 迭代(遍历)方法：forEach()、map()、filter()、some()、every()；

> (1).forEach() 方法
> array.forEach(function(currentValue, index, arr))
> 1.currentValue：数组当前项的值
> 2.index：数组当前项的索引
> 3.arr：数组对象本身

```html
<script>
  // forEach 迭代（遍历）数组
  var arr = [2, 8, 9]
  var sum = 0
  arr.forEach(function (value, index, array) {
    console.log('每个数组元素' + value)
    console.log('每个数组元素的索引号' + index)
    console.log('数组本身' + array)
    sum += value
  })
  console.log(sum)
</script>
```

> (2).filter() 方法
> 主要用于筛选数组 ；注意它直接返回一个新数组
> array.filter(function(currentValue, index, arr))
> 1.currentValue: 数组当前项的值
> 2.index：数组当前项的索引
> 3.arr：数组对象本身

```html
<script>
  // filter 筛选数组
  var arr = [12, 58, 99, 55, 20, 6]
  var newArr = arr.filter(function (zhi) {
    // 筛选元素为偶数
    return zhi % 2 == 0
  })
  console.log(newArr)
</script>
```

> (3).some() 方法
> array.some(function(currentValue, index, arr))
> some() 方法用于检测数组中的元素是否满足指定条件. 通俗点 查找数组中是否有满足条件的元素 1.注意它返回值是布尔值, 如果查找到这个元素, 就返回 true , 如果查找不到就返回 false. 2.如果找到第一个满足条件的元素,则终止循环. 不在继续查找.
> 3.currentValue: 数组当前项的值
> 4.index：数组当前项的索引
> 5.arr：数组对象本身

```html
<script>
  // some 查找数组中是否有满足条件的元素
  // 查找具有唯一性
  var arr1 = ['red', 'pink', 'blue']
  var flag1 = arr1.some(function (index) {
    return index == 'pink'
  })
  console.log(flag1) // TRUE
  // 1. filter 也是查找满足条件的元素 返回的是一个数组 而且是把所有满足条件的元素返回回来
  // 2. some 也是查找满足条件的元素是否存在  返回的是一个布尔值 如果查找到第一个满足条件的元素就终止循环
</script>
```

#### 查询商品案例

```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      table {
        width: 400px;
        border: 1px solid #000;
        border-collapse: collapse;
        margin: 0 auto;
      }

      td,
      th {
        border: 1px solid #000;
        text-align: center;
      }

      input {
        width: 50px;
      }

      .search {
        width: 600px;
        margin: 20px auto;
      }
    </style>
  </head>

  <body>
    <div class="search">
      按照价格查询: <input type="text" class="start" /> -
      <input type="text" class="end" />
      <button class="search-price">搜索</button>
      按照商品名称查询: <input type="text" class="product" />
      <button class="search-pro">查询</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>产品名称</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>

    <script>
      // 动态渲染数据，新增数组方法
      var data = [
        {
          id: 1,
          pname: '小米',
          price: 3999
        },
        {
          id: 2,
          pname: 'oppo',
          price: 999
        },
        {
          id: 3,
          pname: '华为',
          price: 1599
        },
        {
          id: 4,
          pname: '一加',
          price: 1999
        },
        {
          id: 5,
          pname: '小米',
          price: 2999
        }
      ]
      // 1.获取相应元素
      var tbody = document.querySelector('tbody')
      var search_price = document.querySelector('.search-price')
      var start = document.querySelector('.start')
      var end = document.querySelector('.end')
      var search_pro = document.querySelector('.search-pro')
      var product = document.querySelector('.product')
      // 2.数据渲染
      setDate(data)
      function setDate(mydata) {
        // 先清空原来tbody里的数据
        tbody.innerHTML = ''
        mydata.forEach(function (value) {
          var tr = document.createElement('tr')
          tr.innerHTML =
            '<td>' +
            value.id +
            '</td><td>' +
            value.pname +
            '</td><td>' +
            value.price +
            '</td>'
          tbody.appendChild(tr)
        })
      }

      // 3.根据价格筛选商品
      search_price.addEventListener('click', function () {
        var newDate = data.filter(function (value) {
          return value.price >= start.value && value.price <= end.value
        })
        setDate(newDate)
      })
      // 4.根据名称筛选商品
      // search_pro.addEventListener('click', function () {
      //     var newDate1 = data.filter(function (value) {
      //         return product.value == value.pname;
      //     });
      //     setDate(newDate1);
      // });
      // 查找唯一的数据，用some()
      search_pro.addEventListener('click', function () {
        var arr = []
        data.some(function (value) {
          arr.push(value)
          return true
        })
        setDate(arr)
      })

      product.addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
          var newDate1 = data.filter(function (value) {
            return product.value == value.pname
          })
          setDate(newDate1)
          this.blur()
        }
      })
    </script>
  </body>
</html>
```

![查询商品案例](https://img-blog.csdnimg.cn/a4a0aca04b334837b80b705d6e6d140a.gif#pic_center)

### 字符串方法

> str.trim() 方法
> trim() 方法会从一个字符串的两端删除空白字符。
> trim() 方法并不影响原字符串本身，它返回的是一个新的字符串。

```html
<input type="text" /> <button>点击</button>
<div></div>
<script>
  // trim 方法去除字符串两侧空格
  var str = '   an  dy   '
  console.log(str)
  var str1 = str.trim()
  console.log(str1)
  var input = document.querySelector('input')
  var btn = document.querySelector('button')
  var div = document.querySelector('div')
  btn.onclick = function () {
    var str = input.value.trim()
    if (str === '') {
      alert('请输入内容')
    } else {
      console.log(str)
      console.log(str.length)
      div.innerHTML = str
    }
  }
</script>
```

### 对象方法

> 1.Object.keys() 用于获取对象自身所有的属性
> Object.keys(obj)

```html
<script>
  // 用于获取对象自身所有的属性
  var obj = {
    id: 1,
    pname: '小米',
    price: 1999,
    num: 2000
  }
  var arr = Object.keys(obj)
  console.log(arr)
  arr.forEach(function (value) {
    console.log(value)
  })
</script>
```

> 2.Object.defineProperty() 定义对象中新属性或修改原有的属性。(了解)
> Object.defineProperty(obj, prop, descriptor)
> 1.obj：必需。目标对象
> 2.prop：必需。需定义或修改的属性的名字
> 3.descriptor：必需。目标属性所拥有的特性

    Object.defineProperty() 第三个参数 descriptor 说明： 以对象形式 { } 书写
    1.value: 设置属性的值 默认为undefined
    2.writable: 值是否可以重写。true | false 默认为false
    3.enumerable: 目标属性是否可以被枚举。true | false 默认为 false
    4.configurable: 目标属性是否可以被删除或是否可以再次修改特性 true | false 默认为fals

# 函数进阶

## 函数的定义和调用

### 函数的定义方式

    1. 函数声明方式 function 关键字 (命名函数)
    2. 函数表达式 (匿名函数)
    3. new Function()

```html
<script>
  // 1. 自定义函数(命名函数)
  function fn() {}
  // 2. 函数表达式 (匿名函数)
  var fun = function () {}
  // 3. 利用 new Function('参数1','参数2', '函数体');
  var f = new Function('a', 'b', 'console.log(a + b)')
  f(1, 2)
  // 4. 所有函数都是 Function 的实例(对象)
  console.dir(f)
  // 5. 函数也属于对象
  console.log(f instanceof Object)
  console.log(typeof f)
</script>
```

### 函数的调用方式

```html
<script>
  // 函数的调用方式
  // 1. 普通函数
  function fn() {
    console.log('人生的巅峰')
  }
  fn()
  fn.call()

  // 2. 对象的方法
  var o = {
    sayHi: function () {
      console.log('人生的巅峰')
    }
  }
  o.sayHi()

  // 3. 构造函数
  function Star() {}
  new Star()

  // 4. 绑定事件函数
  btn.onclick = function () {} // 点击了按钮就可以调用这个函数

  // 5. 定时器函数
  setInterval(function () {}, 1000) // 这个函数是定时器自动1秒钟调用一次

  // 6. 立即执行函数,立即执行函数是自动调用(匿名函数自调用)
  ;(function () {
    console.log('人生巅峰')
  })()
</script>
```

## this 指向

### 函数内 this 的指向

| 调用方式     | this 指向                               |
| ------------ | :-------------------------------------- |
| 普通函数调用 | Window                                  |
| 构造函数调用 | 实例对象 原型对象里的方法也指向实例对象 |
| 对象方法调用 | 该方法所属的对象                        |
| 事件绑定方法 | 绑定事件对象                            |
| 定时器函数   | window                                  |
| 立即执行函数 | window                                  |

```html
案例代码
<button>点击</button>
<script>
  // 函数的不同调用方式决定了this 的指向不同
  // 1. 普通函数 this 指向window
  function fn() {
    console.log('普通函数的this' + this)
  }
  window.fn() // 普通函数的this[object Window]

  // 2. 对象的方法 this指向的是对象 o
  var o = {
    sayHi: function () {
      console.log('对象方法的this:' + this)
    }
  }
  o.sayHi() // 对象方法的this:[object Object]

  // 3. 构造函数 this 指向 ldh 这个实例对象 原型对象里面的this 指向的也是 ldh这个实例对象
  function Star() {}
  Star.prototype.sing = function () {}
  var ldh = new Star()

  // 4. 绑定事件函数 this 指向的是函数的调用者 btn这个按钮对象
  var btn = document.querySelector('button')
  btn.onclick = function () {
    console.log('绑定时间函数的this:' + this)
    // 绑定时间函数的this:[object HTMLButtonElement]
  }

  // 5. 定时器函数 this 指向的也是window
  window.setTimeout(function () {
    console.log('定时器的this:' + this) // 定时器的this:[object Window]
  }, 1000)

  // 6. 立即执行函数 this还是指向window
  ;(function () {
    console.log('立即执行函数的this' + this) // 立即执行函数的this[object Window]
  })()
</script>
```

### 改变函数内部 this 指向

```html
<script>
  // 改变函数内this指向  js提供了三种方法  call()  apply()  bind()
  // call() 方法调用一个对象。简单理解为调用函数的方式，但是它可以改变函数的 this 指向
  // 1. call()
  var o = {
    name: 'andy'
  }
  function fn(a, b) {
    console.log(this) //{name: "andy"}
    console.log(a * b) // 2
  }
  fn.call(o, 1, 2)
  // call 第一个可以调用函数 第二个可以改变函数内的this 指向

  // call 的主要作用可以实现继承
  function Father(uname, age, sex) {
    this.uname = uname
    this.age = age
    this.sex = sex
  }
  function Son(uname, age, ssex) {
    Father.call(this, uname, age, ssex)
  }
  var son = new Son('刘德华', 18, '男')
  console.log(son) // Son {uname: "刘德华", age: 18, sex: "男"}
</script>
```

```html
<script>
  // 2. apply()  应用 运用的意思
  var o = {
    name: 'andy'
  }
  function fn(arr1) {
    console.log(this) // {name: "andy"}
    console.log(arr1) // 'pink'
  }
  fn.apply(o, [1])
  // 1. 也是调用函数 第二个可以改变函数内部的this指向
  // 2. 但是他的参数必须是数组(伪数组)
  // 3. apply 的主要应用 比如说我们可以利用 apply 借助于数学内置对象求数组最大值
  // Math.max();
  var arr = [1, 66, 3, 99, 4]
  var arr1 = ['red', 'pink']
  var max = Math.max.apply(Math, arr)
  var min = Math.min.apply(Math, arr)
  console.log(max, min) // 99 1
</script>
```

```html
<button>点击</button>
<button>点击</button>
<button>点击</button>
<script>
  // 3. bind()  绑定 捆绑的意思
  var o = {
    name: 'andy'
  }
  function fn(a, b) {
    console.log(this)
    console.log(a + b)
  }
  var f = fn.bind(o, 1, 2)
  f()
  // 1. 不会调用原来的函数   可以改变原来函数内部的this 指向
  // 2. 返回的是原函数改变this之后产生的新函数
  // 3. 如果有的函数我们不需要立即调用,但是又想改变这个函数内部的this指向此时用bind
  // 4. 我们有一个按钮,当我们点击了之后,就禁用这个按钮,3秒钟之后开启这个按钮
  var btns = document.querySelectorAll('button')
  for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
      this.disabled = true
      setTimeout(
        function () {
          this.disabled = false
          console.log('123')
        }.bind(this),
        2000
      )
    }
  }
</script>
```

> call apply bind 总结

    相同点:
    都可以改变函数内部的this指向.

    区别点:
    1. call 和 apply 会调用函数, 并且改变函数内部this指向.
    2. call 和 apply 传递的参数不一样, call 传递参数 aru1, aru2..形式 apply 必须数组形式[arg]
    3. bind 不会调用函数, 可以改变函数内部this指向.

    主要应用场景:
    1. call 经常做继承.
    2. apply 经常跟数组有关系. 比如借助于数学对象实现数组最大值最小值
    3. bind 不调用函数,但是还想改变this指向. 比如改变定时器内部的this指向.

## 严格模式

### 开启严格模式

```html
严格模式可以应用到整个脚本或个别函数中。因此在使用时，我们可以将严格模式分为为脚本开启严格模式和为函数开启严格模式两种情况
<!-- 为整个脚本(script标签)开启严格模式 -->
<script>
  'use strict'
  //   下面的js 代码就会按照严格模式执行代码
</script>
<script>
  ;(function () {
    'use strict'
  })()
</script>
<!-- 为某个函数开启严格模式 -->
<script>
  // 此时只是给fn函数开启严格模式
  function fn() {
    'use strict'
    // 下面的代码按照严格模式执行
  }
  function fun() {
    // 里面的还是按照普通模式执行
  }
</script>
```

### 严格模式的变化

```html
1. 变量规定 ①
在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种用法，变量都必须先用var
命令声明，然后再使用。 ② 严禁删除已经声明变量。例如，delete x; 语法是错误的。 2.
严格模式下 this 指向问题 ① 以前在全局作用域函数中的 this 指向 window 对象。 **②
严格模式下全局作用域中函数中的 this 是 undefined。** ③ 以前构造函数时不加
new也可以 调用,当普通函数，this 指向全局对象 ④ 严格模式下,如果
构造函数不加new调用, this 指向的是undefined 如果给他赋值则 会报错 ⑤ new
实例化的构造函数指向创建的对象实例。 ⑥ 定时器 this 还是指向 window 。 ⑦
事件、对象还是指向调用者。 3.函数变化 ① 函数不能有重名的参数。 ②
函数必须声明在顶层.新版本的 JavaScript 会引入“块级作用域”（ ES6
中已引入）。为了与新版本接轨，不允许在非函数的代码块内声明函数
更多严格模式要求参考：
https://developer.mozilla.org/zhCN/docs/Web/JavaScript/Reference/Strict_mode
```

## 高阶函数

```html
高阶函数是对其他函数进行操作的函数，它接收函数作为参数或将函数作为返回值输出。
<div></div>
<script>
  // 高阶函数- 函数可以作为参数传递
  function fn(a, b, callback) {
    console.log(a + b) // 3
    callback && callback()
  }
  fn(1, 2, function () {
    console.log('我是最后调用的')
  })

  $('div').animate(
    {
      left: 500
    },
    function () {
      // 动画移动
      $('div').css('backgroundColor', 'purple')
    }
  )
</script>
```

## 闭包

### 闭包概念

```html
闭包（closure）指有权访问另一个函数作用域中变量的函数。 ----- JavaScript
高级程序设计 简单理解就是 ，一个作用域可以访问另外一个函数内部的局部变量。
<script>
  // 闭包: 我们fun 这个函数作用域 访问了另外一个函数 fn 里面的局部变量 num
  function fn() {
    var num = 10
    function fun() {
      console.log(num) // 10
    }
    fun()
  }
  fn()
</script>
```

### 闭包的作用

```html
<script>
  // 闭包（closure）指有权访问另一个函数作用域中变量的函数。
  // 一个作用域可以访问另外一个函数的局部变量
  // 我们fn 外面的作用域可以访问fn 内部的局部变量
  // 闭包的主要作用: 延伸了变量的作用范围
  function fn() {
    var num = 10
    return function () {
      console.log(num)
    }
  }
  var f = fn()
  f()
  // 类似于
  // var f =  function fun() {
  //         console.log(num);
  //     }
</script>
```

### 闭包案例

```html
<script>
  // 1. 循环注册点击事件 利用闭包的方式得到当前小li 的索引号 ()();
  for (var i = 0; i < lis.length; i++) {
    // 利用for循环创建了4个立即执行函数
    // 立即执行函数也成为小闭包因为立即执行函数里面的任何一个函数都可以使用它的i这变量
    ;(function (i) {
      // console.log(i);
      lis[i].onclick = function () {
        console.log(i)
      }
    })(i)
  }
</script>
```

```html
<script>
  // 闭包应用-3秒钟之后,打印所有li元素的内容
  var lis = document.querySelectorAll('li')
  for (var i = 0; i < lis.length; i++) {
    ;(function (i) {
      setTimeout(function () {
        console.log(lis[i].innerHTML)
      }, 3000)
    })(i)
  }
</script>
```

```html
<script>
  // 闭包应用-计算打车价格
  // 起步价13块（3公里），超过每公里多加5块，堵车则加10块
  var n = parseInt(prompt('请输入您行驶了多少公里：'))
  var car = (function () {
    var total = 0 // 总价
    var start = 13 // 初始价
    return {
      price: function (n, flag) {
        if (n <= 3) {
          total = start
        } else {
          total = start + (n - 3) * 5
        }
        return flag ? total + 10 : total
      }
    }
  })()
  console.log('堵车后价格：' + car.price(n, true) + '元')
  console.log('不堵车价格：' + car.price(n, false) + '元')
</script>
```

> 思考题

```html
<script>
  // 思考题 1：
  var name = 'The Window'
  var object = {
    name: 'My Object',
    getNameFunc: function () {
      return function () {
        return this.name
      }
    }
  }
  console.log(object.getNameFunc()()) // The Window

  // 类似于
  // var f = object.getNameFunc();
  // var f = function() {
  //     return this.name; // 当前this指向全局，局部object的name未被引用
  // }
  // f();	-->	object.getNameFunc()()
  // console.log(f());

  // 思考题 2：
  var name = 'The Window'
  var object = {
    name: 'My Object',
    getNameFunc: function () {
      var that = this
      return function () {
        return that.name
      }
    }
  }
  console.log(object.getNameFunc()()) // My Object

  // var f = object.getNameFunc();
  // // 类似于
  // var f = function () {
  //     return that.name; // 当前this指向that，that被局部变量中的name的this赋值
  // };
  // f();	-->	object.getNameFunc()()
</script>
```

## 递归

### 递归的含义

```html
<script>
  // 递归函数 : 函数内部自己调用自己, 这个函数就是递归函数
  var num = 1
  function fn() {
    console.log('我要打印6句话')
    if (num == 6) {
      return // 递归里面必须加退出条件
    }
    num++
    fn()
  }
  fn()
</script>
```

### 利用递归求数学题

```html
<script>
  // 利用递归函数求1~n的阶乘 1 * 2 * 3 * 4 * ..n
  function fn(n) {
    if (n == 1) {
      return 1
    }
    return n * fn(n - 1)
  }
  console.log(fn(5)) // 120
</script>
```

```html
<script>
  // 利用递归函数求斐波那契数列(兔子序列)  1、1、2、3、5、8、13、21...
  // 用户输入一个数字 n 就可以求出 这个数字对应的兔子序列值
  // 我们只需要知道用户输入的n 的前面两项(n-1 n-2)就可以计算出n 对应的序列值
  function fn(n) {
    if (n == 1 || n == 2) {
      return 1
    }
    return fn(n - 1) + fn(n - 2)
  }
  console.log(fn(6)) //8
  console.log(fn(8)) // 21
</script>
```

```html
<script>
  // 利用递归求:根据id返回对应的数据对象
  var data = [
    {
      id: 1,
      name: '家电',
      goods: [
        {
          id: 11,
          gname: '冰箱',
          goods: [
            {
              id: 111,
              gname: '海尔'
            },
            {
              id: 112,
              gname: '美的'
            }
          ]
        },
        {
          id: 12,
          gname: '洗衣机',
          goods: [
            {
              id: 121,
              gname: '很好洗'
            },
            {
              id: 122,
              gname: '不好洗'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: '服饰'
    }
  ]
  function getId(data, id) {
    var o = {}
    // 1. 利用 forEach 去遍历里面的每一个对象
    data.forEach(function (item) {
      if (item.id == id) {
        o = item
        // 2. 我们想要得里层的数据 11 12 可以利用递归函数
      } else if (item.goods && item.goods.length > 0) {
        o = getId(item.goods, id)
      }
    })
    return o
  }
  console.log(getId(data, 1)) // {id: 1, name: "家电", goods: Array(2)}
  console.log(getId(data, 121)) // {id: 121, gname: "很好洗"}
</script>
```

### 浅拷贝和深拷贝

> 浅拷贝

```html
<script>
  // 浅拷贝只是拷贝一层, 更深层次对象级别的只拷贝引用.
  // 深拷贝拷贝多层, 每一级别的数据都会拷贝.
  var obj = {
    id: 1,
    name: 'andy',
    msg: {
      age: 18
    }
  }
  var o = {}
  Object.assign(o, obj) // es6 新增方法可以浅拷贝
  for (var k in obj) {
    // for in 遍历方法
    // k 是属性名   obj[k] 属性值
    o[k] = obj[k]
  }
  console.log(obj) // age=20
  obj.msg.age = 20
  console.log(o) // age=20
</script>
```

> 深拷贝

```html
<script>
  // deepCopy() 深拷贝拷贝多层, 每一级别的数据都会拷贝.
  var obj = {
    id: 1,
    name: 'andy',
    msg: {
      age: 18
    },
    color: ['pink', 'red']
  }
  var o = {}
  // 封装函数
  function deepCopy(newobj, oldobj) {
    for (var k in oldobj) {
      // 判断我们的属性值属于那种数据类型
      // 1. 获取属性值  oldobj[k]
      var item = oldobj[k]
      // 2. 判断这个值是否是数组
      if (item instanceof Array) {
        newobj[k] = []
        deepCopy(newobj[k], item)
      } else if (item instanceof Object) {
        // 3. 判断这个值是否是对象
        newobj[k] = {}
        deepCopy(newobj[k], item)
      } else {
        // 4. 属于简单数据类型
        newobj[k] = item
      }
    }
  }
  deepCopy(o, obj)
  console.log(o) // age = 20
  var arr = []
  console.log(arr instanceof Object) // true
  o.msg.age = 20
  console.log(obj) // age = 18
</script>
```

# 正则表达式

## 正则表达式的使用

```html
<script>
  // 正则表达式在js中的使用
  // 1. 利用 RegExp对象来创建 正则表达式
  var regexp = new RegExp(/123/)
  console.log(regexp) // /123/

  // 2. 利用字面量创建 正则表达式
  var rg = /123/

  // 3.test 方法用来检测字符串是否符合正则表达式要求的规范
  console.log(rg.test(123)) // true
  console.log(rg.test('abc')) // false
  var zz = /aa/
  console.log(zz.test('aa')) // true
</script>
```

## 正则表达式的特殊字符

    一个正则表达式可以由简单的字符构成，比如 /abc/，也可以是简单和特殊字符的组合，比如 /ab*c/ 。其中特殊字符也被称为元字符，在正则表达式中是具有特殊意义的专用符号，如 ^ 、$ 、+ 等
    特殊字符非常多，可以参考：
    MDN：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
    jQuery 手册：正则表达式部分
    正则测试工具: http://tool.oschina.net/regex

> 边界符
> 正则表达式中的边界符（位置符）用来提示字符所处的位置，主要有两个字符

```html
<script>
  // 边界符 ^ $
  var rg = /abc/ // 正则表达式里面不需要加引号 不管是数字型还是字符串型
  // /abc/ 只要包含有abc这个字符串返回的都是true
  console.log(rg.test('abc')) // true
  console.log(rg.test('abcd')) // true
  console.log(rg.test('aabcd')) // true
  console.log('---------------------------')
  var reg = /^abc/
  console.log(reg.test('abc')) // true
  console.log(reg.test('abcd')) // true
  console.log(reg.test('aabcd')) // false
  console.log('---------------------------')
  var reg1 = /^abc$/ // 精确匹配 要求必须是 abc字符串才符合规范
  console.log(reg1.test('abc')) // true
  console.log(reg1.test('abcd')) // false
  console.log(reg1.test('aabcd')) // false
  console.log(reg1.test('abcabc')) // false
</script>
```

> 字符类

    字符类表示有一系列字符可供选择，只要匹配其中一个就可以了。所有可供选择的字符都放在方括号内
    1. [] 方括号
    /[abc]/.test('andy') // true
    后面的字符串只要包含 abc 中任意一个字符，都返回 true

    2. [-] 方括号内部 范围符-
    /^[a-z]$/.test(c') // true
    方括号内部加上 - 表示范围，这里表示 a 到 z 26个英文字母都可以

    3. [^] 方括号内部 取反符^
    /[^abc]/.test('andy') // false
    注意和边界符 ^ 区别，边界符写到方括号外面

    4. 字符组合
    /[a-z1-9]/.test('andy') // true
    方括号内部可以使用字符组合，这里表示包含 a 到 z 的26个英文字母和 1 到 9 的数字都可以

```html
<script>
  //var rg = /abc/;  只要包含abc就可以
  // 字符类: [] 表示有一系列字符可供选择，只要匹配其中一个就可以了
  var rg = /[abc]/ // 只要包含有a 或者 包含有b 或者包含有c 都返回为true
  console.log(rg.test('andy')) // true
  console.log(rg.test('baby')) // true
  console.log(rg.test('color')) // true
  console.log(rg.test('red')) // false
  var rg1 = /^[abc]$/ // 三选一 只有是a 或者是 b  或者是c 这三个字母才返回 true
  console.log(rg1.test('aa')) // false
  console.log(rg1.test('a')) // true
  console.log(rg1.test('b')) // true
  console.log(rg1.test('c')) // true
  console.log(rg1.test('abc')) // false
  console.log('------------------')

  var reg = /^[a-z]$/ // 26个英文字母任何一个字母返回 true  - 表示的是a 到z 的范围
  console.log(reg.test('a')) // true
  console.log(reg.test('z')) // true
  console.log(reg.test(1)) // false
  console.log(reg.test('A')) // false
  // 字符组合
  var reg1 = /^[a-zA-Z0-9_-]$/ // 26个英文字母(大写和小写都可以)任何一个字母返回 true
  console.log(reg1.test('a')) // true
  console.log(reg1.test('B')) // true
  console.log(reg1.test(8)) // true
  console.log(reg1.test('-')) // true
  console.log(reg1.test('_')) // true
  console.log(reg1.test('!')) // false
  console.log('----------------')
  // 如果中括号里面有^ 表示取反的意思 千万和 我们边界符 ^ 别混淆
  var reg2 = /^[^a-zA-Z0-9_-]$/
  console.log(reg2.test('a')) // false
  console.log(reg2.test('B')) // false
  console.log(reg2.test(8)) // false
  console.log(reg2.test('-')) // false
  console.log(reg2.test('_')) // false
  console.log(reg2.test('!')) // true
</script>
```

> 量词符

| 量词  | 说明                  |
| ----- | :-------------------- |
| \*    | 重复零次或更多次 >=0  |
| +     | 重复一次或更多次 >=1  |
| ?     | 重复零次或一次 =0 =1  |
| {n}   | 重复 n 次 =n          |
| {n,}  | 重复 n 次或更多次 >=n |
| {n,m} | 重复 n 到 m 次 n<x<m  |

> 括号总结

    1. 大括号 量词符. 里面表示重复次数
    2. 中括号 字符集合。匹配方括号中的任意字符.
    3. 小括号 表示优先级
    可以在线测试: https://c.runoob.com

> 预定义类

| 预定类 | 说明                                                            |
| ------ | :-------------------------------------------------------------- |
| \d     | 匹配 0-9 之间的任一数字，相当于 [0-9]                           |
| \D     | 匹配所有 0-9 以为的字符，相当于 [^0-9]                          |
| \w     | 匹配任意的字母、数字、下划线，相当于 [A-Za-z0-9_]               |
| \W     | 除所有字母、数字、下划线以为的字符，相当于 [^a-za-z0-9_]        |
| \s     | 匹配空格（包括换行符、制表符、空格符），相当于 [\t \r \n \v \f] |
| \S     | 匹配非空格的字符，相当于 [^\t \r \n \v \f]                      |

### 代码案例

> 用户名验证

```html
<input type="text" class="uname" />
<span>请输入用户名</span>
<script>
  //  量词是设定某个模式出现的次数
  var reg = /^[a-zA-Z0-9_-]{6,16}$/ // 这个模式用户只能输入英文字母 数字 下划线 短横线但是有边界符和[] 这就限定了只能多选1
  // {6,16}  中间不要有空格
  var uname = document.querySelector('.uname')
  var span = document.querySelector('span')
  uname.addEventListener('blur', function () {
    if (reg.test(this.value)) {
      console.log('输入正确')
      span.innerHTML = '输出正确哦'
      span.className = 'right'
    } else {
      console.log('输入错误')
      span.innerHTML = '输入错误呢'
      span.className = 'wrong'
    }
  })
</script>
```

> 座机验证

```html
<script>
  // 座机号码验证:  全国座机号码  两种格式:   010-12345678  或者  0530-1234567
  // 正则里面的或者 符号  |
  // var reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
  var reg = /^\d{3,4}-\d{7,8}$/
</script>
```

> 表单验证

```html
1. 手机号码: /^1[3|4|5|7|8][0-9]{9}$/ 2. QQ: [1-9][0-9]{4,}
(腾讯QQ号从10000开始) 3. 昵称是中文: ^[\u4e00-\u9fa5]{2,8}$ js 部分
<script>
  window.addEventListener('load', function () {
    var regtel = /^1[3|4|5|8]\d{9}$/ //手机号正则
    var regqq = /^[1-9][0-9]{4,9}$/
    var regnc = /^[\u4e00-\u9fa5\w]{2,6}$/
    var regmsg = /^\d{6}$/
    var regpwd = /^\w{6,16}$/
    var tel = document.querySelector('#tel')
    var qq = document.querySelector('#qq')
    var nc = document.querySelector('#nc')
    var msg = document.querySelector('#msg')
    var pwd = document.querySelector('#pwd')
    var surepwd = document.querySelector('#surepwd')
    RegExp(tel, regtel)
    RegExp(qq, regqq)
    RegExp(nc, regnc)
    RegExp(msg, regmsg)
    RegExp(pwd, regpwd)
    function RegExp(ele, reg) {
      ele.addEventListener('blur', function () {
        if (reg.test(this.value)) {
          this.nextElementSibling.className = 'success'
          this.nextElementSibling.innerHTML =
            '<i class="success_icon"></i> 恭喜您输入正确'
        } else {
          this.nextElementSibling.className = 'error'
          this.nextElementSibling.innerHTML =
            '<i class="error_icon"></i> 格式不正确，请从新输入 '
        }
      })
    }

    surepwd.addEventListener('blur', function () {
      if (this.value == pwd.value) {
        this.nextElementSibling.className = 'success'
        this.nextElementSibling.innerHTML =
          '<i class="success_icon"></i> 恭喜您输入正确'
      } else {
        this.nextElementSibling.className = 'error'
        this.nextElementSibling.innerHTML =
          '<i class="error_icon"></i> 格式不正确，请从新输入 '
      }
    })
  })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/31fd5c5a08ec4236907245cf6df43771.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

## 正则表达式中的替换

```html
replace 替换 replace()
方法可以实现替换字符串操作，用来替换的参数可以是一个字符串或是一个正则表达式。
stringObject.replace(regexp/substr,replacement) 1. 第一个参数: 被替换的字符串
或者 正则表达式 2. 第二个参数: 替换为的字符串 3. 返回值是一个替换完毕的新字符串
正则表达式参数 /表达式/[switch] switch(也称为修饰符) 按照什么样的模式来匹配.
有三种值 g：全局匹配 i：忽略大小写 gi：全局匹配 + 忽略大小写
```

```html
<style>
  textarea {
    width: 300px;
    height: 100px;
    border: 1px solid #ccc;
  }
</style>
<textarea name="" id="message"></textarea>
<button>提交</button>
<div></div>
<script>
  // 替换 replace
  // var str = 'andy和red';
  // // var newStr = str.replace('andy', 'baby');
  // var newStr = str.replace(/andy/, 'baby');
  // console.log(newStr);
  var text = document.querySelector('textarea')
  var btn = document.querySelector('button')
  var div = document.querySelector('div')
  btn.onclick = function () {
    div.innerHTML = text.value.replace(/激情|gay/g, '**')
  }
</script>
```
