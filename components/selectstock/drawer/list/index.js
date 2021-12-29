import { Fragment, useContext } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationImportantSharpIcon from "@mui/icons-material/NotificationImportantSharp";
import { css } from "@emotion/css";
import { useTheme } from "@mui/material/styles";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { SelectStockContext } from "../../../../context";

export default function ListCentent() {
  const { select, setSelect, onSubmit, method } = useContext(
    SelectStockContext
  );
  const theme = useTheme();
  const style = {
    item: {
      root: css`
        padding: 8px;
        color: ${theme.palette.primary.text1};
      `,
      selected: css`
        text-shadow: 2px 2px 2px ${theme.palette.primary.text2};
        .MuiSvgIcon-root {
          color: #ffba00;
        }
      `,
    },
    icon: {
      root: css`
        color: ${theme.palette.primary.text1};
      `,
    },
    text: {
      primary: css`
        font-size: 18px;
        font-weight: 400;
      `,
    },
  };
  const handleClick = (index) => () => {
    onSubmit(index, method);
    setSelect(index);
  };
  return (
    <List component="nav">
      <Fragment>
        <ListItem
          button
          disablePadding
          classes={style.item}
          selected={select === "buy"}
          onClick={handleClick("buy")}
        >
          <ListItemIcon classes={style.icon}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Buy" classes={style.text} />
        </ListItem>
        <ListItem
          button
          disablePadding
          classes={style.item}
          selected={select === "sell"}
          onClick={handleClick("sell")}
        >
          <ListItemIcon classes={style.icon}>
            <NotificationImportantSharpIcon />
          </ListItemIcon>
          <ListItemText primary="Sell" classes={style.text} />
        </ListItem>
        <ListItem
          button
          disablePadding
          classes={style.item}
          selected={select === "star"}
          onClick={handleClick("star")}
        >
          <ListItemIcon classes={style.icon}>
            <StarRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Star" classes={style.text} />
        </ListItem>
      </Fragment>
    </List>
  );
}
