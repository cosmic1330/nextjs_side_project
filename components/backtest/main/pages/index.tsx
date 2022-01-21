import { css, cx } from "@emotion/css";
import Page1 from "./page1";
import Page2 from "./page2";
import { useField } from "react-final-form";

const cssWrap = css`
  width: 100%;
  position: relative;
  overflow: hidden;
  height: calc(100vh - 56.5px);
`;

const cssSpace = css`
  width: 100%;
  height: 100%;
  position: absolute;
  transition: 1s;
`;
export default function Pages() {
  const { input } = useField("type");

  const cssPage1 = css`
    transform: translateX(0%);
  `;

  const cssPage2 = css`
    transform: translateX(-100%);
  `;

  const calcTrans = () => {
    if (input.value === "once") {
      return cssPage2;
    } else {
      return cssPage1;
    }
  };
  return (
    <div className={cssWrap}>
      <div className={cx(cssSpace, calcTrans())}>
        <Page1/>
        <Page2/>
      </div>
    </div>
  );
}
