---
title: AJAX基础初识
date: 2022-01-07
categories:
  - 网络请求
tags:
  - ajax
---

::: tip
AJAX基础内容
:::

<!-- more -->

### markdown 正文

# AJAX 的相关事项
## HTTP
	HTTP（hypertext transport protocol）协议『超文本传输协议』，
	协议详细规定了浏览器和万维网服务器之间互相通信的规则。
	约定, 规则

### 请求报文
重点是格式与参数
```
行      POST  /s?ie=utf-8  HTTP/1.1 
头      Host: atguigu.com
        Cookie: name=guigu
        Content-type: application/x-www-form-urlencoded
        User-Agent: chrome 83
空行
体      username=admin&password=admin
```

### 响应报文
```
行      HTTP/1.1  200  OK
头      Content-Type: text/html;charset=utf-8
        Content-length: 2048
        Content-encoding: gzip
空行    
体      <html>
            <head>
            </head>
            <body>
                <h1>尚硅谷</h1>
            </body>
        </html>
```
* 404
* 403
* 401
* 500
* 200

## express 框架

```html
	// 1.引入express
	const express = require('express');
	
	// 2.创建应用对象
	const app = express();
	
	// 3.创建路由规则
	// request 是对请求报文的封装
	// response 是对响应报文的封装
	app.get('/', (request, response) => {
	    // 设置响应
	    response.send('Hello Express');
	})

	// 4.监听端口启动服务
	app.listen(8000, () => {
	    console.log("服务已经启动，8000端口监听中....");
	})
```

# 原生 AJAX
## AJAX 简介
	AJAX 全称为 Asynchronous JavaScript And XML，就是异步的 JS 和 XML。
	通过 AJAX 可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据。
	AJAX 不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式
## XML 简介
	XML 可扩展标记语言。
	XML 被设计用来传输和存储数据。
	XML 和 HTML 类似，不同的是 HTML 中都是预定义标签，而 XML 中没有预定义标签，全都是自定义标签，用来表示一些数据

```html
	比如说我有一个学生数据：
	name = "孙悟空" ; age = 18 ; gender = "男" ;
	用 XML 表示：
	<student>
		<name>孙悟空</name>
		<age>18</age>
		<gender>男</gender>
	</student>
```

```html
	现在已经被 JSON 取代了。
	用 JSON 表示：
	{"name":"孙悟空","age":18,"gender":"男"}
```
## AJAX 的特点
> AJAX 的优点
> 1) 可以无需刷新页面而与服务器端进行通信。
>2) 允许你根据用户事件来更新部分页面内容。

> AJAX 的缺点
> 1) 没有浏览历史，不能回退
>2) 存在跨域问题(同源)
>3) SEO 不友好

## AJAX 的使用
> 核心对象
> XMLHttpResponse，AJAX的所有操作都是通过该对象进行的
## 使用步骤

```html
	<script>
		1) 创建 XMLHttpRequest 对象
		var xhr = new XMLHttpRequest();
		
		2) 设置请求信息
		xhr.open(method, url);
		//可以设置请求头，一般不设置
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		3) 发送请求
		xhr.send(body) //get 请求不传 body 参数，只有 post 请求使用
		
		4) 接收响应
		//xhr.responseXML 接收 xml 格式的响应数据
		//xhr.responseText 接收文本格式的响应数据
		xhr.onreadystatechange = function (){
		if(xhr.readyState == 4 && xhr.status == 200){
			var text = xhr.responseText;
			console.log(text);
			}
		}
	</script>
```
> AJAX 请求状态

```html
	xhr.readyState 可以用来查看请求当前的状态
	https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState
	0: 表示 XMLHttpRequest 实例已经生成，但是 open()方法还没有被调用。
	1: 表示 send()方法还没有被调用，仍然可以使用 setRequestHeader()，设定 HTTP请求的头信息
	2: 表示 send()方法已经执行，并且头信息和状态码已经收到。
	3: 表示正在接收服务器传来的 body 部分的数据。
	4: 表示服务器数据已经完全接收，或者本次接收已经失败了
```
## 具体演示案例代码
### GET

