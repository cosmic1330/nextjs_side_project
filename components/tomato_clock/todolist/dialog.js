import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { css } from "@emotion/css";
import Button from "@mui/material/Button";
import { useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  createIncrementTaskAction,
  createDecrementTaskAction,
} from "../../../redux/actions/tasks";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const style = css`
  .MuiPaper-root {
    padding: 20px;
    width: 400px;
  }
`;
function DialogComponent({
  open,
  handleCloseDialog,
  ...props
}) {
  const nameRef = useRef(null);
  const timeRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleClick = () => {
    let newTask = {
          name: nameRef.current.value,
          time: timeRef.current.value,
          description: descriptionRef.current.value,
        }
    props.increment(newTask)
    handleCloseDialog();
  };

  // Speech Recognition
  useEffect(() => {}, []);
  return (
    <Dialog className={style} onClose={handleCloseDialog} open={open}>
      <DialogTitle>Set Task</DialogTitle>
      <TextField
        label="Task name in here"
        variant="outlined"
        inputRef={nameRef}
      />
      <br />
      <TextField
        label="Time in here"
        variant="outlined"
        inputRef={timeRef}
        placeholder={"2021-03-22 19:00"}
      />
      <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Today" disabled/>
      </FormGroup>
      <br />
      <TextField
        label="Description in here"
        variant="outlined"
        inputRef={descriptionRef}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleClick}>
        Save
      </Button>
    </Dialog>
  );
}

const DialogContainer = connect(
  (state) => ({
    tasks: state.tasks
  }),
  {
    increment: createIncrementTaskAction,
    decrement: createDecrementTaskAction,
  } 
)(DialogComponent);

export default DialogContainer;