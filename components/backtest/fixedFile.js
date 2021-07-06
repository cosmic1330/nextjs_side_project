let request = require("request");
const fs = require("fs");
const path = require("path");

async function run() {
  // 取得python檔案資料
  let rawdata = fs.readFileSync("./testData/20210705.json");
  let jsonFile = JSON.parse(rawdata);
  console.log(jsonFile['1101'][0],jsonFile['2330'][0])
  // 撰寫格式
  let obj = {}
  Object.keys(jsonFile).forEach((element) => {
    if(jsonFile[element].length===jsonFile['1101'].length){
      obj[element]=jsonFile[element].reverse()
    }
  });

  // 寫入檔案

  fs.writeFile(
    `./testData/20210705.json`,
    JSON.stringify(obj),
    function (error) {
      if (error) {
        console.log("文件寫入失敗");
      } else {
        console.log("寫入成功");
      }
    }
  );
}

function getMain(code) {
  return new Promise(function (resolve, reject) {
    request.get(
      {
        url: `https://www.wantgoo.com/stock/${code}/major-investors/main-trend-data`,
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36",
        },
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

run();
