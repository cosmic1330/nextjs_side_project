import { css } from "@emotion/css";
import icon from "../images/icon-line-w.png";
import AppleIcon from "@mui/icons-material/Apple";
import GetAppIcon from "@mui/icons-material/GetApp";
import Image from "next/image";
function Download() {
  const cssDownloadArea = css`
    color: #fff;
    position: absolute;
    line-height: 1;
    transform: translateY(40px);
  `;

  const cssTitle = css`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  `;

  const cssBox = css`
    list-style: none;
    display: flex;
    gap: 5px;
    li {
      width: 60px;
      height: 60px;
      border-radius: 3px;
      border: 1.5px solid rgba(255, 255, 255, 0.7);
      background-image: linear-gradient();
      display: flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      cursor: pointer;
      svg:nth-child(2) {
        display: none;
      }
      &:hover {
        background: #0e8f36;
        svg:nth-child(1) {
          display: none;
        }
        svg:nth-child(2) {
          display: inherit;
        }
      }
    }
  `;
  return (
    <div className={cssDownloadArea}>
      <div className={cssTitle}>
        <Image src={icon} alt="icon" />
        <span>下載</span>
      </div>
      <ul className={cssBox}>
        <li>
          <AppleIcon />
          <GetAppIcon />
        </li>
        <li>
          <AppleIcon />
          <GetAppIcon />
        </li>
        <li>
          <AppleIcon />
          <GetAppIcon />
        </li>
      </ul>
    </div>
  );
}
export default Download;
