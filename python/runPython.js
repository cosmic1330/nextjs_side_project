// 執行命令: node -r dotenv/config .\runPython.js dotenv_config_path=../.env.local
/* 
    執行python爬蟲 並儲存至mangodb cloud
    取得資料:
        當季eps
        當日殖利率
*/
const exec = require("child_process").exec;
const { MongoClient } = require("mongodb");

execPython();

function execPython() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect((err) => {
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("eps");
    collection.remove();
    exec("python index.py", async function (error, result, res) {
      let { season, dataList } = JSON.parse(result);
      await collection.insertOne({ dataList: dataList, season: season });
      console.log(result);
      client.close();
    });
  });
}
