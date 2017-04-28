'use strict';
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  switch(ctx.request.url) {
    case '/':
      ctx.type = 'text/html';
      ctx.body = 'base page'
    case '/api':
      ctx.type = 'application/json';
      ctx.body = 'stuff';
      // grab spy
      break;
    default:
      ctx.type = 'text/html';
      ctx.body = '404 page not found';
  }
});

app.listen(8080);
