---
title: jQuery入门笔记总结
date: 2022-01-08
categories:
  - JS
tags:
  - jQuery
---

::: warning
主要涉及：jQuery、但基本已经淘汰，选取至 pink 老师
:::

<!-- more -->

# #markdown 正文

# jQuery 入门

## jQuery 概述

### JavaScript 库

JavaScript 库：即 library，是一个封装好的特定的集合（方法和函数）。从封装一大堆函数的角度理解库，就是在这个库中，封装了很多预先定义好的函数在里面，比如动画 animate、hide、show，比如获取元素等。
简单理解： 就是一个 JS 文件，里面对我们原生 js 代码进行了封装，存放到里面。这样我们可以快速高效的使用这些封装好的功能了。

    常见的 JavaScript 库

jQuery ，Prototype， YUI ，Dojo， Ext JS， 移动端的 zepto

### jQuery 的概念

jQuery 出现的目的是加快前端人员的开发速度，我们可以非常方便的调用和使用它，从而提高开发效率。
学习 jQuery 本质： 就是学习调用这些函数（方法）。

    jQuery 的优点

1.轻量级。核心文件才几十 kb，不会影响页面加载速度 2.链式编程、隐式迭代 3.对事件、样式、动画支持，大大简化了 DOM 操作 4.支持插件扩展开发。有着丰富的第三方的插件，例如：树形菜单、日期控件、轮播图等

## jQuery 的基本使用

### jQuery 的入口函数

$(function () {
... // 此处是页面 DOM 加载完成的入口
}) ;
$(document).ready(function(){
... // 此处是页面 DOM 加载完成的入口
});