```html
	<title>AJAX GET 请求</title>
    <style>
        #result {
            width: 200px;
            height: 100px;
            border: solid 1px #bfa;
        }
    </style>
	<button>点击发送请求</button>
    <div id="result"></div>

    <script>
        //获取button元素
        const btn = document.querySelector('button')
        const result = document.querySelector('#result');
        //绑定事件
        btn.addEventListener('click', function () {
            // 1. 创建对象
            const xhr = new XMLHttpRequest();
            // 2. 初始化 设置请求方法和 url
            xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200&c=300')
            // 3. 发送
            xhr.send()
            // 4. 事件绑定 处理服务端返回的结果
            // on  when 当....时候
            // readystate 是 xhr 对象中的属性, 表示状态 0 1 2 3 4
            // change  改变
            xhr.onreadystatechange = function () {
                //判断 (服务端返回了所有的结果)
                if (xhr.readyState === 4) {
                    // 判断响应状态码 200  404  403 401 500
                    // 2xx 成功
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // 处理结果  行 头 空行 体
                        // 1.响应 
                        console.log(xhr.status); // 状态码 200
                        console.log(xhr.statusText); // 状态字符串 ok(成功)
                        console.log(xhr.getAllResponseHeaders());
                        // 所有响应头 content-length: 10 charset = utf - 8
                        console.log(xhr.response); // 响应体 Hello AJAX
                        result.innerHTML = xhr.response;
                    } else {

                    }
                }
            }
        })
    </script>
```

### POST

```html
	<title>AJAX POST 请求</title>
	<style>
        #result {
            width: 200px;
            height: 100px;
            border: solid 1px #903;
        }
    </style>
    <div id="result"></div>
    <script>
        // 获取元素对象
        let result = document.querySelector('#result');
        // 绑定事件
        result.addEventListener('mouseover', function () {
            // 1. 创建对象
            let xhr = new XMLHttpRequest();

            // 2. 初始化 设置类型与 URL
            xhr.open('POST', 'http://127.0.0.1:8000/server')
            
            // 设置请求头信息
            // 预定义
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            // 自定义
            xhr.setRequestHeader('name', 'pink-gai')

            // 3. 发送 任意格式 = : 123
            // POST设置请求体
            xhr.send('a=100&b=200&c=300')

            // 4. 事件绑定
            xhr.onreadystatechange = function () {
                // 判断
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // 处理服务器返回的结果
                        result.innerHTML = xhr.response;
                    }
                }
            }
        })
    </script>
```

### JSON

```html
	<title>JSON响应</title>
    <style>
        #result {
            width: 200px;
            height: 100px;
            border: solid 1px #89b;
        }
    </style>
    <div id="result"></div>
    <script>
        // 获取元素
        const result = document.querySelector('#result');
        // 绑定键盘按下事件
        window.onkeydown = function () {
            // 创建发送请求
            const xhr = new XMLHttpRequest();
            // 设置响应体数据的类型（自动转换）
            xhr.responseType = 'json'
            // 初始化
            xhr.open('GET', 'http://127.0.0.1:8000/json-server');
            // 发送
            xhr.send();
            // 事件绑定
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // console.log(xhr.response);
                        // result.innerHTML = xhr.response;
                        
                        // 1.手动对数据转换
                        // let data = JSON.parse(xhr.response)
                        // console.log(data);
                        // result.innerHTML = data.name

                        // 2.自动转换
                        console.log(xhr.response);
                        // console.log(typeof xhr.response);
                        result.innerHTML = xhr.response.name
                    }
                }
            }
        }
    </script>
```

### IE缓存问题

```html
----xhr.open("GET", 'http://127.0.0.1:8000/ie?t=' + Date.now());----

	<title>IE缓存问题</title>
    <style>
        #result {
            width: 200px;
            height: 100px;
            border: solid 1px #258;
        }
    </style>
    <button>点击发送请求</button>
    <div id="result"></div>
    <script>
        console.log(Date.now());
        const btn = document.getElementsByTagName('button')[0];
        const result = document.querySelector('#result');

        btn.addEventListener('click', function () {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", 'http://127.0.0.1:8000/ie?t=' + Date.now());
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        result.innerHTML = xhr.response;
                    }
                }
            }
        })
    </script>
```

### 超时于网络异常

