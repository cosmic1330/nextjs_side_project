import { useEffect, useState } from "react";
import urljoin from "url-join";
import qs from "qs";
import { fakeData } from "../fakeData";
import { Ma } from "@ch20026103/anysis";

export default function useDate(router) {
  const [datasets, setDatasets] = useState([]);
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    (async () => {
      let input = fakeData;
      if (JSON.stringify(router.query) !== "{}") {
        let id = router.query.id;
        var url = urljoin(
          "http://localhost:3000/",
          "api",
          "backtest",
          "getStockData?" + qs.stringify({ id })
        );
        await fetch(url)
          .then((res) => res.json())
          .then((data) => (input = data));
      }
      let ma = new Ma();
      let bolls = ma.getBoll(input);
      let chartDatasets = [
        {
          label: "c",
          data: input.map((item) => item.c),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          yAxisID: "y",
        },
        {
          label: "Dataset 2",
          data: bolls.map((item) => item.bollUb),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Dataset 3",
          data: bolls.map((item) => item.bollLb),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ];
      let labelData = input.map((item) => item.t);
      setLabels(labelData);
      setDatasets(chartDatasets);
    })();
  }, [router]);
  return { datasets, labels };
}
