import { useEffect, useState } from 'react'
import { css, cx } from '@emotion/css'
import 'animate.css';

const style = css`
  @keyframes light {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    51% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
  width: 100%;
  height: 100%;
  position: relative;
  .clock-top {
    width: 8px;
    height: 70px;
    position: absolute;
    border-radius: 0 50% 50% 0%;
    background: #b18686;
    left: 50%;
    transform: rotate(25deg) translateY(-120%);
    &::before {
      content: '';
      display: inline-block;
      position: relative;
      width: 80px;
      height: 15px;
      background: #b18686;
      border-radius: 0% 0% 50% 50%/10% 10% 100% 100%;
      transform: translateX(-110%) translateY(300%) rotate(25deg);
    }
    &::after {
      content: '';
      display: inline-block;
      position: relative;
      width: 80px;
      height: 15px;
      background: #b18686;
      border-radius: 0% 0% 50% 50%/10% 10% 100% 100%;
      transform: translateX(15%) translateY(5%) rotate(310deg);
    }
  }
  .clock-body {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #f99494;
    position: relative;
    overflow: hidden;
    &::before {
      content: '';
      display: inline-block;
      background-color: #fee7e7;
      width: 50%;
      height: 50%;
      transform: skewY(150deg) rotate(10deg);
      position: absolute;
      filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 80%;
      height: 80%;
      border-radius: 50%;
      background: #e96d6d;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
    .inner {
      display: inline-block;
      width: 16px;
      height: 16px;
      position: absolute;
      background: #9a9a9a;
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      z-index: 2;
    }
    .long-needle {
      position: absolute;
      width: 16px;
      height: 40%;
      left: calc(50% - 8px);
      top: 10%;
      border-radius: 15px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      z-index: 1;
      transform-origin: bottom;
      background: #ff6066;
    }
    .short-needle {
      background: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      z-index: 1;
      transform-origin: bottom;
      position: absolute;
      width: 16px;
      height: 25%;
      left: calc(50% - 8px);
      top: 25%;
      border-radius: 15px;
    }
    .second-needle {
      background: #aaf;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      z-index: 1;
      transform-origin: bottom;
      position: absolute;
      width: 4px;
      height: 40%;
      left: calc(50% - 2px);
      top: 10%;
      border-radius: 15px;
    }
  }
  .clock-time {
    text-align: center;
    color: #707070;
    font-size: 90px;
    span {
      animation: light 2s infinite linear;
    }
  }
`
export default function AppleClock() {
  const [date, setDate] = useState(new Date())
  let hours = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  let hoursDeg = parseInt((hours / 24) * 720)+parseInt((minute / 60) * 30)
  let minuteDeg = parseInt((minute / 60) * 360)
  let secondDeg = parseInt((second / 60) * 360)
  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000)
  }, [])
  return (
    <div className={`${style} animate__animated animate__rubberBand`}>
      <div className="clock-top"></div>
      <div className="clock-body">
        <div className="inner"></div>
        <div className="long-needle" style={{ transform: `rotate(${minuteDeg}deg)` }}></div>
        <div className="short-needle" style={{ transform: `rotate(${hoursDeg}deg)` }}></div>
        <div className="second-needle" style={{ transform: `rotate(${secondDeg}deg)` }}></div>
      </div>
      <div className="clock-time">
        {hours}
        <span>:</span>
        {minute}
      </div>
    </div>
  )
}
