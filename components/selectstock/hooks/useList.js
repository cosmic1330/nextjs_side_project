import { useState, useEffect } from "react";
import { Williams, Ma, Gold } from "@ch20026103/anysis";
export default function useList(data, select) {
  const [list, setList] = useState([]);

  useEffect(() => {
    switch (select) {
      case "buy": {
        let res = buyHighterBefore(data);
        setList(res);
        break;
      }
      case "sell": {
        let res = sellLowerBefore(data);
        setList(res);
        break;
      }
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

function buyHighterBefore(data) {
  let ma = new Ma();
  let gold = new Gold();
  let williams = new Williams();
  let stockIds = Object.keys(data);
  let purchaseList = [];
  stockIds.forEach((stockId) => {
    let stockData = data[stockId];
    let goldData = gold.getGold(stockData);
    let maData = ma.getMa10(stockData.slice(-11));
    let williamsData = williams.getAllWillams(stockData.slice(-54));
    let three = calcThree(stockData);
    let length = stockData.length;
    if (
      stockData[stockData.length - 1]["h"] >
        stockData[stockData.length - 2]["h"] &&
      stockData[stockData.length - 1]["l"] >
        stockData[stockData.length - 2]["l"] &&
      (williamsData[williamsData.length - 2].williams9 < -80 ||
        williamsData[williamsData.length - 3].williams9 < -80) &&
      (williamsData[williamsData.length - 2].williams18 < -80 ||
        williamsData[williamsData.length - 3].williams18 < -80) &&
      stockData[stockData.length - 1]["c"] > maData[maData.length - 1]["ma10"]
    ) {
      let res = { ...stockData[stockData.length - 1], id: stockId, goldData, three };
      purchaseList.push(res);
    }
  });
  console.log("purchaseList", purchaseList);
  return purchaseList;
}

function sellLowerBefore(data) {
  let williams = new Williams();
  let gold = new Gold();
  let stockIds = Object.keys(data);
  let sellList = [];
  stockIds.forEach((stockId) => {
    let stockData = data[stockId];
    let goldData = gold.getGold(stockData);
    let williamsData = williams.getAllWillams(stockData.slice(-54));
    let three = calcThree(stockData);
    if (
      stockData[stockData.length - 1]["h"] <
        stockData[stockData.length - 2]["h"] &&
      stockData[stockData.length - 1]["l"] <
        stockData[stockData.length - 2]["l"] &&
      (williamsData[williamsData.length - 2].williams9 > -10 ||
        williamsData[williamsData.length - 3].williams9 > -10) &&
      (williamsData[williamsData.length - 2].williams18 > -10 ||
        williamsData[williamsData.length - 3].williams18 > -10)
    ) {
      let res = { ...stockData[stockData.length - 1], id: stockId, goldData, three };
      sellList.push(res);
    }
  });
  console.log("sellList", sellList);
  return sellList;
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
