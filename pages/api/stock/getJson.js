const Wrapper = require("../../../components/backtest/wrapper");
const Date = require("../../../components/backtest/date");
const fs = require("fs");
const path = require ('path')
export default async (req, res) => {
    let rawdata = fs.readFileSync(
        path.join('components/backtest/testData/'+req.query.fileName),'utf8');
    let stockdata = JSON.parse(rawdata);

    let date = new Date({
        defaultDataCount:19,
        data:stockdata
    });

    const wrapper = new Wrapper({date, hightLoss:req.query.hightLoss, capital:req.query.capital, handlingFeeRebate:req.query.handlingFeeRebate, limitHandlingFee:req.query.limitHandlingFee});
    wrapper.run();
    let data = wrapper.show(true);
    res.status(200).send(data);
}
