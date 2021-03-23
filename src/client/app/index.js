//浏览器端页面结构渲染入口

import React from 'react';
import ReactDom from 'react-dom';
import App from '../router/index';
import { BrowserRouter } from 'react-router-dom';
import routeList, { matchRoute } from '../router/route-config';
import proConfig from '../../share/pro-config';

function renderDom() {
  ReactDom.hydrate(
    <BrowserRouter>
      <App routeList={routeList} />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

function clientRender() {
  let initialData = JSON.parse(document.getElementById('ssrTextInitData').value);
  window.__INITIAL_DATA__ = initialData;

  const targetRoute = matchRoute(document.location.pathname, routeList);

  if (targetRoute) {
    //等待异步脚本加载完成
    if (targetRoute.component[proConfig.asyncComponentKey]) {
      targetRoute
        .component()
        .props.load()
        .then(() => {
          //异步组件加载完成后再渲染页面
          console.log('异步组件加载完成.....');
          renderDom(routeList);
        });
    }
  } else {
    renderDom();
  }
}

//渲染入口
clientRender();
