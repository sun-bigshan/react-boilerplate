import React from 'react';
import PageContainer from '../../common/components/page-container';

const Home = () => {
  const handlerClick = () => {
    alert('一起来玩 react 服务端渲染..');
  };

  return <div onClick={handlerClick}>Hello World</div>;
};

Home.getInitialProps = async () => {
  //模拟数据请求方法
  return {
    page: {
      tdk: {
        title: '首页 - koa-react-ssr',
        keywords: '首页关键词 koa-react-ssr',
        description: '首页描述 koa-react-ssr'
      }
    }
  };
};

export default PageContainer(Home);
