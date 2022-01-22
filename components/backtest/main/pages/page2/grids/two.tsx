import { css } from "@emotion/css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import { memo } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Win and Lose",
    },
  },
};

export default function Two({ grid, record }) {
  const { custom, palette } = useTheme();
  const { t } = useTranslation("backtest");
  const labels = [
    t("main.pages.page2.grids.two.WinRate") +
      `:${
        record.win && record.lose
          ? (record.win / (record.win + record.lose)).toFixed(2)
          : 0
      }`,
  ];
  const data = {
    labels,
    datasets: [
      {
        label: `${t("main.pages.page2.grids.two.Win")}:${record.win || 0}`,
        data: [record.win],
        backgroundColor: [palette.primary.main],
      },
      {
        label: `${t("main.pages.page2.grids.two.Lose")}:${record.lose || 0}`,
        data: [record.lose],
        backgroundColor: [custom.text.dark],
      },
    ],
  };

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
  return (
    <div className={cssWrap}>
      <Bar options={options} data={data} />
    </div>
  );
}
