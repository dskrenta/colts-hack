'use strict';
const Koa = require('koa');
const convert = require('koa-convert');
const cors = require('koa-cors');
const getMarketData = require('./get-data');
const Backtest = require('./backtest');
const app = new Koa();

app.use(convert(cors()));

app.use(async (ctx) => {
  switch(ctx.request.url) {
    case '/':
      ctx.type = 'text/html';
      ctx.body = 'base page'
    case '/api':
      ctx.type = 'application/json';
      // ctx.body = await getMarketData();
      const marketData = await getMarketData();
      const bt = new Backtest(marketData, 5, 0.90, ['SAR']);
      ctx.body = await bt.main();
      break;
    default:
      ctx.type = 'text/html';
      ctx.body = '404 page not found';
  }
});

app.listen(8080);
