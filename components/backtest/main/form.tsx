import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/material/Button";
import { css } from "@emotion/css";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useField } from "react-final-form";
import mq from "../theme/breakpoint";
import { useTranslation } from "next-i18next";
import { memo } from "react";

export default memo(function DialogForm() {
  const { custom } = useTheme();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("backtest");

  const regexNumber = (value) => {
    if (value) {
      let res = undefined;
      let reg = /^[0-9]*$/g;
      if (!reg.test(value)) {
        res = "Entry error";
      }
      return res;
    } else return undefined;
  };

  const regexValidate = (value) => {
    if (value) {
      let reg = /\d/g;
      let strArr = value.split(",");
      let res = undefined;
      // 比對
      for (let i = 0; i < strArr.length; i++) {
        const element = strArr[i];
        if (!reg.test(element) || element.length !== 4) {
          res = "Entry error";
          break;
        }
      }
      return res;
    } else return undefined;
  };

  const config = { validate: regexNumber };

  const { input: lowestHandlingFee, meta: lowestHandlingFeeMeta } = useField(
    "lowestHandlingFee",
    config
  );
  const { input: highestLoss, meta: highestLossMeta } = useField(
    "highestLoss",
    config
  );
  const { input: handlingFeeRebate, meta: handlingFeeRebateMeta } = useField(
    "handlingFeeRebate",
    config
  );
  const { input: capital, meta: capitalMeta } = useField("capital", config);
  const { input: hightStockPrice, meta: hightStockPriceMeta } = useField(
    "hightStockPrice",
    config
  );
  const { input: startDate, meta: startDateMeta } = useField(
    "startDate",
    config
  );
  const { input: endDate, meta: endDateMeta } = useField("endDate", config);
  const { input: justBuy, meta: justBuyMeta } = useField("justBuy", {
    validate: regexValidate,
  });

  const cssBtn = css`
    position: fixed;
    right: 40px;
    bottom: 40px;
    height: 60px;
    color: ${custom.text.dark};
    border-color: ${custom.text.dark};
    :hover {
      border-color: ${custom.text.dark};
    }
    ${mq[0]} {
      right: 20px;
      bottom: 20px;
      height: 40px;
    }
  `;

  const cssContent = css`
    & > * {
      padding: 20px 0;
    }
  `;

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Button variant="outlined" className={cssBtn} onClick={handleOpen}>
        <SettingsIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("main.form.SettingVariable")}</DialogTitle>
        <DialogContent className={cssContent}>
          <Stack direction="row" spacing={2}>
            <TextField
              label={t("main.form.StartDate")}
              fullWidth
              variant="standard"
              disabled
              value={startDate.value}
            />
            <TextField
              label={t("main.form.EndDate")}
              fullWidth
              variant="standard"
              disabled
              value={endDate.value}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label={t("main.form.LowestHandlingFee")}
              fullWidth
              variant="standard"
              value={lowestHandlingFee.value}
              InputProps={{
                startAdornment: <span style={{ marginRight: "5px" }}>$</span>,
              }}
              onChange={lowestHandlingFee.onChange}
              error={!lowestHandlingFeeMeta.valid}
              helperText={lowestHandlingFeeMeta.error}
            />
            <TextField
              label={t("main.form.HandlingFeeRebate")}
              fullWidth
              variant="standard"
              value={handlingFeeRebate.value}
              InputProps={{
                endAdornment: <span style={{ marginLeft: "5px" }}>%</span>,
              }}
              onChange={handlingFeeRebate.onChange}
              error={!handlingFeeRebateMeta.valid}
              helperText={handlingFeeRebateMeta.error}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label={t("main.form.HighestLoss")}
              variant="standard"
              fullWidth
              value={highestLoss.value}
              InputProps={{
                endAdornment: <span style={{ marginLeft: "5px" }}>%</span>,
              }}
              onChange={highestLoss.onChange}
              error={!highestLossMeta.valid}
              helperText={highestLossMeta.error}
            />
            <TextField
              label={t("main.form.LimitPurchasePrice")}
              variant="standard"
              fullWidth
              value={hightStockPrice.value}
              InputProps={{
                startAdornment: <span style={{ marginRight: "5px" }}>≤</span>,
              }}
              onChange={hightStockPrice.onChange}
              error={!hightStockPriceMeta.valid}
              helperText={hightStockPriceMeta.error}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <TextField
              label={t("main.form.Capital")}
              variant="standard"
              fullWidth
              value={capital.value}
              InputProps={{
                startAdornment: <span style={{ marginRight: "5px" }}>$</span>,
              }}
              onChange={capital.onChange}
              error={!capitalMeta.valid}
              helperText={capitalMeta.error}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <TextField
              disabled
              label={t("main.form.JustBuy")}
              variant="standard"
              fullWidth
              placeholder="2303,1101"
              value={justBuy.value}
              onChange={justBuy.onChange}
              error={!justBuyMeta.valid}
              helperText={justBuyMeta.error}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {t("common.Ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
})
