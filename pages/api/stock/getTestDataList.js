const fs = require("fs");
const path = require ('path')
export default async (req, res) => {
    let jsonFiles = [];
    let files = fs.readdirSync(path.join('components/backtest/testData'));
    files.forEach((item, index)=>{
        jsonFiles.push(item);
    })
    res.status(200).json(jsonFiles);
}
