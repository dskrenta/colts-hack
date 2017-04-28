'use strict';
const Koa = require('koa');
const app = new Koa();

// response
/*
app.use(ctx => {
  ctx.body = 'Hello Koa';
});
*/

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
