# 项目总览

本项目开发需要配置`node16` + `pnpm@8` 环境，整体使用`monorepo`架构进行开发，子包在`packages`目录下：

`core`：包含图表组件中与框架（`react`、`vue`）无关的公用函数、ts类型定义等
`vue`: 包含`vue`框架使用的基础组件
`react`：包含`react`框架使用的基础组件

目标是`react`、`vue`尽量保持`api`一致，并且能复用的内容尽量抽离到`core`包中复用

## 本地开发

请确保开发此项目时，本地安装了`node16`的运行环境，并且使用`pnpm@8`作为包管理工具。

### 安装

在项目根目录下，执行：

`pnpm install`

### 开发

进入需要开发包的目录中，执行对应的开发命令（TODO 后面调整到根目录脚本）：

以`vue`为例：

1. `cd packages/vue`
2. `pnpm run start`

## 代码提交

当前项目的代码提交做了`commintlint`规范校验， 提交的信息请按照下面的格式进行：

`type(scope): subject`，其中：

`type`：当前提交类型，包括`feat`、`fix`、`chore`、`perf`等类型

`scope`: 当前提交影响的包范围，只能输入4种类型：`core`、`vue`、`react`、`global`。

`subject`: 当前提交的主题信息

比如：`feat(react): 使用onReady获取实例对象`、`refactor(core): getBaseConfig重命名为getG2Config，与s2配置区分`。

如果提交格式不正确，会在`git commit`时失败！

## 发布流程

1. 执行 `pnpm run changeset`，交互式生成`changelog`，并且指定当前更新是`patch`、`minor`、`major`，此步骤完成后会在`.changeset`目录下，生成更新内容的`markdown`文档（此文档可以修改）， 注意：此命令可以多次执行。

2. 执行`pnpm run version`，消费`.changeset`目录下所有的`markdown`日志文档，并自动此次改动相关包的版本号以及`changelog`日志。

3. 根据`git`修改记录，核对版本号、改动日志是否符合预期，如果不符合可以直接修改对应文件。

4. 执行`pnpm run release`进行发布
