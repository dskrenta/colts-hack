'use strict';
const Koa = require('koa');
const getMarketData = require('./get-data');
const app = new Koa();

app.use(ctx => {
  switch(ctx.request.url) {
    case '/api':
      ctx.type = 'application/json';
      ctx.body = 'stuff';
      break;
    default:
      ctx.type = 'text/html';
      ctx.body = '404 page not found';
  }
});

app.listen(8080);
