import { useState, useEffect } from "react";
import urljoin from "url-join";

export default function useStockIds() {
  const [ids, setIds] = useState([]);

  useEffect(() => {
    (async () => {
      let stockIds = await getData();
      setIds(stockIds);
      // setIds(["2330", "2303", "1101"]);
    })();
  }, []);

  async function getData() {
    const hostPort = process.env.NEXT_PUBLIC_HOST_PORT;
    let url = urljoin(hostPort, "api", "backtest", "getAllStockId");
    let stockIds = fetch(url).then((res) => res.json());
    return stockIds;
  }

  return ids;
}
