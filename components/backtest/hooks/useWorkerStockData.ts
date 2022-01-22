import { useRef, useEffect, useCallback } from "react";
import urljoin from "url-join";
import { useAppContext } from "../../../context/backtest";

export default function useWorkerStockData() {
  const workerRef = useRef<Worker>();
  const { setStockData, setDataRunning, stockData } = useAppContext();

  useEffect(() => {
    setDataRunning(true);
    workerRef.current = new Worker(
      new URL("../workers/stockData.worker.js", import.meta.url)
    );
    workerRef.current.onmessage = (e) => {
      setStockData(e.data);
      setDataRunning(false);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const set = useCallback((ids) => {
    const hostPort = process.env.NEXT_PUBLIC_HOST_PORT;
    var url = urljoin(hostPort, "api", "backtest", "getStockData?");
    workerRef.current?.postMessage({ ids, url });
  }, [workerRef.current]);

  return { set, stockData };
}
