'use strict';

const FILE = './data/spy-2000-2016.json';

const getMarketData = () => {
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
