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
import { useAppContext } from "../../../../../../context/backtest";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

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
  const [disabled, setDisabled] = useState(false);
  const { t } = useTranslation("backtest");

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

  const handleRunAll = () => {
    setDisabled(true);
    runAll();
  };

  const onSubmit = debounce(async () => {
    setDisabled(true);
    let data;
    let options = {
      limitHandlingFee: parseInt(values.lowestHandlingFee),
      capital: parseInt(values.capital),
      hightStockPrice: parseInt(values.hightStockPrice),
      handlingFeeRebate: parseInt(values.handlingFeeRebate) / 100,
      hightLoss: parseInt(values.highestLoss) / 100,
    };
    if (values.justBuy === "all") {
      const res = await fetch(`http://localhost:3000/api/selectstock/get`, {
        method: "post",
      });
      data = await res.json();
    } else if (values.justBuy === "random") {
      data = stockData;
    } else {
      const res = await fetch(`http://localhost:3000/api/selectstock/get`, {
        method: "post",
        body: JSON.stringify({ id: values.justBuy }),
      });
      data = await res.json();
    }
    set(data, options);
  }, 700);

  const Subheader = () => (
    <Stack direction="row" spacing={2} gap={1} alignItems="center">
      {`${Object.keys(stockData).length || 0} ${t(
        "main.pages.page2.grids.setting.StocksData"
      )}`}
      <Tooltip title={t("main.pages.page2.grids.setting.Help")}>
        <HelpOutlineOutlinedIcon fontSize="small" />
      </Tooltip>
    </Stack>
  );

  useEffect(() => {
    setDisabled(false);
  }, [context]);
  return (
    <Card variant="outlined" className={cssWrap}>
      <CardHeader
        avatar={<Avatar>S</Avatar>}
        title={t("main.pages.page2.grids.setting.CurrentSettingVariable")}
        subheader={<Subheader />}
      />
      <CardContent>
        <StackContent
          title={t("main.pages.page2.grids.setting.StartDate")}
          value={startDate.value}
        />
        <StackContent
          title={t("main.pages.page2.grids.setting.EndDate")}
          value={endDate.value}
        />
        <StackContent
          title={t("main.pages.page2.grids.setting.LowestHandlingFee")}
          value={`NT.${context?.transaction.limitHandlingFee || 0}`}
        />
        <StackContent
          title={t("main.pages.page2.grids.setting.HandlingFeeRebate")}
          value={`${context?.transaction.handlingFeeRebate * 100 || 0}%`}
        />
        <StackContent
          title={t("main.pages.page2.grids.setting.HighestLoss")}
          value={`-${context?.hightLoss * 100 || 0}%`}
        />
        <StackContent
          title={t("main.pages.page2.grids.setting.LimitPurchasePrice")}
          value={`NT.${context?.hightStockPrice} / ${t(
            "main.pages.page2.grids.setting.PerShare"
          )}`}
        />
        <StackContent
          title={t("main.pages.page2.grids.setting.Stocks")}
          value={`${context?.stockIds.length}`}
        />
        <StackContent
          title={t("main.pages.page2.grids.setting.Capital")}
          value={`NT.${context?.capital || 0}`}
        />
        <StackContent
          title={t("main.pages.page2.grids.setting.CurrentDate")}
          value={others?.currentDate || "********"}
        />
        <Divider />
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={onSubmit} disabled={disabled}>
          {context
            ? t("main.pages.page2.grids.setting.Restart")
            : t("main.pages.page2.grids.setting.RunTest")}
        </Button>
        {context && (
          <Button variant="contained" onClick={runOnce} disabled={disabled}>
            {t("main.pages.page2.grids.setting.Once")}
          </Button>
        )}
        {context && (
          <Button
            variant="contained"
            onClick={handleRunAll}
            disabled={disabled}
          >
            {t("main.pages.page2.grids.setting.OneYear")}
          </Button>
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
