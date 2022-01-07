---
title: Promise自定义封装-async-await
date: 2022-01-07
categories:
  - 网络请求
tags:
  - Promise-async-await
---

::: tip
Promise自定义封装-async-await，理解源码，自定义封装
:::

<!-- more -->

### markdown 正文


# 一、自定义promise手写
## Promise的实例方法实现
### 1. 初始结构搭建
> index.html 文件
```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <title>Promise-封装 | 1 - 初始结构搭建</title>
	    <script src="./promise.js"></script>
	</head>
	<body>
	    <script>
	        let p = new Promise((resolve, reject) => {
	            resolve('OK');
	        });
	        p.then(value => {
	            console.log(value);
	        }, reason=>{
	            console.warn(reason);
	        })
	    </script>
	</body>
	</html>
```
> promise.js 文件
```javascript
	function Promise(executor){}
	//添加 then 方法
	Promise.prototype.then = function(onResolved, onRejected){}
```

### 2. resolve 与 reject构建与基础实现
> 1. 使用`const self = this;`保存this执行,使function中可以取得当前实例
	使用箭头函数则不需要保存this ()=>{}
> 2. 默认设置 `PromiseState = 'pending'` 以及` PromiseResult= null` ,这就是promise状态基础
```javascript 
	//声明构造函数
	function Promise(executor) {
	  //添加属性
	  this.PromiseState = 'pending';
	  this.PromiseResult = null;
	  //保存实例对象的 this 的值
	/*  此处可以不写,但是下面function方法需要改为箭头函数,否则function默认指向是window */
	  const self = this; 
	  //resolve 函数
	  function resolve(data) {--------------------------------------------
	    //1. 修改对象的状态 (promiseState)
	    self.PromiseState = 'fulfilled'; // resolved
	    //2. 设置对象结果值 (promiseResult)
	    self.PromiseResult = data;
	  }
	  //reject 函数
	  function reject(data) {----------------------------------------------
	    //1. 修改对象的状态 (promiseState)
	    self.PromiseState = 'rejected'; // 
	    //2. 设置对象结果值 (promiseResult)
	    self.PromiseResult = data;
	  }
	  //同步调用『执行器函数』
	  executor(resolve, reject);
	}
	//添加 then 方法
	Promise.prototype.then = function (onResolved, onRejected) {}
```

### 3. throw 抛出异常改变状态
> 1. 在2的基础上进行修改:将执行器放入`try-catch()`中
>2. 在catch中使用reject()修改 promise 对象状态为『失败』

```javascript
	try {
      //同步调用『执行器函数』
      executor(resolve, reject);
    } catch (e) {
      //修改 promise 对象状态为『失败』
      reject(e);
    }
```

### 4. 状态只能修改一次
> 1. 基于第二步，第三步代码中`resolve`和`reject`方法进修改
> 2. 在成功与失败函数中添加判断 if(self.PromiseState !== 'pending') return;,如果进入函数时状态不为pending直接退出,这样就能做到状态只能从`pending`改至其他状态且做到只能改一次

```javascript
	html调用--------------------------------------------------------
	 let p = new Promise((resolve, reject) => {
	      reject("error");
	      resolve('OK');
	      //抛出异常
	      // throw "error";
	    });
	 console.log(p);
	 
	promise.js修改--------------------------------------------------------
  //resolve 函数
    function resolve(data){
        //判断状态
        if(self.PromiseState !== 'pending') return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'fulfilled';// resolved
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
    }
    //reject 函数
    function reject(data){
        //判断状态
        if(self.PromiseState !== 'pending') return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'rejected';// 
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
    }
```

### 5. then 方法执行回调基础实现
>1. 修改`Promise.prototype.then`方法
>2. 传入`then(成功回调,失败回调)`,当调用then后,会判断当前`this.PromiseState`的状态,当其为成功时调用`成功回调`,失败时调用`失败回调`

