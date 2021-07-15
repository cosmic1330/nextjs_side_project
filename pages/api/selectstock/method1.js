let request = require("request");
const fs = require("fs");
const path = require("path");
const Williams = require("../../../components/backtest/skill/williams");
const RSI = require("../../../components/backtest/skill/rsi");
const MACD = require("../../../components/backtest/skill/macd");
const Gold = require("../../../components/backtest/skill/gold");
const waveLow = require("../../../components/backtest/utils/waveLow");
const waveHight = require("../../../components/backtest/utils/waveHight");

export default async (req, res) => {
  // 今日檔案
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let fileName = yyyy + mm + dd + ".json";
  let saveFile = yyyy + mm + dd + "method1.json";

  // 取得選股資料夾檔案
  let jsonFiles = [];
  let files = fs.readdirSync(path.join("data/selectStock"));
  files.forEach((item, index) => {
    jsonFiles.push(item);
  });

  // 如果選股資料夾中已有檔案
  if (jsonFiles.indexOf(saveFile) !== -1) {
    // 取得選股資料夾檔案資料
    let rawdata = fs.readFileSync(
      path.join(`data/selectStock/${saveFile}`),
      "utf8"
    );
    let jsonFile = JSON.parse(rawdata);
    res.status(200).json(jsonFile);
  } else {
    // 檢查資料庫有沒有今日資料
    let testFiles = [];
    let files = fs.readdirSync(path.join("components/backtest/testData/"));
    files.forEach((item, index) => {
      testFiles.push(item);
    });
    if (testFiles.indexOf(fileName) === -1) {
      console.log("沒有今日測試資料");
      res.status(404).json(["沒有今日測試資料"]);
    }

    // 建立方法
    let williams = new Williams();
    let Macd = new MACD();
    let Rsi = new RSI();

    // 取得今日資料
    let list = fs.readFileSync(
      path.join("components/backtest/testData/" + fileName),
      "utf8"
    );
    list = JSON.parse(list);

    // 選股
    let arr = [];
    let Keys = Object.keys(list);
    Keys.forEach((key) => {
      let rsi = Rsi.getRSI6(list[key]);
      let macd = Macd.getMACD(rsi);
      let william9 = williams.getWilliams(macd.slice(-10, -1));
      let william18 = williams.getWilliams(macd.slice(-19, -1));

      let response = macd[macd.length - 1];
      if (
        macd[macd.length - 1]["rsi6"] > macd[macd.length - 2]["rsi6"] &&
        ((macd[macd.length - 1]["OSC"] > 0 &&
          macd[macd.length - 2]["OSC"] < 0) ||
          macd[macd.length - 1]["OSC"] > macd[macd.length - 2]["OSC"]) &&
        (william9 < -20 || william18 < -20)
      ) {
        let field = {
          id: key,
          RSI6: macd[macd.length - 1]["rsi6"],
          DIF: macd[macd.length - 1]["DIF"],
          MACD9: macd[macd.length - 1]["MACD9"],
          OSC: macd[macd.length - 1]["OSC"],
          William9: william9,
          William18: william18,
        };
        response = { ...response, ...field };
        response = getOtherDetail(response, macd);
        arr.push(response);
      }
    });

    // 寫入檔案
    fs.writeFile(
      path.join(`data/selectStock/${saveFile}`),
      JSON.stringify(arr),
      function (error) {
        if (error) {
          console.log("文件寫入失敗");
        } else {
          console.log("寫入成功");
        }
      }
    );

    res.status(200).json(arr);
  }
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
