# react-boilerplate

koa + react + spa + ssr

支持 ssr/csr 两种渲染模式，可通过 `pro-config.js` 下的 `IS_SSR` 参数来配置：

1. 默认 srr 打包，首次加载页面由服务端直出，后续操作保留 spa 特性
2. 设置为 false，则为普通的 csr 打包
