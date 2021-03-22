import React from 'react';
import PageContainer from '../../common/components/page-container';

const Home = () => {
  const handlerClick = () => {
    alert('一起来玩 react 服务端渲染..');
  };

  return <div onClick={handlerClick}>Hello World</div>;
};

export default PageContainer(Home);
