import React from 'react';
import AsyncBundler from './async-bundler';
import proConfig from '../../share/pro-config';

const AsyncLoader = loader => {
  const asyncFn = props => {
    return <AsyncBundler load={loader}>{Comp => <Comp {...props} />}</AsyncBundler>;
  };

  //标记为异步组件
  asyncFn[proConfig.asyncComponentKey] = true;

  return asyncFn;
};

export default AsyncLoader;
