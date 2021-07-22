let request = require("request");
const fs = require("fs");
const path = require("path");
export default async (req, res) => {
  // 取得python檔案資料
  let rawdata = fs.readFileSync(
    path.join("python/data/Eps/data.json"),
    "utf8"
  );
  let jsonFile = JSON.parse(rawdata);

  // 撰寫格式
  let obj = {};
  for (let i = 0; i < jsonFile.dataList.length; i++) {
    const element = jsonFile.dataList[i];
    let yahooData = await getData(element);
    if (yahooData) {
      obj[element] = yahooData.ta.map((item) => {
        item.name = yahooData?.mem?.name;
        return item;
      });
    }
  }

  // 寫入檔案

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let date = yyyy + mm + dd;
  fs.writeFile(
    path.join(`components/backtest/testData/${date}.json`),
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
