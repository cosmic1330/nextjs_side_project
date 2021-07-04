class MA {
  getMA($list) {
    // 首筆RSI
    let response = this.getMA5($list);
    response = this.getMA10(response);
    response = this.getMA20(response);
    return response;
  }

  getMA5($list) {
    let $length = $list.length;
    for (let $i = 4; $i < $length; $i++) {
      let $sum =
        $list[$i]["c"] +
        $list[$i - 1]["c"] +
        $list[$i - 2]["c"] +
        $list[$i - 3]["c"] +
        $list[$i - 4]["c"];
      $list[$i]["ma5"] = Math.round(($sum / 5) * 100) / 100;
    }
    return $list;
  }

  getMA10($list) {
    let $length = $list.length;
    for (let $i = 9; $i < $length; $i++) {
      let $sum =
        $list[$i]["c"] +
        $list[$i - 1]["c"] +
        $list[$i - 2]["c"] +
        $list[$i - 3]["c"] +
        $list[$i - 4]["c"] +
        $list[$i - 5]["c"] +
        $list[$i - 6]["c"] +
        $list[$i - 7]["c"] +
        $list[$i - 8]["c"] +
        $list[$i - 9]["c"];
      $list[$i]["ma10"] = Math.round(($sum / 10) * 100) / 100;
    }
    return $list;
  }

  getMA20($list) {
    let $length = $list.length;
    for (let $i = 19; $i < $length; $i++) {
      let $sum =
        $list[$i]["c"] +
        $list[$i - 1]["c"] +
        $list[$i - 2]["c"] +
        $list[$i - 3]["c"] +
        $list[$i - 4]["c"] +
        $list[$i - 5]["c"] +
        $list[$i - 6]["c"] +
        $list[$i - 7]["c"] +
        $list[$i - 8]["c"] +
        $list[$i - 9]["c"] +
        $list[$i - 10]["c"] +
        $list[$i - 11]["c"] +
        $list[$i - 12]["c"] +
        $list[$i - 13]["c"] +
        $list[$i - 14]["c"] +
        $list[$i - 15]["c"] +
        $list[$i - 16]["c"] +
        $list[$i - 17]["c"] +
        $list[$i - 18]["c"] +
        $list[$i - 19]["c"];
      $list[$i]["ma20"] = Math.round(($sum / 20) * 100) / 100;
    }
    return $list;
  }
}
module.exports = MA;
