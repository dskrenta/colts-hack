'use strict';
const fs = require('fs');
const talib = require('talib');

const FILE = `${__dirname}/data/spy-2000-2016.json`;

function getMarketData() {
  return new Promise((resolve, reject) => {
    fs.readFile(FILE, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = getMarketData;
