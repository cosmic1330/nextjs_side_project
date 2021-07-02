const Williams = require("../../skill/williams");
const RSI = require("../../skill/rsi");

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
        今日 rsi6 高於 昨日rsi6
        昨日 william9 低於-80 && william18 低於-80
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

    if (
      rsi6[rsi6.length - 1]["rsi6"] > rsi6[rsi6.length - 2]["rsi6"] &&
      (william9 < -80 || william18 < -80)
    ) {
      return list[key][list[key].length - 1];
    } else {
      return false;
    }
  }
}
module.exports = BuyMethod;
