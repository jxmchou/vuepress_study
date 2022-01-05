---
title: 5.移动端布局
sidebarDepth: 0
---
# 流失布局 ✍
## 概述
>- 移动端浏览器我们主要对webkit内核进行兼容
>- 我们现在开发的移动端主要针对手机端开发
>- 现在移动端碎片化比较严重，分辨率和屏幕尺寸大小不一
>- 学会用谷歌浏览器模拟手机界面以及调试
## 视口
> 1. **视口**（`viewport`）就是浏览器显示页面内容的屏幕区域。 视口可以分为布局视口、视觉视口和理想视口
> 1. **布局视口** layout viewpor
> 2. **视觉视口** visual viewpor		**注意：是网站的区域。**
> 3. **理想视口** ideal viewp
>> **总结：**
>视口就是浏览器显示页面内容的屏幕区域
视口分为布局视口、视觉视口和理想视口
我们移动端布局想要的是理想视口就是手机屏幕有多宽，我们的布局视口就有多宽
想要理想视口，我们需要给我们的移动端页面添加 meta视口标

> 2. **meta视口标签**
> ![meta视口标签](https://img-blog.csdnimg.cn/c2434f73ad2a418187c3b4af27eb2a4b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
> >**标准的viewport设置**
>>>视口宽度和设备保持一致
 视口的默认缩放比例1.0
 不允许用户自行缩放
 最大允许的缩放比例1.0
 最小允许的缩放比例1.0



```html
	<meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
```
**W3C标准** 查询链接：[菜鸟教程](https://www.runoob.com/jsref/dom-obj-meta.html)
|属性	|描述	|W3C
|--|:--|--|
|content	|设置或返回 <meta> 元素的 content 属性的值。	|Yes
|httpEquiv	|把 content 属性连接到一个 HTTP 头部。|	Yes
|name	|把 content 属性连接到某个名称。|	Yes
|scheme	|设置或返回用于解释 content 属性的值的格式。	|Yes

## 二倍图
>1. **物理像素&物理像素比**
> 1.1 物理像素 就是我们说的分辨率  iPhone8的物理像素是 750
> 1.2 在 iPhone8里面  1px 开发像素  =  2个物理像素

> 2. **二倍图**
> 我们需要一个`50*50`像素（css像素）的图片 直接放到我们的iphone8 里面会**放大2倍**  `100* 100` 就会模糊
        我们采取的是 放一个 **100* 100** 图片  然后手动的把这个图片 **缩小为 50* 50** （css像素）
        我们准备的图片 比我们实际需要的大小 大2倍，这就方式就是 **2倍图** 

>3. **背景缩放** `background-size`
>>**background-size** 属性规定**背景图像的尺寸**
>> **单位：** 长度|百分比|cover|contain;
 **cover**把背景图像扩展至足够大，以使背景图像完全**覆盖背景区域。**
 **contain**把图像图像扩展至最大尺寸，以使其**宽度和高度完全适应**内容区域

> 4. **多倍图切图 cutterma**
## 移动端技术解决方案
>1. **移动端浏览器**
>移动端浏览器基本以 `webkit` 内核为主，因此我们就考虑webkit兼容性问题

>2. **CSS初始化** `normalize.css`
>移动端 **CSS** **初始化**推荐使用 **normalize**
>[官网地址：](http://necolas.github.io/normalize.css/)

>3. **CSS3 盒子模型**  `box-sizing`
>```css
>	传统模式宽度计算：盒子的宽度 = CSS中设置的width + border + padding
>	/*传统盒子模型*/
>	box-sizing: content-box;
> 
>	CSS3盒子模型： 盒子的宽度 = CSS中设置的宽度width 里面包含了 border 和 padding 
>	也就是说，我们的CSS3中的盒子模型， padding 和 border 不会撑大盒子
>	/*CSS3盒子模型*/
>	box-sizing: border-box;
>```

>4. **特殊样式**
>```css
>	/*CSS3盒子模型*/
>	box-sizing: border-box;
> 	-webkit-box-sizing: border-box;
> 	/*点击高亮我们需要清除清除 设置为transparent 完成透明*/
> 	-webkit-tap-highlight-color: transparent;
> 	/*在移动端浏览器默认的外观在iOS上加上这个属性才能给按钮和输入框自定义样式*/
> 	-webkit-appearance: none;
> 	/*禁用长按页面时的弹出菜单*/
> 	img,a { -webkit-touch-callout: none; }
>```

## 移动端常见布局 - 流失布局
> **流式布局（百分比布局）**
>>  流式布局，就是**百分比布局**，也称非**固定像素布局。**
 通过盒子的**宽度设置成百分比**来根据屏幕的宽度来进行伸缩，不受固定像素的限制，内容向两侧填充。
 流式布局方式是移动web开发使用的**比较常见**的布局方式
 >
>**max-width** 最大宽度 （**max-height** 最大高度）
>  **min-width** 最小宽度 （**min-height** 最小高度）

## 总结
> **移动端布局之流式布局**
>1. 标准viewport规范以及写法
>2. 模拟移动端调试方法
>3. 移动端常见的布局方案
>4. 流式布局原理
>5. 京东移动端首页布局技
# Flex(弹性盒) 布局 ✍
## flex 布局原理 ✍
> **布局原理**
> 采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成
员，称为 **Flex 项目**（flex item），简称"项目"。
>
>>**总结flex布局原理：**
>**就是通过给父盒子添加`flex`属性，来控制子盒
子的位置和排列方式**
## flex 布局父项常见属性
> **常见父项属性**
> >**flex-direction**：设置主轴的方向
 **justify-content**：设置主轴上的子元素排列方式
 **flex-wrap**：设置子元素是否换行  align-content：设置侧轴上的子元素的排列方式（多行）
 **align-items**：设置侧轴上的子元素排列方式（单行）
**flex-flow**：复合属性，相当于同时设置了 flex-direction 和 flex-wrap

> 1. **`flex-direction` 设置主轴的方向**★
> **flex-direction 属性**决定主轴的方向（即项目的排列方向）
**注意：** 主轴和侧轴是会变化的，就看 flex-direction 设置谁为主轴，剩下的就是侧轴。而我们的子元素是跟着主轴来排列
默认**主轴**方向就是 **x 轴方向**，水平向右
默认侧轴方向就是 y 轴方向，水平向
![flex-direction](https://img-blog.csdnimg.cn/48baa1e02643480bb66f1dab959b5a6e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
### justify-content

> 2. **`justify-content` 设置主轴上的子元素排列方式**`★`
> **justify-content** 属性定义了项目在**主轴上的对齐方式**
**注意：** 使用这个属性之前一定要确定好主轴是哪个
![justify-content](https://img-blog.csdnimg.cn/88410bd72a4f419db905ed4668803ced.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

> 3. **`flex-wrap` 设置子元素是否换行** ★

> 默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，flex布局中默认是不换行的。
>**`wrap`  换行**  
>**nowrap 默认值，不换行**

> 4. **`align-items` 设置侧轴上的子元素排列方式（单行）**`★`
>该属性是控制子项在**侧轴**（默认是y轴）上的排列方式 在子项为单项（**单行**）的时候使用
>![align-items](https://img-blog.csdnimg.cn/2b55350458b841d997a68d348f7fb434.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

### align-content
> 5. **`align-content` 设置侧轴上的子元素的排列方式（多行）**
> 设置子项在侧轴上的排列方式 并且只能用于子项出现 **换行** 的情况（**多行**），在单行下是没有效果
> ![align-content](https://img-blog.csdnimg.cn/0552f8c7b8a44acd8317b8a68518a58e.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

> 6. `flex-flow`
> flex-flow 属性是 **flex-direction** 和 **flex-wrap** 属性的复合属性
>```css
>	flex-flow:row wrap;
>```
## flex 布局子项常见属性
> 1. **`flex` 属性** ★
**flex 属性**定义子项目分配剩余空间，用**flex**来表示**占多少份数**。
>```css
>	.item {
>		flex: <number>; /* default 0 */
>	}
>```

> 2. **`align-self` 控制子项自己在侧轴上的排列方式**
> align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。
默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch
>```css
>	span:nth-child(2) {
> 		/* 设置自己在侧轴上的排列方式 */
> 		align-self: flex-end;
> 	}
>```

> 3. **`order` 属性定义项目的排列顺序**
> **数值越小，排列越靠前**，默认为0。
**注意**：和 z-index 不一样。
>```css
>	.item {order: <number>;}
>```
##  背景线性渐变
>![在这里插入图片描述](https://img-blog.csdnimg.cn/005dc02b446d4681a26d56b2738d8ee2.png#pic_center)
>```css
>	background: linear-gradient(起始方向, 颜色1, 颜色2, ...);
>	background: -webkit-linear-gradient(left, red , blue);
>	background: -webkit-linear-gradient(left top, red , blue)
>```
>**背景渐变必须添加浏览器私有前缀**
**起始方向可以是： 方位名词 或者 度数 ， 如果省略默认就是 top**


# rem 布局 ✍
## rem 基础
> **rem 单位**
>> **rem** (root em)是一个相对单位，类似于**em**，**em是父元素字体大小。**
不同的是**rem的基准是相对于html元素**的字体大小。
比如，根元素（html）设置font-size=12px; 非根元素设置width:2rem; 则换成px表示就是24px。
>
>**rem的优势**：父元素文字大小可能不一致， 但是整个页面只有一个html，可以很好来控制整个页面的元素大小

```css
	/* 根html 为 12px */
	html {
	 font-size: 12px;
	}
	/* 此时 div 的字体大小就是 24px */ 
	div {
	 font-size: 2rem;
	}
```

## 媒体查询
> 1. **什么是媒体查询**
>> **媒体查询**（Media Query）是**CSS3**新语法。
>>>使用 @media 查询，可以针对不同的媒体类型定义不同的样式
 **@media 可以针对不同的屏幕尺寸设置不同的样式**
 当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面
 目前针对很多苹果手机、Android手机，平板等设备都用得到多媒体查询

> 2. **语法规范**
> ```css
> 	@media mediatype and|not|only (media feature) {
> 		CSS-Code;
>	}
> ```
>> 用 **@media** 开头 注意@符号
 **mediatype** 媒体类型
 关键字 **and not only**
 media feature 媒体特性 必须有小括号包

### 语法规范
> 1. **`mediatype` 查询类型**
> 将不同的终端设备划分成不同的类型，称为**媒体类型**
> `all` ===> 用于所有设备
> `print` ===> 用于打印机和打印预览
> `scree` === > **用于电脑屏幕，平板电脑，智能手机等**

> 2. **关键字**
>> 关键字将媒体类型或多个媒体特性连接到一起做为媒体查询的条件
>>>  **and**：可以将多个媒体特性连接到一起，相当于“且”的意思。
 **not**：排除某个媒体类型，相当于“非”的意思，可以省略。
 **only**：指定某个特定的媒体类型，可以省略。 

> 3. **媒体特性**
> 每种媒体类型都具体各自不同的特性，根据不同媒体类型的媒体特性设置不同的展示风格。我们暂且了解三个。
**注意他们要加小括号包含**
>>**width** ===> 定义输出设备中**页面可见区域**的宽度
**min-width** ===> 定义输出设备中**页面最小可见区域**宽度
**max-width** ===> 定义输出设备中**页面最大可见区域**宽度

## Less 基础
> **维护 css 的弊端**
> CSS 是一门非程序式语言，没有变量、函数、SCOPE（作用域）等概念。
> - CSS 需要书写大量看似没有逻辑的代码，CSS 冗余度是比较高的。
>-  不方便维护及扩展，不利于复用。
>- CSS 没有很好的计算能力
>- 非前端开发工程师来讲，往往会因为缺少 CSS 编写经验而很难写出组织良好且易于维护的 CSS 代码项目

> 2. **Less 介绍**
> **Less** （Leaner Style Sheets 的缩写） 是一门 CSS 扩展语言，也成为**CSS预处理器**
>[ Less中文网址：](http://lesscss.cn)
>常见的CSS预处理器：**Sass、Less、Stylus**
>**Less 是一门 CSS 预处理语言，它扩展了CSS的动态特性。**

### Less 使用
> 1. **Less 变量**

> **变量命名规范**
> 1. 必须有@为前缀
>2. 不能包含特殊字符
>3. 不能以数字开头
>4. 大小写敏感
>```css
>	@color: pink;
>```
>**变量使用规范**
>```css
>	//直接使用
>	body{
 >		color:@color;
>	}
>	a:hover{
 >		color:@color;
>	}
>```

> 2. **Less 编译**

>我们需要把我们的 less文件，编译生成为css文件，这样我们的html页面才能使用。
>**vocode Less 插件**
>**Easy LESS** 插件用来把less文件编译为**css文件**

> 3. **Less 嵌套**
> ```css
> 	#header {
 >		.logo {
 >			width: 300px;
 >			}
>		}
>
> ```
> **如果遇见 （交集|伪类|伪元素选择器**
> 内层选择器的前面没有 `&` 符号，则它被解析为**父选择器的后代**；
> 如果有 `&` 符号，它就被解析为**父元素自身**或**父元素的伪类**
> ```css
> 	a{
> 		&:hover{ color:red; }
>	}
> ```

> 4. ** Less 运算** `★`
> 任何数字、颜色或者变量都可以参与运算。就是Less提供了加（**+**）、减（**-**）、**乘**（*）、除（**/**）算术运算。
> ```css
> 	width: (@width + 5) * 2;  
> ```
> **注意：**
> 1. 乘号（*）和除号（/）的写法
> 2. **运算符中间左右有个空格隔开 1px + 5**
> 3. 对于两个不同的单位的值之间的运算，运算结果的值取第一个值的单位
> 4. 如果两个值之间只有一个值有单位，则运算结果就取该单位

# 响应式布局 ✍
## 响应式开发
> **响应式开发原理**
> 就是使用媒体查询针对不同宽度的设备进行布局和样式的设置，从而适配不同设备的目的。![在这里插入图片描述](https://img-blog.csdnimg.cn/5b14562d5530434e941902d3e292eaa7.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
> **响应式布局容器**
> 响应式需要一个父级做为布局容器，来配合子级元素来实现变化效果。
> 原理就是在不同屏幕下，通过媒体查询来改变这个布局容器的大小，再改变里面子元素的排列方式和大小，从而实现不同屏幕下，看到不同的页面布局和样式变化

##  Bootstrap前端开发框
### Bootstrap 简介
> Bootstrap 来自 Twitter（推特），是目前最受欢迎的前端框架。Bootstrap 是基于 HTML、CSS 和JAVASCRIPT 的，它简洁灵活，**使得 Web 开发更加快捷。**
> [中文官网：](http://www.bootcss.com/)
 [官网：](http://getbootstrap.com/)
 [推荐使用：](http://bootstrap.css88.com/ )
> **框架**：顾名思义就是一套架构，它有一套比较完整的网页功能解决方案，而且控制权在框架本身，有预制样式库、组件和插件。
> 使用者要按照框架所规定的某种规范进行开发

> **优点**
> 标准化的html+css编码规范
 提供了一套简洁、直观、强悍的组件
 有自己的生态圈，不断的更新迭代
 让开发更简单，提高了开发的效率
 
>**Bootstrap 使用四步曲**： 1. **创建文件夹结构** 2. **创建 html 骨架结构** 3. **引入相关样式文件** 4. **书写内容**
##  Bootstrap栅格系统
> **栅格选项参数**
> ![栅格](https://img-blog.csdnimg.cn/423e3d5f3b294508afca8e8f4959beab.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
> 1. 按照不同屏幕划分为1~12 等份
>2. 行（row） 可以去除父容器作用15px的边距
> 3. xs-extra small：超小； sm-small：小； md-medium：中等； lg-large：大；
> 4. 列（column）大于 12，多余的“列（column）”所在的元素将被作为一个整体另起一行排列
> 5. 每一列默认有左右15像素的 padding
> 6. 可以同时为一列指定多个设备的类名，以便划分不同份数 例如 class="col-md-4 col-sm-6"


> 1. **列嵌套**
> 栅格系统内置的栅格系统将内容再次嵌套。简单理解就是一个列内再分成若干份小列。我们可以通过添加一个新的 **.row** 元素和一系列 **.col-sm-*** 元素到已经存在的 **.col-sm-***

```html
	<!-- 列嵌套 -->
	 <div class="col-sm-4">
		 <div class="row">
			 <div class="col-sm-6">小列</div>
			 <div class="col-sm-6">小列</div>
		 </div>
	</div>
```

> 2. **列偏移**
> 使用 **.col-md-offset-*** 类可以将列向右侧偏移。这些类实际是通过使用 `*` 选择器为当前元素增加了左侧的边距（**margin**）

```html
	 <!-- 列偏移 -->
	 <div class="row">
		 <div class="col-lg-4">1</div>
		 <div class="col-lg-4 col-lg-offset-4">2</div>
	 </div>
```

> 3. **列排序**
> 通过使用 **.col-md-push-*** 和 **.col-md-pull-*** 类就可以很容易的改变列（**column**）的顺序。

```html
	<!-- 列排序 -->
	 <div class="row">
		 <div class="col-lg-4 col-lg-push-8">左侧</div>
		 <div class="col-lg-8 col-lg-pull-4">右侧</div>
	 </div>
```

> 4. **响应式工具**
> 为了加快对移动设备友好的页面开发工作，利用媒体查询功能，并使用这些工具类可以方便的针对不同设备展示或隐藏页面内容。
> ![hidden](https://img-blog.csdnimg.cn/ff996b9ffcc2493ab28c06d083ae86a5.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBATUPnjLQ=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
