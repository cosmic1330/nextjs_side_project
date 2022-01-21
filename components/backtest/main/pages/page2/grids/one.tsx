import { css } from "@emotion/css";

export default function One({ grid, context, record }) {
  const cssWrap = css`
    padding: 10px;
    border-radius: 3px;
    grid-column-start: ${grid[0]};
    grid-column-end: ${grid[1]};
    grid-row-start: ${grid[2]};
    grid-row-end: ${grid[3]};
    background: #f4f4f4;
    transition: 1s;
    overflow: auto;
  `;
  return (
    <div className={cssWrap}>
      <pre>{JSON.stringify(record, undefined, 2)}</pre>
    </div>
  );
}