```javascript
	html调用------------------------------------------------------------
    let p = new Promise((resolve, reject) => {
      // resolve('OK');// reject("Error");
      throw "ERROR";
    });
    p.then(
        value => {console.log(value); }, 
        reason => {console.warn(reason);}
    )
    
	promise.js修改与实现-----------------------------------------------------
	//添加 then 方法
	Promise.prototype.then = function (onResolved, onRejected) {
	  //调用回调函数  PromiseState
	  if (this.PromiseState === 'fulfilled') {onResolved(this.PromiseResult);}
	  if (this.PromiseState === 'rejected') {onRejected(this.PromiseResult);}
	}
```

### 6. 异步任务 then 方法实现

>1. 运行`异步代码`后,执行器内部代码还未返回(因为用了定时器,里面的代码进入了异步队列),所以下面then()运行时:`p`为`pending`状态,所以根本不会执行resolve与reject方法
>
>  解:添加判断`pending`状态,将当前回调函数保存到实例对象(存到实例上是为了更方便)中,这样后续改变状态时候才调用得到
  
>2. 为什么要将回调保存到实例上而不是直接调用?
>
>  `理由`:因为回调函数需要在promise状态改变后(成功或者失败),再根据状态选择运行哪个函数
  所以当调用`then()`时却检测到状态为`pending`,说明这时候的promise在异步队列 不能直接运行成功或者失败函数
>
>  `解决`:因为`resolve与reject`方法与`then()`不在同一个作用域中,并不能共享`then(成功回调,失败回调)`的参数,所以在判断状态为`pending`时将回调保存到实例对象上.然后将回调函数的调用放在`resolve()与reject()`中

>  这样代码运行到异步队列的`resolve()或reject()`时,就可以在这个函数中运行回调函数,实现异步then


```javascript
	html调用------------------------------------------------------------
 //实例化对象
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {reject("error"); /* resolve('OK');*/}, 1000);
    });
    p.then(value => {console.log(value);},reason => { console.warn(reason);});
    console.log(p);

	promise.js修改与实现-----------------------------------------------------
	//声明构造函数
	function Promise(executor) {
	  this.PromiseState = 'pending'; this.PromiseResult = null;
	  // 声明属性     
	  this.callback = {};			-----------新添加1
	  const self = this; 
	    
	  //resolve 函数
	  function resolve(data) {
	    //判断状态
	    if (self.PromiseState !== 'pending') return;
	    self.PromiseState = 'fulfilled'; self.PromiseResult = data;
	    //调用成功的回调函数  加判断的原因是防止无回调报错
	    if (self.callback.onResolved) { self.callback.onResolved(data); }  ------------新添加2 最重要 
	  }
	    
	  //reject 函数
	  function reject(data) {
	    if (self.PromiseState !== 'pending') return;
	    self.PromiseState = 'rejected'; self.PromiseResult = data;
	    //执行回调						
	    if (self.callback.onResolved) { self.callback.onResolved(data);}  ------------新添加3
	  }
	  try {executor(resolve, reject);} catch (e) {reject(e);}
	}
	
	//添加 then 方法
	Promise.prototype.then = function (onResolved, onRejected) {
	  //调用回调函数  PromiseState
	  if (this.PromiseState === 'fulfilled') {onResolved(this.PromiseResult);}
	  if (this.PromiseState === 'rejected') { onRejected(this.PromiseResult);}
	  //判断 pending 状态
	  if (this.PromiseState === 'pending') {  ------------新添加4
	    //保存回调函数
	    this.callback = {
	      onResolved: onResolved,
	      onRejected: onRejected
	    }
	  }
	}
```

### 7. 指定多个回调
> `6`中保存回调函数的方式有BUG,如果有多个`.then()`,后面加载的回调函数会覆盖之前的回调函数,导致最后回调函数`有且只有`最后一个

