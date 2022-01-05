---
title: 2.CSS基础一
sidebarDepth: 0
---
# CSS选择器 ✍
## 1. CSS基础选择器
### ① 标签选择器
>标签选择器（元素选择器）是指用HTML标签名称作为选择器，按标签名称分类，为页面中某一类标签指定统一的CSS样式。
>作用：可以把某一类标签全部选择出来。
>```css
>	标签名{属性1:属性值1; 属性2:属性值2; } 
>	div{width:100px;height:100px}
>```
### ② 类选择器
>类选择器使用"`.`"(英文点号)进行标识，后面紧跟`类名`。
>语法：`类名选择器`
>```css
>	.类名/div  {   
> 	   属性1:属性值1; 
> 	   属性2:属性值2; 
>		}
> 	<div class="div"></div>
>```
>`注意`：
>	- 长名称或词组可以使用中横线来为选择器命名。
>- 不要纯数字、中文等命名， 尽量使用英文字母来表示。
>- 多类名选择器：各个类名中间用空格隔开。
### ③ id选择器
>元素的id值是唯一的，只能对应于文档中某一个具体的元素。
>```css
>	#id名 {属性1:属性值1; 属性2:属性值2;  }
>	<div id="id名"></div>
>```
### ④ 通配符选择器
>通配符选择器用`*`号表示，`*` 就是选择所有的标签。它是所有选择器中`作用范围最广的`，能匹配页面中所有的元素。
>```css
>	* { 属性1:属性值1; 属性2:属性值2;  }
>	* {
>  		margin: 0;		/* 定义外边距*/
>  		padding: 0;		/* 定义内边距*/
>	  }
>```
### ⑤基础选择器总结
|选择器	|作用	|缺点	|使用情况	|用法|
|--|--|--|--|--|
|标签选择器|	可以选出所有相同的标签，比如p|	不能差异化选择|	较多|	p { color：red;}
|类选择器|	可以选出1个或者多个标签|	可以根据需求选择|	非常多|	.nav { color: red; }
|id选择器|	一次只能选择器1个标签|	只能使用一次|	不推荐使用|	#nav {color: red;}
|通配符选择器|	选择所有的标签|	选择的太多，有部分不需要|	不推荐使用|	* {color: red;}

