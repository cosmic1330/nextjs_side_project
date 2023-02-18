import { useState } from "react";
import { css } from "@emotion/css";
import AddIcon from "@mui/icons-material/Add";
import DialogComponent from "./dialog";
import TimeLine from "./timeline";
import { connect } from "react-redux";

const style = css`
  padding: 20px;
  button {
    margin: auto;
    background: #fee7e7;
    padding: 15px 50px;
    font-size: 20px;
    color: #707070;
    display: flex;
    text-align: center;
    outline: none;
    border: none;
    cursor: pointer;
    &:active {
      color: #fee7e7;
      background: #707070;
    }
  }
`;

function Page({tasks}) {
  const [open, setOpen] = useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <div className={style}>
      
      
      <button onClick={handleOpenDialog}>
        Add new tasks
        <AddIcon />
      </button>
      <TimeLine data={tasks} />
      <DialogComponent {...{ open, handleCloseDialog }} />
    </div>
  );
}

const PageContainer = connect(
  (state) => ({
    tasks: state.tasks
  }),{} 
)(Page);

export default PageContainer;
