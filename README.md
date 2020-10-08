# Egg + React + SSR 应用骨架

详细用法实现请查看[官方文档](http://ykfe.surge.sh)

# 功能/特性

- [x] 基于 cra 脚手架开发，由 cra 开发的 React App 可无缝迁移，如果你熟悉 cra 的配置，上手成本几乎为 0
- [x] 小而美，相比于 beidou，next.js 这样的高度封装方案，我们的实现原理和开发模式一目了然
- [x] 推荐使用 egg 作为 Node.js 框架但并不强制，事实上你可以发现几乎无需做任何修改即可迁移到 koa,nest.js 等框架
- [x] 同时支持 SSR 以及 CSR 两种开发模式,本地开发环境以及线上环境皆可无缝切换两种渲染模式
- [x] 统一前端路由与服务端路由，无需重复编写路由文件配置
- [x] 支持切换路由时自动获取数据
- [x] 支持本地开发 HMR
- [x] 稳定性经过线上大规模应用验证，可提供性能优化方案
- [x] 支持 tree shaking，优化构建 bundle 大小以及数量
- [x] 支持 csr/ssr 自定义 layout，无需通过 path 来手动区分
- [x] 抛弃传统模版引擎，拥抱 React 组件，使用 JSX 来作为模版
- [x] 独创[最佳发布实践](http://ykfe.surge.sh/guide/deploy.html)，让你更新页面无需重启应用机器
- [x] 配套结合[antd](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-antd)的 example 的实现
- [x] 配套结合[react-loadable](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-loadable)做路由分割的 example 的实现
- [x] 配套结合[dva](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-dva)做数据管理的 example 的实现
- [x] 配套阿里云 serverless [FC](https://github.com/ykfe/ssr-with-fc)版本的实现
- [x] 配套[TypeScript](https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-ts)版本的实现

# 目录结构
```
├── README.md
├── app // egg核心目录
│   ├── controller
│   ├── extend
│   ├── middleware
│   └── router.js // egg路由文件，无特殊需求不需要修改内容
├── app.js // egg 启动入口文件
├── build // webpack配置目录
│   ├── env.js
│   ├── jest
│   ├── paths.js
│   ├── util.js
│   ├── webpack.config.base.js // 通用的webpack配置
│   ├── webpack.config.client.js // webpack客户端打包配置
│   └── webpack.config.server.js // webpack服务端打包配置
├── config // egg 配置文件目录
│   ├── config.daily.js
│   ├── config.default.js
│   ├── config.local.js
│   ├── config.prod.js
│   ├── config.staging.js
│   ├── plugin.js
│   └── plugin.local.js
├── dist // build生成静态资源文件目录
│   ├── Page.server.js // 服务端打包后文件(即打包后的serverRender方法)
│   └── static // 前端打包后静态资源目录
└── web // 前端文件目录
    ├── assets
    │   └── common.less
    ├── entry.js // webpack打包入口文件，分环境导出不同配置
    ├── layout
    │   ├── index.js // 页面布局
    │   └── index.less
    └── page
        ├── index
        └── news
```