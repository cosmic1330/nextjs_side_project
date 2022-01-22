import { css } from "@emotion/css";
import { Fragment, useCallback, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ExplicitIcon from "@mui/icons-material/Explicit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { createCSV } from "../../../../../../utils";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import DialogContent from "@mui/material/DialogContent";
import { useTranslation } from "next-i18next";

export default function Four({ grid, record, others }) {
  const { t } = useTranslation("backtest");
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const exportTestResult = useCallback(() => {
    if (record?.history) {
      let list = record.history.map((item) => {
        let obj = [
          item.buy["name"],
          item.buy["t"],
          item.sell["t"],
          item.buy["buyPrice"],
          item.sell["sellPrice"],
          item.sell["sellPrice"] - item.buy["buyPrice"],
          item.buy["detail"].replace(/,/g, " | "),
          item.sell["detail"].replace(/,/g, " | "),
        ].join(",");
        return obj;
      });
      list.push(`, , , , , , , \n`);
      let header =
        "股票名稱,買進時間,賣出時間,買進金額,賣出金額,損益,買進原因,賣出原因\n";
      let content = list.join("\n");
      let header2 = "剩餘本金,已結算損益,持股損益,總損益,贏,輸,勝率,庫存數\n";
      let content2 =
        [
          others.capital,
          record.profit,
          others.unSoldProfit,
          record.profit + others.unSoldProfit,
          record.win,
          record.lose,
          record.win / (record.win + record.lose),
          Object.keys(record.inventory).length,
        ].join(",") + "\n";
      createCSV("test_history_record", header + content + header2 + content2);
    } else {
      alert("Please run test first.");
    }
  }, [record, others]);

  const cssWrap = css`
    padding: 10px;
    border-radius: 3px;
    grid-column-start: ${grid[0]};
    grid-column-end: ${grid[1]};
    grid-row-start: ${grid[2]};
    grid-row-end: ${grid[3]};
    background: #f4f4f4;
    transition: 1s;
  `;

  const chips = useCallback(() => {
    return (
      record?.inventory &&
      Object.keys(record.inventory).map((id) => (
        <Chip label={id} size="small" variant="outlined" key={id} />
      ))
    );
  }, [record]);
  return (
    <div className={cssWrap}>
      <Typography variant="h6" gutterBottom component="div">
        {t("main.pages.page2.grids.four.Inventory")}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {chips()}
      </Box>

      <Typography variant="h6" gutterBottom component="div">
        <Stack direction="row" spacing={2} alignItems="center">
          <span>{t("main.pages.page2.grids.four.PurchaseRecord")}</span>
          <Tooltip title={t("main.pages.page2.grids.four.ExportExcel")}>
            <IconButton color="success" onClick={exportTestResult}>
              <ExplicitIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Typography>
      <Button color="secondary" variant="contained" onClick={handleClickOpen}>
        {t("main.pages.page2.grids.four.SeeDetail")}
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        history={record?.history}
      />
    </div>
  );
}

interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  history?: any;
}

function SimpleDialog({ onClose, open, history = [] }: SimpleDialogProps) {
  const { t } = useTranslation("backtest");
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        {t("main.pages.page2.grids.four.PurchaseRecord")}
      </DialogTitle>
      <DialogContent sx={{ maxHeight: "80vh" }}>
        {history.length > 0
          ? history.map((item, index) => (
              <Fragment key={index}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="overline">{item.buy["name"]}</Typography>
                </Stack>
                <Stack direction="row" spacing={4} alignItems={"center"}>
                  <Typography variant="overline">
                    {t("main.pages.page2.grids.four.BuyPrice")}: $
                    {item.buy["buyPrice"]}
                  </Typography>
                  <Typography variant="overline">
                    {t("main.pages.page2.grids.four.SellPrice")}: $
                    {item.sell["sellPrice"]}
                  </Typography>
                  <Typography variant="overline">
                    {t("main.pages.page2.grids.four.BuyDate")}: {item.buy["t"]}
                  </Typography>
                  <Typography variant="overline">
                    {t("main.pages.page2.grids.four.SellDate")}:{" "}
                    {item.sell["t"]}
                  </Typography>

                  <Typography variant="overline">
                    {t("main.pages.page2.grids.four.Profit")}: $
                    {item.sell["sellPrice"] - item.buy["buyPrice"]}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography variant="caption">
                    {t("main.pages.page2.grids.four.BuyRequirement")}:{" "}
                    {item.buy["detail"]}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography variant="caption">
                    {t("main.pages.page2.grids.four.SellRequirement")}:{" "}
                    {item.sell["detail"]}
                  </Typography>
                </Stack>
                <Divider />
              </Fragment>
            ))
          : t("main.pages.page2.grids.four.NotFoundData")}
      </DialogContent>
    </Dialog>
  );
}
