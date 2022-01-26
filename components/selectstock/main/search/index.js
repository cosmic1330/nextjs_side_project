import { useContext } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { css } from "@emotion/css";
import { SelectStockContext } from "../../../../context/selectstock";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

export default function Search() {
  const { select, method } = useContext(SelectStockContext);
  const theme = useTheme();

  const style = {
    layout: css`
      display: flex;
      justify-content: flex-end;
      position: relative;
    `,
    select: {
      root: css`
        width: 300px;
        border-radius: 0 100px 100px 0;
        background-color: ${theme.palette.primary.secound};
        & .MuiOutlinedInput-notchedOutline {
          border: none;
        }
      `,
      select: css`
        padding: 8.5px;
      `,
    },
    icon: css`
      display: flex;
      color: ${theme.palette.primary.text1};
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: ${theme.palette.primary.main};
      align-items: center;
      justify-content: center;
      position: absolute;
      z-index: 1;
      right: 275px;
    `,
  };
  return (
    <div className={style.layout}>
      <span className={style.icon}>
        <SearchIcon fontSize={"medium"} />
      </span>
      <Select
        classes={style.select}
        defaultValue={method}
        labelId="方法"
      >
        <MenuItem value={1}>Method1</MenuItem>
        <MenuItem value={2}>Method2</MenuItem>
        <MenuItem value={3}>Method3</MenuItem>
      </Select>
    </div>
  );
}
