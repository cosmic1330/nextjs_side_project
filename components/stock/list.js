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
          本金:${item.capital},<br />
          最高虧損:{item.hightLoss * 100}%,
          <br />
          最低手續費:${item.limitHandlingFee},<br />
          手續費折扣:{item.handlingFeeRebate * 100}%,
          <br />
          股價限制低於:${item.hightStockPrice}
          <br />
          測試檔案: {item.fileName}
        </div>
      </div>
      <div className="response">
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>本金：{item["本金"]}</ListItem>
          <ListItem>損益：{item["損益"]}</ListItem>
          <ListItem>
            勝率：{item["勝率"]} ( Win: {item["Win"]} ) / ( Lose: {item["Lose"]}{" "}
            )
          </ListItem>
          <ListItem>未實現損益：{item["未實現損益"]}</ListItem>
          <ListItem>
            進出點：
            <br />
            {item["進出點"]}
          </ListItem>
          <ListItem>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                目前持股 ({Object.keys(item["目前持股"]).length})
              </AccordionSummary>
              {Object.keys(item["目前持股"]).map((element) => (
                <AccordionDetails>
                  <Typography>
                    股票：{item["目前持股"][element]["id"]}{" "}
                    {item["目前持股"][element]["name"]}
                    <br />
                    買進價錢：{item["目前持股"][element]["buy"]}
                    <br />
                    買進日期：{item["目前持股"][element]["inDate"]}
                    <br />
                    買進股數：{item["目前持股"][element]["count"]}
                    <br />
                    買進股價 / 現價：{
                      item["目前持股"][element]["inPrice"]
                    } / {item["目前持股"][element]["nowPrice"]}
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
