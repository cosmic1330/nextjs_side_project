let request = require("request");
const fs = require("fs");
const path = require("path");
export default async (req, res) => {
  // 取得python檔案資料
  let jsonFile = [req.query.code];

  // 撰寫格式
  let obj = {};
  for (let i = 0; i < jsonFile.length; i++) {
    const element = jsonFile[i];
    let yahooData = await getData(element);
    if (yahooData) {
      obj[element] = yahooData.ta.map((item) => {
        item.name = yahooData?.mem?.name;
        return item;
      });
    }
  }

  // 寫入檔案
  fs.writeFile(
    path.join(`components/backtest/testData/${req.query.code}.json`),
    JSON.stringify(obj),
    function (error) {
      if (error) {
        console.log("文件寫入失敗");
      } else {
        console.log("寫入成功");
      }
    }
  );
  res.status(200).json(obj);
};

function getData(code) {
  return new Promise(function (resolve, reject) {
    request.get(
      {
        url: `https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=${code}&v=1&callback=`,
      },
      (error, response, body) => {
        if (error) reject(error);
        try {
          body = body.replace("(", "");
          body = body.replace(");", "");
          body = JSON.parse(body);
          resolve(body);
        } catch (error) {
          resolve(false);
        }
      }
    );
  });
}
