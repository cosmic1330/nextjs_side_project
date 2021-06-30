// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let request = require('request');
export default async (req, res) => {
  await request.get(
    {
        url:'https://www.wantgoo.com/stock/2330/financial-statements/monthly-revenue-data',
        // headers: {
        //   'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36'
        // },
    },
    (error, response, body)=>{
        if(response.statusCode == 200){
          res.status(200).json(body)
        }else{
          res.status(response.statusCode).json(123);
        }
    }
  );
  
}
