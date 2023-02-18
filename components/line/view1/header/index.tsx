import { css } from "@emotion/css";
import Download from "../download";
function Header({ scroll }: { scroll: boolean }) {
  const cssHeader = css`
    color: #fff;
    position: absolute;

    top: 40%;
    left: 30px;
    @media screen and (min-width: 1200px) {
      top: 32%;
      left: 10%;
    }
  `;

  const cssScrollHeader = css`
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(50%);
    color: #fff;
    h2 {
      font-size: 50px;
      white-space: nowrap;
    }
    p {
      display: none;
    }
    @media screen and (min-width: 1200px) {
      color: #333;
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(50%);
      line-height: 2;
      h2 {
        text-align: center;
        font-size: 72px;
        font-weight: 900;
        white-space: nowrap;
      }
      p {
        display: block;
        font-size: 20px;
        text-align: center;
        font-weight: 700;
        white-space: nowrap;
      }
    }
  `;

  const cssH2 = css`
    font-size: 70px;
    text-shadow: 0px 0px 1px #999;
    @media screen and (min-width: 1200px) {
      font-size: 150px;
    }
  `;

  const cssH3 = css`
    font-weight: 500;
    font-size: 40px;
    text-shadow: 0px 0px 1px #999;
    @media screen and (min-width: 1200px) {
      font-size: 42px;
    }
  `;
  return (
    <header className={scroll ? cssScrollHeader : cssHeader}>
      <h2 className={cssH2}>Life on Line</h2>
      {!scroll && <h3 className={cssH3}>LINE始終陪伴在你身旁</h3>}
      {scroll && (
        <p>
          超越通訊軟體，LINE為用戶建構全新的溝通型態與豐富的數位生活，成為用戶生活中不可或缺的平台。
        </p>
      )}
      {!scroll && <Download />}
    </header>
  );
}
export default Header;
