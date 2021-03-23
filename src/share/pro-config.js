//双端公用的配置文件

module.exports = {
  IS_SSR: true, // 是否为 ssr 模式
  nodeServerPort: 9001, //node server 的监听端口
  asyncComponentKey: '__IS_ASYNC_COMP_FLAG__' //标志组件是否是按需加载 turn | false
};
