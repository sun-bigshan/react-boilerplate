import React from 'react';
import Home from '../../client/pages/Home';
import { renderToString } from 'react-dom/server';

export default (ctx, next) => {
  const html = renderToString(<Home />);

  ctx.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="root">
        ${html}
      </div>
    </body>
    </html>
  `;

  return next();
};
