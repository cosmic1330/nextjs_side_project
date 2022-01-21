import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import urljoin from "url-join";
import qs from "qs";

export default function useWorkerRunTest() {
  const stockData = useRef({});
  const [cancelToken, setCancelToken] = useState({});

  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  const cancel = () => {
    for (const id in cancelToken) {
      if (Object.prototype.hasOwnProperty.call(cancelToken, id)) {
        const controller = cancelToken[id];
        controller.abort();
      }
    }
  };

  const set = useCallback(
    (id) => {
      const hostPort = process.env.NEXT_PUBLIC_HOST_PORT;
      if (stockData.current.hasOwnProperty(id)) return;
      const controller = new AbortController();
      const signal = controller.signal;
      var url = urljoin(
        hostPort,
        "api",
        "backtest",
        "getStockData?" + qs.stringify({ id })
      );
      // save cancel token
      setCancelToken((pre) => {
        return { ...pre, [id]: controller };
      });
      fetch(url, { signal })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          stockData.current[id] = data;
          //clear cancel token
          setCancelToken((pre) => {
            delete pre[id];
            return { ...pre };
          });
        });
    },
    [stockData.current]
  );

  const get = useCallback(
    (id = undefined) => {
      if (Array.isArray(id)) {
        let res = {};
        id.forEach((element) => {
          if (stockData.current.hasOwnProperty(element))
            res[element] = stockData.current[element];
        });
        return res;
      } else if (id && stockData.current.hasOwnProperty(id))
        return stockData.current[id];
      else return stockData.current;
    },
    [stockData.current]
  );

  const res = useMemo(() => {
    return { set, get };
  }, [set, get]);

  return res;
}