```html
	<title>请求超时与网络异常</title>
    <style>
        #result {
            width: 200px;
            height: 100px;
            border: solid 1px #90b;
        }
    </style>
    <button>点击发送请求</button>
    <div id="result"></div>
    <script>
        var btn = document.querySelector('button')
        var result = document.querySelector('#result')

        btn.addEventListener('click', function () {
            var xhr = new XMLHttpRequest();
            // 超时设置 2s 设置
            xhr.timeout = 2000
            // 超时回调
            xhr.ontimeout = function () {
                alert('网络异常，请稍后重试')
            }
            // 网络异常回调
            xhr.onerror = function () {
                alert('你的网络似乎出现了一些问题！！')
            }
            xhr.open('GET', 'http://127.0.0.1:8000/delay');
            xhr.send()
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        console.log(xhr.response);
                        result.innerHTML = xhr.response
                    }
                }
            }
        })
    </script>
```

### 取消请求

```html
	<title>取消请求</title>
	<button>点击发送</button>
    <button>点击取消</button>
    <script>
        //获取元素对象
        const btns = document.querySelectorAll('button');
        let x = null;

        btns[0].onclick = function () {
            x = new XMLHttpRequest();
            x.open("GET", 'http://127.0.0.1:8000/delay');
            x.send();
        }

        // abort 取消请求
        btns[1].onclick = function () {
            x.abort();
        }
    </script>
```

### 取消重复请求问题

```html
	<title>重复请求问题</title>
	<button>点击发送</button>
	<script>
        // 获取元素对象
        const btn = document.querySelector('button')
        let x = null
        // 定义标识变量
        let isSendIng = false // 是否正在发送AXJAX请求

        btn.onclick = function () {
            // 判断标识变量值
            // 如果正在发送，则取消该请求 x.abort()，创建一个新的请求 x
            if (isSendIng) x.abort();
            // 创建发送请求
            x = new XMLHttpRequest()
            // 修改 标识变量的值
            isSendIng = true
            x.open('GET', 'http://127.0.0.1:8000/delay')
            x.send()
            x.onreadystatechange = function () {
                if (x.readyState === 4) {
                    // 修改标识变量值
                    isSendIng = false
                }
            }
        }
    </script>
```

### 服务端server代码

```html
/*
    npm server.js
    自动重启npm操作插件
    npm install -g nodemon
    nodemon server.js
*/
	<script>
		// 1.引入express
		const express = require('express');
		
		// 2.创建应用对象
		const app = express();
		
		// 3.创建路由规则
		// request 是对请求报文的封装
		// response 是对响应报文的封装
		app.get('/server', (request, response) => {
		    // 设置响应头  设置允许跨域
		    response.setHeader('Access-Control-Allow-Origin', '*')
		    // 设置响应数据
		    response.send('Hello AJAX');
		})
		
		// 可以接受任意类型的请求 
		app.all('/server', (request, response) => {
		    // 设置响应头  设置允许跨域
		    response.setHeader('Access-Control-Allow-Origin', '*')
		    // 响应头应对自定义请求头
		    response.setHeader('Access-Control-Allow-Headers', '*')
		    // 设置响应数据
		    response.send('Hello AJAX POST');
		})
		
		app.all('/json-server', (request, response) => {
		    // 设置响应头  设置允许跨域
		    response.setHeader('Access-Control-Allow-Origin', '*')
		    // 响应头应对自定义请求头
		    response.setHeader('Access-Control-Allow-Headers', '*')
		    // 响应一个数据
		    let data = {
		        name: 'pink-gaiLao'
		    }
		    // 对 对象进行字符串转换
		    let str = JSON.stringify(data);
		    // 设置响应数据
		    response.send(str);
		})
		
		// 针对IE 缓存
		app.get('/ie', (request, response) => {
		    // 设置响应头 设置允许跨域
		    response.setHeader('Access-Control-Allow-Origin', '*')
		    // 设置响应体
		    response.send('Hello IE - 431');
		})
		
		// 延时响应
		app.get('/delay', (request, response) => {
		    // 设置响应头 设置允许跨域
		    response.setHeader('Access-Control-Allow-Origin', '*')
		    // 设置延时 3 秒
		    setTimeout(() => {
		        // 设置响应体数据
		        response.send('延时响应3秒');
		    }, 3000)
		
		})
		
		// 4.监听端口启动服务
		app.listen(8000, () => {
		    console.log("服务已经启动，8000端口监听中....");
		})
	</script>
```

# jQuery 中的 AJAX
## get 请求

```html
	$.get(url, [data], [callback], [type])
		url:请求的 URL 地址。
		data:请求携带的参数。
		callback:载入成功时回调函数。
		type:设置返回内容格式，xml, html, script, json, text, _default
```
## post 请求

