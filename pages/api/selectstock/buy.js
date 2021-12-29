let request = require("request");
const fs = require("fs");
const path = require("path");
const { Williams, Ma, Macd, Gold } = require("@ch20026103/anysis");

export default async (req, res) => {
  // 建立方法
  let Ma = new MA();
  let Macd = new MACD();

  // 建立選股方法
  res.status(200).json({ name: "John Doe" });
  // res.status(200).json({ status: true, data: [], date: "" });
};

function getOtherDetail(response, list) {
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

  // 計算黃金分割率
  let GOLD = new Gold();
  let $up = waveHight(list, "h");
  let $down = waveLow(list, "l");
  let gold = GOLD.getGold($up, $down);
  response["gold"] = gold;

  // 三關價
  let three = { 上關: null, 中關: null, 下關: null };
  three["上關"] =
    parseInt(list[list.length - 1]["l"]) +
    (parseInt(list[list.length - 1]["h"]) -
      parseInt(list[list.length - 1]["l"])) *
      1.382;

  three["中關"] =
    (parseInt(list[list.length - 1]["h"]) +
      parseInt(list[list.length - 1]["l"])) *
    0.5;

  three["下關"] =
    parseInt(list[list.length - 1]["h"]) -
    (parseInt(list[list.length - 1]["h"]) -
      parseInt(list[list.length - 1]["l"])) *
      1.382;
  response["three"] = three;
  return response;
}
