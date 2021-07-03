import { useState } from "react";
import { css } from "@emotion/css";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