```javascript
	html调用------------------------------------------------------------
	//实例化对象
	   let p = new Promise((resolve, reject) => {setTimeout(() => {reject('No');}, 1000);});
	   p.then(value => { console.log(value);}, reason=>{console.warn(reason);});
	   p.then(value => { alert(value);}, reason=>{ alert(reason);});
	   console.log(p);
	
	promise.js修改与实现-----------------------------------------------------
	Promise.prototype.then = function (onResolved, onRejected) {
		let callbacks = []		--------修改1
	       //resolve 函数
	    function resolve(data){
	  		..... 
	        //调用成功的回调函数
	        // if (self.callback.onResolved) { self.callback.onResolved(data); } 
	        self.callbacks.forEach(item => {   --------修改2
	            item.onResolved(data);
	        });
	    }
	    //reject 函数
	    function reject(data){
	     	 ......
	        //执行失败的回调
	        // if (self.callback.onResolved) { self.callback.onResolved(data);}
	        self.callbacks.forEach(item => {		------修改3
	            item.onRejected(data);
	        });
	    }
	    
	  //添加 then 方法
	Promise.prototype.then = function(onResolved, onRejected){
	    ........
	    //判断 pending 状态
	    if(this.PromiseState === 'pending'){
	        //保存回调函数
	        //  this.callback = { onResolved: onResolved, onRejected: onRejected }
	        this.callbacks.push({					--------修改4
	            onResolved: onResolved,
	            onRejected: onRejected
	        });
	    }
	}
```

### 8. 同步任务 then 返回结果
思考
>1. 在之前的then运行结果中得知,我们使用  [ then ] 后的返回结果是其回调函数的返回结果,而我们需要的返回结果是一个新的promise对象
>
  >解:所以我们在then中`return new Promise()`,使其得到的是一个新的promise对象

>2. 在为`解决问题1`后产生一个新问题:新的promise对象因为没有用`rejerect与resolve`方法,导致返回的状态一直是`pending`
>
>  解:在新的promise中判断`运行回调函数`后的返回值是什么,然后根据其不同类型给其赋予不同状态

>  ​	Ⅰ-`if(result instanceof Promise)`:返回值一个新的②promise对象(因为是新的promise的回调函数返回值,称`②promise对象`),在返回值(因为是promise对象)的`.then()`回调函数中使用rejerect与resolve方法,将其`自身的状态`赋予外层的promise,
>
>  ​	即 回调函数中的promise 赋值 给then返回值 ,  所以 `最终返回状态==回调函数中的新promise状态`
>
 >​	Ⅱ-如果返回值是一个`非promise`对象,返回状态设置为成功
>
 >​	Ⅲ-如果返回值是一个异常,返回状态设置为失败

```javascript
	html调用------------------------------------------------------------
  //实例化对象
    let p = new Promise((resolve, reject) => {resolve('OK');});
    //执行 then 方法
    const res = p.then(
     value => { throw "FAIL";},
    reason => { console.warn(reason);});
    console.log(res);

	promise.js修改与实现-----------------------------------------------------
	//添加 then 方法
	Promise.prototype.then = function(onResolved, onRejected){
	    return new Promise((resolve, reject) => {
	        //调用回调函数  PromiseState
	 //  if(this.PromiseState === 'fulfilled'){ onResolved(this.PromiseResult);} 未修改时代码
	        if(this.PromiseState === 'fulfilled'){    -------修改1 
	            try{
	                //获取回调函数的执行结果
	                let result = onResolved(this.PromiseResult);
	                //判断
	                if(result instanceof Promise){//如果是 Promise 类型的对象,我就将下一个promise结果赋予外层
	                    result.then(v => {  resolve(v); },r=>{reject(r);})
	                }else{resolve(result);}  //如果返回的不是promise对象,都将其赋予成功状态
	            }catch(e){
	                rejerect(e);	//如果出错了,则返回失败状态
	            }
	        }
	        if(this.PromiseState === 'rejected'){ onRejected(this.PromiseResult);}------此部分修改与修改1一样
	        //判断 pending 状态
	        if(this.PromiseState === 'pending'){
	            this.callbacks.push({ onResolved: onResolved, onRejected: onRejected});
	        }
	    })
	}
```
### 9. 异步任务 then 返回结果
思考
>1. 异步任务是修改`if(this.PromiseState === 'pending')`后面的值,原因参考`6`,下面代码只举例这部分修改

