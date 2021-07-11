const Williams = require("../../skill/williams");
const RSI = require("../../skill/rsi");
const MA = require("../../skill/ma");
const Gold = require("../../skill/gold");

class SellMethod {
  constructor(list) {
    this.list = list;
    this.williams = new Williams();
    this.ma = new MA();
    this.gold = new Gold();
  }
  method1(list, key) {
    /* 
       賣出:
          昨日 william9 高於-20 && william18 高於-20
          今日 william9 低於-20 && william18 低於-20
    */
    let william9 = this.williams.getWilliams(list[key].slice(-9));
    let william18 = this.williams.getWilliams(list[key].slice(-18));
    let beforeWilliam9 = this.williams.getWilliams(list[key].slice(-10, -1));
    let beforeWilliam18 = this.williams.getWilliams(list[key].slice(-19, -1));

    let response = list[key][list[key].length - 1];
    if (
      william9 > -20 &&
      william18 > -20 &&
      beforeWilliam9 < -20 &&
      beforeWilliam18 < -20
    ) {
      /* 
        custom提供驗證訊息
      */
      response.custom = {
        date: list[key][list[key].length - 1]["t"],
        william9,
        beforeWilliam9,
        william18,
        beforeWilliam18,
        method: 1,
        class: "sell",
      };
      response.status = true;
    } else {
      response.status = false;
    }
    return response;
  }

  method2(list, key) {
    /* 
       賣出:
          今日 william9 高於-20 && william18 高於-20
    */
    let william9 = this.williams.getWilliams(list[key].slice(-9));
    let william18 = this.williams.getWilliams(list[key].slice(-18));

    let response = list[key][list[key].length - 1];
    if (william9 > -20 && william18 > -20) {
      /* 
        custom提供驗證訊息
      */
      response["custom"] = {
        date: list[key][list[key].length - 1]["t"],
        william9,
        william18,
        method: 2,
        class: "sell",
      };
      response.status = true;
    } else {
      response.status = false;
    }
    return response;
  }

  method3(list, key) {
    /* 
       賣出:
          跌破5日線
    */
    let ma = this.ma.getMA(list[key]);
    let response = ma[ma.length - 1];
    if (
      response["l"] < response["ma5"] &&
      ma[ma.length - 2]["l"] > ma[ma.length - 2]["ma5"]
    ) {
      /* 
        custom提供驗證訊息
      */
      response["custom"] = {
        date: list[key][list[key].length - 1]["t"],
        ma5: response["ma5"],
        method: 3,
        class: "sell",
      };
      response.status = true;
    } else {
      response.status = false;
    }
    return response;
  }
}

module.exports = SellMethod;
