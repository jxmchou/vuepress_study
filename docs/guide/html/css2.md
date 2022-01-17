---
title: CSS基础二
sidebarDepth: 0
date: 2022-01-05
categories:
 - H5C3
tags:
 - css2
---

::: tip 
本文主要包括css的基本部分二，选取至pink老师
:::

<!-- more -->

### markdown正文


# 盒子模型 ✍
> W3c标准盒子模型
> 标准 w3c 盒子模型的范围包括 margin、border、padding、content
> 当设置为box-sizing: content-box;时，将采用标准模式解析计算，也是默认模式；
> 当设置为box-sizing: border-box时，将采用怪异模式解析计算；
## 1. 盒子边框(border)
>1. border-width
>2. border-color
>3. `border-style`
>`solid`：边框为单实线(最为常用的)
>
>4. 例： border: 1px solid red;

>表格的细线边框：
>>通过表格的`cellspacing="0"`,将单元格与单元格之间的距离设置为0，
>通过css属性：`table{ border-collapse:collapse; }  `
>collapse 单词是合并的意思,`border-collapse: collapse`;表示相邻边框合并在一起。

## 2. 内边距(padding)
>padding属性用于设置内边距。是指`边框与内容之间的距离`。
>>padding-left	左内边距
padding-right	右内边距
padding-top	上内边距
padding-bottom	下内边距

>当我们给盒子指定padding值之后， 发生了2件事情：
>
>>内容和边框 有了距离，添加了内边距。
盒子会`变大`
>
>**解决措施**：通过给设置了宽高的盒子，减去相应的内边距的值，维持盒子原有的大小。
>
>padding不影响盒子大小情况：👉**如果没有给一个盒子指定宽度**， 此时，如果给这个盒子指定padding， 则不会撑开盒子。
## 3. 外边距（margin）
>margin属性用于设置外边距。margin就是控制`盒子和盒子之间的距离`
>**块级盒子水平居中**
>
>>盒子必须**指定宽度**（width）
然后就给左右的外边距都设置为**auto**
margin-left: auto;   margin-right: auto;
margin: auto;
margin: 0 auto;

>**文字居中和盒子居中**区别👇👇
>>盒子内的文字水平居中是 `text-align: center;` 而且还可以让 行内元素和行内块居中对齐
块级盒子水平居中  左右margin 改为 auto

## 4.外边距合并
>1. **相邻**块元素垂直外边距的合并
当上下相邻的两个块元素相遇时，如果上面的元素有下外边距margin-bottom
下面的元素有上外边距margin-top，则他们之间的垂直间距不是margin-bottom与margin-top之和
「`取两个值中的较大者`」这种现象被称为相邻块元素垂直外边距的合并（也称`外边距塌陷`）。

>**「解决方案：尽量给只给一个盒子添加margin值」。**

>2. **嵌套**块元素垂直外边距的合并（塌陷）
>对于两个嵌套关系的块元素，如果父元素没有**上内边距及边框**
父元素的上外边距会与子元素的上外边距发生合并
合并后的外边距为两者中的较大者

>**「解决方案：」**
>
>>1.可以为父元素定义上边框。
2.可以为父元素定义上内边距
3.可以为父元素添加`overflow: hidden`。

## 5. CSS3 新增
>**圆角边框：**
>>`border-radius`: 50%; 圆形
> border-radius: 左上角 右上角  右下角  左下角; 指定四个角

>**盒子阴影(box-shadow)：**
>`box-shadow`: offset-x offset-y [blur [spread]] [color] [inset]
>```css
> box-shadow: 0 15px 30px  rgba(0, 0, 0, .4);  
> ```
|值	|描述
|--|--
|offset-x	|阴影的水平偏移量。正数向右偏移，负数向左偏移。
|offset-y	|阴影的垂直偏移量。正数向下偏移，负数向上偏移。
|blur	|可选。阴影模糊距离，不能取负数。
|spread	|可选。阴影大小
|color	|可选。阴影的颜色
|inset	|可选。表示添加内阴影，默认为外阴影

# 浮动 ✍
## CSS布局的三种机制
>Ⅰ - `普通流`（标准流）
>>**块级元素**会独占一行，**从上向下**顺序排列；
常用元素：`div、hr、p、h1~h6、ul、ol、dl、form、table`
**行内元素**会按照顺序，**从左到右**顺序排列，碰到父元素边缘则自动换行；
常用元素：span、a、i、em等

>Ⅱ -  `浮动`
>>让盒子从普通流中**浮**起来,主要作用让多个块级盒子一行显示。
>
>「什么是浮动」元素的浮动是指**设置了浮动属性**的元素会
>>脱离标准普通流的控制,不占位置，脱标
移动到指定位置。

>Ⅲ - `定位`
>>将盒子定在浏览器的某一个位置——CSS 离不开定位，特别是后面的 js 特效。

> **语法：**
> >```css
>>	选择器 { float: 属性值; }
>>	div {float: none/left/right}
> >```
## 清除浮动
>`清除浮动本质`**清除浮动主要为了解决父级元素因为子级浮动引起内部高度为0 的问题。清除浮动之后， 父级就会根据浮动的子盒子自动检测高度。父级有了高度，就不会影响下面的标准流了**

>**清除浮动的方法**

>1. **额外标签法(隔墙法)**
>```css
>	<div style="clear:both"></div>
>```

