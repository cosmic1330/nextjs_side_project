import { createContext, useContext } from "react";
import { useState, useRef } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  // context
  // const [stockData, setStockData] = useState({});
  const stockData = useRef({});
  const [dataRunning, setDataRunning] = useState(true);

  const setStockData = (value) => (stockData.current = value);

  let sharedState = {
    dataRunning,
    setDataRunning,
    stockData: stockData.current,
    setStockData,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
