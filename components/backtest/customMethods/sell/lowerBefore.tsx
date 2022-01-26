import { Williams } from "@ch20026103/anysis";
export default function lowerBefore(data) {
  let williams = new Williams();
  let williamsData = williams.getAllWillams(data);
  let res = {
    status: false,
    detail: "Not up to standard",
  };
  if (
    data.length > 18 &&
    data[data.length - 1]["h"] < data[data.length - 2]["h"] &&
    data[data.length - 1]["l"] < data[data.length - 2]["l"] &&
    (williamsData[williamsData.length - 2].williams9 > -10 ||
      williamsData[williamsData.length - 3].williams9 > -10) &&
    (williamsData[williamsData.length - 2].williams18 > -10 ||
      williamsData[williamsData.length - 3].williams18 > -10)
  ) {
    res.status = true;
    res.detail = `威廉指數達標、K線反轉向下`;
  }
  return res;
}
