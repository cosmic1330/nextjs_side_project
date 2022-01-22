import { useRef, useCallback, useEffect, useState } from "react";

export default function useWorkerRunTest() {
  const workerRef = useRef<Worker>();
  const [context, setContext] = useState<any>();
  const [record, setRecord] = useState({});
  const [others, setOthers] = useState({});

  const runOnce = useCallback(async () => {
    workerRef.current?.postMessage({ num: 1 });
  }, [workerRef.current]);

  const runAll = useCallback(async () => {
    workerRef.current?.postMessage({ num: 365 });
  }, [workerRef.current]);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/runTest.worker.js", import.meta.url)
    );
    workerRef.current.onmessage = (e) => {
      setContext(e.data);
      setRecord(e.data.record);
      setOthers({
        ...{
          capital: e.data.capital,
          unSoldProfit: e.data.unSoldProfit,
          currentDate: e.data.dateSequence.currentDate,
          DatesData: e.data.dateSequence.DatesData,
          historyDates: e.data.dateSequence.historyDates,
        },
      });
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const set = useCallback((data, options) => {
    workerRef.current?.postMessage({ data, options, num: false });
  }, [workerRef.current]);


  return { set, context, runAll, runOnce, record, others };
}
