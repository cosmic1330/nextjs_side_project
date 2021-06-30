let request = require('request');
export default async (req, res) => {
  await request.get(
    {
        url:`https://tw.quote.finance.yahoo.net/quote/q?type=ta&perd=d&mkt=10&sym=${req.query.code}&v=1&callback=jQuery111306382856220483186_1591513211276&_=1591513211278`,
    },
    (error, response, body)=>{
        if(response.statusCode == 200){
          body = body.replace("jQuery111306382856220483186_1591513211276(","")
          body = body.replace(");","")
          res.status(200).json(body)
        }else{
            if(error){
                res.status(response.statusCode).json(error);
            }else{
                res.status(response.statusCode).json('fail');
            }
        }
    }
  );
}
