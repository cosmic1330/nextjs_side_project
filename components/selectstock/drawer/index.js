import { useContext } from "react";
import {
  StyledDrawer,
  StyledHeader,
  StyledMain,
  StyledFooter,
} from "./index.css";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import ListCentent from "./list";
import { SelectStockContext } from "../../../context/selectstock";

export default function Drawer() {
  const { hidden, setHidden } = useContext(SelectStockContext);
  const mouseOver = () => {
    setHidden((pre) => !pre);
  };
  return (
    <StyledDrawer open={true} hidden={hidden}>
      <StyledHeader>
        <IconButton color="inherit" onClick={mouseOver}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" component="div">
          {hidden && "MStock"}
        </Typography>
      </StyledHeader>
      <StyledMain>
        <ListCentent />
      </StyledMain>
      <StyledFooter></StyledFooter>
    </StyledDrawer>
  );
}
