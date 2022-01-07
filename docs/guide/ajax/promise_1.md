---
title: Promise入门-理解-API
date: 2022-01-07
categories:
  - 网络请求
tags:
  - Promise_api
---

::: tip
Promise入门-理解-API，一些常用api
:::

<!-- more -->

### markdown 正文


# 1. 预备知识
## 1.1 实例对象与函数对象
	实例对象：通过 new 创建 const p = new Promise() 
	函数对象：function Fn()
## 1.2 JS中的异常error处理
### 1.错误的类型
	Error：所有错误的父类型

ReferenceError：引用的变量不存在
	
	console.log(a) // ReferenceError:a is not defined

TypeError：数据类型不正确

	let b
	console.log(b.xxx)
	// TypeError:Cannot read property 'xxx' of undefined
	
	let c = {}
	c.xxx()
	// TypeError:c.xxx is not a function
RangeError：数据值不在其所允许的范围内

	function fn() {
	  fn()
	}
	fn()
	// RangeError:Maximum call stack size exceeded
SyntaxError：语法错误

	const c = """"
	// SyntaxError:Unexpected string

### 2. 错误处理（捕获与抛出）
抛出错误：throw error

	function something() {
	  if (Date.now()%2===1) {
	    console.log('当前时间为奇数，可以执行任务')
	  } else { //如果时间为偶数抛出异常，由调用来处理
	    throw new Error('当前时间为偶数，无法执行任务')
	  }
	}

捕获错误：try ... catch

	// 捕获处理异常
	try {
	  something()
	} catch (error) {
	  alert(error.message)
	}

### 3. 错误对象
massage 属性：错误相关信息
stack 属性：函数调用栈记录信息

	try {
	  let d
	  console.log(d.xxx)
	} catch (error) {
	  console.log(error.message)
	  console.log(error.stack)
	}
	console.log('出错之后')
	// Cannot read property 'xxx' of undefined
	// TypeError:Cannot read property 'xxx' of undefined
	// 出错之后

# 2. Promise的理解与使用
## 2.1 Promise是什么
### 1. 理解Promise
- 抽象表达：Promise是JS中进行异步编程的新的解决方案
---- 异步编程 ①fs 文件操作 ②数据库操作 ③Ajax ④定时器
- 具体表达：Promise是一个构造函数；promise对象用来封装一个异步操作并可以获取其成功/失败的结果值
- Promise 是一个对象，从它可以获取异步操作的消息；Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理

### 2. Promise 的状态
实例对象promise中的一个属性 **PromiseState**

	pending - 初始化
	pending 变为 resolved/fullfilled
	pending 变为 rejected

说明：**只有这两种**，且一个 promise 对象**只能改变一次**；无论成功还是失败，都会有一个结果数据。成功的结果数据一般称为 **value**，而失败的一般称为**reason**。

### 3. Promise 的基本流程
![Promise流程图](https://img-blog.csdnimg.cn/42eb27567abc4255898779e5762ae900.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

### 4. Promise 的基本使用

```js
	const p = new Promise((resolve,reject)=>{
		reslove('success')
		reject('error')
	})
	p.then(value=>{
        console.log(value);
    }, reason=>{
        console.warn(reason);
    });
```
resolve -> pending 变为 resolved
reject-> pending 变为 rejected
then()调用，onResolved()是Promise对象的状态变为resolved时调用；onRejected()是Promise对象的状态变为rejected时调用

	1.使用promise封装AJAX异步请求
```js
	function sendAJAX(url) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          // xhr.responseType = 'json';
          xhr.open('GET', url)
          xhr.send()
          //处理结果
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              //判断成功
              if (xhr.status >= 200 && xhr.status < 300) {
                //成功的结果
                resolve(xhr)
              } else {
                reject(xhr.status)
              }
            }
          }
        })
      }

      sendAJAX('https://api.apiopen.top/getJoke').then(
        (value) => {
          console.log(JSON.parse(value.response))
          console.log(value)
        },
        (reason) => {
          console.warn(reason)
        }
      )
```
	2. util.promisify方法
```js
	//引入 util 模块
	const util = require('util');
	//引入 fs 模块
	const fs = require('fs');
	//返回一个新的函数
	let mineReadFile = util.promisify(fs.readFile);
	
	mineReadFile('./resource/content.txt').then(value => {
	  console.log(value.toString());
	});
```
## 2.2 为什么要用 Promise
### 1.指定回调函数的方式更加灵活
	普通回调函数：必须在启动异步任务前指定
	promise: 启动异步任务 => 返回promie对象 => 给promise对象绑定回调函 数(甚至可以在异步任务结束后指定/多个)
### 2.支持链式调用，可以解决回调地狱问题
	1.回调地狱：回调函数嵌套调用，外部回调函数异步执行的结果是其内部嵌套的回调函数执行的条件
```javascript
	doSomething(function(result) {
	  doSomethingElse(result, function(newResult) {
	    doThirdThing(newResult, function(finalResult) {
	      console.log('Got the final result:' + finalResult)
	    }, failureCallback)
	  }, failureCallback)
}, failureCallback)

```
	2. 解决方案
- promise 链式调用

```javascript
	doSomething()
	  .then(result => doSomethingElse(result))
	  .then(newResult => doThirdThing(newResult))
	  .then(finalResult => {console.log('Got the final result:' + finalResult)})
	  .catch(failureCallback)

```
- async/await

```javascript
	async function request() {
	  try{
	    const result = await doSomething()
	    const newResult = await doSomethingElse(result)
	    const finalResult = await doThirdThing(newResult)
	    console.log('Got the final result:' + finalResult)
	  } catch (error) {
	    failureCallback(error)
	  }
	}

```
## 2.3 如何使用 Promise、常用 API 概述
### 1. Promise 构造函数：Promise(executor) {}
	(1) executor 函数：同步执行 (resolve, reject) => {}

	(2) resolve 函数：内部定义成功时调用的函数 resove(value)

	(3) reject 函数：内部定义失败时调用的函数 reject(reason)
	
	说明：executor 是执行器，会在 Promise 内部立即同步回调，异步操作 resolve/reject 就在 executor 中执行

### 2. Promise.prototype.then 方法：p.then(onResolved, onRejected)
	(1) onResolved 函数：成功的回调函数 (value) => {}

	(2) onRejected 函数：失败的回调函数 (reason) => {}
	
	说明：指定用于得到成功 value 的成功回调和用于得到失败 reason 的失败回调，返回一个新的 promise 对象

### 3. Promise.prototype.catch 方法：p.catch(onRejected)
	(1) onRejected 函数: 失败的回调函数 (reason) => {}
	
	说明: then()的语法糖, 相当于: then(undefined, onRejected)

	(2) 异常穿透使用:当运行到最后,没被处理的所有异常错误都会进入这个方法的回调函数中
### 4. Promise.resolve 方法：Promise.resolve(value)
	(1) value: 成功的数据或 promise 对象

	说明: 返回一个成功/失败的 promise 对象,直接改变promise状态
```javascript
	let p3 = Promise.reject(new Promise((resolve, reject) => {  resolve('OK'); }));      
  	console.log(p3);
```
### 5. Promise.reject 方法：Promise.resolve(reason)
	reason：失败的原因

	说明：返回一个失败的 promise 对象
> Promise.resolve()/Promise.reject() 方法就是一个语法糖
### 6. Promise.all 方法：Promise.all(iterable)
	iterable：包含 n 个 promise 的可迭代对象，如 Array 或 String

	说明：返回一个新的 promise，只有所有的 promise 都成功才成功，只要有一个失败了就直接失败
```javascript
	let p1 = new Promise((resolve, reject) => {
	  resolve('OK');
	})
	let p2 = Promise.resolve('Success');
	let p3 = Promise.resolve('Oh Yeah');
	
	const result = Promise.all([p1, p2, p3]);
	console.log(result); // true,true,true ---> true

```
### 7. Promise.race方法：Promise.race(iterable)
	iterable：包含 n 个 promise 的可迭代对象，如 Array 或 String

	说明：返回一个新的 promise，第一个完成的 promise 的结果状态就是最终的结果状态
	谁先完成就输出谁(不管是成功还是失败)
```javascript
	 let p1 = new Promise((resolve, reject) => {
     setTimeout(() => {
       reject('OK');
     }, 1000);
	 })
	 let p2 = Promise.resolve('Success');
	 let p3 = Promise.resolve('Oh Yeah');
	 //调用
	 const result = Promise.race([p1, p2, p3]);
	 console.log(result); // p2>p1>p3
```

# 3. Promise 的几个关键问题
## 1. 如何改变 promise 的状态？
	(1)resolve(value)：如果当前是 pending 就会变为 resolved
	
	(2)reject(reason)：如果当前是 pending 就会变为 rejected
	
	(3)抛出异常(throw:'出错了')：如果当前是 pending 就会变为 rejected

## 2. 一个 promise 指定多个成功/失败回调函数，都会调用吗？
当 **promise** **改变为对应状态**时都会调用,改变状态后,多个回调函数都会调用,并不会自动停止

```javascript
	let p = new Promise((resolve, reject) => {  resolve('OK');});
	  ///指定回调 - 1
	  p.then(value => {  console.log(value); });
	  //指定回调 - 2
	  p.then(value => { alert(value);});
```
## 3. 改变 promise 状态和指定回调函数谁先谁后？
	都有可能，常规是先指定回调再改变状态，但也可以先改状态再指定回调
	
- 如何先改状态再指定回调？

(1)在执行器中直接调用 **resolve()/reject()**

(2)延迟更长时间才调用 **then()**

- 什么时候才能得到数据？

(1)如果先指定的回调，那当状态发生改变时，回调函数就会调用得到数据

(2)如果先改变的状态，那当指定回调时，回调函数就会调用得到数据

```javascript
	let p = new Promise((resolve, reject) => {
	//异步写法,这样写会先指定回调,再改变状态
	setTimeout(() => {resolve('OK'); }, 1000);
	//这是同步写法,这样写会先改变状态,再指定回调
	resolve('OK'); 
	});
	p.then(value => {console.log(value);}, reason => {})
```
## 4. promise.then() 返回的新 promise 的结果状态由什么决定？
(1) 简单表达: 由 **then()**指定的回调函数执行的结果决定

(2) 详细表达:

​ ① 如果**抛出异常**, 新 promise 变为 rejected, reason 为抛出的异常

​ ② 如果返回的是**非 promise 的任意值**, 新 promise 变为 resolved, value 为返回的值

​ ③ 如果返回的是**另一个新 promise**, 此 promise 的结果就会成为新 promise 的结果

```javascript
	let p = new Promise((resolve, reject) => {
	resolve('ok');
	});
	//执行 then 方法
	let result = p.then(value => {
	console.log(value);
	// 1. 抛出错误 ,变为 rejected
	throw '出了问题';
	// 2. 返回结果是非 Promise 类型的对象,新 promise 变为 resolved
	return 521;
	// 3. 返回结果是 Promise 对象,此 promise 的结果就会成为新 promise 的结果
	return new Promise((resolve, reject) => {
	  // resolve('success');
	  reject('error');
	});
	}, reason => {
	console.warn(reason);
});
```
## 5.promise 如何串联多个操作任务？
(1)promise 的 then() 返回一个新的 promise，可以并成 then() 的链式调用

(2)通过 then 的链式调用串联多个同步/异步任务

```javascript
	let p = new Promise((resolve, reject) => { setTimeout(() => {resolve('OK'); }, 1000); });
	p.then(value => {return new Promise((resolve, reject) => { resolve("success"); });})
	.then(value => {console.log(value);}) // success
	.then(value => { console.log(value);}) // undefined
```
## 6.Promise 异常穿透(传透)？
(1)当使用 promise 的 then 链式调用时，可以在最后指定失败的回调

(2)前面任何操作出了异常，都会传到最后失败的回调中处理

```javascript
	let p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('OK');
                // reject('Err');
            }, 1000);
        });
        p.then(value => {
            console.log(111); // 111 直接输出
            throw '失败啦!';
        }).then(value => {
            console.log(222);
        }).then(value => {
            console.log(333);
        }).catch(reason => {
            console.warn(reason); // 失败啦!
        });
```
## 7.中断 promise 链？

(1) 当使用 promise 的 then 链式调用时, 在中间中断, 不再调用后面的回调函数

(2) 办法: 在回调函数中返回一个 pendding 状态的promise 对象

```javascript
	let p = new Promise((resolve, reject) => {setTimeout(() => { resolve('OK');}, 1000);});
	p.then(value => {return new Promise(() => {});})//有且只有这一个方式
	.then(value => { console.log(222);})
	.then(value => { console.log(333);})
	.catch(reason => {console.warn(reason);}); // 无任何输出
```
在 catch 中返回一个新的 promise，且这个 promise 没有结果。

由于，返回的新的 promise 结果决定了后面 then 中的结果，所以后面的 then 中也没有结果。

这就实现了中断 promise链的效果。

# promise实际使用
- 加载图片
将图片的**加载**写成一个**Promise**，一旦**加载完成**，Promise的**状态就发生变化**。

```javascript
	const preloadImage = function (path) {
	 return new Promise(function (resolve, reject) {
	   const image = new Image();
	   image.onload  = resolve;
	   image.onerror = reject;
	   image.src = path;
	 });
	};
```