### jQuery 对象和 DOM 对象

    1. DOM 对象转换为 jQuery 对象： $(DOM对象)
    $('div);
    2. jQuery 对象转换为 DOM 对象（两种方式）
    $('div')[index] index 是索引号
    $('div').get(index) index 是索引号

### 基本使用

```html
<script>
  // 1. 等着页面DOM加载完毕再去执行js 代码
  $(document).ready(function () {
    $('.div2').hide()
  })
  // 2.  等着页面DOM加载完毕再去执行js 代码
  $(function () {
    $('.div1').hide()
  })
</script>
```

### 顶级对象

```html
<script>
  // 1. $ 是jQuery的别称（另外的名字）
  jQuery(function () {
    // $('div').hide();
    jQuery('div').hide()
  })
  // 2. $同时也是jQuery的 顶级对象
</script>
```

### jquery 对象和 DOM 对象

```html
<script>
  // 1. DOM 对象：  用原生js获取过来的对象就是DOM对象
  var myDiv = document.querySelector('div') // myDiv 是DOM对象
  var mySpan = document.querySelector('span') // mySpan 是DOM对象
  console.log(myDiv)
  // 2. jQuery对象： 用jquery方式获取过来的对象是jQuery对象。 本质：通过$把DOM元素进行了包装
  $('div') // $('div')是一个jQuery 对象
  var span = $('span') // $('span')是一个jQuery 对象
  console.log(span)
  // 3. jQuery 对象只能使用 jQuery 方法，DOM 对象则使用原生的 JavaScirpt 属性和方法
  // myDiv.style.display = 'none';
  // myDiv.hide(); myDiv是一个dom对象不能使用 jquery里面的hide方法
  // $('div').style.display = 'none'; 这个$('div')是一个jQuery对象不能使用原生js 的属性和方法
</script>
```

### DOM 对象和 jQuery 对象相互转换

```html
<video src="mov.mp4" muted></video>
<script>
  // 1. DOM对象转换为 jQuery对象
  // (1) 我们直接获取视频，得到就是jQuery对象
  // $('video');
  // (2) 我们已经使用原生js 获取过来 DOM对象
  var myvideo = document.querySelector('video')
  // $(myvideo).play();  jquery里面没有play 这个方法
  // 2.  jQuery对象转换为DOM对象 play()方法
  // myvideo.play();
  // $('video')[0].play()
  // $('video').get(0).play()
  $('video')[0].play()
</script>
```

### jquery 隐式迭代

```html
<div>惊喜不，意外不</div>
<div>惊喜不，意外不</div>
<div>惊喜不，意外不</div>
<div>惊喜不，意外不</div>
<script>
  // 1. 获取四个div元素
  $('div')
  // 2. 给四个div设置背景颜色为绿色 jquery对象不能使用style
  $('div').css('background', '#bfa')
  // 3. 隐式迭代就是把匹配的所有元素内部进行遍历循环，给每一个元素添加css这个方法
  $('ul > li').css('color', 'red')
</script>
```

# jQuery 常用 API

## jQuery 选择器

### 基本选择器

|    名称    |        用法        | 描述                                 |
| :--------: | :----------------: | :----------------------------------- |
| ID 选择器  |     $("#id");      | 获取指定 ID 的元素                   |
|  类选择器  |    $(".class")     | 获取同一类的 class 元素              |
| 标签选择器 |     $(“div”);      | 获取同一类标签的所有元素             |
| 并集选择器 |   $(“div,p,li”);   | 使用逗号分隔，只要符合条件之一就可。 |
| 交集选择器 | $(“div.redClass”); | 获取 class 为 redClass 的 div 元素   |

    总结：跟css的选择器用法一模一样。

### 层级选择器

| 名称       | 用法        | 描述                                                           |
| ---------- | ----------- | :------------------------------------------------------------- |
| 子代选择器 | $("ul>li"); | 使用>号，获取儿子层级的元素，注意，并不会获取孙子层级的元素    |
| 后代选择器 | $(“ul li”); | 使用空格，代表后代选择器，获取 ul 下的所有 li 元素，包括孙子等 |

    总结：还是跟 css 语法相同

#### 知识铺垫

    jQuery 设置样式
    $('类名').css('属性','值');
    $("div").css('color','#bfa');

### 隐式迭代

    遍历内部 DOM 元素（伪数组形式存储）的过程就叫做隐式迭代。

### 筛选选择器

|    名称    | 用法                               | 描述                                                                |
| :--------: | ---------------------------------- | :------------------------------------------------------------------ |
|   :first   | $('li:first')                      | 获取第一个 li 元素                                                  |
|   :last    | $('li:last')                       | 获取最后一个 li 元素                                                |
| :eq(index) | $(“li:eq(2)”).css(“color”, ”red”); | 获取到的 li 元素中，选择索引号为 2 的元素，索引号 index 从 0 开始。 |
|    :odd    | $(“li:odd”).css(“color”, ”red”);   | 获取到的 li 元素中，选择索引号为奇数的元素                          |
|   :even    | $(“li:even”).css(“color”, ”red”);  | 获取到的 li 元素中，选择索引号为偶数的元素                          |

```html
<script>
  $(function () {
    $('ul li:first').css('color', 'red')
    $('ul li:eq(2)').css('color', 'blue')
    $('ol li:odd').css('color', 'skyblue')
    $('ol li:even').css('color', 'pink')
  })
</script>
```

    总结：这类选择器都带冒号

### 筛选选择器(方法)（重点）

| 名称               | 用法                         | 描述                                              |
| ------------------ | ---------------------------- | :------------------------------------------------ |
| children(selector) | $(“ul”).children(“li”)       | 相当于$(“ul>li”)，子类选择器                      |
| find(selector)     | $(“ul”).find(“li”);          | 相当于$(“ul li”),后代选择器                       |
| siblings(selector) | $(“#first”).siblings(“li”);  | 查找兄弟节点，不包括自己本身。                    |
| parent()           | $(“#first”).parent();        | 查找父亲                                          |
| eq(index)          | $(“li”).eq(2);               | 相当于$(“li:eq(2)”),index 从 0 开始               |
| next()             | $(“li”).next();              | 找下一个兄弟                                      |
| prev()             | $(“li”).prev();              | 找上一次兄弟                                      |
| eq(index)          | $('div').hasClass('current') | 检查当前元素是否含有某个特定的类，返回 TRUE FALSE |

    重点记住 ： parent() children() find() siblings() eq()

```html
<script>
  // 注意一下都是方法 带括号
  $(function () {
    // 1. 父  parent()  返回的是 最近一级的父级元素 亲爸爸
    console.log($('.son').parent())
    // 2. 子
    // (1) 亲儿子 children()  类似子代选择器  ul>li
    $('.nav').children('p').css('color', 'red')
    // (2) 可以选里面所有的孩子 包括儿子和孙子  find() 类似于后代选择器
    $('.nav').find('p').css('color', 'red')
    // 3. 兄
    $('.nav').siblings('p').css('color', '#bfa')

    // 判断是否有某个类名
    console.log($('div:first').hasClass('current'))
    console.log($('div:last').hasClass('current'))
    console.log($('ol li').eq(2).hasClass('item'))
  })
</script>
```

    jQuery 里面的排他思想
    $(this).css(“color”,”red”);
    $(this).siblings(). css(“color”,””);

#### 链式编程

    主要节约效率，使代码更简洁
    $(this).siblings().parent().css('color', 'blue');
    $(this).css('background','#bfa').siblings('li').css('background', '');

#### 案例

    新浪下拉框案例

```html
<script>
  $(function () {
    $('.nav>li').mouseover(function () {
      // $(this)  jQuery 当前元素
      // show() 显示元素
      $(this).children('ul').show()
    })
    $('.nav>li').mouseout(function () {
      $(this).children('ul').hide()
    })
  })
</script>
```

![新浪下拉框](https://img-blog.csdnimg.cn/2d80006f2a854b8cbb04266cd6544277.gif)

    排他思想案例

```html
<button>快速</button>
<button>快速</button>
<button>快速</button>
<button>快速</button>
<button>快速</button>
<button>快速</button>
<button>快速</button>
<script>
  $(function () {
    // 1. 隐式迭代 给所有的按钮都绑定了点击事件
    $('button').click(function () {
      // 2. 当前的元素变化背景颜色
      $(this).css('background', 'pink')
      // 3. 其余的兄弟去掉背景颜色 隐式迭代
      $(this).siblings('button').css('background', '')
    })
  })
</script>
```

![排他思想案例](https://img-blog.csdnimg.cn/c2cb4dc2d78c41f7b2f6bfb7e005f5e0.gif#pic_center)

    淘宝精品图案例

```html
<script>
  $(function () {
    $('#left li').click(function () {
      var index = $(this).index()
      $('#content div').eq(index).show()
      $('#content div').eq(index).siblings().hide()
      $(this).css('background', '#bfa').siblings('li').css('background', '')
    })
  })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/abb5587a0387483ea61e7a52d929ca63.gif#pic_center)

## jQuery 样式操作

### 样式设置 css 方法

```html
<script>
  /*1.设置一个样式*/
  //两个参数  设置的样式属性,具体样式
  $('li').css('color', 'red')
  //传入对象（设置的样式属性:具体样式）
  $('li').css({ color: 'red' })
  $('div').css('height', '300px') //属性名一定要加引号
  /*2.设置多个样式*/
  $('div').css({
    width: 400,
    height: 400,
    backgroundColor: 'red',
    marginTop: 50
    // 如果是复合属性则必须采取驼峰命名法，如果值不是数字，则需要加引号
  })
</script>
```

### 设置类样式方法

```html
<script>
  /*1.添加一个类*/
  $('li').addClass('now')
  /*2.删除一个类*/
  $('li').removeClass('now')
  /*3.切换一个类  有就删除没有就添加*/
  $('li').toggleClass('now')
  /*4.匹配一个类  判断是否包含某个类  如果包含返回true否知返回false*/
  $('li').hasClass('now')
</script>
```

    案例：tab栏切换

```html
<script>
  $(function () {
    $('.tab_list li').click(function () {
      $(this).addClass('current').siblings().removeClass('current')
      var index = $(this).index()
      console.log(index)
      $('.tab_con .item').eq(index).show().siblings().hide()
    })
  })
</script>
```

![tab栏切换](https://img-blog.csdnimg.cn/5ed981b820b342d39c6902f2869cdca4.gif#pic_center)

#### 类操作于 className 区别

    原生 JS 中 className 会覆盖元素原先里面的类名。
    jQuery 里面类操作只是对指定类进行操作，不影响原先的类名。

```html
<div class="one "></div>
<script>
  // var one = document.querySelector(".one");
  // one.className = "two";
  $('.one').addClass('two') //这个addClass相当于追加类名 不影响以前的类名
  $('.one').removeClass('two')
</script>
```

## jQuery 效果

### 显示隐藏

    语法规范：show([speed,[easing],[fn]])
    显示参数
    （1）参数都可以省略， 无动画直接显示。
    （2）speed：三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
    （3）easing：(Optional) 用来指定切换效果，默认是“swing”，可用参数“linear”。
    （4）fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。
    hide();	toggle(); 用法与之一样

```html
<button>切换</button>
<div></div>
<script>
  $('button')
    .eq(2)
    .click(function () {
      $('div').toggle(1000)
    })
  //重点可记住切换
</script>
```

### 滑动

    slideDown();	slideUp();	slideToggle();

```html
<button>切换滑动</button>
<div></div>
<script>
  $('button')
    .eq(2)
    .click(function () {
      // 滑动切换 slideToggle()
      $('div').slideToggle(500)
    })
</script>
```

#### 事件切换 hover

    hover([over,]out)
    (1)over:鼠标移到元素上要触发的函数（相当于mouseenter）
    (2)out:鼠标移出元素要触发的函数（相当于mouseleave）
    (3)如果只写一个函数，则鼠标经过和离开都会触发它

```html
<script>
  //1. 事件切换 hover 就是鼠标经过和离开的复合写法
  $('.nav>li').hover(
    function () {
      $(this).children('ul').slideDown(200)
    },
    function () {
      $(this).children('ul').slideUp(200)
    }
  )
  //2. 事件切换 hover  如果只写一个函数，那么鼠标经过和鼠标离开都会触发这个函数
  $('.nav>li').hover(function () {
    $(this).children('ul').slideToggle()
  })
</script>
```

#### 动画队列及其停止排队方法

    动画或效果队列
    /*
        jQuery中有个动画队列的机制。
        当我们对一个对象添加多次动画效果时后添加的动作就会被放入这个动画队列中，
        等前面的动画完成后再开始执行。
        可是用户的操作往往都比动画快，
        如果用户对一个对象频繁操作时不处理动画队列就会造成队列堆积，
        影响到效果。
    */

    停止排队：stop();
        (1）stop() 方法用于停止动画或效果。
    	(2) 注意： stop() 写到动画或者效果的前面， 相当于停止结束上一次的动画。

### 淡入淡出

    fadeIn();	fadeOut();	fadeToggle();

```html
<button>淡入淡出切换</button>
<button>修改透明度</button>
<div></div>
<script>
  // 渐进方式调整到指定的不透明度
  fadeTo([[speed], opacity, [easing], [fn]])
  $('button')
    .eq(2)
    .click(function () {
      // 淡入淡出切换 fadeToggle()
      // $("div").fadeToggle(1000);
      $('div').fadeToggle(2000)
    })
  $('button')
    .eq(3)
    .click(function () {
      //  修改透明度 fadeTo() 这个速度和透明度要必须写
      $('div').fadeTo(2000, 0.5)
    })
</script>
```

    案例：高亮显示

```html
<script>
  $(function () {
    $('.wrap li').hover(
      function () {
        $(this).siblings().stop().fadeTo(500, 0.5)
      },
      function () {
        $(this).siblings().stop().fadeTo(500, 1)
      }
    )
  })
</script>
```

![](https://img-blog.csdnimg.cn/0178777314c345ea9c2210c6d2423a3a.gif#pic_center)

### 自定义动画

    语法：animate(params,[speed],[easing],[fn])
    参数：params: 想要更改的样式属性，以对象形式传递，必须写。
    属性名可以不用带引号， 如果是复合属性则需要采取驼峰命名法 borderLeft。其余参数都可以省略

### 案例演示

```html
<script type="text/javascript">
  $(function () {
    $('.king li').click(function () {
      // 1.li 大图片淡入，宽度224px 小图片淡出
      $(this)
        .stop()
        .animate({
          width: 224
        })
        .find('.big')
        .stop()
        .fadeIn(1000)
        .siblings('.small')
        .stop()
        .fadeOut(500)
      // 2.其他 li 大图片淡出，小图片淡入 宽度69px
      $(this)
        .siblings()
        .stop()
        .animate({
          width: 69
        })
        .find('.big')
        .stop()
        .fadeOut(500)
        .siblings('.small')
        .stop()
        .fadeIn(1000)
    })
  })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/97bf685c5a45454e83f9e9ba82cfb4d8.gif#pic_center)

## jQuery 属性操作

### 设置或获取元素

```html
<!-- 
    jQuery 属性操作
        1.设置或获取元素固有的属性值 prop("属性")
            1.获取属性语法
            prop("属性");
            2.设置属性语法
            prop("属性"，"属性值");
        2.设置或获取元素自定义属性值 attr()
            1.获取属性语法
            attr("属性"); 类似于原生 getAttribute()
            2.设置属性语法
            attr("属性"，"属性值"); setAttribute()
        3.数据缓存 data()
            1.附加数据语法
            data("name","value"); 
            2.获取数据语法
            data("name");
 -->
<a href="http://www.itcast.cn" title="都挺好">都挺好</a>
<input type="checkbox" name="" id="" checked />
<div index="1" data-index="2">我是div</div>
<span>123</span>
<script>
  $(function () {
    //1. element.prop("属性名") 获取元素固有的属性值
    $('a').prop('href')
    $('a').prop('title', '我们都挺好')
    $('input').change(function () {
      console.log($(this).prop('checked'))
    })
    // 2. 元素的自定义属性 我们通过 attr()
    console.log($('div').attr('index'))
    console.log($('div').attr('index', 5))
    console.log($('div').attr('data-index'))
    // 3. 数据缓存 data() 这个里面的数据是存放在元素的内存里面
    $('span').data('uname', 'andy')
    console.log($('span').data('uname'))
    // 这个方法获取data-index h5自定义属性 第一个 不用写data-  而且返回的是数字型
    console.log($('div').data('index'))
  })
</script>
```

#### 购物车案例模块-全选分析

```html
<script>
  // 1. 全选 全不选功能模块
  // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
  // 事件可以使用change
  $('.checkall').change(function () {
    // console.log($(this).prop("checked"));
    $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'))
    if ($(this).prop('checked')) {
      // 让所有的商品添加 check-cart-item 类名
      $('.cart-item').addClass('check-cart-item')
    } else {
      // check-cart-item 移除
      $('.cart-item').removeClass('check-cart-item')
    }
  })
  // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
  $('.j-checkbox').change(function () {
    // if(被选中的小的复选框的个数 === 3) {
    //     就要选中全选按钮
    // } else {
    //     不要选中全选按钮
    // }
    // console.log($(".j-checkbox:checked").length);
    // $(".j-checkbox").length 这个是所有的小复选框的个数
    if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
      $('.checkall').prop('checked', true)
    } else {
      $('.checkall').prop('checked', false)
    }
    if ($(this).prop('checked')) {
      // 让当前的商品添加 check-cart-item 类名
      $(this).parents('.cart-item').addClass('check-cart-item')
    } else {
      // check-cart-item 移除
      $(this).parents('.cart-item').removeClass('check-cart-item')
    }
  })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/e7628e596cdf42468ece703ce89ae5a2.gif#pic_center)

## jQuery 文本属性值

```html
<div>
  <span>我是内容</span>
</div>
<input type="text" value="请输入内容" />
<script>
  // 1. 获取设置元素内容 html() 相当于原生inner HTML
  console.log($('div').html())
  // $("div").html("123");

  // 2. 获取设置元素文本内容 text() 相当与原生 innerText
  console.log($('div').text())
  $('div').text('123')

  // 3. 获取设置表单值 val() 相当于原生value
  console.log($('input').val())
  $('input').val('123')
</script>
```

## jQuery 元素操作

### 遍历数组

```html
<!--
	语法一：$("div").each(function (index, domEle) { xxx; })
	1. each() 方法遍历匹配的每一个元素。主要用DOM处理。 each 每一个
	2. 里面的回调函数有2个参数： index 是每个元素的索引号; demEle 是每个DOM元素对象，不是jquery对象
	3. 所以要想使用jquery方法，需要给这个dom元素转换为jquery对象 $(domEle)
-->
<script>
  // 1. each() 方法遍历元素
  var arr = ['red', 'green', 'blue']
  $('div').each(function (i, domEle) {
    // 回调函数第一个参数一定是索引号  可以自己指定索引号号名称
    // console.log(index);
    // console.log(i);
    // 回调函数第二个参数一定是 dom元素对象 也是自己命名
    // console.log(domEle);
    // domEle.css("color"); dom对象没有css方法
    $(domEle).css('color', arr[i])
    sum += parseInt($(domEle).text())
  })
  console.log(sum)
</script>
<!--
	语法二：$.each(object，function (index, element) { xxx; })
	1. $.each()方法可用于遍历任何对象。主要用于数据处理，比如数组，对象
	2. 里面的函数有2个参数： index 是每个元素的索引号; element 遍历内容
-->
<script>
  // 2. $.each() 方法遍历元素 主要用于遍历数据，处理数据
  $.each(
    {
      name: '陈某人',
      sex: '女',
      age: 16
    },
    function (i, ele) {
      console.log(i + '：' + ele)
    }
  )
</script>
```

### 创建添加删除元素

```html
<ul>
  <li>原先的li</li>
</ul>
<div class="test">我是原先的div</div>
<script>
  $(function () {
    // 1. 创建元素
    var li = $('<li>我是后来创建的li</li>')

    // 2. 添加元素
    // (1) 内部添加
    // $("ul").append(li);  内部添加并且放到内容的最后面
    $('ul').prepend(li) // 内部添加并且放到内容的最前面
    // (2) 外部添加
    var div = $('<div>我是后妈生的</div>')
    var div1 = $('<div>我是石头里蹦出来的</div>')
    $('.test').after(div1)
    $('.test').before(div)

    // 3. 删除元素
    // $("ul").remove(); 可以删除匹配的元素 自杀
    // $("ul").empty(); // 可以删除匹配的元素里面的子节点 孩子
    $('ul').html('') // 可以删除匹配的元素里面的子节点 孩子
  })
</script>
```

## jQuery 尺寸、位置操作

### jQuery 尺寸

| 语法                                 | 用法                                                  |
| ------------------------------------ | :---------------------------------------------------- |
| width()/height()                     | 取得匹配元素宽高喝高度值 只算 width / height          |
| innerWidth() / innerHeight()         | 取得匹配元素宽高和高度值 包含 padding                 |
| outerWidth() / outerHeight           | 取得匹配元素宽高和高度值 包含 padding、border         |
| outerWidth(true) / outerHeight(true) | 取得匹配元素宽高和高度值 包含 padding、border、margin |

    以上参数为空，则是获取相应值，返回的是数字型。
    如果参数为数字，则是修改相应值。
    参数可以不必写单位。

### jQuery 位置

    位置主要有三个： offset()、position()、scrollTop()/scrollLeft()

#### offset() 设置或获取元素偏移

```html
<script>
  // offset() 方法设置或返回被选元素相对于文档的偏移坐标，跟父级没有关系。
  // 该方法有2个属性 left、top 。offset().top 用于获取距离文档顶部的距离，offset().left 用于获取距离文档左侧的距离。
  // 1. 获取设置距离文档的位置（偏移） offset
  $('.son').offset({
    top: 200,
    left: 200
  })
  // console.log($(".son").offset());
  // console.log($(".son").offset().top);
</script>
```

#### position() 获取元素偏移

```html
<script>
  		// position() 方法用于返回被选元素相对于带有定位的父级偏移坐标，如果父级都没有定位，则以文档为准。
  		// 该方法有2个属性 left、top。position().top 用于获取距离定位父级顶部的距离，position().left 用于获取距离定位父级
  左侧的距离。
  		// 该方法只能获取
  		console.log($(".son").position().top);
              // $(".son").position({
              //     top: 200,
              //     left: 200
              // });
</script>
```

#### scrollTop()/scrollLeft() 设置或获取元素被卷去的头部和左侧

```html
<script>
  // scrollTop() 方法设置或返回被选元素被卷去的头部。
  // 不跟参数是获取，参数为不带单位的数字则是设置被卷去的头部
  $(function () {
    $(document).scrollTop(100)
    // 被卷去的头部 scrollTop() / 被卷去的左侧 scrollLeft()
    // 页面滚动事件
    var boxTop = $('.container').offset().top
    $(window).scroll(function () {
      console.log($(document).scrollTop())
      if ($(document).scrollTop() >= boxTop) {
        $('.back').fadeIn()
      } else {
        $('.back').fadeOut()
      }
    })
    $('.back').click(function () {
      $('html,body').animate({
        scrollTop: 0
      })
    })
  })
</script>
```

    案例见VScode jQuery day2

# jQuery 事件机制

> JavaScript 中已经学习过了事件，但是 jQuery 对 JavaScript 事件进行了封装，增加并扩展了事件处理机制。jQuery 不仅提供了更加优雅的事件处理语法，而且极大的增强了事件的处理能力。

## jQuery 事件发展历程

    简单事件绑定>>bind事件绑定>>delegate事件绑定>>on事件绑定(推荐)

## jQuery 事件注册

> 简单事件注册

```html
click(handler) //单击事件 mouseenter(handler) //鼠标进入事件 mouseleave(handler)
//鼠标离开事件
```

    缺点：不能同时注册多个事件

```html
<script>
  1. 单个事件注册
        $("div").click(function() {
            $(this).css("background", "purple");
        });
        $("div").mouseenter(function() {
            $(this).css("background", "skyblue");
        });
        其他事件和原生基本一致
        比如 mouseover、mouseout、blur、focus、change、keydown、keyup、resize、scroll 等
</script>
```

## jQuery 事件处理

### 事件处理 on() 绑定事件

    语法： 事件处理 on() 绑定事件
    element.on(events,[selector],fn)
    1. events:一个或多个用空格分隔的事件类型，如"click"或"keydown" 。
    2. selector: 元素的子元素选择器 。
    3. fn:回调函数 即绑定在元素身上的侦听函数。

```html
<script>
  // (1) on可以绑定1个或者多个事件处理程序
            // $("div").on({
            //     mouseenter: function() {
            //         $(this).css("background", "skyblue");
            //     },
            //     click: function() {
            //         $(this).css("background", "purple");
            //     },
            //     mouseleave: function() {
            //         $(this).css("background", "blue");
            //     }
            // });
            // $("div").on("mouseenter mouseleave", function() {
            //     $(this).toggleClass("current");
            // });
            // (2) on可以实现事件委托（委派）
            // $("ul li").click();
            $('.div').on('click', '.div1', function () {
                $(this).css('background', 'red');
                // alert(11);
            })
            // $("ul").on("click", "li", function() {
            //     alert(11);
            // });
            // click 是绑定在ul 身上的，但是 触发的对象是 ul 里面的小li
            // (3) on可以给未来动态创建的元素绑定事件
            // $("ol li").click(function() {
            //     alert(11);
            // })
            $("ol").on("click", "li", function () {
                alert(11);
            })
            var li = $("<li>我是后来创建的</li>");
            var li2 = $('<li>我是456</li>');
            $("ol").append(li);
            $('ol').prepend(li2);
            // $('ol').remove();
            // $('ol').html('');
        });
</script>
```

### 事件处理 off() 解绑事件

    $("p").off() // 解绑p元素所有事件处理程序
    $("p").off( "click") // 解绑p元素上面的点击事件 后面的 foo 是侦听函数名
    $("ul").off("click", "li"); // 解绑事件委托

```html
<script>
  1. 事件解绑 off
            $("div").off();  // 这个是解除了div身上的所有事件
            $("div").off("click"); // 这个是解除了div身上的点击事件
            $("ul").off("click", "li");
            // 2. one() 但是它只能触发事件一次
            $("p").one("click", function() {
                alert(11);
            })
</script>
```

### 自动触发事件 trigger()

    自动触发事件
        1.$('.div').click();
        2.$('.div').trigger('click');
        3.$('.div').triggleHander('click');

### 微博自动发布案例

```html
<script>
  $(function () {
    // 1.按钮点击添加
    $('.btn').on('click', function () {
      var li = $('<li></li>')
      li.html($('.txt').val() + "<a href='javascript:;'>删除</a>")
      $('ul').prepend(li)
      li.slideDown()
      $('.txt').val('')
    })
    // 2.点击删除按钮，删除留言
    $('ul').on('click', 'a', function () {
      $(this)
        .parent()
        .slideUp(function () {
          $(this).remove()
        })
    })
  })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/73f13253c19e4fc49a7cf4772216982f.gif#pic_center)

## jQuery 事件对象

    jQuery事件对象其实就是js事件对象的一个封装，处理了兼容性。
    element.on(events,[selector],function(event) {})
    阻止默认行为：event.preventDefault() 或者 return false
    阻止冒泡： event.stopPropagation()

```html
//screenX和screenY 对应屏幕最左上角的值 //clientX和clientY
距离页面左上角的位置（忽视滚动条） //pageX和pageY
距离页面最顶部的左上角的位置（会计算滚动条的距离） //event.keyCode
按下的键盘代码 //event.data 存储绑定事件时传递的附加数据
//event.stopPropagation() 阻止事件冒泡行为 //event.preventDefault()
阻止浏览器默认行为 //return false:既能阻止事件冒泡，又能阻止浏览器默认行为。
```

# jQuery 其他方法

## jQuery 拷贝对象

    语法：$.extend([deep], target, object1, [objectN])

```html
<script>
  1. deep: 如果设为true 为深拷贝， 默认为false 浅拷贝
  2. target: 要拷贝的目标对象
  3. object1:待拷贝到第一个对象的对象。
  4. objectN:待拷贝到第N个对象的对象。
  5. 浅拷贝是把被拷贝的对象复杂数据类型中的地址拷贝给目标对象，修改目标对象会影响被拷贝对象。
  6. 深拷贝，前面加true， 完全克隆(拷贝的对象,而不是地址)，修改目标对象不会影响被拷贝对象。
  	1. 浅拷贝把原来对象里面的复杂数据类型地址拷贝给目标对象
            targetObj.msg.age = 20;
            console.log(targetObj);
            console.log(obj);
            2. 深拷贝把里面的数据完全复制一份给目标对象 如果里面有不冲突的属性,会合并到一起
            $.extend(true, targetObj, obj);
            console.log(targetObj); // 会覆盖targetObj 里面原来的数据
            targetObj.msg.age = 20;
            console.log(targetObj); // msg :{sex: "男", age: 20}
            console.log(obj);
</script>
```

## 多库共存

> jQuery 解决方案：
>
> 1. 把里面的 $ 符号 统一改为 jQuery。 比如 jQuery(''div'')
> 2. jQuery 变量规定新的名称：$.noConflict() var xx = $.noConflict();

    	// 1. 如果$ 符号冲突 我们就使用 jQuery
            jQuery.each();
        // 2. 让jquery 释放对$ 控制权 让用自己决定
            // noConflict()  noConflict()
            var suibian = jQuery.noConflict();
            console.log(suibian("span"));
            suibian.each();

## jQuery 插件

    jQuery 插件常用的网站：
    	1. jQuery 插件库 http://www.jq22.com/
    	2. jQuery 之家 http://www.htmleaf.com/

## 综合案例

    案例：toDoList
    ① 文本框里面输入内容，按下回车，就可以生成待办事项。
    ② 点击待办事项复选框，就可以把当前数据添加到已完成事项里面。
    ③ 点击已完成事项复选框，就可以把当前数据添加到待办事项里面。
    ④ 但是本页面内容刷新页面不会丢失。

    案例：toDoList 分析
    ① 刷新页面不会丢失数据，因此需要用到本地存储 localStorage
    ② 核心思路： 不管按下回车，还是点击复选框，都是把本地存储的数据加载到页面中，这样保证刷新关闭页面不	会丢失数据
    ③ 存储的数据格式：var todolist = [{ title : ‘xxx’, done: false}]
    ④ 注意点1： 本地存储 localStorage 里面只能存储字符串格式 ，因此需要把对象转换为字符串 JSON.stringify(data)。
    ⑤ 注意点2： 获取本地存储数据，需要把里面的字符串转换为对象格式JSON.parse() 我们才能使用里面的数据。

    案例：toDoList 按下回车把新数据添加到本地存储里面
    ① 切记： 页面中的数据，都要从本地存储里面获取，这样刷新页面不会丢失数据，所以先要把数据保存到本地存储里面。
    ② 利用事件对象.keyCode判断用户按下回车键（13）。
    ③ 声明一个数组，保存数据。
    ④ 先要读取本地存储原来的数据（声明函数 getData()），放到这个数组里面。
    ⑤ 之后把最新从表单获取过来的数据，追加到数组里面。
    ⑥ 最后把数组存储给本地存储 (声明函数 savaDate())

    案例：toDoList 本地存储数据渲染加载到页面
    ① 因为后面也会经常渲染加载操作，所以声明一个函数 load，方便后面调用
    ② 先要读取本地存储数据。（数据不要忘记转换为对象格式）
    ③ 之后遍历这个数据（$.each()），有几条数据，就生成几个小li 添加到 ol 里面。
    ④ 每次渲染之前，先把原先里面 ol 的内容清空，然后渲染加载最新的数据。

    案例：toDoList 删除操作
    ① 点击里面的a链接，不是删除的li，而是删除本地存储对应的数据。
    ② 核心原理：先获取本地存储数据，删除对应的数据，保存给本地存储，重新渲染列表li
    ③ 我们可以给链接自定义属性记录当前的索引号
    ④ 根据这个索引号删除相关的数据----数组的splice(i, 1)方法
    ⑤ 存储修改后的数据，然后存储给本地存储
    ⑥ 重新渲染加载数据列表
    ⑦ 因为a是动态创建的，我们使用on方法绑定事件

    案例：toDoList 正在进行和已完成选项操作
    ① 当我们点击了小的复选框，修改本地存储数据，再重新渲染数据列表。
    ② 点击之后，获取本地存储数据。
    ③ 修改对应数据属性 done 为当前复选框的checked状态。
    ④ 之后保存数据到本地存储
    ⑤ 重新渲染加载数据列表
    ⑥ load 加载函数里面，新增一个条件,如果当前数据的done为true 就是已经完成的，就把列表渲染加载到 ul 里面
    ⑦ 如果当前数据的done 为false， 则是待办事项，就把列表渲染加载到 ol 里面

    案例：toDoList 统计正在进行个数和已经完成个数
    ① 在我们load 函数里面操作
    ② 声明2个变量 ：todoCount 待办个数 doneCount 已完成个数
    ③ 当进行遍历本地存储数据的时候， 如果 数据done为 false， 则 todoCount++, 否则 doneCount++
    ④ 最后修改相应的元素 text()

```html
<body>
  <header>
    <section>
      <label for="title">ToDoList</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="添加ToDo"
        required="required"
        autocomplete="off"
      />
    </section>
  </header>
  <section>
    <h2>正在进行 <span id="todocount"></span></h2>
    <ol id="todolist" class="demo-box"></ol>
    <h2>已经完成 <span id="donecount"></span></h2>
    <ul id="donelist"></ul>
  </section>
  <footer>Copyright &copy; 2014 todolist.cn</footer>
</body>
```

```html
<script>
  $(function () {
    // 1. 按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式  var todolist = [{title: "xxx", done: false}]
    load()
    $('#title').on('keydown', function (event) {
      if (event.keyCode === 13) {
        if ($(this).val() === '') {
          alert('请输入您要的操作')
        } else {
          // 先读取本地存储原来的数据
          var local = getDate()
          // console.log(local);
          // 把local数组进行更新数据 把最新的数据追加给local数组
          local.push({ title: $(this).val(), done: false })
          // 把这个数组local 存储给本地存储
          saveDate(local)
          // 2. toDoList 本地存储数据渲染加载到页面
          load()
          $(this).val('')
        }
      }
    })
    // 3. toDoList 删除操作
    $('ol, ul').on('click', 'a', function () {
      // alert(11);
      // 先获取本地存储
      var data = getDate()
      console.log(data)
      // 修改数据
      var index = $(this).attr('id')
      console.log(index)
      data.splice(index, 1)
      // 保存到本地存储
      saveDate(data)
      // 重新渲染页面
      load()
    })
    // 4. toDoList 正在进行和已完成选项操作
    $('ol, ul').on('click', 'input', function () {
      // alert(11);
      // 先获取本地存储的数据
      var data = getDate()
      // 修改数据
      var index = $(this).siblings('a').attr('id')
      console.log(index)
      // data[?].done = ?
      data[index].done = $(this).prop('checked')
      console.log(data)
      // 保存到本地存储
      saveDate(data)
      // 重新渲染页面
      load()
    })
    // 读取本地存储的数据
    function getDate() {
      var data = localStorage.getItem('todolist')
      if (data !== null) {
        // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
        return JSON.parse(data)
      } else {
        return []
      }
    }
    // 保存本地存储数据
    function saveDate(data) {
      localStorage.setItem('todolist', JSON.stringify(data))
    }
    // 渲染加载数据
    function load() {
      // 读取本地存储的数据
      var data = getDate()
      console.log(data)
      // 遍历之前先要清空ol里面的元素内容
      $('ol, ul').empty()
      var todoCount = 0 // 正在进行的个数
      var doneCount = 0 // 已经完成的个数
      // 遍历这个数据
      $.each(data, function (i, n) {
        // console.log(n);
        if (n.done) {
          $('ul').prepend(
            "<li><input type='checkbox' checked='checked' > <p>" +
              n.title +
              "</p> <a href='javascript:;' id=" +
              i +
              ' ></a></li>'
          )
          doneCount++
        } else {
          $('ol').prepend(
            "<li><input type='checkbox' > <p>" +
              n.title +
              "</p> <a href='javascript:;' id=" +
              i +
              ' ></a></li>'
          )
          todoCount++
        }
      })
      $('#todocount').text(todoCount)
      $('#donecount').text(doneCount)
    }
  })
</script>
```
