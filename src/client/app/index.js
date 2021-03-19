//浏览器端页面结构渲染入口

import React from 'react';
import ReactDom from 'react-dom';
import Home from '../pages/Home';

//渲染index 组件1
ReactDom.hydrate(<Home />, document.getElementById('root'));
