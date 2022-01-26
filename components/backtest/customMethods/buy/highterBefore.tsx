import { Williams, Ma } from "@ch20026103/anysis";
export default function highterBefore(data) {
  let ma = new Ma();
  let williams = new Williams();
  let maData = ma.getMa10(data.slice(-11));
  let stockData = williams.getAllWillams(data);
  let res = {
    status: false,
    detail: "Not up to standard",
  };
  if (
    data.length > 18 &&
    stockData[stockData.length - 1]["h"] >
      stockData[stockData.length - 2]["h"] &&
    stockData[stockData.length - 1]["l"] >
      stockData[stockData.length - 2]["l"] &&
    (stockData[stockData.length - 2].williams9 < -80 ||
      stockData[stockData.length - 3].williams9 < -80) &&
    (stockData[stockData.length - 2].williams18 < -80 ||
      stockData[stockData.length - 3].williams18 < -80) &&
    stockData[stockData.length - 1]["c"] > maData[maData.length - 1]["ma10"]
  ) {
    res.status = true;
    res.detail = `威廉指數達標、K線反轉向上`;
  }
  return res;
}