## 2.CSS复合选择器
### ① 后代选择器（包含选择器）
>```css
>	父级 子级{属性:属性值;属性:属性值;}
>	.div p {color:red;font-size:16px;}
>```
### ② 子元素选择器
子元素选择器只能选择作为某元素`子元素(亲儿子)`的元素。
>```css
>	.div > p {color:#bfa;font-size:16px;}`
>```
### ③ 交集选择器/并集选择器
>```css
>	交集：p.div{color:pink;font-size:18px}
>	并集：.div,p,#div{color:#bfa}
>```
### ④ 链接伪类选择器
> 链接伪类，是利用交集选择器.
>1. `a:link`  未访问的链接
>2. `a:visited`  已访问的链接
>3. `a:hover`  鼠标移动到链接上
>4. `a:active`  选定的链接
### ⑤ 复合选择器总结
|选择器	|作用	|特征	|使用情况		|隔开符号及用法
|--|--|--|--|--|
|后代选择器|	用来选择元素后代	|是选择所有的子孙后代	|较多	|符号是空格 .nav a
|子代选择器|	选择 最近一级元素	|只选亲儿子	|较少	|符号是>   .nav>p
|交集选择器	|选择两个标签交集的部分|	既是 又是|	较少	|没有符号  p.one
|并集选择器	|选择某些相同样式的选择器|	可以用于集体声明|	较多|	符号是逗号 .nav, .header
|链接伪类选择器|	给链接更改状态|:	|较多|	重点记住 a{} 和 a:hover  实际开发的写法

# CSS字体样式 ✍
## font字体
>1. `font-size`
>```css
>	p { font-size:20px; }
>```
>`单位`：`px` `rpx` `em` `rem` `vh` `vw`

>2. `font-family`
>```css
>	p { font-family:"微软雅黑";}
>	指定多个字体
>	p {font-family: Arial,"Microsoft Yahei", "微软雅黑";}
>```

>3. `font-weight` 加粗
>
|属性值	|描述
|--|--|
|normal	|默认值（不加粗的）
|bold	|定义粗体（加粗的）
|100~900	|400 等同于 normal，而 700 等同于 bold  (数字表示粗细用的多)

> 4. `font-style` font-style属性用于定义字体风格，如设置斜体、倾斜或正常字体，其可用属性值如下：
> 
|属性	|作用
|--|--
|normal	|默认值，浏览器会显示标准的字体样式  font-style: normal;
italic	|浏览器会显示斜体的字体样式。

> 5. `font:综合设置字体样式` 
> ```css
>	body { font: font-style  font-weight  font-size/line-height  font-family;}
>```
>使用font属性时，必须按上面语法格式中的顺序书写，不能更换顺序，各个属性以`空格`隔开
>其中不需要设置的属性可以省略(取默认值),但必须保留font-size和font-family属性，否则font属性将不起作用。
## CSS外观属性
>```css
>	1. color: white--->#fff--->rgba(255,0,0,0.5)
>	2. text-align: center 居中
>	3. line-height: 行高
>	文字的行高等于盒子的高度。行高   =  上距离 +  内容高度  + 下距离
>	上距离和下距离总是相等的，因此文字看上去是垂直居中的。
>	4. text-indent: 用于设置首行文本的缩进
>	text-indent: 2em; 1em 就是一个汉字的宽度
>	5. text-decoration: none 用于给链接修改装饰效果 
>```
# 标签显示模式(display) ✍
HTML标签一般分为`块标签`和`行内标签`两种类型，它们也称为`块元素`和`行内元素`。
## 标签显示模式转换 display
>块转行内：`display:inline`;
行内转块：`display:block`;
块、行内元素转换为行内块：`display: inline-block`;

>1. 块级元素(block-level)
>常见的块元素有`<h1>~<h6>`、`<p>`、`<div>`、`<ul>`、`<ol>`、`<li>`等，其中`<div>`标签是最典型的块元素。

>2. 行内元素(inline-level) 内联元素
>常见的行内元素有`<a>`、`<strong>`、`<b>`、`<em>`、`<i>`、`<del>`、`<s>`、`<ins>`、`<u>`、`<span>`等，其中`<span>`标签最典型的行内元素。

>3. 行内块元素(inline-block)
>在行内元素中有几个特殊的标签——`<img>`、`<input >`、`<td>`，可以对它们设置宽高和对齐属性，有些资料可能会称它们为行内块元素。

# CSS背景(background) ✍
>1. 背景颜色
>  background-color: `transparent` 透明的

>2. 背景图片(image)
>background-image: url(images/1.png);

>3. 背景平铺（repeat）
>background-repeat : repeat | no-repeat | repeat-x | repeat-y 

>4. 背景位置(`position`)
>background-position : length || length
background-position : position || position 

>背景简写：
>background: 背景颜色 背景图片地址 背景平铺 背景滚动 背景位置;
>background: transparent url(image.jpg) repeat-y  scroll center top ;

>5. 背景半透明(CSS3)
>`opacity: 0.2`;

# CSS三大特性 ✍
>1. CSS `层叠性`
>样式冲突，遵循的原则是`就近原则`。 那个样式离着结构近，就执行那个样式。

>2. CSS `继承性`
>子标签会继承父标签的某些样式，如文本颜色和字号。
>子元素可以继承父元素的样式（text-，font-，line-这些元素开头的可以继承，以及color属性）

>3. CSS `优先级`(CSS特殊性)
>选择器相同，则执行层叠性
>选择器不同，就会出现优先级的问题。
>`!important` 