```html
	$.post(url, [data], [callback], [type])
		url:请求的 URL 地址。
		data:请求携带的参数。
		callback:载入成功时回调函数。
		type:设置返回内容格式，xml, html, script, json, text, _default
```
## 案例演示
### 1. client-jquery服务

```html
	<title>jQuery 发送 AJAX 请求</title>
    <link crossorigin="anonymous" href="https://cdn.bootcss.com/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
        rel="stylesheet">
    <script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <div class="container">
        <h2 class="page-header">jQuery发送AJAX请求 </h2>
        <button class="btn btn-primary">GET</button>
        <button class="btn btn-danger">POST</button>
        <button class="btn btn-info">通用型方法ajax</button>
    </div>
    <script>
        $('button').eq(0).click(function () {
            $.get('http://127.0.0.1:8000/jquery-server', { a: 100, b: 5000 }, function (data) {
                console.log(data);
            }, 'json')
        })

        $('button').eq(1).click(function () {
            $.post('http://127.0.0.1:8000/jquery-server', { a: 100, b: 5000 }, function (data) {
                console.log(data);
            })
        })

        $('button').eq(2).click(function () {
            $.ajax({
                // url
                url: 'http://127.0.0.1:8000/jquery-server',
                // 参数
                data: { a: 100, b: 800 },
                // 请求类型
                type: 'GET',
                // 响应体结果
                dataType: 'json',
                // 成功的回调
                success: function (data) {
                    console.log(data);
                },
                // 超时时间
                timeout: 2000,
                error: function () {
                    console.log('出错了？？');
                },
                // 设置头信息
                headers: {
                    c: 400,
                    d: 900
                }
            })
        })
    </script>

	server 服务端代码
	<script>
		// jQuery 服务
		app.all('/jquery-server', (request, response) => {
	    // 设置响应头 设置允许跨域
	    response.setHeader('Access-Control-Allow-Origin', '*');
	    // 响应头应对自定义请求头
	    response.setHeader('Access-Control-Allow-Headers', '*')
	    // response.send('Hello jQuery AJAX')
	    const data = { name: '尚硅谷-黑马' }
	    response.send(JSON.stringify(data));
	</script>

})
```
### 2. axios 最受欢迎

```html
	<title>axios 发送 AJAX请求</title>
    <script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.js"></script>
	<button>GET</button>
    <button>POST</button>
    <button>AJAX</button>
    <script>
        const btns = document.querySelectorAll('button')

        // 配置 baseURL
        axios.defaults.baseURL = 'http://127.0.0.1:8000'

        btns[0].onclick = function () {
            // GET 请求
            axios.get('/axios-server', {
                // url 参数
                params: {
                    id: 7,
                    vip: 9
                },
                //请求头信息
                headers: {
                    name: 'jxmchou',
                    age: 20,
                    sex: 'boy'
                }
            }).then(value => {
                console.log(value);
            })
        };

        btns[1].onclick = function () {
            axios.post('/axios-server',// url 参数 
                {
                    // 请求体
                    username: 'admin',
                    password: 123456
                }, {
                params: {
                    id: 787,
                    vip: 999
                },
                //请求头信息
                headers: {
                    weight: 120,
                    height: 95
                }
            })
        }

        btns[2].addEventListener('click', function () {
            axios({
                // 请求方法
                method: 'POST',
                // url
                url: '/axios-server',
                params: {
                    vip: 100,
                    id: 55,
                    level: 20
                },
                // 请求头信息
                headers: {
                    a: 52,
                    b: 88,
                    c: 8
                },
                // 请求体参数
                data: {
                    username: 'pink',
                    password: 145879
                }
            }).then(response => {
                // 响应信息
                console.log(response);
                // 响应状态码
                console.log(response.status);
                // 响应状态字符串
                console.log(response.statusText);
                // 响应头信息
                console.log(response.headers);
                // 响应体
                console.log(response.data);
            })
        })
    </script>
    
	服务端代码
	<script>
		// axios 服务
		app.all('/axios-server', (request, response) => {
		    // 设置响应头 设置允许跨域
		    response.setHeader('Access-Control-Allow-Origin', '*');
		    // 响应头应对自定义请求头
		    response.setHeader('Access-Control-Allow-Headers', '*')
		    // response.send('Hello jQuery AJAX')
		    const data = { name: '尚硅谷-黑马' }
		    response.send(JSON.stringify(data));
		})
	</script>
```
### 3. fetch

