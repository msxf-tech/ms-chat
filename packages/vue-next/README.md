# 1. 项目概述
    MSChat 轻松搭建AI界面
    快速嵌入业务场景，轻松落地智能问答系统
## 核心特性
### 插件化
    依靠灵活的插件化管理,可实现多功能、多组件的接入和实现。具有高扩展性、高解耦性
### 模块化
    标准化组件架构,确保输入、消息展示、多模态展示卡片渲染等模块解耦,支持按需组合
### 高内聚
    统一通信与状态处理,统一Markdown富文本渲染、打字机动效果等
### 配置驱动
    可通过Props、数据等驱动UI渲染,实现UI配置驱动

# 2. 安装指南
    ‌node -v v18.0.0
    pnpm i
    pnpm 是必须的 通过Monorepo实现多包管理 依赖了pnpm workspace
    npm run dev
# 3. 使用说明
    见demo文件夹
    具体接入方式见 [MSChat](http://ms-ai-chat-doc.msxf.msxfyun.test/vue-next/){target="_blank"}
# 4. 项目结构
    本项目开发需要配置`node18` + `pnpm@8` 环境，整体使用`monorepo`架构进行开发，子包在`packages`目录下：

    `core`：包含图表组件中与框架（`react`、`vue`）无关的公用函数、ts类型定义等
    `vue`: 包含`vue`框架使用的基础组件
    `react`：包含`react`框架使用的基础组件

    目标是`react`、`vue`尽量保持`api`一致，并且能复用的内容尽量抽离到`core`包中复用
    packages
        - core： 多包架构基础core包
        - react： react版本包
        - vue-next： vue3包
        - vue：vue2包
# 5. 高级功能
    架构设计见 [MSChat](https://weikezhijia.feishu.cn/docx/Cssfdpcx5oWvuuxGQtpc9RJ2n6f)
    项目实践见 [从AI借款业务场景到前端智能交互架构建设](https://weikezhijia.feishu.cn/docx/TTwMdrD4OodFb2xbXCMc9BMXnig)
# 6. 问题排查
    ‌调试方法‌：正常vue、react项目
# 7. 贡献指南
    ‌
# 8. 其他信息
    ‌许可证‌：MIT 见LICENSE文件
    ‌联系方式‌：jipeng.xu@msxf.com xiaolian.duan@msxf.com
    邀请你加入飞书群，快点击 [ms-chat使用服务群](https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=ac1u6ef8-701a-4bef-ae4d-68fafb44f31a) 加入吧！