>2. **父级添加overflow属性方法**
>```css
>	可以给父级添加： overflow为 hidden| auto| scroll  都可以实现。
>	div { overflow: hidden }
>```
>

>3. **使用after伪元素清除浮动**:`after 方式为空元素额外标签法的升级版，好处是不用单独加标签了`
>```css
>	.clearfix:after {
>        content: "";
>        display: block;
>        height: 0;
>        clear: both;
>        visibility: hidden;
>    }
>  
>    /* IE6、7 专有 */
>    .clearfix {
>        *zoom: 1;
>    }
>```

>4. **使用双伪元素清除浮动**
>```css
>	.clearfix:before,
> 	.clearfix:after {
>        content: "";
>        display: table;
>     }
>
>    .clearfix:after {
>        clear: both;
>     }
>
>    .clearfix {
>       *zoom: 1;
>     }
>```
## CSS属性书写顺序
>1. 布局定位属性：display / position / float / clear / visibility / overflow（建议 display 第一个写，毕竟关系到模式）
>2. 自身属性：width / height / margin / padding / border / background
>3. 文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word
>4. 其他属性（CSS3）：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …
# 定位 ✍
## 定位模式(position)
> 1. `静态定位(static)`
> 静态定位是元素的默认定位方式，无定位的意思。它相当于border里面的none，不要定位的时候用。
静态定位 按照标准流特性摆放位置。它没有边偏移。
静态定位在布局时几乎不用

> 2. `相对定位(relative)`
> **相对定位**是元素**相对**于它原来在标准流中的位置来说的。

> 3. `绝对定位(absolute)`
> **绝对定位**是元素以**带有定位**的**父级元素**来移动位置
> `定位口诀--子绝父相`

>4. `固定定位(fixed)`
>固定定位是**绝对定位**的一种特殊形式;
>>**完全脱标**--完全不占位置；
只认**浏览器的可视窗口**--`浏览器可视窗口+边偏移`属性来设置元素的位置
**跟父元素没有任何关系**；**单独使用**
**不随滚动条滚动**

## 定位(position)的扩展
> `绝对定位的盒子居中`
> >`left : 50%`:让盒子的左侧移动到父级元素的水平中心位置；
`margin-left: -100px`;让盒子向左移动自身宽度的一半。width:200px
同理垂直居中。

> `堆叠顺序（z-index）`
> >z-index的特性如下:
>>>**属性值**：正整数、负整数或 0，默认值是 0，**数值越大，盒子越靠上**；
如果属性值相同，则按照书写顺序，后来居上；
**数字后面不能加单位**
z-index只能用于**相对定位、绝对定位和固定定位**的元素，其他标准流、浮动和静态定位无效。


# CSS扩展 display-visibility-overflow ✍
## 元素的显示与隐藏
> 1. **display 显示（重点）**
> `display: none` 隐藏对象
> >特点：隐藏之后，不再保留位置。
> `display: block` 除了转换为块级元素之外，同时还有显示元素的意思。

> 2. **visibility 可见性**
> 设置或检索是否显示对象
> 特点：隐藏之后，`继续保留原有位置`。
> ```css
> 	visibility：visible ;  对象可视
>	visibility：hidden	;  对象隐藏
> ```

> 3. **overflow 溢出**
> 检索或设置当对象的内容超过其指定高度及宽度时如何管理内容。
> 
|属性值	|描述
|--|--
|visible	|不剪切内容也不添加滚动条
|hidden	|不显示超过对象尺寸的内容，超出的部分隐藏掉
|scroll	|不管超出内容否，总是显示滚动条
|auto	|超出自动显示滚动条，不超出不显示滚动条

## CSS用户界面样式
> 1. **鼠标样式**
>```html
>	<span style="cursor:default">我是默认</span>
>```
|属性值	|描述
|--|--
|default	|小白  默认
|pointer	|小手
|move	|移动
|text	|文本
|not-allowed	|禁止


> 2. **轮廓线 outline**
> outline : outline-color ||outline-style || outline-width 
> 最直接的写法是 ： outline: 0;   或者   `outline: none`;

> 3. **防止拖拽文本域resize**
> ```html
> 	<textarea  style="resize: none;"></textarea>
> ```
## vertical-align 垂直对齐
> `vertical-align` 垂直对齐，它只针对于「**行内元素**」或者「**行内块元素**」
> 特别是行内块元素， 通常用来控制`图片/表单`与文字的对齐。
> ```css
> 	设置或检索对象内容的垂直对其方式。
>	vertical-align : baseline |top |middle |bottom 
> ```

## 溢出的文字省略号显示
	单行省略：
```css
	/*1. 先强制一行内显示文本*/
      white-space: nowrap;
  /*2. 超出的部分隐藏*/
      overflow: hidden;
  /*3. 文字用省略号替代超出的部分*/
      text-overflow: ellipsis;
```

	多行省略：
```css
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;  // 将对象作为弹性伸缩盒子模型显示
	-webkit-box-orient: vertical;  // 设置或检索伸缩盒对象的子元素的排列方式
	-webkit-line-clamp: 3; // 设置显示几行
```

## CSS 三角形

```css
	div {
		width: 0; 
		height: 0;
		line-height:0；
		font-size: 0;
		border-top: 10px solid red;
		border-right: 10px solid green;
		border-bottom: 10px solid blue;
		border-left: 10px solid #000; 
	}
```