```html
	<title>fetch 发送 AJAX请求</title>
	<button>AJAX请求</button>
    <script>
        const btn = document.querySelector('button')

        btn.addEventListener('click', function () {
            fetch('http://127.0.0.1:8000/fetch-server?id=55', {
                // 请求方法
                method: "post",
                // 请求头
                headers: {
                    name: 'jxmchou'
                },
                // 请求体
                body: 'username=admin&password=123456'
            }).then(response => {
                // return response.text();
                return response.json();
            }).then(response => {
                console.log(response);
                console.log(typeof response);
            })
        })
    </script>
    
	服务端代码
	<script>
		// fetch 服务
		app.all('/fetch-server', (request, response) => {
		    // 设置响应头 设置允许跨域
		    response.setHeader('Access-Control-Allow-Origin', '*');
		    // 响应头应对自定义请求头
		    response.setHeader('Access-Control-Allow-Headers', '*')
		    // response.send('Hello jQuery AJAX')
		    const data = { name: '尚硅谷-黑马' }
		    response.send(JSON.stringify(data));
		})
	</script>
```
# 跨域
## 同源策略

```html
	同源策略(Same-Origin Policy)最早由 Netscape 公司提出，是浏览器的一种安全策略
	同源： 协议、域名、端口号 必须完全相同。
	违背同源策略就是跨域。
```
```html
	<h1>尚硅谷</h1>
    <button>点击获取用户数据</button>
    <script>
        const btn = document.querySelector('button')

        btn.onclick = function () {
            const x = new XMLHttpRequest();
            // 这里因为是满足同源策略的，所以 url 可以简写
            x.open('GET', '/data');
            // 发送
            x.send()
            x.onreadystatechange = function () {
                if (x.readyState === 4) {
                    if (x.status >= 200 && x.status < 300) {
                        console.log(x.response);
                    }
                }
            }
        }
    </script>
    
    服务端代码
    <script>
    	const express = require('express');

		const app = express();
		
		app.get('/home', (request, response)=>{
		    //响应一个网页
		    response.sendFile(__dirname + '/index.html');
		});
		
		app.get('/data', (request, response)=>{
		    response.send('用户数据');
		});
		
		app.listen(9000, ()=>{
		    console.log("服务已经启动...");
		});
    </script>
```
## 如何解决跨域
### JSONP

```html
	1) JSONP 是什么
		JSONP(JSON with Padding)，是一个非官方的跨域解决方案，
	纯粹凭借程序员的聪明才智开发出来，只支持 get 请求。
	2) JSONP 怎么工作的？
		在网页有一些标签天生具有跨域能力，比如：img link iframe script。
		JSONP 就是利用 script 标签的跨域能力来发送请求的。
	3) JSONP 的使用
		1.动态的创建一个 script 标签
			var script = document.createElement("script");
		2.设置 script 的 src，设置回调函数
			script.src = "http://localhost:3000/testAJAX?callback=abc";
			function abc(data) {
				alert(data.name);
			};
		3.将 script 添加到 body 中
			document.body.appendChild(script);
		4.服务器中路由的处理
			router.get("/testAJAX" , function (req , res) {
				console.log("收到请求");
				var callback = req.query.callback;
				var obj = {
					name:"孙悟空", 
					age:18
				}
				res.send(callback+"("+JSON.stringify(obj)+")");
			});
```
> 原理
```html
	<div id="result"></div>
    <script>
        //处理数据
        function handle(data) {
            //获取 result 元素
            const result = document.getElementById('result');
            result.innerHTML = data.name;
        }
    </script>
    // 本机实时运行的代码链接
    <!-- <script src="http://127.0.0.1:5500/%E4%BB%A3%E7%A0%81/7-%E8%B7%A8%E5%9F%9F/2-JSONP/js/app.js"></script> -->
    <script src="http://127.0.0.1:8000/jsonp-server"></script>
    
    > 服务端代码
    <script>
    	// jsonp 服务
		app.get('/jsonp-server', (request, response) => {
		    // response.send('console.log("hello pink hua")')
		    const data = {
		        name: '黑马pink-gai'
		    };
		    // 将数据转换为字符串
		    var str = JSON.stringify(data)
		    // 返回结果
		    // response.end(`handle(${str})`)
		    response.send(`handle(${str})`)
		})
    </script>
```

