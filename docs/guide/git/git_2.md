---
title: git与vim常见命令
date: 2022-01-10
author: 努力学习的汪 - MC猴
categories:
  - 网络请求
tags:
  - git/vim
---

::: tip
git 语法，整合自[努力学习的汪](https://gitee.com/hongjilin/hongs-study-notes),侵权删
掘金 [十分详细的 git 指令](https://juejin.im/post/5deb81b0e51d4557fd76f5f3)
:::

<!-- more -->

## #说明

## 常用 Git 命令总结

```shell
 git config --global user.name "你的名字" 让你全部的Git仓库绑定你的名字
 git config --global user.email "你的邮箱" 让你全部的Git仓库绑定你的邮箱
 git init 初始化你的仓库
 git add . 把工作区的文件全部提交到暂存区
 git add ./<file>/ 把工作区的<file>文件提交到暂存区
 git commit -m "xxx" 把暂存区的所有文件提交到仓库区，暂存区空空荡荡
 git remote add origin https://github.com/name/name_cangku.git 把本地仓库与远程仓库连接起来
 git push -u origin master 把仓库区的主分支master提交到远程仓库里
 git push -u origin <其他分支> 把其他分支提交到远程仓库
 git status查看当前仓库的状态
 git diff 查看文件修改的具体内容
 git log 显示从最近到最远的提交历史  git log --pretty=oneline(更简洁的方式显示)
 git clone + 仓库地址下载克隆文件
 git reset --hard + 版本号 回溯版本，版本号在commit的时候与master跟随在一起
 git reflog 显示命令历史
 git checkout -- <file> 撤销命令，用版本库里的文件替换掉工作区的文件。我觉得就像是Git世界的ctrl + z
 git rm 删除版本库的文件
 git branch 查看当前所有分支
 git branch <分支名字> 创建分支
 git checkout <分支名字> 切换到分支
 git merge <分支名字> 合并分支
 git branch -d <分支名字> 删除分支,有可能会删除失败，因为Git会保护没有被合并的分支
 git branch -D + <分支名字> 强行删除，丢弃没被合并的分支
 git log --graph 查看分支合并图
 git merge --no-ff <分支名字> 合并分支的时候禁用Fast forward模式,因为这个模式会丢失分支历史信息
 git stash 当有其他任务插进来时，把当前工作现场“存储”起来,以后恢复后继续工作
 git stash list 查看你刚刚“存放”起来的工作去哪里了
 git stash apply 恢复却不删除stash内容
 git stash drop 删除stash内容
 git stash pop 恢复的同时把stash内容也删了
 git remote 查看远程库的信息，会显示origin，远程仓库默认名称为origin
 git remote -v 显示更详细的信息
 git pull 把最新的提交从远程仓库中抓取下来，在本地合并,和git push相反
 git rebase 把分叉的提交历史“整理”成一条直线，看上去更直观
 git tag 查看所有标签，可以知道历史版本的tag
 git tag <name> 打标签，默认为HEAD。比如git tag v1.0
 git tag <tagName> <版本号> 把版本号打上标签，版本号就是commit时，跟在旁边的一串字母数字
 git show <tagName> 查看标签信息
 git tag -a <tagName> -m "<说明>" 创建带说明的标签。-a指定标签名，-m指定说明文字
 git tag -d <tagName> 删除标签
 git push origin <tagname> 推送某个标签到远程
 git push origin --tags 一次性推送全部尚未推送到远程的本地标签
 git push origin :refs/tags/<tagname> 删除远程标签<tagname>
 git config --global color.ui true 让Git显示颜色，会让命令输出看起来更醒目
 git add -f <file> 强制提交已忽略的的文件
 git check-ignore -v `<file>` 检查为什么Git会忽略该文件
```

## vim 常用指令

### VIM 进入和退出命令

> 常用命令是 ESC，然后:wq（保存并退出），:q!(不保存并强制退出），i 进入 vim 模式。另外还有其它的，我可能都不会用到。。。
> 按 ESC 键 跳到命令模式，然后：

```shell
1. **:w 保存文件但不退出 vi**
2. **:w file 将修改另外保存到 file 中，不退出 vi**
3. **:w! 强制保存，不推出 vi**
4. **:wq 保存文件并退出 vi**
5. **:wq! 强制保存文件，并退出 vi**
6. **q: 不保存文件，退出 vi**
7. **:q! 不保存文件，强制退出 vi**
8. **:e! 放弃所有修改，从上次保存文件开始再编辑**
```

### 命令历史

以:和/开头的命令都有历史纪录，可以首先键入:或/然后按上下箭头来选择某个历史命令。

### 启动 vim

在命令行窗口中输入以下命令即可

vim 直接启动 vim

vim filename 打开 vim 并创建名为 filename 的文件

### 文件命令

打开单个文件

vim file

同时打开多个文件

vim file1 file2 file3 ...

在 vim 窗口中打开一个新文件

:open file

在新窗口中打开文件

:split file

切换到下一个文件

:bn

切换到上一个文件

:bp

查看当前打开的文件列表，当前正在编辑的文件会用[]括起来。

:args

打开远程文件，比如 ftp 或者 share folder

:e ftp://192.168.10.76/abc.txt

:e \\qadrive\test\1.txt

### vim 的模式

正常模式（按 Esc 或 Ctrl+[进入） 左下角显示文件名或为空
插入模式（按 i 键进入） 左下角显示--INSERT--
可视模式（不知道如何进入） 左下角显示--VISUAL--

### 导航命令

% 括号匹配

### 插入命令

i 在当前位置生前插入

I 在当前行首插入

a 在当前位置后插入

A 在当前行尾插入

o 在当前行之后插入一行

O 在当前行之前插入一行

### 查找命令

/text 　　查找 text，按 n 健查找下一个，按 N 健查找前一个。

?text 　　查找 text，反向查找，按 n 健查找下一个，按 N 健查找前一个。

vim 中有一些特殊字符在查找时需要转义　　.\*[]^%/?~$

:set ignorecase 　　忽略大小写的查找

:set noignorecase 　　不忽略大小写的查找

查找很长的词，如果一个词很长，键入麻烦，可以将光标移动到该词上，按\*或#键即可以该单词进行搜索，相当于/搜索。而#命令相当于?搜索。

:set hlsearch 　　高亮搜索结果，所有结果都高亮显示，而不是只显示一个匹配。

:set nohlsearch 　　关闭高亮搜索显示

:nohlsearch 　　关闭当前的高亮显示，如果再次搜索或者按下 n 或 N 键，则会再次高亮。

:set incsearch 　　逐步搜索模式，对当前键入的字符进行搜索而不必等待键入完成。

:set wrapscan 　　重新搜索，在搜索到文件头或尾时，返回继续搜索，默认开启。

### 替换命令

ra 将当前字符替换为 a，当期字符即光标所在字符。

s/old/new/ 用 old 替换 new，替换当前行的第一个匹配

s/old/new/g 用 old 替换 new，替换当前行的所有匹配

%s/old/new/ 用 old 替换 new，替换所有行的第一个匹配

%s/old/new/g 用 old 替换 new，替换整个文件的所有匹配

:10,20 s/^/ /g 在第 10 行知第 20 行每行前面加四个空格，用于缩进。

ddp 交换光标所在行和其下紧邻的一行。

### 移动命令

h 左移一个字符
l 右移一个字符，这个命令很少用，一般用 w 代替。
k 上移一个字符
j 下移一个字符
以上四个命令可以配合数字使用，比如 20j 就是向下移动 20 行，5h 就是向左移动 5 个字符，在 Vim 中，很多命令都可以配合数字使用，比如删除 10 个字符 10x，在当前位置后插入 3 个！，3a！`<Esc>`，这里的 Esc 是必须的，否则命令不生效。

w 向前移动一个单词（光标停在单词首部），如果已到行尾，则转至下一行行首。此命令快，可以代替 l 命令。

b 向后移动一个单词 2b 向后移动 2 个单词

e，同 w，只不过是光标停在单词尾部

ge，同 b，光标停在单词尾部。

^ 移动到本行第一个非空白字符上。

0（数字 0）移动到本行第一个字符上，

`<HOME>` 移动到本行第一个字符。同 0 健。

$ 移动到行尾 3$ 移动到下面 3 行的行尾

gg 移动到文件头。 = [[

G（shift + g） 移动到文件尾。 = ]]

f（find）命令也可以用于移动，fx 将找到光标后第一个为 x 的字符，3fd 将找到第三个为 d 的字符。

F 同 f，反向查找。

跳到指定行，冒号+行号，回车，比如跳到 240 行就是 :240 回车。另一个方法是行号+G，比如 230G 跳到 230 行。

Ctrl + e 向下滚动一行

Ctrl + y 向上滚动一行

Ctrl + d 向下滚动半屏

Ctrl + u 向上滚动半屏

Ctrl + f 向下滚动一屏

Ctrl + b 向上滚动一屏

### 撤销和重做

u 撤销（Undo）
U 撤销对整行的操作
Ctrl + r 重做（Redo），即撤销的撤销。

### 删除命令

x 删除当前字符

3x 删除当前光标开始向后三个字符

X 删除当前字符的前一个字符。X=dh

dl 删除当前字符， dl=x

dh 删除前一个字符

dd 删除当前行

dj 删除上一行

dk 删除下一行

10d 删除当前行开始的 10 行。

D 删除当前字符至行尾。D=d$

d$ 删除当前字符之后的所有字符（本行）

kdgg 删除当前行之前所有行（不包括当前行）

jdG（jd shift + g） 删除当前行之后所有行（不包括当前行）

:1,10d 删除 1-10 行

:11,$d 删除 11 行及以后所有的行

:1,$d 删除所有行

J(shift + j)　　删除两行之间的空行，实际上是合并两行。

### 拷贝和粘贴

yy 拷贝当前行

nyy 拷贝当前后开始的 n 行，比如 2yy 拷贝当前行及其下一行。

p 在当前光标后粘贴,如果之前使用了 yy 命令来复制一行，那么就在当前行的下一行粘贴。

shift+p 在当前行前粘贴

:1,10 co 20 将 1-10 行插入到第 20 行之后。

:1,$ co $ 将整个文件复制一份并添加到文件尾部。

正常模式下按 v（逐字）或 V（逐行）进入可视模式，然后用 jklh 命令移动即可选择某些行或字符，再按 y 即可复制

ddp 交换当前行和其下一行

xp 交换当前字符和其后一个字符

### 剪切命令

正常模式下按 v（逐字）或 V（逐行）进入可视模式，然后用 jklh 命令移动即可选择某些行或字符，再按 d 即可剪切

ndd 剪切当前行之后的 n 行。利用 p 命令可以对剪切的内容进行粘贴

:1,10d 将 1-10 行剪切。利用 p 命令可将剪切后的内容进行粘贴。

:1, 10 m 20 将第 1-10 行移动到第 20 行之后。

### 退出命令

:wq 保存并退出

ZZ 保存并退出

:q! 强制退出并忽略所有更改

:e! 放弃所有修改，并打开原来文件。

### 窗口命令

:split 或 new 打开一个新窗口，光标停在顶层的窗口上

:split file 或:new file 用新窗口打开文件

split 打开的窗口都是横向的，使用 vsplit 可以纵向打开窗口。

Ctrl+ww 移动到下一个窗口

Ctrl+wj 移动到下方的窗口

Ctrl+wk 移动到上方的窗口

关闭窗口

:close 最后一个窗口不能使用此命令，可以防止意外退出 vim。

:q 如果是最后一个被关闭的窗口，那么将退出 vim。

ZZ 保存并退出。

关闭所有窗口，只保留当前窗口

:only

录制宏

按 q 键加任意字母开始录制，再按 q 键结束录制（这意味着 vim 中的宏不可嵌套），使用的时候@加宏名，比如 qa。。。q 录制名为 a 的宏，@a 使用这个宏。

### 执行 shell 命令

:!command

:!ls 列出当前目录下文件

:!perl -c script.pl 检查 perl 脚本语法，可以不用退出 vim，非常方便。

:!perl script.pl 执行 perl 脚本，可以不用退出 vim，非常方便。

:suspend 或 Ctrl - Z 挂起 vim，回到 shell，按 fg 可以返回 vim。

### 注释命令

perl 程序中#开始的行为注释，所以要注释某些行，只需在行首加入#

3,5 s/^/#/g 注释第 3-5 行

3,5 s/^#//g 解除 3-5 行的注释

1,$ s/^/#/g 注释整个文档。

:%s/^/#/g 注释整个文档，此法更快。

### 帮助命令

:help or F1 显示整个帮助
:help xxx 显示 xxx 的帮助，比如 :help i, :help CTRL-[（即 Ctrl+[的帮助）。
:help 'number' Vim 选项的帮助用单引号括起
:help <Esc> 特殊键的帮助用<>扩起
:help -t Vim 启动参数的帮助用-
：help i_<Esc> 插入模式下 Esc 的帮助，某个模式下的帮助用模式_主题的模式
帮助文件中位于||之间的内容是超链接，可以用 Ctrl+]进入链接，Ctrl+o（Ctrl + t）返回

### 其他非编辑命令

. 重复前一次命令

:set ruler?　　查看是否设置了 ruler，在.vimrc 中，使用 set 命令设制的选项都可以通过这个命令查看

:scriptnames 　　查看 vim 脚本文件的位置，比如.vimrc 文件，语法文件及 plugin 等。

:set list 显示非打印字符，如 tab，空格，行尾等。如果 tab 无法显示，请确定用 set lcs=tab:>-命令设置了.vimrc 文件，并确保你的文件中的确有 tab，如果开启了 expendtab，那么 tab 将被扩展为空格。

Vim 教程
在 Unix 系统上
$ vimtutor
在 Windows 系统上
:help tutor

:syntax 列出已经定义的语法项
:syntax clear 清除已定义的语法规则
:syntax case match 大小写敏感，int 和 Int 将视为不同的语法元素
:syntax case ignore 大小写无关，int 和 Int 将视为相同的语法元素，并使用同样的配色方案
