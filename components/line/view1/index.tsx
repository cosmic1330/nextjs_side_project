import Carousel from "./carousel";
import { css } from "@emotion/css";
import Scroll from "./scroll";

function View1() {
  const cssView1 = css`
    body{
        padding: 0;
        margin: 0;
    }
    
    position: relative;
    width: 100%;
    height: 100vh;
  `;
  return (
    <div className={cssView1}>
      <Carousel />
      <Scroll />
    </div>
  );
}

export default View1;
