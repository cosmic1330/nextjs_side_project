import { useState, useEffect } from "react";
import { Williams, Ma, Macd, Gold } from "@ch20026103/anysis";
export default function useList(data, select) {
  const [list, setList] = useState([]);

  useEffect(() => {
    switch (select) {
      case "buy":
        let res = buySumIng(data);
        setList(res);
        break;
      case "sell":
        setList([]);
        break;
      default:
        setList([]);
        break;
    }
  }, [select]);
  return list;
}

function buySumIng(data) {
  let ma = new Ma();
  let gold = new Gold();
  let stockIds = Object.keys(data);
  let purchaseList = [];
  stockIds.forEach((stockId) => {
    let stockData = data[stockId];
    let goldData = gold.getGold(stockData);
    let three = calcThree(stockData);
    stockData = ma.getMa10(stockData);
    let length = stockData.length;
    if (
      stockData[length - 1]["sumING"] > 100 &&
      stockData[length - 2]["sumING"] > 100 &&
      stockData[length - 3]["sumING"] > 100
    ) {
      let res = { ...stockData[length - 1], id: stockId, goldData, three };
      purchaseList.push(res);
    }
  });
  return purchaseList;
}

function calcThree(list) {
  // 三關價
  let three = { 上關: null, 中關: null, 下關: null };
  three["top"] =
    parseInt(list[list.length - 1]["l"]) +
    (parseInt(list[list.length - 1]["h"]) -
      parseInt(list[list.length - 1]["l"])) *
      1.382;

  three["middle"] =
    (parseInt(list[list.length - 1]["h"]) +
      parseInt(list[list.length - 1]["l"])) *
    0.5;

  three["bottom"] =
    parseInt(list[list.length - 1]["h"]) -
    (parseInt(list[list.length - 1]["h"]) -
      parseInt(list[list.length - 1]["l"])) *
      1.382;
  return three;
}
