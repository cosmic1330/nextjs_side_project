import { css } from "@emotion/css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Three({ grid, others, record }) {
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
    labels: ["Unsettled Profit:"+others.unSoldProfit, "Profit:"+record.profit],
    datasets: [
      {
        data: [others.unSoldProfit, record.profit],
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className={cssWrap}>
      <Pie data={data} />
    </div>
  );
}
