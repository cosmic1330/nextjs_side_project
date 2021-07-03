import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
const style = css`
  padding: 20px;
  margin: auto;
  margin-top: 50px;
  border-radius: 21px;
  width: 75%;
  background-color: #655c5c;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
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
`;
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

  useEffect(() => {
    let animal = randomAnimal();
    let index = random();
    setImage([animal, index]);
  }, [item]);

  return (
    <div className={style}>
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
