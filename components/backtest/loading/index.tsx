import { css, cx, keyframes } from "@emotion/css";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import mq from "../theme/breakpoint";

const line = keyframes`
  0% {
    left:0%;
  }

  100% {
    left:calc(100% - 50px);
  }
`;

export default function Loading({ disabled }) {
  const [state, setState] = useState("loading");
  const { custom, palette } = useTheme();
  useEffect(() => {
    setState(disabled ? "loading" : "finish");
  }, [disabled]);
  const cssBg = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    width: 100%;
    z-index: 2;
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      height: 100%;
      background: ${palette.primary.main};
      transition: 1s;
      z-index: -1;
    }
    &.loading::before {
      left: 0;
      width: 50%;
      ${mq[0]} {
        top: 0;
        width: 100%;
        height: 50%;
      }
    }
    &.finish::before {
      left: 0;
      width: 0%;
      ${mq[0]} {
        top: 0;
        height: 50%;
      }
    }
    &.loading::after {
      right: 0;
      width: 50%;
      ${mq[0]} {
        bottom: 0%;
        width: 100%;
        height: 50%;
      }
    }
    &.finish::after {
      right: 0;
      width: 0%;
      ${mq[0]} {
        bottom: 0%;
        height: 50%;
      }
    }
    &.finish {
      opacity: 0;
      z-index: -999999999999999999;
      transition: 1s 2s;
    }
  `;
  const cssText = css`
    font-size: 150px;
    font-weight: 600;
    text-align: center;
    position: relative;
    color: ${custom.text.dark};
    ${mq[0]} {
      font-size: 60px;
    }
    &.finish {
      transition: transform 1s;
      transform: translateY(-150px);
      ${mq[0]} {
        transform: translateY(-60px);
      }
    }
    &::before {
      position: absolute;
      content: "";
      display: inline-block;
      height: 10px;
      width: 50px;
      background: ${custom.text.dark};
      bottom: 20px;
      left: 0%;
      animation: ${line} 1s ease-out infinite;
      animation-fill-mode: backwards;
      ${mq[0]} {
        bottom: 0px;
        height: 5px;
      }
    }
    &.finish::before {
      width: 100%;
      transition: 1s;
      animation: none;
      left: 0%;
    }
    &::after {
      text-align: center;
      z-index: -1;
      width: 100%;
      content: "Starting";
      display: block;
      position: absolute;
      bottom: -170px;
      opacity: 0;
      transition: 0.5s;
      ${mq[0]} {
        bottom: -80px;
      }
    }
    &.finish::after {
      opacity: 1;
      transition-delay: 1s;
    }
  `;

  return (
    <div className={cx(cssBg, state)}>
      <span className={cx(cssText, state)}>BackTest</span>
    </div>
  );
}
