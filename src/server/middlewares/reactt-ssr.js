import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Helmet } from 'react-helmet';
import App from '../../client/router/index';
import routeList, { matchRoute } from '../../client/router/route-config';

export default async (ctx, next) => {
  const path = ctx.request.path;

  const targetRoute = matchRoute(path, routeList);
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
      <App routeList={routeList}></App>
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${html}</div>
        <textarea id="ssrTextInitData" style="display:none;">${JSON.stringify(fetchResult)}</textarea>
        <script>window.__IS__SSR=true</script>
        <script src="index.js"></script>
      </body>
    </html>
  `;

  return next();
};
