---
title: JavaScript面试题1
date: 2022-01-22
categories:
  - 面试题
tags:
  - JavaScript1
---

::: tip
包含：一、数据类型与检测，二、ES6，三、JS 基础
:::

<!-- more -->

# #markdown 正文

> 带 ✅ 的为常见面试题（可能不准确）带 ❌ 的表示不常用 📢
>
> [JavaScript 面试题 PDF 文件](https://ychzx.top/studyWeb/interview/JavaScript面试题.pdf)

![JavaScript面试题](./img/js.png)

# JavaScript 面试题

## 一、数据类型与检测

### ✅1.intanceof 操作符的实现原理及实现？

instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

```js
function myInstanceof(left, right) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left)
  // 获取构造函数的 prototype 对象
  let prototype = right.prototype

  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false
    if (proto === prototype) return true
    // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
    proto = Object.getPrototypeOf(proto)
  }
}
```

### ✅2.判断数组的方式有哪些？

- 通过`Object.prototype.toString.call()`做判断

```javascript
Object.prototype.toString.call(obj).slice(8, -1) === 'Array'
```

- 通过**原型链做判断**

```javascript
obj.__proto__ === Array.prototype
```

- 通过 ES6 的`Array.isArray()`做判断

```javascript
Array.isArrray(obj)
```

- 通过`instanceof`做判断

```javascript
obj instanceof Array
```

- 通过`Array.prototype.isPrototypeOf`

```javascript
Array.prototype.isPrototypeOf(obj)
```

- `constructor`不可靠，如果改变原型指向一个对象的话，会有问题

### ✅3.null 和 undefined 的区别？

首先 Undefined 和 Null 都是**基本数据类型**，undefined 代表的含义是**未定义**，null 代表的含义是**空对象**。一般变量声明了但还**没有定义的时候会返回 undefined**，null 主要用于赋值给一些可能会返回对象的变量，作为初始化。

### ✅4.为什么 0.1+0.2 ! == 0.3，如何让其相等?

因为是计算两个数的二进制的和，而 0.1 和 0.2 都是无线循环的，所以为 0.3

`toFixed(num)` 方法可把 Number 四舍五入为指定小数位数的数字。

解决方法就是设置一个**误差范围，通常称为“机器精度”**。对 JavaScript 来说，这个值通常为 2-52，在 ES6 中，提供了`Number.EPSILON`属性，而它的值就是 2-52，只要判断`0.1+0.2-0.3`是否小于`Number.EPSILON`，如果小于，就可以判断为 0.1+0.2 ===0.3

```js
function numberepsilon(arg1, arg2) {
  return Math.abs(arg1 - arg2) < Number.EPSILON
}
console.log(numberepsilon(0.1 + 0.2, 0.3)) // true
```

### ✅5.isNaN 和 Number.isNaN 函数的区别？

- 函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
- 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，不会进行数据类型的转换，这种方法对于 NaN 的判断更为准确。

### ✅6.Object.is() 与比较操作符 “===”、“==” 的区别？

- 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
- 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。

### ✅7.== 操作符的强制类型转换规则？

对于 `==` 来说，如果对比双方的类型**不一样**，就会进行**类型转换**。假如对比 `x` 和 `y` 是否相同，就会进行如下判断流程：

1. 首先会判断两者类型是否**相同**，相同的话就比较两者的大小；
2. 类型不相同的话，就会进行类型转换；
3. 会先判断是否在对比 `null` 和 `undefined`，是的话就会返回 `true`
4. 判断两者类型是否为 `string` 和 `number`，是的话就会将字符串转换为 `number`

```js
1 == '1'
      ↓
1 ==  1
```

5. 判断其中一方是否为 `boolean`，是的话就会把 `boolean` 转为 `number` 再进行判断

```js
'1' == true
        ↓
'1' ==  1
        ↓
 1  ==  1
```

6. 判断其中一方是否为 `object` 且另一方为 `string`、`number` 或者 `symbol`，是的话就会把 `object` 转为原始类型再进行判断

```js
'1' == { name: 'js' }
        ↓
'1' == '[object Object]'
```

### ✅8.object.assign 和扩展运算法是深拷贝还是浅拷贝，两者区别？

- 都浅拷贝

- `Object.assign()`方法接收的第一个参数作为目标对象，后面的所有参数作为源对象。然后把所有的源对象合并到目标对象中。它会修改了一个对象，因此会触发 ES6 setter。

- **扩展操作符（…）**使用它时，数组或对象中的每一个值都会被拷贝到一个新的数组或对象中。它不复制继承的属性或类的属性，但是它会复制 ES6 的 symbols 属性。

### 9.JS 有哪些数据类型？

JavaScript 共有**八种数据类型**，分别是 `Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt`。

其中 Symbol 和 BigInt 是 ES6 中新增的数据类型：

- `Symbol` 代表创建后**独一无二且不可变的数据类型**，它主要是为了解决可能出现的全局变量冲突的问题。
- `BigInt` 是一种**数字类型的数据**，它可以表示**任意精度格式的整数**，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

这些数据可以分为**原始数据类型**和**引用数据类型**：

- 栈：原始数据类型（Undefined、Null、Boolean、Number、String）
- 堆：引用数据类型（对象、数组和函数）

### 10.|| 和 && 操作符的返回值？

|| 和 && 首先会对第一个操作数执行条件判断，如果其不是布尔值就先强制转换为布尔类型，然后再执行条件判断。

- 对于 || 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。
- && 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。

|| 和 && 返回它们其中一个操作数的值，而非条件判断的结果

### 11.JS 数据类型检测的方式有哪些？

- `typeof console.log(**typeof** 2); *// number*`
- `instanceof`可以正确判断对象的类型，**其内部运行机制是判断在其原型链中能否找到该类型的原型**。
- `constructor`有两个作用，一是判断数据的类型，二是对象实例通过 `constrcutor` 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了：
- `Object.prototype.toString.call()` 使用 Object 对象的原型方法 toString 来判断数据类型

### 12.typeof 能检测哪些数据类型？

- 可以检测 function，和基础数据类型
- typeof NaN 为 number
- typeof null 为 object
- 其他基础数据类型

### 13.如何获取安全的 undefined 值？

因为 undefined 是一个标识符，所以可以被当作变量来使用和赋值，但是这样会影响 undefined 的正常判断。**表达式 void \_\_\_ 没有返回值**，因此**返回结果是 undefined**。**void 并不改变表达式的结果**，只是让表达式不返回值。因此可以**用 void 0 来获得 undefined**。

### 14.typeof null / typeof NaN 的结果是什么，为什么？

- typeof null 为 object
- typeof NaN 为 number

NaN 指“**不是一个数字**”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。**NaN 是一个特殊值**，它和自身不相等，是唯一一个**非自反**（自反，reflexive，即 x === x 不成立）的值。而 **NaN !== NaN 为 true。**

### 15.其他值到字符串/布尔类型/数字值的转换规则？

**其他值到布尔的值的转换规则？**

- 假值: **undefined null false +0、-0 和 NaN**
- 假值的布尔强制类型转换结果为 false。从逻辑上说，假值列表以外的都应该是真值。

**其他值到数字值的转换规则？**

- Undefined 类型的值转换为 NaN。
- Null 类型的值转换为 0。
- Boolean 类型的值，true 转换为 1，false 转换为 0。
- String 类型的值转换如同使用 Number() 函数进行转换，如果包含非数字值则转换为 NaN，空字符串为 0。
- Symbol 类型的值不能转换为数字，会报错。
- 对象（包括数组）会首先被转换为相应的基本类型值，如果返回的是非数字的基本类型值，则再遵循以上规则将其强制转换为数字。

### 其他值到字符串的转换规则？

- Null 和 Undefined 类型 ，null 转换为 "null"，undefined 转换为 "undefined"，
- Boolean 类型，true 转换为 "true"，false 转换为 "false"。
- Number 类型的值直接转换，不过那些极小和极大的数字会使用指数形式。
- Symbol 类型的值直接转换，但是只允许显式强制类型转换，使用隐式强制类型转换会产生错误。
- 对普通对象来说，除非自行定义 toString() 方法，否则会调用 toString()（Object.prototype.toString()）来返回内部属性 [[Class]] 的值，如"[object Object]"。如果对象有自己的 toString() 方法，字符串化时就会调用该方法并使用其返回值。

### 16.JavaScript 中如何进行隐式类型转换？

首先要介绍`ToPrimitive`方法，这是 JavaScript 中每个值隐含的自带的方法，用来将值 （无论是基本类型值还是对象）转换为基本类型值。如果值为基本类型，则直接返回值本身；如果值为对象，其看起来大概是这样：

```js
/**
 * @obj 需要转换的对象
 * @type 期望的结果类型
 */
ToPrimitive(obj, type)
```

`type`的值为`number`或者`string`。

**（1）当**`type`**为**`number`**时规则如下：**

- 调用`obj`的`valueOf`方法，如果为原始值，则返回，否则下一步；
- 调用`obj`的`toString`方法，后续同上；
- 抛出`TypeError` 异常。

**（2）当**`type`**为**`string`**时规则如下：**

- 调用`obj`的`toString`方法，如果为原始值，则返回，否则下一步；
- 调用`obj`的`valueOf`方法，后续同上；
- 抛出`TypeError` 异常。

### 17.+ 操作符什么时候用于字符串的拼接？

- \+ 的其中一个操作数是字符串（或者通过以上步骤最终得到字符串），则执行字符串拼接，否则执行数字加法

### 18.什么是 JavaScript 中的包装类型？

- 在 JavaScript 中，基本类型是没有属性和方法的，但是为了便于操作基本类型的值，在调用基本类型的属性或方法时 JavaScript 会在后台隐式地将基本类型的值转换为对象，

```js
var a = new Boolean(false)
if (!a) {
  console.log('Oops') // never runs
}
```

答案是什么都不会打印，因为虽然包裹的基本类型是`false`，但是`false`被包裹成包装类型后就成了对象，所以其非值为`false`，所以循环体中的内容不会运行。

### 19.为什么会有 BigInt 的提案？

**JavaScript 中 Number.MAX_SAFE_INTEGER 表示最⼤安全数字，计算结果是 9007199254740991**，即在这个数**范围内不会出现精度丢失**（⼩数除外）。但是⼀旦**超过这个范围**，js 就会出现**计算不准确**的情况，这在⼤数计算的时候不得不依靠⼀些第三⽅库进⾏解决，因此官⽅**提出了 BigInt 来解决**此问题。

## 二、ES6

### ✅1.let、const、var 的区别？

**（1）块级作用域：** 块作用域由 `{ }`包括，let 和 const 具有块级作用域，var 不存在块级作用域。块级作用域解决了 ES5 中的两个问题：

- 内层变量可能覆盖外层变量
- 用来计数的循环变量泄露为全局变量

**（2）变量提升：** var 存在变量提升，let 和 const 不存在变量提升，即在变量只能在声明之后使用，否在会报错。

**（3）给全局添加属性：** 浏览器的全局对象是 window，Node 的全局对象是 global。var 声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是 let 和 const 不会。

**（4）重复声明：** var 声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const 和 let 不允许重复声明变量。

**（5）暂时性死区：** 在使用 let、const 命令声明变量之前，该变量都是不可用的。这在语法上，称为**暂时性死区**。使用 var 声明的变量不存在暂时性死区。

**（6）初始值设置：** 在变量声明时，var 和 let 可以不用设置初始值。而 const 声明变量必须设置初始值。

**（7）指针指向：** let 和 const 都是 ES6 新增的用于创建变量的语法。 let 创建的变量是可以更改指针指向（可以重新赋值）。但 const 声明的变量是不允许改变指针的指向。

|        区别        | var | let | const |
| :----------------: | :-: | :-: | :---: |
|  是否有块级作用域  |  X  |  √  |   √   |
|  是否存在变量提升  |  √  |  X  |   X   |
|  是否添加全局属性  |  √  |  X  |   X   |
|  能否重复声明变量  |  √  |  X  |   X   |
| 是否存在暂时性死区 |  X  |  √  |   √   |
| 是否必须设置初始值 |  X  |  X  |   √   |
|  能否改变指针指向  |  √  |  √  |   X   |

### ✅2.箭头函数与普通函数的区别/箭头函数/箭头函数的 this 指向哪⾥？

- **箭头函数**比普通函数**更加简洁**

- **箭头函数没有自己的 this**，所以创建时的上层作用域，自身没有 this

- **箭头函数继承来的 this 指向永远不会改变**

  ```js
  var id = 'GLOBAL'
  var obj = {
    id: 'OBJ',
    a: function () {
      console.log(this.id)
    },
    b: () => {
      console.log(this.id)
    }
  }
  obj.a() // 'OBJ'
  obj.b() // 'GLOBAL'
  new obj.a() // undefined
  new obj.b() // Uncaught TypeError: obj.b is not a constructor
  ```

  对象 obj 的方法 b 是使用箭头函数定义的，这个函数中的 this 就永远指向它定义时所处的全局执行环境中的 this，即便这个函数是作为对象 obj 的方法调用，this 依旧指向 Window 对象。需要注意，定义对象的大括号`{}`是无法形成一个单独的执行环境的，它依旧是处于全局执行环境中。

- **call()、apply()、bind()等方法不能改变箭头函数中 this 的指向**

- **箭头函数不能作为构造函数使用**

- 没有**prototype**，不能做**Generator**函数，**不能使用 yeild 关键字**

### ✅3.const 对象的属性可以修改吗？

const 保证的并不是变量的值不能改动，而是**变量指向的那个内存地址不能改动**。对于基本类型的数据（数值、字符串、布尔值），**其值就保存在变量指向的那个内存地址**，因此等同于常量。

但对于**引用类型的数据**（主要是对象和数组）来说，**变量指向数据的内存地址**，保存的只是一个指针，const 只能**保证这个指针是固定不变**的，至于它指向的数据结构是不是可变的，就完全不能控制了。

### ✅4.如果 new 一个箭头函数的会怎么样？

- 箭头函数是 ES6 中的提出来的，它没有 prototype，this，arguments，所以**不能 New 一个箭头函数**。

### 5.ES6 中模板语法与字符串处理？

- ```js
  `${}`//简化以前拼接字符串要写很多引号
  ```

除了模板语法外， ES6 中还新增了一系列的字符串方法用于提升开发效率：

（1）**存在性判定**：在过去，当判断一个字符/字符串是否在某字符串中时，只能用 indexOf > -1 来做。现在 ES6 提供了三个方法：includes、startsWith、endsWith，它们都会返回一个布尔值来告诉你是否存在。

- **includes**：判断字符串与子串的包含关系：
- **startsWith**：判断字符串是否以某个/某串字符开头：
- **startsWith**：判断字符串是否以某个/某串字符开头：

（2）**自动重复**：可以使用 repeat 方法来使同一个字符串输出多次（被连续复制多次）：

```js
const sourceCode = 'repeat for 3 times;'
const repeated = sourceCode.repeat(3)
console.log(repeated) // repeat for 3 times;repeat for 3 times;repeat for 3 times;
```

### 6.对 rest 参数的理解？

- 扩展运算符被用在函数形参上时，**它还可以把一个分离的参数序列整合成一个数组**
- **经常用于获取函数的多余参数，或者像上面这样处理函数参数个数不确定的情况。**

### 7.扩展运算符(...)的作用及使用场景？

需要注意：**扩展运算符对对象实例的拷贝属于浅拷贝**。**扩展运算符与解构赋值结合起来，用于生成数组**。**如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。**

- 对象扩展运算符、覆盖前面相同属性
- 转换为参数序列
- **复制数组**、**合并数组**（如果数组赋值，则只能放在参数最后一位，否则报错）、**生成数组**、**将字符串转为真正的数组**
- **任何 Iterator 接口的对象，都可以用扩展运算符转为真正的数组**、用于替换`es5`中的`Array.prototype.slice.call(arguments)`写法。

### 8.Proxy 可以实现什么功能？

在 Vue3.0 中通过 `Proxy` 来替换原本的 `Object.defineProperty` 来实现数据响应式。

Proxy 是 ES6 中新增的功能，它可以用来自定义对象中的操作。

```unknown
let p = new Proxy(target, handler)
```

`target` 代表需要添加代理的对象，`handler` 用来自定义对象中的操作，比如可以用来自定义 `set` 或者 `get` 函数。

如果需要实现一个 Vue 中的响应式，需要在 `get` 中收集依赖，在 `set` 派发更新，之所以 Vue3.0 要使用 `Proxy` 替换原本的 API 原因在于 `Proxy` 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 `Proxy` 可以完美监听到任何方式的数据改变，唯一缺陷就是浏览器的兼容性不好。

### 9.对 对象与数组 的解构的理解？

- **数组解构**是一一对应，以元素的位置为匹配条件来提取想要的数据的
- **对象解构**是 以属性的名称为匹配条件，来提取想要的数据的。**严格匹配键名**

### 10.如何提取高度嵌套的对象里的指定属性？

- 对象连续解构

## 三、JS 基础

### ✅1.new 操作符的实现原理？

（1）首先创建了一个新的空对象

（2）设置原型，将对象的原型设置为函数的 prototype 对象。

（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）

（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

### ✅2.数组有哪些原生方法？

- **数组和字符串的转换方法**：`toString()、toLocalString()、join()` 其中 join() 方法可以指定转换为字符串时的分隔符。

- **数组尾部操作的方法** `pop() 和 push()`，push 方法可以传入多个参数。

- **数组首部操作的方法** `shift() 和 unshift()` 重排序的方法 reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置。

- **数组连接的方法** `concat()` ，返回的是拼接好的数组，不影响原数组。

- **数组截取办法** `slice()`，用于截取数组中的一部分返回，不影响原数组。

- **数组插入方法** `splice()`，影响原数组查找特定项的索引的方法，indexOf() 和 lastIndexOf() 迭代方法 every()、some()、filter()、map() 和 forEach() 方法

- **数组归并方法** reduce() 和 reduceRight() 方法

### ✅3.JavaScript 为什么要进行变量提升，它导致了什么问题？

造成变量声明提升的**本质原因**是 js 引擎在代码执行前有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象。

首先要知道，JS 在拿到一个变量或者一个函数的时候，会有两步操作，即解析和执行。

- **在解析阶段**，JS 会检查语法，并对函数进行预编译。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为 undefined，函数先声明好可使用。在一个函数执行之前，也会创建一个函数执行上下文环境，跟全局执行上下文类似，不过函数执行上下文会多出 this、arguments 和函数的参数。

  全局上下文：变量定义，函数声明

  函数上下文：变量定义，函数声明，this，arguments

- **在执行阶段**，就是按照代码的顺序依次执行。

那为什么会进行变量提升呢？主要有以下两个原因：

- **提高性能**
- **容错性更好**
- **总结：**
  - 解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
  - 声明提升还可以提高 JS 代码的容错性，使一些不规范的代码也可以正常执行

### ✅4.ES6 模块与 CommonJS 模块有什么异同？

**ES6 Module 和 CommonJS 模块的区别：**

- CommonJS 是对模块的浅拷⻉，ES6 Module 是对模块的引⽤，即**ES6 Module 只存只读，不能改变其值**，也就是指针指向不能变，类似 const；
- import 的接⼝是 read-only（只读状态），不能修改其变量值。 即不能修改其变量的指针指向，但可以改变变量内部指针指向，可以对 commonJS 对重新赋值（改变指针指向），但是对 ES6 Module 赋值会编译报错。

**ES6 Module 和 CommonJS 模块的共同点：**

- CommonJS 和 ES6 Module 都可以对引⼊的对象进⾏赋值，即**对对象内部属性的值进⾏改变**。

### ✅5.for...in 和 for...of 的区别?

for…of 是 ES6 新增的遍历方式，允许遍历一个含有 iterator 接口的数据结构（数组、对象等）并且返回各项的值，和 ES3 中的 for…in 的区别如下

- for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；

**总结：** for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

### ✅6.ajax、axios、fetch 的区别?

（1）**ajax**： 本身是针对 MVC 编程，不符合前端 MVVM 的浪潮 基于原生 XHR 开发，XHR 本身的架构不清晰 不符合关注分离（Separation of Concerns）的原则 配置和调用方式非常混乱，而且基于事件的异步模型不友好。

（2）**Fetch**： **fetch 不是 ajax 的进一步封装，而是原生 js，没有使用 XMLHttpRequest 对象**。语法简洁，更加语义化 基于标准 Promise 实现，支持 async/await 更加底层，提供的 API 丰富（request, response） 脱离了 XHR，是 ES 规范里新的实现方式

**fetch 的缺点**：fetch 只对网络请求报错，对 400，500 都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。 fetch 默认不会带 cookie，需要添加配置项： fetch(url, {credentials: 'include'}) fetch 不支持 abort，不支持超时控制，使用 setTimeout 及 Promise.reject 的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费 fetch 没有办法原生监测请求的进度，而 XHR 可以

（3）**Axios** Axios 是一种基于 Promise 封装的 HTTP 客户端，其特点如下：

浏览器端发起 XMLHttpRequests 请求 。node 端发起 http 请求 。支持 Promise API 。监听请求和返回 。对请求和返回进行转化。 取消请求。 自动转换 json 数据。 客户端支持抵御 XSRF 攻击。

### 7.常用的正则表达式有哪些？

```js
// （1）匹配 16 进制颜色值
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g

// （2）匹配日期，如 yyyy-mm-dd 格式
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

// （3）匹配 qq 号
var regex = /^[1-9][0-9]{4,10}$/g

// （4）手机号码正则
var regex = /^1[34578]\d{9}$/g

// （5）用户名正则
var regex = /^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/
```

### 8.JavaScript 类数组对象的定义？

一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length 属性值，代表可接收的参数个数。

常见的类数组转换为数组的方法有这样几种：

（1）通过 call 调用数组的 slice 方法来实现转换

```js
Array.prototype.slice.call(arrayLike)
```

（2）通过 call 调用数组的 splice 方法来实现转换

```js
Array.prototype.splice.call(arrayLike, 0)
```

（3）通过 apply 调用数组的 concat 方法来实现转换

```js
Array.prototype.concat.apply([], arrayLike)
```

（4）通过 Array.from 方法来实现转换

```js
Array.from(arrayLike)
```

（5）通过扩展运算符

```js
;[...arrayLike]
```

### 9.JavaScript 脚本延迟加载的方式有哪些？

- **defer 属性**；**async 属性**
- **动态创建 DOM 方式**
- **使用 setTimeout 延迟方法**
- **让 JS 最后加载**

### 10.为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?

`arguments`是一个对象，它的属性是从 0 开始依次递增的数字，还有`callee`和`length`等属性，与数组相似；但是它却没有数组常见的方法属性，如`forEach`, `reduce`等，所以叫它们类数组。

要遍历类数组，有三个方法：

（1）将数组的方法应用到类数组上，这时候就可以使用`call`和`apply`方法，如：

```js
function foo() {
  Array.prototype.forEach.call(arguments, (a) => console.log(a))
}
```

（2）使用 Array.from 方法将类数组转化成数组：‌

```js
function foo() {
  const arrArgs = Array.from(arguments)
  arrArgs.forEach((a) => console.log(a))
}
```

（3）使用展开运算符将类数组转化成数组

```js
function foo() {
  const arrArgs = [...arguments]
  arrArgs.forEach((a) => console.log(a))
}
```

### 11.map 和 weakmap 的区别？

1）**Map** map 本质上就是键值对的集合，结构原生提供是三个遍历器生成函数和一个遍历方法

- keys()：返回键名的遍历器。
- values()：返回键值的遍历器。
- entries()：返回所有成员的遍历器。
- forEach()：遍历 Map 的所有成员。

2）**WeakMap** WeakMap 对象也是一组键值对的集合，其中的键是弱引用的。**其键必须是对象**，原始数据类型不能作为 key 值，而值可以是任意的。

WeakMap 的设计目的在于，有时想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这两个对象，就必须手动删除这个引用，否则垃圾回收机制就不会释放对象占用的内存。

而 WeakMap 的**键名所引用的对象都是弱引用**，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的**键名对象和所对应的键值对会自动消失，不用手动删除引用**。

**总结：**

- Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
- WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。

### 12.Map 和 Object 的区别？

|          | **Map**                                                                    | **Object**                                                                  |
| -------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 意外的键 | Map 默认情况不包含任何键，只包含显式插入的键。                             | Object 有一个原型, 原型链上的键名有可能和自己在对象上的设置的键名产生冲突。 |
| 键的类型 | Map 的键可以是任意值，包括函数、对象或任意基本类型。                       | Object 的键必须是 String 或是 Symbol。                                      |
| 键的顺序 | Map 中的 key 是有序的。因此，当迭代的时候， Map 对象以插入的顺序返回键值。 | Object 的键是无序的                                                         |
| Size     | Map 的键值对个数可以轻易地通过 size 属性获取                               | Object 的键值对个数只能手动计算                                             |
| 迭代     | Map 是 iterable 的，所以可以直接被迭代。                                   | 迭代 Object 需要以某种方式获取它的键然后才能迭代。                          |
| 性能     | 在频繁增删键值对的场景下表现更好。                                         | 在频繁添加和删除键值对的场景下未作出优化。                                  |

### 13.什么是 DOM 和 BOM？

- **DOM 指的是文档对象模型**，它指的是把文档当做一个对象，这个对象主要定义了处理网页内容的方法和接口。

- **BOM 指的是浏览器对象模型**，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM 的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 location 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对象的子对象。

### 14.常见的 DOM 操作有哪些?

- 1）DOM 节点的获取

```js
getElementById // 按照 id 查询
getElementsByTagName // 按照标签名查询
getElementsByClassName // 按照类名查询
querySelectorAll // 按照 css 选择器查询
```

- 2）DOM 节点的创建

**创建一个新节点，并把它添加到指定节点的后面。** `createElement appendChild`

- 3）DOM 节点的删除

**删除指定的 DOM 节点** `removeChild`

- 4）修改 DOM 元素

**将指定的两个 DOM 元素交换位置** `insertBefore` 或者 `appendChild`

### 15.对 JSON 的理解？

JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。在项目开发中，使用 JSON 作为前后端数据交换的方式。在 js 中提供了两个函数来实现 js 数据结构和 JSON 格式的转换处理

- JSON.stringify 函数
- JSON.parse() 函数

### 16.什么是尾调用，使用尾调用有什么好处？

尾调用指的是函数的最后一步调用另一个函数。 代码执行是基于执行栈的，所以当在一个函数里调用另一个函数时，会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，因为已经是函数的最后一步，所以这时可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。但是 ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

### 17.常见的位运算符有哪些？其计算规则是什么？

- 按位与运算符（&）
- 按位或运算符（|）
- 异或运算符（^）
- 取反运算符（~）
- 左移运算符（<<）
- 右移运算符（>>）
- 原码、补码、反码

### 18.对类数组对象的理解，如何转化为数组?

- 通过 call 调用数组的 slice 方法来实现转换

```js
Array.prototype.slice.call(arrayLike)
```

- 通过 call 调用数组的 splice 方法来实现转换

```js
Array.prototype.splice.call(arrayLike, 0)
```

- 通过 apply 调用数组的 concat 方法来实现转换

```js
Array.prototype.concat.apply([], arrayLike)
```

- 通过 Array.from 方法来实现转换

```js
Array.from(arrayLike)
```

### 19.escape、encodeURI、encodeURIComponent 的区别?

- encodeURI 是对`整个` URI 进行转义，将 URI 中的非法字符转换为合法字符，所以对于一些在 URI 中有特殊意义的字符不会进行转义。
- encodeURIComponent 是对 URI 的组成`部分`进行转义，所以一些特殊字符也会得到转义。
- escape 和 encodeURI 的作用相同，不过它们对于 unicode 编码为 0xff 之外字符的时候会有区别

### 20.forEach 和 map 方法有什么区别?

这方法都是用来遍历数组的，两者区别如下：

- forEach()方法会针对每一个元素执行提供的函数，对数据的操作会改变原数组，该方法没有返回值；
- map()方法不会改变原数组的值，返回一个新数组，新数组中的值为原数组调用函数处理之后的值；

### 21.对 AJAX 的理解，实现一个 AJAX 请求?

创建 AJAX 请求的步骤：

- **创建一个 XMLHttpRequest 对象。**
- **使用 open 方法创建一个 HTTP 请求**
- **添加一些信息和监听函数**
- **用 sent 方法来向服务器发起请求**

- ```js
  const SERVER_URL = '/server'
  let xhr = new XMLHttpRequest() //创建xhr实例
  xhr.open('GET', url, true) //设置请求路径xhr.open("GET", url, true);
  // 设置状态监听函数
  xhr.onreadystatechange = function () {
    if (this.readyState !== 4) return
    // 当请求成功时
    if (this.status === 200) {
      handle(this.response)
    } else {
      console.error(this.statusText)
    }
  }
  // 发送 Http 请求
  xhr.send(null)
  ```

使用 Promise 封装 AJAX：

```js
// promise 封装实现：
function getJSON(url) {
  // 创建一个 promise 对象
  let promise = new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest()
    // 新建一个 http 请求
    xhr.open('GET', url, true)
    // 设置状态的监听函数
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) return
      // 当请求成功或失败时，改变 promise 的状态
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    // 设置错误监听函数
    xhr.onerror = function () {
      reject(new Error(this.statusText))
    }
    // 设置响应的数据类型
    xhr.responseType = 'json'
    // 设置请求头信息
    xhr.setRequestHeader('Accept', 'application/json')
    // 发送 http 请求
    xhr.send(null)
  })
  return promise
}
```

### 22.use strict 是什么意思 ? 使用它区别是什么？

use strict 是一种 ECMAscript5 添加的（严格模式）运行模式，这种模式使得 Javascript 在更严格的条件下运行。**设立严格模式的目的如下：**

- 消除 Javascript 语法的不合理、不严谨之处，减少怪异行为;
- 消除代码运行的不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 Javascript 做好铺垫。

**区别：**

- **禁止使用 with 语句**。
- **禁止 this 关键字指向全局对象**。
- **对象不能有重名的属性**。

### 23.如何判断一个对象是否属于某个类？

- 第一种方式，使用 instanceof 运算符来判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。

- 第二种方式，通过对象的 constructor 属性来判断，对象的 constructor 属性指向该对象的构造函数，但是这种方式不是很安全，因为 constructor 属性可以被改写。

- 第三种方式，如果需要判断的是某个内置的引用类型的话，可以使用 Object.prototype.toString() 方法来打印对象的[[Class]] 属性来进行判断。

### 24.如何使用 for...of 遍历对象?

for…of 是作为 ES6 新增的遍历方式，允许遍历一个含有 iterator 接口的数据结构（数组、对象等）并且返回各项的值，普通的对象用 for..of 遍历是会报错的。

如果需要遍历的对象是类数组对象，用 Array.from 转成数组即可。

```javascript
var obj = {
  0: 'one',
  1: 'two',
  length: 2
}
obj = Array.from(obj)
for (var k of obj) {
  console.log(k)
}
```

如果不是类数组对象，就给对象添加一个[Symbol.iterator]属性，并指向一个迭代器即可。

```javascript
//方法一：
var obj = {
  a: 1,
  b: 2,
  c: 3
}
obj[Symbol.iterator] = function () {
  var keys = Object.keys(this)
  var count = 0
  return {
    next() {
      if (count < keys.length) {
        return { value: obj[keys[count++]], done: false }
      } else {
        return { value: undefined, done: true }
      }
    }
  }
}
for (var k of obj) {
  console.log(k)
}
// 方法二
var obj = {
  a: 1,
  b: 2,
  c: 3
}
obj[Symbol.iterator] = function* () {
  var keys = Object.keys(obj)
  for (var k of keys) {
    yield [k, obj[k]]
  }
}
for (var [k, v] of obj) {
  console.log(k, v)
}
```

### 25.JavaScript 有哪些内置对象？

**标准内置对象的分类：**

**（1）值属性**，这些全局属性返回一个简单值，这些值没有自己的属性和方法。例如 Infinity、NaN、undefined、null 字面量

**（2）函数属性**，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。例如 eval()、parseFloat()、parseInt() 等

**（3）基本对象**，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。例如 Object、Function、Boolean、Symbol、Error 等

**（4）数字和日期对象**，用来表示数字、日期和执行数学计算的对象。例如 Number、Math、Date

**（5）字符串**，用来表示和操作字符串的对象。例如 String、RegExp

**（6）可索引的集合对象**，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象。例如 Array

**（7）使用键的集合对象**，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。 例如 Map、Set、WeakMap、WeakSet

**（8）矢量集合**，SIMD 矢量集合中的数据会被组织为一个数据序列。 例如 SIMD 等

**（9）结构化数据**，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。例如 JSON 等

**（10）控制抽象对象** 例如 Promise、Generator 等

**（11）反射**。例如 Reflect、Proxy

**（12）国际化**，为了支持多语言处理而加入 ECMAScript 的对象。例如 Intl、Intl.Collator 等

**（13）WebAssembly**

（14）其他。例如 `arguments`

**总结：** js 中的内置对象主要指的是在程序执行前存在全局作用域里的由 js 定义的一些全局值属性、函数和用来实例化其他对象的构造函数对象。一般经常用到的如全局变量值 NaN、undefined，全局函数如 parseInt()、parseFloat() 用来实例化对象的构造函数如 Date、Object 等，还有提供数学计算的单体内置对象如 Math 对象。

### 26.强类型语言和弱类型语言的区别?

**两者对比**：强类型语言在速度上可能略逊色于弱类型语言，但是强类型语言带来的严谨性可以有效地帮助避免许多错误。

### 27.解释性语言和编译型语言的区别?

**两者主要区别在于：**前者源程序编译后即可在该平台运行，后者是在运行期间才编译。所以前者运行速度快，后者跨平台性好。

