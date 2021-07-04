let request = require("request");
export default async (req, res) => {
  //  取得三大法人當日買賣超
  await request.get(
    {
      url: `https://www.wantgoo.com/stock/institutional-investors/all/all-net-buy-rank-data?tradeDate=1624291200000&accumulationDays=1&market=Listed,OTC`,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36",
      },
    },
    (error, response, body) => {
      if (response.statusCode == 200) {
        res.status(200).json(body);
      } else {
        if (error) {
          res.status(response.statusCode).json(error);
        } else {
          res.status(response.statusCode).json("fail");
        }
      }
    }
  );
};
