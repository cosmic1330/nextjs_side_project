import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Tooltip from "@mui/material/Tooltip";
import { createCSV, uuid } from "../../utils";
const style = {
  layout: css`
    padding: 20px;
    margin-top: 30px;
    border-radius: 21px;
    background-color: #655c5c;
    display: flex;
    align-items: flex-start;
    flex-shrink: 0;
    position: relative;
    .request {
      display: flex;
      gap: 20px;
      img {
        width: 50px;
        height: 50px;
      }
      .inner {
        padding: 10px;
        background-color: #524a4a;
        border-radius: 10px;
        word-break: break-word;
        color: #fff;
        word-spacing: 10px;
        letter-spacing: 0.2rem;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          left: -14px;
          top: 20px;
          border-width: 8px;
          border-style: solid;
          border-color: transparent #524a4a transparent transparent;
        }
      }
    }
    .response {
      width: 56%;
      color: #fff;
    }
  `,
  iconBtn: {
    root: css`
      position: absolute;
      color: #fff;
      right: 20px;
      z-index: 1;
    `,
  },
};
export default function ListComponent({ item }) {
  const [image, setImage] = useState(["dog", 1]);
  const random = () => {
    return Math.floor(Math.random() * 3);
  };

  const randomAnimal = () => {
    let animal = ["cat", "dog"];
    let data = Math.floor(Math.random() * 2);
    return animal[data];
  };

  const exportHistory = () => {
    let list = item.history.map((element) => {
      let obj = [
        element.id,
        element.name,
        element.inPrice,
        element.outPrice,
        element.inDate,
        element.outDate,
        element.buy,
        element.sell,
        element.profit,
        element.nowPrice,
        JSON.stringify(element.verification),
      ].join(",");
      return obj;
    });
    let header =
      "股票代號,股票名稱,買入股價,賣出股價,買入時間,賣出時間,買入價格,賣出價格,損益,賣出日收盤價,verification\n";
    let content = list.join("\n");
    let fileName = uuid();
    createCSV(fileName, header + content);
  };

  useEffect(() => {
    let animal = randomAnimal();
    let index = random();
    setImage([animal, index]);
  }, [item]);

  return (
    <div className={style.layout}>
      <Tooltip title="匯出歷史訊息.csv">
        <IconButton classes={style.iconBtn} onClick={exportHistory}>
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
      <div className="request">
        <img src={`../images/stock/${image[0]}-${image[1]}.png`} />
        <div className="inner">
          本金:${item.request.capital},<br />
          最高虧損:{item.request.hightLoss * 100}%,
          <br />
          最低手續費:${item.request.limitHandlingFee},<br />
          手續費折扣:{item.request.handlingFeeRebate * 100}%,
          <br />
          股價限制低於:${item.request.hightStockPrice}
          <br />
          測試檔案: {item.request.fileName}
        </div>
      </div>
      <div className="response">
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>本金：{item.data["本金"]}</ListItem>
          <ListItem>損益：{item.data["損益"]}</ListItem>
          <ListItem>
            勝率：{item.data["勝率"]} ( Win: {item.data["Win"]} ) / ( Lose:{" "}
            {item.data["Lose"]} )
          </ListItem>
          <ListItem>未實現損益：{item.data["未實現損益"]}</ListItem>
          <ListItem>
            進出點：
            <br />
            {item.data["進出點"]}
          </ListItem>
          <ListItem>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                目前持股 ({Object.keys(item.data["目前持股"]).length})
              </AccordionSummary>
              {Object.keys(item.data["目前持股"]).map((element, index) => (
                <AccordionDetails key={index}>
                  <Typography>
                    股票：{item.data["目前持股"][element]["id"]}{" "}
                    {item.data["目前持股"][element]["name"]}
                    <br />
                    買進價錢：{item.data["目前持股"][element]["buy"]}
                    <br />
                    買進日期：{item.data["目前持股"][element]["inDate"]}
                    <br />
                    買進股數：{item.data["目前持股"][element]["count"]}
                    <br />
                    買進股價 / 現價：{
                      item.data["目前持股"][element]["inPrice"]
                    }{" "}
                    / {item.data["目前持股"][element]["nowPrice"]}
                  </Typography>
                </AccordionDetails>
              ))}
            </Accordion>
          </ListItem>
        </List>
      </div>
    </div>
  );
}
