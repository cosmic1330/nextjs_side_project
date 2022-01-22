import { useField } from "react-final-form";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { css } from "@emotion/css";
import { useTranslation } from "next-i18next";
import DataLoading from "../loading/dataLoading";
import { useAppContext } from "../../../context/backtest";
import { memo } from "react";

export default memo(function Title() {
  const { input } = useField("type");
  const { t } = useTranslation("backtest");
  const { dataRunning } = useAppContext();
  const cssTitle = css`
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    z-index: 1;
    right: 0;
  `;
  const cssBtn = {
    containedPrimary: css`
      color: #fff;
      :hover {
        background-color: rgb(255, 179, 24);
      }
    `,
  };

  return (
    <div className={cssTitle}>
      <Stack spacing={2} direction="row">
        <Button
          classes={cssBtn}
          variant={input.value === "mutiple" ? "contained" : "outlined"}
          onClick={() => input.onChange("mutiple")}
        >
          {t("main.title.Mutiple")}
        </Button>
        <Button
          classes={cssBtn}
          variant={input.value === "once" ? "contained" : "outlined"}
          onClick={() => input.onChange("once")}
        >
          {t("main.title.Once")}
        </Button>
        {dataRunning && <DataLoading />}
      </Stack>
    </div>
  );
})
