const Williams = require("../../skill/williams");
const RSI = require("../../skill/rsi");

// **   注意：所有使用技術測試日期都要取昨日不可使用今日，因為買入是以今日開盤價買入   **
class BuyMethod {
  constructor() {
    this.williams = new Williams();
    this.rsi = new RSI();
  }
  method1(list, key) {
    /* 
      買進:
        昨日 william9 高於-80 && william18 高於-80
        前日 william9 低於-80 && william18 低於-80
    */
    let william9 = this.williams.getWilliams(
      list[key].filter(
        (item, index) =>
          index >= list[key].length - 10 && index <= list[key].length - 2
      )
    );
    let william18 = this.williams.getWilliams(
      list[key].filter(
        (item, index) =>
          index >= list[key].length - 19 && index <= list[key].length - 2
      )
    );
    let beforeWilliam9 = this.williams.getWilliams(
      list[key].filter(
        (item, index) =>
          index >= list[key].length - 11 && index <= list[key].length - 3
      )
    );
    let beforeWilliam18 = this.williams.getWilliams(
      list[key].filter(
        (item, index) =>
          index >= list[key].length - 20 && index <= list[key].length - 3
      )
    );

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
        ...response,
        william9,
        beforeWilliam9,
        william18,
        beforeWilliam18,
        method: 1,
        class: "buy",
      };
      response.status = true;
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

    let william9 = this.williams.getWilliams(
      res.filter(
        (item, index) => index >= res.length - 10 && index <= res.length - 2
      )
    );
    let william18 = this.williams.getWilliams(
      res.filter(
        (item, index) => index >= res.length - 19 && index <= res.length - 2
      )
    );

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
        ...response,
        william9,
        william18,
        method: 2,
        class: "buy",
      };
      response.status = true;
    } else {
      response.status = false;
    }
    return response;
  }
}
module.exports = BuyMethod;
