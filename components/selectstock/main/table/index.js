import { useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import { css } from "@emotion/css";
import { useTheme } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { SelectStockContext } from "../../../../context";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function BasicTable() {
  const theme = useTheme();
  const { list } = useContext(SelectStockContext);
  const style = {
    headerCell: {
      root: css`
        color: ${theme.palette.primary.text2};
        font-weight: 700;
        font-size: 18px;
      `,
    },
    bodyCell: {
      root: css`
        border: transparent;
        color: ${theme.palette.primary.text3};
        font-size: 18px;
      `,
    },
  };

  return (
    <TableContainer>
      <Table>
        {(!list.status || list.data.length === 0) && (
          <caption style={{ textAlign: "center", fontSize: "18px" }}>
            No Data
          </caption>
        )}
        <TableHead>
          <TableRow>
            <TableCell classes={style.headerCell}>Index</TableCell>
            <TableCell classes={style.headerCell} align="center">
              股票
            </TableCell>
            <TableCell classes={style.headerCell} align="center">
              股價
            </TableCell>
            <TableCell classes={style.headerCell} align="center">
              支撐 / 壓力
            </TableCell>
            <TableCell classes={style.headerCell} align="center">
              其他
            </TableCell>
            <TableCell classes={style.headerCell} align="left">
              黃金分割率
            </TableCell>
            <TableCell classes={style.headerCell} align="left">
              三關價
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.status && list.data.map((row, index) => (
            <TableRow key={row.name} hover>
              <TableCell classes={style.bodyCell} component="th" scope="row">
                {" "}
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.wantgoo.com/stock/${row.id}/major-investors/main-trend#main-trend`}
                >
                  {index + 1}
                </Link>
              </TableCell>
              <TableCell
                classes={style.bodyCell}
                component="th"
                scope="row"
                align="center"
              >
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={`https://pchome.megatime.com.tw/stock/sto0/ock1/sid${row.id}.html`}
                >
                  {row.name}
                </Link>{" "}
                (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={`https://tw.stock.yahoo.com/q/ta?s=${row.id}`}
                >
                  {row.id}
                </Link>
                )
              </TableCell>
              <TableCell classes={style.bodyCell} align="center">
                {row.c}
              </TableCell>
              <TableCell classes={style.bodyCell} align="center">
                {`${row.shore}`} / {`${row.pressure}`}
              </TableCell>
              <TableCell classes={style.bodyCell} align="center">
                <IconButton color="inherit">
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
              <TableCell classes={style.bodyCell} align="center">
                <Typography align="left">
                  超強勢 : {row.gold.data["超強勢"]}
                </Typography>
                <Typography align="left">
                  ---強勢 : {row.gold.data["強勢"]}
                </Typography>
                <Typography align="left">
                  ---中度 : {row.gold.data["中度"]}
                </Typography>
                <Typography align="left">
                  ---弱勢 : {row.gold.data["弱勢"]}
                </Typography>
                <Typography align="left">
                  超弱勢 : {row.gold.data["超弱勢"]}
                </Typography>
              </TableCell>
              <TableCell classes={style.bodyCell} align="center">
                <Typography align="left">上關 : {row.three["上關"]}</Typography>
                <Typography align="left">中關 : {row.three["中關"]}</Typography>
                <Typography align="left">下關 : {row.three["下關"]}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
