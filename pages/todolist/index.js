import AppleClock from '../../components/apple_clock'
import Page from './page';
import { css, cx } from '@emotion/css'


const style = css`
  display: flex;
  flex-wrap:wrap;
  .area1{
    display: flex;
    align-items:center;
    box-sizing:border-box;
    width:50%;
    height:50vw;
    .area1-box{
      margin:auto;
      width: 50%;
      height: 50%;
    }
  }
  .area2{
    width: 50%;
  }
`

export default function TodoList() {
  return (
    <div className={style}>
      <article className="area1">
        <div className="area1-box">
          <AppleClock />
        </div>
      </article>
      <article className="area2">
        <Page/>
      </article>
    </div>
  )
}
