let request = require("request");
const fs = require("fs");
const path = require("path");

async function run() {
  // 取得python檔案資料
  let rawdata = fs.readFileSync("../../python/data/thisSeason/data.json");
  let jsonFile = JSON.parse(rawdata);

  // 撰寫格式
  let obj = {};
  for (let i = 0; i < jsonFile.dataList.length; i++) {
    const element = jsonFile.dataList[i];
    console.log(element);
    let main = await getMain(element);
    // 如果沒有資料就跳過
    if (main.length < 1) {
      continue;
    }
    let mainLastTime = main[main.length - 1]["date"];
    let price = await getPrice(element, mainLastTime);
    if (price.length < 1) {
      continue;
    }
    let investors = await getInvestors(element, price.length);
    if (investors.length < 1) {
      continue;
    }
    let yahooData = await getName(element);

    let arr = [];
    for (let e = 0; e < main.length - 1; e++) {
      let date = new Date(investors[e]["date"]);
      date = Date.parse(date);
      if (
        main[e]["date"] != price[e]["time"] ||
        main[e]["date"] != date ||
        price[e]["time"] != date
      ) {
        break;
      }

      //  時間戳相同
      date = new Date(date);
      let year = date.getFullYear();
      let month = feedBackMonth(date.getMonth());
      let day = feedBackDate(date.getDate());
      let data = {
        o: price[e]["open"],
        t: `${year}${month}${day}`,
        h: price[e]["high"],
        l: price[e]["low"],
        c: price[e]["close"],
        v: price[e]["volume"],
        skp5: main[e]["skp5"],
        stockAgentMainPower: main[e]["stockAgentMainPower"],
        sumING: investors[e]["sumING"],
        sumForeignNoDealer: investors[e]["sumForeignNoDealer"],
        name: yahooData.mem.name,
      };
      arr.push(data);
    }
    if (arr.length > 0) {
      obj[element] = arr;
    }
  }

  //  過濾資料
  let response = {};
  Object.keys(obj).forEach((element) => {
    if (obj[element].length === obj["1101"].length) {
      response[element] = obj[element].reverse();
    }
  });

  // 寫入檔案
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let date = yyyy + mm + dd;
  fs.writeFile(
    `./testData/${date}.json`,
    JSON.stringify(response),
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

function getPrice(code, time) {
  return new Promise(function (resolve, reject) {
    request.get(
      {
        url: `https://www.wantgoo.com/investrue/${code}/daily-candlesticks?after=${time}`,
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

function getInvestors(code, length) {
  return new Promise(function (resolve, reject) {
    request.get(
      {
        url: `https://www.wantgoo.com/stock/${code}/institutional-investors/trend-data?topdays=${length}`,
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

function getName(code) {
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

function feedBackMonth(index) {
  let monthArr = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  return monthArr[index];
}

function feedBackDate(index) {
  let dateArr = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];
  return dateArr[index];
}
run();
