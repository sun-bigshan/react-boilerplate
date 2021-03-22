// 高阶组件 用于提取重复逻辑
import React from 'react';

export default SourceComponent => {
  return class HoComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        initialData: {},
        canClientFetch: false //浏览器端是否需要请求数据
      };

      // eslint-disable-next-line no-undef
      if (__SERVER__) {
        // 服务端直出
        this.state.initialData = props.staticContext.initialData || {};
      } else {
        // 首次渲染取服务端直出数据
        this.state.initialData = window.__INITIAL_DATA__;
        window.__INITIAL_DATA__ = {};
      }
    }

    //用于服务端调用
    static async getInitialProps() {
      console.log('服务端获取数据');
      return SourceComponent.getInitialProps ? await SourceComponent.getInitialProps() : {};
    }

    async getInitialProps() {
      console.log('客户端获取数据');
      const res = SourceComponent.getInitialProps ? await SourceComponent.getInitialProps() : {};
      this.setState({
        initialData: res,
        canClientFetch: true
      });
    }

    async componentDidMount() {
      console.log(this.props.history);
      const canClientFetch = this.props.history && this.props.history.action === 'PUSH'; //路由跳转的时候可以异步请求数据
      if (canClientFetch || !window.__IS__SSR) {
        await this.getInitialProps();
      }
    }

    render() {
      // const props = {
      //   initialData: {},
      //   ...this.props
      // };

      // // eslint-disable-next-line no-undef
      // if (__SERVER__) {
      //   // 服务端渲染
      //   props.initialData = this.props.staticContext.initialData || {};
      // } else {
      //   // 客户端渲染
      //   if (this.state.canClientFetch) {
      //     // 需要异步请求数据
      //     props.initialData = this.state.initialData || {};
      //   } else {
      //     // 首次进入拿得是服务端直出的数据
      //     props.initialData = window.__INITIAL_DATA__;
      //     window.__INITIAL_DATA__ = {};
      //   }
      // }
      const initialData = this.state.initialData || {};

      return <SourceComponent {...this.props} initialData={initialData}></SourceComponent>;
    }
  };
};
