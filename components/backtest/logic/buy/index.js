const Williams = require("../../skill/williams");
const RSI = require("../../skill/rsi");
const MA = require("../../skill/ma");
const Gold = require("../../skill/gold");
const { waveLow, waveHight } = require("../../../../utils/index");
let request = require("request");

// **   注意：所有使用技術測試日期都要取昨日不可使用今日，因為買入是以今日開盤價買入   **
class BuyMethod {
  constructor() {
    this.williams = new Williams();
    this.rsi = new RSI();
    this.ma = new MA();
    this.gold = new Gold();
  }
  filterData(response, method, list) {
    // 計算壓力支撐
    let pressure = null;
    let shore = null;
    if (list.length > 60) {
      list = list.slice(-60);
      let indexObj = list.map((item) => item.v);
      let maxVolume = list.reduce(function (prev, item, index) {
        return Math.max(prev, item.v);
      }, 0);
      let index = indexObj.indexOf(maxVolume);
      if (list[index]["h"] < list[list.length - 1]["c"]) {
        shore = list[index]["h"];
      } else {
        pressure = list[index]["h"];
      }
    }
    response["pressure"] = pressure;
    response["shore"] = shore;

    response["status"] = true;
    response["custom"]["class"] = "buy";
    response["custom"]["method"] = method;
    return response;
  }
  method1(list, key) {
    /* 
      買進:
        昨日 william9 高於-80 && william18 高於-80
        前日 william9 低於-80 && william18 低於-80
    */
    let william9 = this.williams.getWilliams(list[key].slice(-10, -1));
    let william18 = this.williams.getWilliams(list[key].slice(-19, -1));
    let beforeWilliam9 = this.williams.getWilliams(list[key].slice(-11, -2));
    let beforeWilliam18 = this.williams.getWilliams(list[key].slice(-20, -2));

    let ma5 =
      (list[key][list[key].length - 2]["c"] +
        list[key][list[key].length - 3]["c"] +
        list[key][list[key].length - 4]["c"] +
        list[key][list[key].length - 5]["c"] +
        list[key][list[key].length - 6]["c"]) /
      5;

    let response = list[key][list[key].length - 1];
    if (
      william9 > -80 &&
      beforeWilliam9 < -80 &&
      william18 > -80 &&
      beforeWilliam18 < -80 &&
      list[key][list[key].length - 2]["c"] > ma5
    ) {
      /* 
        custom提供驗證訊息
      */
      response["custom"] = {
        date: list[key][list[key].length - 2]["t"],
        william9,
        beforeWilliam9,
        william18,
        beforeWilliam18,
      };
      response = this.filterData(response, 1, list[key]);
    } else {
      response.status = false;
    }
    return response;
  }

  method2(list, key) {
    /* 
      買進:
        昨日 rsi6 高於 前日rsi6
        昨日 william9 低於-80 && william18 低於-80
        昨日收盤價高於ma5
    */
    let ma5 =
      (list[key][list[key].length - 2]["c"] +
        list[key][list[key].length - 3]["c"] +
        list[key][list[key].length - 4]["c"] +
        list[key][list[key].length - 5]["c"] +
        list[key][list[key].length - 6]["c"]) /
      5;
    let res = this.rsi.getRSI6(list[key]);

    let william9 = this.williams.getWilliams(res.slice(-10, -1));
    let william18 = this.williams.getWilliams(res.slice(-19, -1));

    let response = res[res.length - 1];
    if (
      res[res.length - 2]["rsi6"] > res[res.length - 3]["rsi6"] &&
      (william9 < -80 || william18 < -80) &&
      res[res.length - 2]["c"] > ma5
    ) {
      /* 
        custom提供驗證訊息
      */
      response["custom"] = {
        date: res[res.length - 2]["t"],
        rsi6: res[res.length - 2]["rsi6"],
        beforeRsi: res[res.length - 3]["rsi6"],
        william9,
        william18,
      };
      response = this.filterData(response, 2, list[key]);
    } else {
      response.status = false;
    }
    return response;
  }

  method3(list, key) {
    /* 
      買進:
    */
    let ma = this.ma.getMA(list[key]);
    let $up = waveHight(ma.slice(0, -1), "h");
    let $down = waveLow(ma.slice(0, -1), "l");
    let gold = this.gold.getGold($up, $down);
    let response = ma[ma.length - 1];
    if (
      ma[ma.length - 2]["ma5"] > ma[ma.length - 2]["ma20"] &&
      ma[ma.length - 2]["c"] > ma[ma.length - 2]["ma5"]
    ) {
      /* 
        custom提供驗證訊息
      */
      response["custom"] = {
        date: ma[ma.length - 2]["t"],
        ma5: ma[ma.length - 2]["ma5"],
        ma20: ma[ma.length - 2]["ma20"],
        gold: gold,
      };
      response = this.filterData(response, 3, list[key]);
    } else {
      response.status = false;
    }
    return response;
  }
}
module.exports = BuyMethod;
