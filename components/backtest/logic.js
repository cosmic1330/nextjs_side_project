const Williams = require("./skill/williams");
const RSI = require("./skill/rsi");

class BuyMethod {
  constructor() {
    this.williams = new Williams();
    this.rsi = new RSI();
  }
  method1(list, key) {
    /* 
      買進:
        前日 william9 低於-80 && william18 低於-80
        昨日 william9 高於-80 && william18 高於-80
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
    if (
      william9 > -80 &&
      beforeWilliam9 < -80 &&
      william18 > -80 &&
      beforeWilliam18 < -80
    ) {
      return list[key][list[key].length - 1];
    } else {
      return false;
    }
  }

  method2(list, key) {
    /* 
      買進:
        前日 william9 低於-80 && william18 低於-80
        昨日 william9 高於-80 && william18 高於-80
    */
    let rsi6 = this.rsi.getRSI6(list[key]);
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
    if(rsi6[rsi6.length - 1]['rsi6']>rsi6[rsi6.length - 2]['rsi6'] && ( william9 < -80 || william18< -80)){
      return list[key][list[key].length - 1];
    } else {
      return false;
    }
  }
}

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
      william9 < -20 &&
      william18 < -20 &&
      beforeWilliam9  > -20 &&
      beforeWilliam18 > -20
    ) {
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
    if (
      william9 > -20 &&
      william18 > -20
    ) {
      response.status = true;
    } else {
      response.status = false;
    }
    return response;
  }
}

module.exports.BuyMethod = BuyMethod;
module.exports.SellMethod = SellMethod;
