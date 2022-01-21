import { useRef, useEffect } from "react";
import urljoin from "url-join";
import { useAppContext } from "../../../context/backtest";

export default function useWorkerStockData() {
  const workerRef = useRef<Worker>();
  const { setStockData, setDataRunning } = useAppContext();

  useEffect(() => {
    setDataRunning(true);
    workerRef.current = new Worker(
      new URL("../workers/stockData.worker.js", import.meta.url)
    );
    workerRef.current.onmessage = (e) => {
      // console.log(e.data);
      setStockData(e.data);
      setDataRunning(false);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const set = (ids) => {
    const hostPort = process.env.NEXT_PUBLIC_HOST_PORT;
    var url = urljoin(hostPort, "api", "backtest", "getStockData?");
    workerRef.current?.postMessage({ ids, url });
  };

  return { set };
}
