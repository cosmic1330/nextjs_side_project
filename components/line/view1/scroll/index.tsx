import { css, keyframes } from "@emotion/css";

const bounce = keyframes`
  0% {
    top:0%;
    transform:translateY(-100%);
  }
  100% {
    top:100%;
    transform:translateY(100%);
  }
`;

const bounce2 = keyframes`
  0% {
    transform:translateY(0px);
  }
  50% {
    transform:translateY(5px);
  }
  100% {
    transform:translateY(0px);
  }
`;

const cssScroll = css`
    visibility: hidden;
  @media screen and (min-width: 1200px) {
    visibility:initial;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    span {
      display: inline-block;
      font-size: 12px;
      animation: ${bounce2} 1s ease infinite;
      text-shadow: 0 0 1px #999;
    }
    .line {
      margin-top: 10px;
      height: 100px;
      overflow: hidden;
      position: relative;
      text-align: center;
      &::after {
        content: "";
        display: inline-block;
        width: 1px;
        height: 80px;
        position: absolute;
        background-color: #fff;
        box-shadow: 0 0 1px #999;
        animation: ${bounce} 1.5s ease infinite;
      }
    }
  }
`;
function Scroll() {
  return (
    <div className={cssScroll}>
      <span>Scroll</span>
      <div className="line"></div>
    </div>
  );
}
export default Scroll;
