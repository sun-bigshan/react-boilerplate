import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import App from '../../client/router/index';
import routeList, { matchRoute } from '../../client/router/route-config';
import getStaticRoutes from '../common/get-static-routes';

const getAssets = require('../common/assets');

export default async (ctx, next) => {
  const path = ctx.request.path;

  //获得静态路由
  const staticRoutesList = await getStaticRoutes(routeList);

  const targetRoute = matchRoute(path, staticRoutesList);
  let fetchResult = {};

  if (targetRoute) {
    const fetchDataFn = targetRoute.component.getInitialProps;
    if (fetchDataFn) {
      fetchResult = await fetchDataFn();
    }
  }

  const context = {
    initialData: fetchResult
  };

  const html = renderToString(
    <StaticRouter location={path} context={context}>
      <App routeList={staticRoutesList}></App>
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();
  //静态资源
  const assetsMap = getAssets();

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${assetsMap.css.join('')}
      </head>
      <body>
        <div id="root">${html}</div>
        <textarea id="ssrTextInitData" style="display:none;">${JSON.stringify(fetchResult)}</textarea>
        <script>window.__IS__SSR=true</script>
        ${assetsMap.js.join('')}
      </body>
    </html>
  `;

  return next();
};
