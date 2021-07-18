import { css } from "@emotion/css";
import BasicTable from "./table";
import FileDetail from "./filedetail";
import Search from "./search";
export default function Drawer({ children }) {
  const style = css`
    text-align: center;
    padding: 50px 50px 20px 300px;
    .searchArea {
      margin-bottom: 50px;
    }
  `;
  return (
    <main className={style}>
      {children}
      <div className="searchArea">
        <Search />
      </div>
      <FileDetail />
      <div className="tableArea">
        <BasicTable />
      </div>
    </main>
  );
}
