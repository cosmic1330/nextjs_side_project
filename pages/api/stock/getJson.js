const Wrapper = require("../../../components/backtest/wrapper");
const Date = require("../../../components/backtest/date");
const fs = require("fs");
const path = require("path");
export default async (req, res) => {
  let stockdata = fs.readFileSync(
    path.join("components/backtest/testData/" + req.query.fileName),
    "utf8"
  );
  stockdata = JSON.parse(stockdata);

  // 殖利率挑選
  // let yieldRate = fs.readFileSync(
  //   path.join("components/backtest/yieldRateData/data.json"),
  //   "utf8"
  // );
  // yieldRate = JSON.parse(yieldRate);
  // let yieldStock = yieldRate.data[0]
  //   .filter((element) => element[2] > 5 && element[4] < 10)
  //   .map((element) => element[0]);
  // let obj = {};
  // yieldStock.forEach((element) => {
  //   obj[element] = stockdata[element];
  // });

  let date = new Date({
    defaultDataCount: 19,
    data: stockdata,
  });

  const wrapper = new Wrapper({
    date,
    hightStockPrice: req.query.hightStockPrice,
    hightLoss: req.query.hightLoss,
    capital: req.query.capital,
    handlingFeeRebate: req.query.handlingFeeRebate,
    limitHandlingFee: req.query.limitHandlingFee,
  });
  wrapper.run();
  let data = wrapper.show(true);
  let history = wrapper.history();
  res.status(200).json({ data, history });
};
