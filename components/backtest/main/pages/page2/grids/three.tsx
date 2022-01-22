import { css } from "@emotion/css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useTranslation } from "next-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Three({ grid, others, record }) {
  const { t } = useTranslation("backtest");
  const cssWrap = css`
    padding: 10px;
    border-radius: 3px;
    grid-column-start: ${grid[0]};
    grid-column-end: ${grid[1]};
    grid-row-start: ${grid[2]};
    grid-row-end: ${grid[3]};
    background: #f4f4f4;
    transition: 1s;
    overflow: auto;
  `;

  const data = {
    labels: [
      t("main.pages.page2.grids.three.UnsettledProfit") +
        ":" +
        others.unSoldProfit,
      t("main.pages.page2.grids.three.Profit") + ":" + record.profit,
    ],
    datasets: [
      {
        data: [others.unSoldProfit, record.profit],
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `總損益:${others.unSoldProfit + record.profit}`,
      },
    },
  };
  return (
    <div className={cssWrap}>
      <Pie data={data} options={options} />
    </div>
  );
}
