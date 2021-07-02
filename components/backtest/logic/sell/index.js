const Williams = require("../../skill/williams");
const RSI = require("../../skill/rsi");

class SellMethod {
  constructor(list) {
    this.list = list;
    this.williams = new Williams();
  }
  method1(list, key) {
    /* 
       賣出:
          昨日 william9 高於-20 && william18 高於-20
          今日 william9 低於-20 && william18 低於-20
    */
    let william9 = this.williams.getWilliams(
      list[key].filter(
        (item, index) =>
          index >= list[key].length - 9 && index <= list[key].length - 1
      )
    );
    let william18 = this.williams.getWilliams(
      list[key].filter(
        (item, index) =>
          index >= list[key].length - 18 && index <= list[key].length - 1
      )
    );
    let beforeWilliam9 = this.williams.getWilliams(
      list[key].filter(
        (item, index) =>
          index >= list[key].length - 10 && index <= list[key].length - 2
      )
    );
    let beforeWilliam18 = this.williams.getWilliams(
      list[key].filter(
        (item, index) =>
          index >= list[key].length - 19 && index <= list[key].length - 2
      )
    );

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
        ...response,
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
          今日 william9 高於-10 && william18 高於-20
    */
    let william9 = this.williams.getWilliams(
      list[key].filter(
        (item, index) =>
          index >= list[key].length - 9 && index <= list[key].length - 1
      )
    );
    let william18 = this.williams.getWilliams(
      list[key].filter(
        (item, index) =>
          index >= list[key].length - 18 && index <= list[key].length - 1
      )
    );

    let response = list[key][list[key].length - 1];
    if (william9 > -20 && william18 > -20) {
      /* 
        custom提供驗證訊息
      */
      response["custom"] = {
        ...response,
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
}

module.exports = SellMethod;
