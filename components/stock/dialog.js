import { useState } from "react";
import { css } from "@emotion/css";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useField } from "react-final-form";

const style = {
  button: {
    root: css`
      color: #fff;
    `,
    outlined: css`
      border-color: #fff;
    `,
  },
  main: css`
    padding: 20px;
  `,
};
export default function DialogComponent({ list }) {
  const [open, setOpen] = useState(false);
  const { input } = useField("fileName");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        classes={style.button}
      >
        選擇測試資料
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>已上傳的測試資料</DialogTitle>
        <main className={style.main}>
          <RadioGroup
            value={input.value}
            onChange={input.onChange}
            type="radio"
          >
            {list.map((item) => {
              return (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={<Radio />}
                  label={item}
                />
              );
            })}
          </RadioGroup>
        </main>
        <Button variant="text" color="primary" onClick={handleClose}>
          確定
        </Button>
      </Dialog>
    </div>
  );
}
