'use strict';
const fs = require('fs');
const yahooFinance = require('yahoo-finance');

const SYMBOL = 'SPY';
const START_DATE = '2000-01-01';
const END_DATE = '2017-01-01';
const FILE = './data/spy-2000-2016.json';

function getHistoricalData () {
  return yahooFinance.historical({
    symbol: SYMBOL,
    from: START_DATE,
    to: END_DATE
  });
}

function main () {
  getHistoricalData()
    .then(result => {
      fs.appendFile(FILE, JSON.stringify(result), (err) => {
        if (err) throw err;
        console.log('Data downloaded');
      });
    }).catch(err => {
      console.log(err);
    });
}

main();
