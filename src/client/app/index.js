//浏览器端页面结构渲染入口

import React from 'react';
import ReactDom from 'react-dom';
import App from '../router/index';
import { BrowserRouter } from 'react-router-dom';
import routeList from '../router/route-config';

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
  renderDom();
}

//渲染入口
clientRender();
