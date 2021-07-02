const fs = require("fs");
let rawdata = fs.readFileSync("./testData/20210701.json");
let stockdata = JSON.parse(rawdata);

let manyStock = '2330'
let lessStock = '1101'
let index=0; // 第n筆資料不同
/* 
    填補資料方法：
        今日缺失資料已昨日值填補。
*/

// 改寫
// function check(){
//     Object.keys(stockdata).forEach(key => {
//         let date = [];
//         let alldate = stockdata[lessStock].map(item=>item.t);
//         let stock = stockdata[key];
//         let stockdate = stock.map(item=>item.t);
//         date = stockdate.map((element, index)=>{
//             let i =alldate.findIndex(item=>item===element);
//             if(i===-1){
//                 return 
//             }
//         });
//         console.log(date);
        
//     });
//     console.log(date);
// }
// check();

// 複查
let lengthArr = Object.keys(stockdata).map((element) => {
    return stockdata[element].length;
  });
let length =
    [...new Set(lengthArr)].length === 1
      ? lengthArr[0]
      : [...new Set(lengthArr)];
console.log(length);

// let json = JSON.stringify(stockdata);
// fs.writeFile('./20210629.json', json, 'utf8', ()=>console.log('success'));