import { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Drawer from "../../components/selectstock/drawer";
import ThemeProvider from "../../components/selectstock/theme";
import Main from "../../components/selectstock/main";
import { SelectStockContext } from "../../context/selectstock";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SelectStock() {
  const [list, setList] = useState([]);
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
        <Main>選股</Main>
      </SelectStockContext.Provider>
      <Snackbar
        open={false}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert severity="error">Error</Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  // 取得今日買進推薦股

  // 取得今日賣出推薦股
  return { props: {} };
}
