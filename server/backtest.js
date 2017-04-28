'use strict';
const fs = require('fs');
const talib = require('talib');

class Backtest {
  constructor (
    marketData,
    numContracts = 5,
    avgDelta = 0.90,
    taFunctions = [
      'SAR'
    ]
  ) {
    this.marketData = marketData;
    this.shares = avgDelta * 100 * numContracts;
    this.taFunctions = taFunctions;
    this.orderBook = [];
    this.currentPosition = {};
    this.totalPL = 0;
  }

  get getCurrentLongPosition () {
    return this.currentPosition.long;
  }

  get getCurrentShortPosition () {
    return this.currentPosition.short;
  }

  setTradingLogic (tradingLogic) {
    this.tradingLogic = tradingLogic;
    this.main();
  }

  generatePresets () {
    return this.taFunctions.map(taFunction => {
      const def = talib.explain(taFunction);
      const returnObj = {
        name: def.name,
        startIdx: 0,
        endIdx: this.taInputs.close.length - 1,
        open: this.taInputs.open,
        high: this.taInputs.high,
        low: this.taInputs.low,
        close: this.taInputs.close,
        inReal: this.taInputs.close
      };
      for (let input of def.optInputs) {
        returnObj[input.name] = input.defaultValue;
      }
      return returnObj;
    });
  }

  formatTaInputs () {
    return new Promise((resolve, reject) => {
      const result = {
        open: [],
        high: [],
        low: [],
        close: [],
        volume: []
      };
      for (let item of this.marketData) {
        result.open.push(item.open);
        result.high.push(item.high);
        result.low.push(item.low);
        result.close.push(item.close);
        result.volume.push(item.volume);
      }
      resolve(result);
    });
  }

  talibExecute (preset) {
    return new Promise((resolve, reject) => {
      talib.execute(preset, (result, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  marketDataStartIndex () {
    const begIndexes = this.taData.map(taObj => taObj.begIndex);
    return Math.max(begIndexes);
  }

  condenseData () {
    const startIndex = this.marketDataStartIndex();
    const taResults = this.taData.map(item => item.result.outReal);
    const modMarketData = this.marketData.slice(startIndex);
    const results = [];
    for (let i = 0; i < modMarketData.length; i++) {
      let resultObj = modMarketData[i];
      console.log(resultObj);
      for (let j = 0; j < this.taFunctions.length; j++) {
        resultObj[this.taFunctions[j]] = taResults[j][i];
      }
      results.push(resultObj);
    }
    return results;
  }

  openLong (bar) {
    this.orderBook.push({type: 'Open Long', marketData: bar, price: bar.open});
    this.currentPosition.long = {type: 'long', price: bar.open, shares: this.shares};
  }

  closeLong (bar) {
    this.orderBook.push({type: 'Close Long', marketData: bar, price: bar.open});
    console.log('LONG: ' + (bar.open - this.currentPosition.long.price) * this.currentPosition.long.shares);
    this.totalPL += (bar.open - this.currentPosition.long.price) * this.currentPosition.long.shares;
    this.currentPosition.long = null;
  }

  openShort (bar) {
    this.orderBook.push({type: 'Open Short', marketData: bar, price: bar.open});
    this.currentPosition.short = {type: 'short', price: bar.open, shares: -1 * this.shares};
  }

  closeShort (bar) {
    this.orderBook.push({type: 'Close Short', marketData: bar, price: bar.open});
    console.log('SHORT: ' + (bar.open - this.currentPosition.short.price) * this.currentPosition.short.shares);
    this.totalPL += (bar.open - this.currentPosition.short.price) * this.currentPosition.short.shares;
    this.currentPosition.short = null;
  }

  longStop (price) {
    this.orderBook.push({type: 'Long Stop', price: price});
    this.currentStop = {type: 'Long Stop', price: price};
  }

  shortStop (price) {
    this.orderBook.push({type: 'Short Stop', price: price});
    this.currentStop = {type: 'Short Stop', price: price};
  }

  clearStop () {
    this.currentStop = null;
  }

  stopCheck (bar) {
    if (this.currentStop) {
      if (this.currentStop.type === 'Long Stop') {
        if (bar.low <= this.currentStop.price) {
          this.closeLong(bar);
          this.currentStop = null;
        }
      } else {
        if (bar.high >= this.currentStop.price) {
          this.closeShort(bar);
          this.currentStop = null;
        }
      }
    }
  }

  backtestLoop () {
    for (let bar of this.finalMarketData) {
      this.tradingLogic(bar);
      this.stopCheck(bar);
    }
  }

  async main () {
    try {
      this.taInputs = await this.formatTaInputs();

      const presets = this.generatePresets();
      const resultPromises = presets.map(preset => this.talibExecute(preset));
      this.taData = await Promise.all(resultPromises);

      this.finalMarketData = this.condenseData();
      // this.backtestLoop();

      // console.log(`P/L: ${this.totalPL.toFixed(2)}`);
      return this.finalMarketData;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Backtest;
