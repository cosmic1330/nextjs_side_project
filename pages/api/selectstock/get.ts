let request = require("request");
export default async (req, res) => {
  await request.get(
    {
      url: "https://raw.githubusercontent.com/cosmic1330/MySpider/master/datas/TWSE/data.json",
    },
    (error, response, body) => {
      if (response.statusCode == 200) {
        res.status(200).json(body);
      } else {
        res.status(response.statusCode).json(123);
      }
    }
  );
};
