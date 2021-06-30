import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { css } from '@emotion/css'
import Button from '@material-ui/core/Button'
import { useRef, useState, useEffect } from 'react'
const style = css`
  .MuiPaper-root {
    padding: 20px;
    width: 400px;
  }
`
export default function DialogComponent({ open, handleCloseDialog, setRender }) {
  const nameRef = useRef(null)
  const timeRef = useRef(null)
  const descriptionRef = useRef(null)

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setRender((pre) => !pre)
      let arr = localStorage.getItem('to-do-list')
      arr = JSON.parse(arr)
      if (!Array.isArray(arr)) {
        arr = []
      }
      arr.push(event.target.value)
      localStorage.setItem('to-do-list', JSON.stringify(arr))
      handleCloseDialog()
    }
  }
  const handleClick = () => {
    setRender((pre) => !pre)
    let arr = localStorage.getItem('to-do-list')
    arr = JSON.parse(arr)
    if (!Array.isArray(arr)) {
      arr = []
    }
    if(nameRef.current.value){
      arr.push({ name: nameRef.current.value, time: timeRef.current.value, description: descriptionRef.current.value })
      localStorage.setItem('to-do-list', JSON.stringify(arr))
    }
    handleCloseDialog()
  }

  // Speech Recognition
  useEffect(() => {
  }, [])
  return (
    <Dialog className={style} onClose={handleCloseDialog} open={open}>
      <DialogTitle>Set Task</DialogTitle>
      <TextField label="Task name in here" variant="outlined" onKeyPress={handleKeyPress} inputRef={nameRef} />
      <br />
      <TextField label="Time in here" variant="outlined" onKeyPress={handleKeyPress} inputRef={timeRef} />
      <br />
      <TextField label="Description in here" variant="outlined" onKeyPress={handleKeyPress} inputRef={descriptionRef} />
      <br />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Save
      </Button>
    </Dialog>
  )
}
