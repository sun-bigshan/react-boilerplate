// 高阶组件 用于提取重复逻辑
import React from 'react';
import { Helmet } from 'react-helmet';

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
      const canClientFetch = this.props.history && this.props.history.action === 'PUSH'; //路由跳转的时候可以异步请求数据
      if (canClientFetch || !window.IS_SSR) {
        await this.getInitialProps();
      }
    }

    render() {
      const initialData = this.state.initialData || {};
      const tdk = initialData?.page?.tdk || {};

      return (
        <>
          <Helmet>
            <title>{tdk.title}</title>
            <meta name="description" content={tdk.description} />
            <meta name="keywords" content={tdk.keywords} />
          </Helmet>
          <SourceComponent {...this.props} initialData={initialData}></SourceComponent>
        </>
      );
    }
  };
};
