import { useState } from "react";
import Alert from "@material-ui/core/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Drawer from "../../components/selectstock/drawer";
import ThemeProvider from "../../components/selectstock/theme";
import Main from "../../components/selectstock/main";
import { SelectStockContext } from "../../context";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SelectStock({ buyData }) {
  const [list, setList] = useState(buyData);
  const [select, setSelect] = useState("buy");
  const [hover, setHover] = useState(true);
  const [method, setMethod] = useState(3);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (type, methodIndex) => {
    setLoading(true);
    if (type === "buy" || type === "sell") {
      const res = await fetch(
        `http://localhost:3000/api/selectstock/${type}/method${methodIndex}`
      );
      let response = await res.json();
      setList(response);
      setMethod(methodIndex);
    } else {
      alert("尚未開發");
    }
    setLoading(false);
  };

  return (
    <ThemeProvider>
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <SelectStockContext.Provider
        value={{
          select,
          setSelect,
          hover,
          setHover,
          list,
          method,
          onSubmit,
        }}
      >
        <Drawer />
        {(select === "buy" || select === "sell") && <Main></Main>}
      </SelectStockContext.Provider>
      <Snackbar
        open={!buyData.status}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert severity="error">{!buyData.status && buyData.data}</Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  // 取得今日買進推薦股
  const res = await fetch(`http://localhost:3000/api/selectstock/buy/method3`);
  const buyData = await res.json();

  // 取得今日賣出推薦股
  const res2 = await fetch(
    `http://localhost:3000/api/selectstock/sell/method3`
  );
  const sellData = await res2.json();
  return { props: { buyData, sellData } };
}
