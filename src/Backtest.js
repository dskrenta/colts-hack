export default class Backtest {
  constructor (
    marketData,
    numContracts = 5,
    avgDelta = 0.90
  ) {
    this.marketData = marketData;
    this.shares = avgDelta * 100 * numContracts;
    this.orderBook = [];
    this.currentPosition = {};
    this.trades = [];
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

  marketDataStartIndex () {
    const begIndexes = this.taData.map(taObj => taObj.begIndex);
    return Math.max(begIndexes);
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

  getFinalData() {
    return {
      orderBook: this.orderBook,
      totalPL: this.totalPL.toFixed(2),
      trades: this.trades
    };
  }

  async main () {
    try {
      this.finalMarketData = this.marketData;
      this.backtestLoop();
      console.log(`P/L: ${this.totalPL.toFixed(2)}`);
    } catch (err) {
      console.log(err);
    }
  }
}
