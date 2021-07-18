import { Fragment, useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import NotificationImportantSharpIcon from "@material-ui/icons/NotificationImportantSharp";
import { css } from "@emotion/css";
import { useTheme } from "@material-ui/core/styles";
import StarRoundedIcon from "@material-ui/icons/StarRounded";
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