>2. 因为我们需要增加then状态修改,所以在我们保存回调函数这一步我们可以对于回调函数进行`加工`,`添加判断其回调函数的返回值`的代码块再存入实例的回调函数中

>  Ⅰ-声明一个新的函数:其内部功能->先运行`onResolved回调函数`,再将其返回值取出,进行判断其返回值(这个过程同`8`)
>
 > Ⅱ-加工后存入实例回调函数数组,之后在`resolve与reject`方法中调用即可(同`6`)

```javascript
	html调用------------------------------------------------------------
   //实例化对象
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {reject("Error");}, 1000)}); // resolve('OK');
    //执行 then 方法
    const res = p.then(value => {
      // return 'oh Yeah';  //如果有返回,根据其返回值得到相应的状态:字符串为成功,抛出为错误
      throw 'error';
    }, reason => {
      console.warn(reason, "xx"); //如果只是打印没返回,则实际上时返回一个undefined,
      //在我们封装js中,undefined会判定为非promise对象,所以状态为成功,结果为undefined
      return "sss"   // throw 'error';
    });
    console.log(res);

	promise.js修改与实现-----------------------------------------------------
    //判断 pending 状态
    if (this.PromiseState === 'pending') {
      //保存回调函数
      this.callbacks.push({
          
        onResolved: function () {
          try {
            //执行成功回调函数
            let result = onResolved(self.PromiseResult);
            //判断 其结果
            if (result instanceof Promise) {
              result.then(
                  v => { resolve(v);},
                  r => {reject(r);}
                 )
            } else {resolve(result);}
          } catch (e) {reject(e);}
        },
          
        onRejected: function () {
          try {
            //执行成功回调函数
            let result = onRejected(self.PromiseResult);
            //判断
            if (result instanceof Promise) {
              result.then(
                  v => {resolve(v); },
                  r => {reject(r);}
                 )
            } else {resolve(result);}
          } catch (e) { reject(e); }
        }
      });
    }
```

### 10. then方法代码优化
> 在8、9、10中可以看出,其判断与改变返回结果状态的代码块是基本重复的,所以可以将其抽出封装为函数`callback()`

```javascript
	//添加 then 方法
	Promise.prototype.then = function (onResolved, onRejected) {
	  const self = this;
	  return new Promise((resolve, reject) => {
	    封装函数----------------------------------------------------------------------------
	    function callback(type) {
	      try {
	        //获取回调函数的执行结果
	        let result = type(self.PromiseResult);
	        //判断
	        if (result instanceof Promise) {
	          //如果是 Promise 类型的对象
	          result.then(v => {
	            resolve(v);
	          }, r => {
	            reject(r);
	          })
	        } else {
	          //结果的对象状态为『成功』
	          resolve(result);
	        }
	      } catch (e) {
	        reject(e);
	      }
	    }
	  -----------------------------------------------------------------------------------    
	    //调用回调函数  PromiseState
	    if (this.PromiseState === 'fulfilled') {
	      callback(onResolved);
	    }
	    if (this.PromiseState === 'rejected') {
	      callback(onRejected);
	    }
	    //判断 pending 状态
	    if (this.PromiseState === 'pending') {
	      //保存回调函数
	      this.callbacks.push({
	        onResolved: function () {
	          callback(onResolved);
	        },
	        onRejected: function () {
	          callback(onRejected);
	        }
	      });
	    }
	  })
	}
```

