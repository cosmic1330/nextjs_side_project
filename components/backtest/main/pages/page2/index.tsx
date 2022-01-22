import { css } from "@emotion/css";
import Setting from "./grids/setting";
import One from "./grids/one";
import Two from "./grids/two";
import Three from "./grids/three";
import Four from "./grids/four";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useWorkerRunTest from "../../../hooks/useWorkerRunTest";
import { memo } from "react";

export default memo(function Page2() {
  const { custom, palette } = useTheme();
  const { context, set, runOnce, runAll, record, others } = useWorkerRunTest();
  const [gridPosition, setGridPosition] = useState({
    setting: [3, 4, 1, 4],
    one: [1, 2, 1, 3],
    two: [1, 2, 3, 4],
    three: [2, 3, 1, 3],
    four: [2, 3, 3, 4],
  });

  const cssWrap = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateX(100%);
    padding-top: 56.5px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: #555;
    grid-auto-rows: 33%;
    grid-gap: 10px;
    padding: 20px;
    //捲軸底色
    *::-webkit-scrollbar-track {
      background-color: ${custom.text.dark2};
    }
    //捲軸寬度
    *::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: black;
    }
    //捲軸本體顏色
    *::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: ${palette.primary.main};
      border-radius: 50px;
    }
  `;

  return (
    <div className={cssWrap}>
      <Setting
        {...{
          grid: gridPosition.setting,
          context,
          set,
          runOnce,
          runAll,
          others,
        }}
      />
      <One {...{ grid: gridPosition.one, context, record }} />
      <Two {...{ grid: gridPosition.two, record }} />
      <Three {...{ grid: gridPosition.three, others, record }} />
      <Four {...{ grid: gridPosition.four, record, others }} />
    </div>
  );
})
