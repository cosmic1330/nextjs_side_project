import { css } from "@emotion/css";
import { Fragment, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ExplicitIcon from "@mui/icons-material/Explicit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { createCSV } from "../../../../../../utils";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import DialogContent from "@mui/material/DialogContent";

export default function Four({ grid, record }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const exportTestResult = () => {
    if (record?.history) {
      let list = record.history.map((item) => {
        let obj = [
          item.buy["name"],
          item.buy["t"],
          item.sell["t"],
          item.buy["buyPrice"],
          item.sell["sellPrice"],
          item.sell["sellPrice"] - item.buy["buyPrice"],
          item.buy["detail"].replace(/,/g, " | "),
          item.sell["detail"].replace(/,/g, " | "),
        ].join(",");
        return obj;
      });
      let header =
        "股票名稱,買進時間,賣出時間,買進金額,賣出金額,損益,買進原因,賣出原因\n";
      let content = list.join("\n");
      createCSV("test_history_record", header + content);
    } else {
      alert("Please run test first.");
    }
  };

  const cssWrap = css`
    padding: 10px;
    border-radius: 3px;
    grid-column-start: ${grid[0]};
    grid-column-end: ${grid[1]};
    grid-row-start: ${grid[2]};
    grid-row-end: ${grid[3]};
    background: #f4f4f4;
    transition: 1s;
  `;
  return (
    <div className={cssWrap}>
      <Typography variant="h6" gutterBottom component="div">
        Inventory
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {record?.inventory &&
          Object.keys(record.inventory).map((id) => (
            <Chip label={id} size="small" variant="outlined" key={id}/>
          ))}
      </Box>

      <Typography variant="h6" gutterBottom component="div">
        <Stack direction="row" spacing={2} alignItems="center">
          <span>Purchase Record</span>
          <Tooltip title="export excel">
            <IconButton color="success" onClick={exportTestResult}>
              <ExplicitIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Typography>
      <Button color="secondary" variant="contained" onClick={handleClickOpen}>
        See Detail
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        history={record?.history}
      />
    </div>
  );
}

interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  history?: any;
}

function SimpleDialog({ onClose, open, history = [] }: SimpleDialogProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Purchase Record</DialogTitle>
      <DialogContent sx={{ maxHeight: "80vh" }}>
        {history.length > 0
          ? history.map((item, index) => (
              <Fragment key={index}>
                <Stack direction="row" spacing={1}>
                  <Typography variant="overline">{item.buy["name"]}</Typography>
                </Stack>
                <Stack direction="row" spacing={4} alignItems={"center"}>
                  <Typography variant="overline">
                    Buy Price: ${item.buy["buyPrice"]}
                  </Typography>
                  <Typography variant="overline">
                    Sell Price: ${item.sell["sellPrice"]}
                  </Typography>
                  <Typography variant="overline">
                    Buy Date: {item.buy["t"]}
                  </Typography>
                  <Typography variant="overline">
                    Sell Date: {item.sell["t"]}
                  </Typography>
                  
                  <Typography variant="overline">
                    Profit: ${item.sell["sellPrice"] - item.buy["buyPrice"]}
                  </Typography>
                </Stack>
                <Stack direction="row" >
                  <Typography variant="caption">
                    Buy Requirement : {item.buy["detail"]}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography variant="caption">
                    Sell Requirement : {item.sell["detail"]}
                  </Typography>
                </Stack>
                <Divider />
              </Fragment>
            ))
          : "Not found data"}
      </DialogContent>
    </Dialog>
  );
}