### 11.  catch 方法与异常穿透与值传递
思考
>1. 异常穿透:添加`catch 方法 `,并且需要进行回调函数为`undefined的`处理

>2. 当我`then()`中只传一个回调或者不传回调函数时,运行代码会报错,因为运行时调用的回调函数是`undefined`
>
>  解:进行回调函数判断,当其为空时,基于默认回调函数内容:`直接往外抛出`这样下方的`then() or catch()`就可以承接到异常或者值

```javascript
	html调用------------------------------------------------------------  
	//实例化对象
	    let p = new Promise((resolve, reject) => {
	      setTimeout(() => {resolve('OK'); }, 1000);
	    });
	    //值传递
	    p.then()
	    .then(value => {console.log(222);})
	      .then(value => {console.log(333);})
	        .catch(reason => {console.warn(reason);});
	promise.js修改与实现-----------------------------------------------------
	//添加 then 方法
	Promise.prototype.then = function (onResolved, onRejected) {
		...				-----------修改1
	  if (typeof onRejected !== 'function') {onRejected = reason => { throw reason;}}
	  if (typeof onResolved !== 'function') { onResolved = value => value;}
		 ....
	}
	//添加 catch 方法  
	Promise.prototype.catch = function(onRejected){  ---------------异常穿透 修改2
	    return this.then(undefined, onRejected);
	}
```

## Promise的静态方法实现
###  1. Promise.resolve 封装
>判断传入的参数是否为`promise对象`:
>
>Ⅰ-如果为`promise`:将其状态与结果赋值给外层promise对象
>
>Ⅱ-如果为`非promise`:状态设置为成功

```javascript
	html调用------------------------------------------------------------  
	 const p = Promise.resolve('OK');
	 const p2 = Promise.resolve(new Promise((resolve, reject) => {     
	      reject("error");// resolve('Success');
	    }));
	 const p3 = Promise.resolve(Promise.resolve('Oh Yeah'));
	 console.log(p3);
	
	promise.js修改与实现-----------------------------------------------------
	//添加 resolve 方法
	Promise.resolve = function(value){
	    //返回promise对象
	    return new Promise((resolve, reject) => {
	        if(value instanceof Promise){
	            value.then(
	                v=>{resolve(v);},
	                r=>{reject(r);}
	            )}else{resolve(value); }//状态设置为成功
	    });
	}
```

###  2. Promise.reject 封装

```javascript
	html调用------------------------------------------------------------  
   //Promise.reject
    const p = Promise.reject('Error');
    const p2 = Promise.reject(new Promise((resolve, reject) => {
      resolve('OK');
    }));
    console.log(p);
    console.log(p2);

	promise.js修改与实现-----------------------------------------------------
	//添加 reject 方法
	Promise.reject = function (reason) {
	  return new Promise((resolve, reject) => {
	    reject(reason);
	  });
	}
```

###  3. Promise.all 封装
>1. 遍历传入的promise数组,每当遍历结果是成功,则用计数器记录,当计数器等同于数组长度,则全部成功,这时候可以返回`成功`状态
>2. 如果当数组中任意一个promise的执行结果是`reject`,直接中断,返回状态为`失败`

```javascript
	html调用------------------------------------------------------------  
	let p1 = new Promise((resolve, reject) => {
	      setTimeout(() => {resolve('OK'); }, 1000)
	    })
	    let p2 = Promise.reject('Success');
	    let p3 = Promise.resolve('Oh Yeah');
	    //调用 all 方法
	    let result = Promise.all([p1, p2, p3]);
	    console.log(result);
	
	promise.js修改与实现-----------------------------------------------------
	//添加 all 方法
	Promise.all = function (promises) {
	  //返回结果为promise对象
	  return new Promise((resolve, reject) => {
	    //声明变量
	    let count = 0;
	    let arr = [];
	    //遍历
	    for (let i = 0; i < promises.length; i++) {
	      promises[i].then(v => {
	        //得知对象的状态是成功
	        //每个promise对象 都成功
	        count++;
	        //将当前promise对象成功的结果 存入到数组中
	        arr[i] = v;
	        //判断
	        if (count === promises.length) {resolve(arr);}//修改状态
	      }, r => {
	        reject(r);
	      });
	    }
	  });
	}
```

