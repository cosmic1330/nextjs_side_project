import { useState, useEffect, useCallback } from "react";
import Header from "../header";
import {css} from "@emotion/css";

const cssCarousel = css`
  .lists{
    width: 100%;
    height: 100%;
    transition: height 0.5s;
    list-style: none;
    overflow: hidden;
    position: absolute;
  }

  .scroll.lists{
    position: absolute;
    width: 100%;
    height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .lists li{
    opacity: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: absolute;
    top:0;
  }

  .lists li.animate{
    animation: animate1 linear;
  }

  @keyframes animate1 {
    0%{
      opacity: 0;
      transform: scale(1);
    }
    25%{
      opacity: 1;
    }
    50%{
      opacity: 1;
    }
    75%{
      opacity: 0;
    }
    100%{
      opacity: 0;
      transform: scale(1.2);
    }
  }


  @media screen and (min-width:768px){
    .scroll.lists{
      height: 200px;
    }
  }
  @media screen and (min-width:992px){
    .scroll.lists{
      height: 350px;
    }
  }
  @media screen and (min-width:1200px){
    .scroll.lists{
      width: 80%;
    }
  }`

function Carousel() {
  const [scroll, setScroll] = useState(false);
  const [animationDuration] = useState(10);
  const [images] = useState(10);
  const [active, setActive] = useState(0);
  const [next, setNext] = useState(1);

  const handleScroll = useCallback(() => {
    setScroll(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const interval = setInterval(() => {
      setActive((pre) => (pre + 1 > images - 1 ? 0 : pre + 1));
      setNext((pre) => (pre + 1 > images - 1 ? 0 : pre + 1));
    }, (animationDuration / 2) * 1000);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const img = (i: number) => {
    return {
      backgroundImage: `url(https://picsum.photos/1000/500?random=${i})`,
      animationDuration: `${animationDuration}s`,
      AnimationDelay: next === i ? `${animationDuration / 2}s` : `0s`,
    };
  };

  return (
    <div className={cssCarousel}>
      <ul className={scroll ? "scroll lists" :"lists"}>
        {Array.from(Array(images)).map((value, index) => (
          <li
            key={index}
            style={img(index)}
            className={active === index || next === index ? "animate" : ""}
          />
        ))}
      </ul>

      <div className="noSrollArea">
        <Header {...{ scroll }} />
      </div>
    </div>
  );
}

export default Carousel;
