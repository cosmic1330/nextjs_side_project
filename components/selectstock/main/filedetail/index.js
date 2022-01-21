import { useContext } from "react";
import { SelectStockContext } from "../../../../context/selectstock";
import { css } from "@emotion/css";
import { StyledButton } from "./index.css";
export default function FileDetail() {
  const style = {
    layout: css`
      font-size: 18px;
      color: #000;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      font-weight: 700;
    `,
  };
  const { list, method, select } = useContext(SelectStockContext);
  return (
    <div className={style.layout}>
      <div className="detailArea">
        <pre>
          資料時間： {list.date}{" "}
          使用方法: Method{method}{" "}
          操作: {select}
        </pre>
      </div>
      <div className="buttonArea">
        <StyledButton>取得CSV</StyledButton>
      </div>
    </div>
  );
}