###  4. Promise.race 封装
>直接谁先执行就返回谁的运行结果即可

```javascript
	html调用------------------------------------------------------------  
	 let p1 = new Promise((resolve, reject) => {
	      setTimeout(() => {resolve('OK');});
	    });
	    let p2 = Promise.reject('Success');
	    let p3 = Promise.resolve('Oh Yeah');
	    //调用 race 方法
	    let result = Promise.race([p1, p2, p3]);
	    console.log(result);
	
	promise.js修改与实现-----------------------------------------------------
	//添加 race 方法
	Promise.race = function (promises) {
	  return new Promise((resolve, reject) => {
	    for (let i = 0; i < promises.length; i++) {
	      promises[i].then(v => {
	        //修改返回对象的状态为 『成功』
	        resolve(v);
	      }, r => {
	        //修改返回对象的状态为 『失败』
	        reject(r);
	      })
	    }
	  });
	}
```

## 其他优化
### 1. 回调函数『异步执行』
> `then()` 为异步，需要修改js代码
> 在以下四处地方的`回调函数调用`外层包裹一层定时器(不一定是定时器,开启异步即可),即可做到异步操作

```javascript
	
	function resolve(data){
	       setTimeout(() => { self.callbacks.forEach(item => { item.onResolved(data); }); });--修改1
	   }
	  //reject 函数
	   function reject(data){
	       setTimeout(() => { self.callbacks.forEach(item => { item.onRejected(data); }); });---修改2
	   }
	
	//添加 then 方法
	Promise.prototype.then = function(onResolved, onRejected){
	   return new Promise((resolve, reject) => {
	       //调用回调函数  PromiseState
	      /*  修改前代码
	      if (this.PromiseState === 'fulfilled') { callback(onResolved); }
	  		if (this.PromiseState === 'rejected') { callback(onRejected);
	  		 */
	       if(this.PromiseState === 'fulfilled'){setTimeout(() => { callback(onResolved);});}  -----修改3
	       if(this.PromiseState === 'rejected'){ setTimeout(() => { callback(onRejected);});   ---修改4
       }
   }

```
### 2. class改写promise
>1. 其中将`self=this`保存this指向方式改为箭头函数表示(在上面示例中也有效果)
>2. 将其改为class写法
>3. 下面为promisedemo.js代码

