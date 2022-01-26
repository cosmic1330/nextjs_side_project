import { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Drawer from "../../components/selectstock/drawer";
import ThemeProvider from "../../components/selectstock/theme";
import Main from "../../components/selectstock/main";
import { SelectStockContext } from "../../context/selectstock";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import useList from "../../components/selectstock/hooks/useList";

export default function SelectStock({ data }) {
  const [select, setSelect] = useState("buy");
  const [hidden, setHidden] = useState(true);
  const [method, setMethod] = useState(3);
  const [loading, setLoading] = useState(false);
  const list = useList(data, select);

  const get = async () => {};

  return (
    <ThemeProvider>
      <Backdrop open={loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      <SelectStockContext.Provider
        value={{
          select,
          setSelect,
          hidden,
          setHidden,
          list,
          method,
        }}
      >
        <Drawer />
        <Main></Main>
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
  const res = await fetch(`http://localhost:3000/api/selectstock/get`);
  const data = await res.json();
  return { props: { data } };
}
