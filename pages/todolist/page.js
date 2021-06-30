import { useEffect, useState } from 'react'
import { css } from '@emotion/css'
import AddIcon from '@material-ui/icons/Add'
import DialogComponent from './dialog'
import TimeLine from './timeline'

const style = css`
padding:20px;
  button{
    margin:auto;
    background: #FEE7E7;
    padding: 15px 50px;
    font-size: 20px;
    color:#707070;
    display:flex;
    text-align:center;
    outline:none;
    border:none;
    cursor: pointer;
    &:active{
      color: #FEE7E7;
      background:#707070;
    }
  }
`

export default function Page() {
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(false);
  const [list, setList] = useState([]);
  const handleOpenDialog = () => {
    setOpen(true)
  }
  const handleCloseDialog = () => {
    setOpen(false)
  
  }
  useEffect(()=>{
    let data = localStorage.getItem('to-do-list');
    setList(JSON.parse(data));
  },[render]);
  return (
    <div className={style}>
      <button onClick={handleOpenDialog}>
        Add new tasks<AddIcon />
      </button>
      <TimeLine data={list}/>
      <DialogComponent {...{open, handleCloseDialog, setRender}}/>
    </div>
  )
}