```javascript
	class Promise {
	 //构造方法
	 constructor(executor) {
	   //添加属性
	   this.PromiseState = 'pending';
	   this.PromiseResult = null;
	   //声明属性
	   this.callbacks = [];
	   //保存实例对象的 this 的值
	   //resolve 函数
	   let resolve = (data) => {
	     //判断状态
	     if (this.PromiseState !== 'pending') return;
	     //1. 修改对象的状态 (promiseState)
	     this.PromiseState = 'fulfilled'; // resolved
	     //2. 设置对象结果值 (promiseResult)
	     this.PromiseResult = data;
	     //调用成功的回调函数
	     setTimeout(() => {
	       this.callbacks.forEach(item => {
	         item.onResolved(data);
	       });
	     });
	   }
	   //reject 函数
	   let reject = (data) => {
	     //判断状态
	     if (this.PromiseState !== 'pending') return;
	     //1. 修改对象的状态 (promiseState)
	     this.PromiseState = 'rejected'; // 
	     //2. 设置对象结果值 (promiseResult)
	     this.PromiseResult = data;
	     //执行失败的回调
	     setTimeout(() => {
	       this.callbacks.forEach(item => {
	         item.onRejected(data);
	       });
	     });
	   }
	   try {
	     //同步调用『执行器函数』
	     executor(resolve, reject);
	   } catch (e) {
	     //修改 promise 对象状态为『失败』
	     reject(e);
	   }
	 }
	
	 //then 方法封装
	 then(onResolved, onRejected) {
	   //判断回调函数参数
	   if (typeof onRejected !== 'function') {
	     onRejected = reason => {
	       throw reason;
	     }
	   }
	   if (typeof onResolved !== 'function') {
	     onResolved = value => value;
	     //value => { return value};
	   }
	   return new Promise((resolve, reject) => {
	     //封装函数
	     let callback = (type) => {
	       try {
	         //获取回调函数的执行结果
	         let result = type(this.PromiseResult);
	         //判断
	         if (result instanceof Promise) {
	           //如果是 Promise 类型的对象
	           result.then(v => {
	             resolve(v);
	           }, r => {
	             reject(r);
	           })
	         } else {
	           //结果的对象状态为『成功』
	           resolve(result);
	         }
	       } catch (e) {
	         reject(e);
	       }
	     }
	     //调用回调函数  PromiseState
	     if (this.PromiseState === 'fulfilled') {
	       setTimeout(() => {
	         callback(onResolved);
	       });
	     }
	     if (this.PromiseState === 'rejected') {
	       setTimeout(() => {
	         callback(onRejected);
	       });
	     }
	     //判断 pending 状态
	     if (this.PromiseState === 'pending') {
	       //保存回调函数
	       this.callbacks.push({
	         onResolved: function () {
	           callback(onResolved);
	         },
	         onRejected: function () {
	           callback(onRejected);
	         }
	       });
	     }
	   })
	 }
	
	 //catch 方法
	 catch (onRejected) {
	   return this.then(undefined, onRejected);
	 }
	
	 //添加 resolve 方法
	 static resolve(value) {
	   //返回promise对象
	   return new Promise((resolve, reject) => {
	     if (value instanceof Promise) {
	       value.then(v => {
	         resolve(v);
	       }, r => {
	         reject(r);
	       })
	     } else {
	       //状态设置为成功
	       resolve(value);
	     }
	   });
	 }
	
	 //添加 reject 方法
	 static reject(reason) {
	   return new Promise((resolve, reject) => {
	     reject(reason);
	   });
	 }
	
	 //添加 all 方法
	 static all(promises) {
	   //返回结果为promise对象
	   return new Promise((resolve, reject) => {
	     //声明变量
	     let count = 0;
	     let arr = [];
	     //遍历
	     for (let i = 0; i < promises.length; i++) {
	       //
	       promises[i].then(v => {
	         //得知对象的状态是成功
	         //每个promise对象 都成功
	         count++;
	         //将当前promise对象成功的结果 存入到数组中
	         arr[i] = v;
	         //判断
	         if (count === promises.length) {
	           //修改状态
	           resolve(arr);
	         }
	       }, r => {
	         reject(r);
	       });
	     }
	   });
	 }
	
	 //添加 race 方法
	 static race(promises) {
	   return new Promise((resolve, reject) => {
	     for (let i = 0; i < promises.length; i++) {
	       promises[i].then(v => {
	         //修改返回对象的状态为 『成功』
	         resolve(v);
	       }, r => {
	         //修改返回对象的状态为 『失败』
	         reject(r);
	       })
	     }
	   });
	 }
	}
```
> html文件