> JSONP 实践
```html
	用户名: <input type="text" id="username">
    <p></p>
    <script>
        //获取 input 元素
        const input = document.querySelector('input');
        const p = document.querySelector('p');
        
        //声明 handle 函数
        function handle(data){
            input.style.border = "solid 1px pink";
            //修改 p 标签的提示文本
            p.innerHTML = data.msg;
        }

        //绑定事件
        input.onblur = function(){
            //获取用户的输入值
            let username = this.value;
            //向服务器端发送请求 检测用户名是否存在
            //1. 创建 script 标签
            const script = document.createElement('script');
            //2. 设置标签的 src 属性
            script.src = 'http://127.0.0.1:8000/check-username';
            //3. 将 script 插入到文档中
            document.body.appendChild(script);
        }
    </script>

	> 服务端代码
	<script>
		// 检测用户名是否存在
		app.get('/check-username', (request, response) => {
		    // response.send('console.log("hello pink hua")')
		    const data = {
		        exist: 1,
		        msg: '用户名已经存在'
		    };
		    // 将数据转换为字符串
		    var str = JSON.stringify(data)
		    // 返回结果
		    // response.end(`handle(${str})`)
		    response.send(`handle(${str})`)
		})
	</script>
```
> jQuery-jsonp

```html
	<title>jQuery-jsonp</title>
    <style>
        #result {
            width: 300px;
            height: 100px;
            border: solid 1px #089;
        }
    </style>
    <script crossorigin='anonymous' src='https://cdn.bootcss.com/jquery/3.5.0/jquery.min.js'>
    </script>
    <button>点击发送 jsonp 请求</button>
    <div id="result">

    </div>
    <script>
        $('button').eq(0).click(function () {
            $.getJSON('http://127.0.0.1:8000/jquery-jsonp-server?callback=?', function (data) {
                $('#result').html(`
                    名称:${data.name}
                    <br>
                    爱好:${data.hobby}    
                `)
            })
        });
    </script>

	> 服务端代码
	<script>
		// jquery 检测
		app.get('/jquery-jsonp-server', (request, response) => {
		    // response.send('console.log("hello pink hua")')
		    const data = {
		        name: 'mc猴',
		        hobby: ['唱歌', '跳舞', 'rap']
		    };
		    // 将数据转换为字符串
		    var str = JSON.stringify(data)
		    // 接收 callback 参数
		    let cb = request.query.callback
		    // 返回结果
		    // response.end(`handle(${str})`)
		    response.send(`${cb}(${str})`)
		})
	</script>
```

> 服务端代码
```html
	<script>
		const data = {
		    name: '黑马pink'
		};
		
		// console.log(data);
		
		handle(data);
	</script>
```

### CORS
	查询链接
	https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

```html
	1) CORS 是什么？
		CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS 是官方的跨域解决方案，
	它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持get 和 post 请求。
	跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源
	2) CORS 怎么工作的？
		CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，
	浏览器收到该响应以后就会对响应放行。
	3) CORS 的使用
		主要是服务器端的设置：
		router.get("/testAJAX" , function (req , res){
			//通过 res 来设置响应头，来允许跨域请求
			//res.set("Access-Control-Allow-Origin","http://127.0.0.1:3000");
			res.set("Access-Control-Allow-Origin","*");
			res.send("testAJAX 返回的响应");
		});
```

```html
	<button>发送请求</button>
    <div id="result"></div>
    <script>
        const btn = document.querySelector('button');

        btn.onclick = function(){
            //1. 创建对象
            const x = new XMLHttpRequest();
            //2. 初始化设置
            x.open("GET", "http://127.0.0.1:8000/cors-server");
            //3. 发送
            x.send();
            //4. 绑定事件
            x.onreadystatechange = function(){
                if(x.readyState === 4){
                    if(x.status >= 200 && x.status < 300){
                        //输出响应体
                        console.log(x.response);
                    }
                }
            }
        }
    </script>
```
> 服务端代码

```html
	<script>
		// cors
		app.all('/cors-server', (request, response) => {
		    // 设置响应头
		    response.setHeader('Access-Control-Allow-Origin','*')
		    response.setHeader('Access-Control-Allow-Headers','*')
		    response.setHeader('Access-Control-Allow-Method','*')
		    // response.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:5500')
		    response.send('hello CORS')
		})
	</script>
```
