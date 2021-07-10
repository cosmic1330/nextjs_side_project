class MACD {
  getMACD($list) {
    // 首筆RSI
    let EMA12 = this.getEMA12($list);
    let EMA26 = this.getEMA26(EMA12);
    let DIF = this.getDIF(EMA26);
    let MACD9 = this.getMACD9(DIF);
    return MACD9;
  }

  getDI($data) {
    return ($data["h"] + $data["l"] + 2 * $data["c"]) / 4;
  }

  getStartEMA($arr) {
    let $sum = 0;
    $arr.forEach((element) => {
      let $DI = this.getDI(element);
      $sum += $DI;
    });
    return $sum / $arr.length;
  }

  getEMA12($list) {
    if ($list[$list.length - 2].hasOwnProperty("EMA12")) {
      let EMA12 =
        ($list[$list.length - 2]["EMA12"] * 11) / 13 +
        (this.getDI($list[$list.length - 1]) * 2) / 13;
      $list[$list.length - 1]["EMA12"] = EMA12;
    } else {
      let start = $list.slice(0, 11);
      let beforeEMA12 = this.getStartEMA(start);
      for (let i = 11; i < $list.length; i++) {
        beforeEMA12 =
          (beforeEMA12 * 11) / 13 +
          (this.getDI($list[$list.length - 1]) * 2) / 13;
        $list[$list.length - 1]["EMA12"] = beforeEMA12;
      }
    }
    return $list;
  }

  getEMA26($list) {
    if ($list[$list.length - 2].hasOwnProperty("EMA26")) {
      let EMA26 =
        ($list[$list.length - 2]["EMA26"] * 25) / 27 +
        (this.getDI($list[$list.length - 1]) * 2) / 27;
      $list[$list.length - 1]["EMA26"] = EMA26;
    } else {
      let start = $list.slice(0, 25);
      let beforeEMA26 = this.getStartEMA(start);
      for (let i = 25; i < $list.length; i++) {
        beforeEMA26 =
          (beforeEMA26 * 25) / 27 +
          (this.getDI($list[$list.length - 1]) * 2) / 27;
        $list[$list.length - 1]["EMA26"] = beforeEMA26;
      }
    }
    return $list;
  }

  getDIF($list) {
    for (let i = 0; i < $list.length; i++) {
      const element = $list[i];
      let DIF = element["EMA12"] - element["EMA26"];
      $list[i]["DIF"] = DIF;
    }
    return $list;
  }

  getMACD9($list) {
    if ($list.length > 50 && $list[42].hasOwnProperty("DIF")) {
      let start = $list
        .slice(42, 50)
        .map((item) => item["DIF"])
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      $list[50]["MACD9"] = start;
      let beforeMACD9 = start;
      for (let i = 51; i < $list.length; i++) {
        const element = $list[i];
        beforeMACD9 = beforeMACD9 + ((element["DIF"] - beforeMACD9) * 2) / 10;
        $list[i]["MACD9"] = beforeMACD9;
        $list[i]["OSC"] = $list[i]["DIF"]-$list[i]["MACD9"];
      }
    }
    return $list;
  }
}
module.exports = MACD;
