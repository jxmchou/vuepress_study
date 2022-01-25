---
title: Yarn 安装与使用教程
date: 2022-01-25
categories:
  - 网络请求
tags:
  - yarn
---

# Yarn 安装与使用教程

## 一、官网指引
[快速入门 | Yarn 中文文档](https://yarn.bootcss.com/docs/getting-started)

[npm 中文文档 | npm 中文网 (npmshell.cn)](https://www.npmshell.cn/)

## 二、安装

稳定版: **[v1.22.17](https://github.com/yarnpkg/yarn/blob/master/CHANGELOG.md)**

支持的 Node 版本: **^4.8.0 || ^5.7.0 || ^6.2.2 || >=8.0.0**

**windows 安装**： [官网安装介绍](https://yarn.bootcss.com/docs/usage)

```shell
npm install --global yarn
```

Yarn 淘宝源安装，分别复制粘贴以下代码行到黑窗口运行即可

- `yarn config set registry https://registry.npm.taobao.org/ -g`

- `yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass/ -g`

通过如下命令**测试 Yarn** 是否安装成功：

```shell
yarn --version
```

## 三、常用命令

**【1】初始化新项目**

```shell
yarn init
```

**【2】添加依赖包**

```shell
yarn add [package] // 会自动安装最新版本，会覆盖指定版本号
yarn add [package] [package] [package] // 一次性添加多个包
yarn add [package]@[version] // 添加指定版本的包
yarn add [package]@[tag] // 安装某个tag（比如beta,next或者latest）
```

**【3】将依赖项添加到不同依赖项类别**

不指定依赖类型默认安装到`dependencies`里，分别添加到 `devDependencies`、`peerDependencies` 和 `optionalDependencies` 类别中：

```shell
yarn add [package] --dev 或 yarn add [package] -D // 加到 devDependencies
yarn add [package] --peer 或 yarn add [package] -P // 加到 peerDependencies
yarn add [package] --optional 或 yarn add [package] -O // 加到 optionalDependencies
```

**【4】升级依赖包**

```shell
yarn upgrade [package] // 升级到最新版本
yarn upgrade [package]@[version] // 升级到指定版本
yarn upgrade [package]@[tag] // 升级到指定tag
```

**【5】移除依赖包**

```shell
yarn remove [package] // 移除包
```

**【6】安装package.shellon里的包依赖，并将包及它的所有依赖项保存进yarn.lock**

```shell
yarn 或 yarn install // 安装所有依赖
yarn install --flat // 安装一个包的单一版本
yarn install --force // 强制重新下载所有包
yarn install --production // 只安装生产环境依赖
```

**【7】发布包**

```shell
yarn publish
```

**【8】运行脚本**

```shell
yarn run // 用来执行在 package.shellon 中 scripts 属性下定义的脚本
```

**【9】显示某个包的信息**

```shell
yarn info [package] // 可以用来查看某个模块的最新版本信息
```

**【10】缓存**

```shell
yarn cache
yarn cache list // 列出已缓存的每个包
yarn cache dir // 返回全局缓存位置
yarn cache clean // 清除缓存
```

## 四、yarn 和 npm 命令对比

| 说明                            |           Yarn            |           NPM/CNPM           |
| :------------------------------ | :-----------------------: | :--------------------------: |
| 初始化某个项目                  |         yarn init         |           npm init           |
| 默认安装依赖包                  |     yarn install/link     |       npm install/link       |
| 安装某个依赖并默认保存到package |       yarn add taco       |   npm install taco --save    |
| 移除某个依赖                    |     yarn remove taco      |  npm uninstall taco --save   |
| 安装某个开发时的依赖            |    yarn add taco -dev     | npm install taco --save -dev |
| 更新某个依赖项目                |     yarn upgrade taco     |    npm update taco --save    |
| 安装某个全局依赖项目            |   yarn global add taco    |  npm install taco --global   |
| 发布/登录/退出，一系列NPM 操作  | yarn publish/login/logout |   npm publish/login/logout   |
| 运行某个命令                    |       yarn run/test       |         npm run/test         |

## 五、补充

```shell
npm install moduleName # 安装模块到项目目录下

npm install -g moduleName # -g 的意思是将模块安装到全局，具体安装到磁盘哪个位置，要看 npm config prefix 的位置。

npm install -save moduleName # -save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。

npm install -save-dev moduleName # -save-dev 的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。
```

**npm install moduleName 命令**

1. 安装模块到项目node_modules目录下。
2. 不会将模块依赖写入devDependencies或dependencies 节点。
3. 运行 npm install 初始化项目时不会下载模块。

**npm install -g moduleName 命令**

1. 安装模块到全局，不会在项目node_modules目录中保存模块包。
2. 不会将模块依赖写入devDependencies或dependencies 节点。
3. 运行 npm install 初始化项目时不会下载模块。

**npm install -save moduleName 命令**

1. 安装模块到项目node_modules目录下。
2. 会将模块依赖写入dependencies 节点。
3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
4. 运行npm install --production或者注明NODE_ENV变量值为production时，**会**自动下载模块到node_modules目录中。

**npm install -save-dev moduleName 命令**

1. 安装模块到项目node_modules目录下。
2. 会将模块依赖写入devDependencies 节点。
3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
4. 运行npm install --production或者注明NODE_ENV变量值为production时，**不会**自动下载模块到node_modules目录中。

**总结**

devDependencies 节点下的模块是我们在开发时需要用的，比如项目中使用的 gulp ，压缩css、shell的模块。这些模块在我们的项目部署后是不需要的，所以我们可以使用 -save-dev 的形式安装。像 express 这些模块是项目运行必备的，应该安装在 dependencies 节点下，所以我们应该使用 -save 的形式安装。

