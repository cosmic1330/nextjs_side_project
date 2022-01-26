let request = require("request");
export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  await request.get(
    {
      url: "https://raw.githubusercontent.com/cosmic1330/MySpider/master/datas/TWSE/data.json",
    },
    (error, response, body) => {
      if (response.statusCode == 200) {
        if (req.body) {
          let ids = JSON.parse(req.body).id.split(",");
          body = JSON.parse(body);
          let response = {};
          ids.map((id) => (response[id] = body[id]));
          res.status(200).json(response);
        } else res.status(200).json(body);
      } else {
        res.status(response.statusCode).json("error");
      }
    }
  );
};
