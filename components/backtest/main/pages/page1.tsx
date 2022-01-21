import { css } from "@emotion/css";
import { FormSpy } from "react-final-form";
import { useAppContext } from "../../../../context/backtest";

const cssWrap = css`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background: #faa;
  padding-top: 56.5px;
`;
export default function Page1() {
  const { stockData } = useAppContext();
  return (
    <div className={cssWrap}>
      {" "}
      "page1"
      <FormSpy>
        {(props) => <pre>{JSON.stringify(stockData, undefined, 2)}</pre>}
      </FormSpy>
    </div>
  );
}
