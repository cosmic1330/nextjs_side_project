import { useContext } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { css } from "@emotion/css";
import { SelectStockContext } from "../../../../context";
import SearchIcon from "@material-ui/icons/Search";
import { useTheme } from "@material-ui/core/styles";

export default function Search() {
  const { select, onSubmit, method } = useContext(SelectStockContext);
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
        border-radius: 0 100px  100px   0;
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
        onChange={(element) => onSubmit(select, element.target.value)}
        labelId="方法"
      >
        <MenuItem value={1}>Method1</MenuItem>
        <MenuItem value={2}>Method2</MenuItem>
        <MenuItem value={3}>Method3</MenuItem>
      </Select>
    </div>
  );
}
