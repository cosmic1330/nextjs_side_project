import { css, cx, keyframes } from "@emotion/css";
import { useTranslation } from "next-i18next";
const spinning = keyframes`100% { transform: rotate(360deg) }`;
const scaling = keyframes`50% {transform: scale(1.2)}`;
const cssLoading = css`
  position: absolute;
  right: 20px;
  bottom: -50px;
  text-align: center;
  .spinner {
    width: 40px;
    display: flex;
    flex-wrap: wrap;
    animation: ${spinning} 4s linear 0s infinite;
  }

  .petal {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin: 2px;
    animation: ${scaling} 1.5s linear infinite;
  }

  #p1 {
    background: #f2ee6f; /* yellow */
    border-bottom-right-radius: 0;
    transform-origin: bottom right;
  }

  #p2 {
    background: #e693ed; /* pink */
    border-bottom-left-radius: 0;
    transform-origin: bottom left;
    animation-delay: 0.5s;
  }

  #p3 {
    background: #83b1d6; /* blue */
    border-top-right-radius: 0;
    transform-origin: top right;
    animation-delay: 1.5s;
  }

  #p4 {
    background: #cf6f6d; /* red */
    border-top-left-radius: 0;
    transform-origin: top left;
    animation-delay: 1s;
  }

  span {
    color: #fff;
    position: absolute;
    bottom: -55px;
    left: -8px;
    font-family: lato;
    font-weight: bold;
    text-shadow: 0px 0px 2px #000;
  }
`;
export default function DataLoading() {
  const { t } = useTranslation("backtest");
  return (
    <div className={cssLoading}>
      <div className="spinner">
        <div className="petal" id="p1"></div>
        <div className="petal" id="p2"></div>
        <div className="petal" id="p3"></div>
        <div className="petal" id="p4"></div>
      </div>
      <span>{t("loading.dataLoading.LoadingData")}</span>
    </div>
  );
}
