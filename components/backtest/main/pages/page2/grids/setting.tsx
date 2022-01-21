import { css } from "@emotion/css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { useField, useFormState } from "react-final-form";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { useAppContext } from "../../../../../../context/backtest";
import debounce from "lodash/debounce";

export default function Setting({
  grid,
  context,
  set,
  runOnce,
  runAll,
  others,
}) {
  const { values } = useFormState();
  const { input: startDate } = useField("startDate");
  const { input: endDate } = useField("endDate");
  const { stockData } = useAppContext();

  const cssWrap = css`
    padding: 10px;
    border-radius: 3px;
    grid-column-start: ${grid[0]};
    grid-column-end: ${grid[1]};
    grid-row-start: ${grid[2]};
    grid-row-end: ${grid[3]};
    background: #f4f4f4;
    transition: 1s;
    overflow: auto;
  `;

  const onSubmit = debounce(async () => {
    let data = stockData;
    if (values.justBuy) {
      data = {};
      let stocks = values.justBuy.split(",");
      stocks.map((id) => (data[id] = stockData[id]));
    }
    let options = {
      limitHandlingFee: parseInt(values.lowestHandlingFee),
      capital: parseInt(values.capital),
      hightStockPrice: parseInt(values.hightStockPrice),
      handlingFeeRebate: parseInt(values.handlingFeeRebate) / 100,
      hightLoss: parseInt(values.highestLoss) / 100,
    };
    set(data, options);
  }, 700);
  return (
    <Card variant="outlined" className={cssWrap}>
      <CardHeader
        avatar={<Avatar>S</Avatar>}
        title="Current Setting Variable"
        subheader={`${Object.keys(stockData).length || 0} stocks data`}
      />
      <CardContent>
        <StackContent title={"Start Date"} value={startDate.value} />
        <StackContent title={"End Date"} value={endDate.value} />
        <StackContent
          title={"Lowest Handling Fee"}
          value={`NT.${context?.transaction.limitHandlingFee || 0}`}
        />
        <StackContent
          title={"Handling Fee Rebate"}
          value={`${context?.transaction.handlingFeeRebate || 0}%`}
        />
        <StackContent
          title={"Highest Loss"}
          value={`${context?.hightLoss || 0}%`}
        />
        <StackContent
          title={"Limit Purchase Price"}
          value={`NT.${context?.hightStockPrice} / per share`}
        />
        <StackContent
          title={"Stocks"}
          value={`${context?.stockIds.length}`}
        />
        <StackContent title={"Capital"} value={`NT.${context?.capital || 0}`} />
        <StackContent
          title={"Current Date"}
          value={others?.currentDate || "********"}
        />
        <Divider />
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={onSubmit}>
          {context ? "Restart" : "Run Test"}
        </Button>
        {context && (
          <Tooltip title="Run once test">
            <Button variant="contained" onClick={runOnce}>
              Once
            </Button>
          </Tooltip>
        )}
        {context && (
          <Tooltip title="Run one year dates">
            <Button variant="contained" onClick={runAll}>
              One Year
            </Button>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}

function StackContent({ title, value }) {
  return (
    <Stack direction="row" spacing={2} mb={1} alignItems="center">
      <Typography
        variant="subtitle2"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <Typography variant="overline">{value}</Typography>
    </Stack>
  );
}
