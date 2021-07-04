const fs = require("fs");
const path = require("path");
export default async (req, res) => {
  let yieldRate = fs.readFileSync(
    path.join("components/backtest/yieldRateData/data.json"),
    "utf8"
  );
  yieldRate = JSON.parse(yieldRate);
  let yieldStock = yieldRate.data[0]
  .filter((element) => element[2] > 5 && element[4] < 10)
  .map((element) => element[0]);
  res.status(200).json({ yieldStock });
};
