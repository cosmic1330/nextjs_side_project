import { css } from "@emotion/css";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useRouter } from "next/router";
import DialogForm from "./dialogForm";

export default function Header() {
  const { palette, custom } = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cssHeader = css`
    padding: 10px 30px;
    /* color: #fff;
    background: ${palette.primary.main}; */
    color: ${palette.primary.main};
    font-weight: 900;
    box-shadow: 0 1px 5px #aaa;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const cssLngBtn = css`
    color: ${palette.primary.main};
    border-color: ${palette.primary.main};
    :hover {
      border-color: ${palette.primary.main};
    }
  `;

  const cssH1 = css`
    line-height: 1;
    margin: 0;
  `;

  const cssMenuItem = css`
    color: ${custom.text.dark2};
    :hover {
      background: ${custom.text.dark2};
      color: #fff;
    }
  `;

  const cssDiv = css`display:flex; gap:10px`;

  return (
    <header className={cssHeader}>
      <h1 className={cssH1}>BT</h1>
      <div className={cssDiv}>
        <DialogForm/>
        <Button variant="outlined" onClick={handleClick} className={cssLngBtn}>
          {router.locale}
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem
            className={cssMenuItem}
            onClick={() =>
              router.push("/backtest", "/backtest", { locale: "en" })
            }
          >
            En
          </MenuItem>
          <MenuItem
            className={cssMenuItem}
            onClick={() =>
              router.push("/backtest", "/backtest", { locale: "zh-CN" })
            }
          >
            简
          </MenuItem>
          <MenuItem
            className={cssMenuItem}
            onClick={() =>
              router.push("/backtest", "/backtest", { locale: "zh-TW" })
            }
          >
            繁
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}