```html
	<!DOCTYPE html>
	<html lang="en">
	
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>class版本封装</title>
	<script src="./promisedemo.js"></script>
	</head>
	
	<body>
	  <script>
		let p1 = new Promise((resolve, reject) => {
		 setTimeout(() => {
		   // resolve("OK");
		   reject("Erosssr");
		 })
		});
		
		p1.then(value => {
		 console.log(value);
		}, reason => {
		 console.warn(reason);
		});
		
		console.log(Promise.resolve('OK'));
	  </script>
	</body>
	
	</html>
```
# 二、Promise+ async + await
>##### 							1)Promise==>异步
>
>##### 							2)await==>异步转同步
>
>1. await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用。
>2. await 后面可以跟任何的JS 表达式。虽然说 await 可以等很多类型的东西，但是它最主要的意图是用来等待 Promise 对象的状态被 resolved。如果await的是 promise对象会造成异步函数停止执行并且等待 promise 的解决,如果等的是正常的表达式则立即执行		
>
>##### 							3)async==>同步转异步
>
>1.    方法体内部的某个表达式使用await修饰，那么这个方法体所属方法必须要用async修饰所以使用awit方法会自动升级为异步方法
>
>###### 4)mdn文档
>
>1. [async](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function) 
>2. [await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

## Ⅰ-async函数

>1. 函数的返回值为 promise 对象 
>2. promise 对象的结果由 async 函数执行的返回值决定

## Ⅱ-await表达式

>1. await 右侧的表达式一般为 promise 对象, 但也可以是其它的值 
>
>2. 如果表达式是 promise 对象, await 返回的是 promise 成功的值 
>3. 如果表达式是其它值, 直接将此值作为 await 的返回值
## Ⅲ-注意

>1. await 必须写在 async 函数中, 但 async 函数中可以没有 await 
>2. 如果 await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

# 三、宏任务与微任务
## Ⅰ-说明

>原理图:
>
>![Promise系统学习_宏任务微任务原理图](https://img-blog.csdnimg.cn/7fb4d95a5fe54a39907f1fd7cddd5d79.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
>
>
>说明:
>
>1. JS中用来存储待执行回调函数的队列包含2个不同特定的列队
>   - `宏队列`:用来保存待执行的宏任务(回调),比如:`定时器`回调/ajax回调/dom事件回调
>   - `微队列`:用来保存待执行的微任务(回调),比如:`Promise`的回调/muntation回调
>2. JS执行时会区别这2个队列:
>     - JS执行引擎首先必须执行所有的`初始化同步任务`代码
>     - 每次准备取出第一个`宏任务执行前`,都要将所有的`微任务`一个一个取出来执行
>     - **同步任务** --> **微任务** --> **宏任务**
##  Ⅱ-代码与示例
	案例1
```javascript
	setTimeout(() => console.log('代码开始执行'), 0)
      new Promise((resolve, reject) => {
        console.log('开始for循环')
        for (let i = 0; i < 10000; i++) {
          i == 99 && resolve()
        }
      }).then(() => console.log('执行then函数'))
      console.log('代码执行结束')
```
	案例2（复杂）
	

```javascript
	setTimeout(() => { 
   console.log('timeout callback1（）')//立即放入宏队列
   Promise.resolve(3).then(
     value => { 
       console.log('Promise onResolved3()', value)//当这个宏任务执行后 立马放入微队列,所以这个微任务执行完后下个宏任务才能执行 
     }
   )
 }, 0)

 setTimeout(() => { 
   console.log('timeout callback2（）') //立即放入宏队列,
 }, 0)

 Promise.resolve(1).then(
   value => { 
     console.log('Promise onResolved1()', value)//立即放入微队列
     setTimeout(() => {
       console.log('timeout callback3（）', value) //立即放入宏任务
     }, 0)
   }
 )

 Promise.resolve(2).then(
   value => { 
     console.log('Promise onResolved2()', value)//立即放入微队列
   }
 )
 console.log('同步代码') //同步代码立即执行
```
	案例1答案

![在这里插入图片描述](https://img-blog.csdnimg.cn/493729580cba415eb71d763e4687c771.png#pic_center)
	案例2答案
![在这里插入图片描述](https://img-blog.csdnimg.cn/deb41c3a7a0a4654bf2dc27f5730d220.png#pic_center)
