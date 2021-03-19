import React from 'react';

const Home = () => {
  const handlerClick = () => {
    alert('一起来玩 react 服务端渲染..');
  };

  return <div onClick={handlerClick}>Hello World</div>;
};

export default React.memo(Home);
