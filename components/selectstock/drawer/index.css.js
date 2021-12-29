import Drawer from "@mui/material/Drawer";
import { css } from "@emotion/css";
import { useTheme } from "@mui/material/styles";

export const StyledDrawer = ({ hover, open, children, ...props }) => {
  const theme = useTheme();
  const style = {
    small: {
      paperAnchorLeft: css`
        background-color: ${theme.palette.primary.main};
        padding: 10px;
        width: 60px;
        transition: 1s;
        color: ${theme.palette.primary.text1};
        overflow: hidden;
      `,
    },
    big: {
      paperAnchorLeft: css`
        box-shadow: 3px 0px 10px #ccc;
        padding: 10px;
        width: 250px;
        transition: 1s;
        color: ${theme.palette.primary.text1};
        background-color: ${theme.palette.primary.main};
      `,
    },
  };
  return (
    <Drawer
      elevation={8}
      classes={hover ? style.big : style.small}
      open={open}
      {...props}
      variant="persistent"
    >
      {children}
    </Drawer>
  );
};

export const StyledHeader = ({ children, ...props }) => {
  const style = css`
    display: flex;
    white-space: nowrap;
    font-size: 24px;
    margin-top: 50px;
    font-weight: 500;
    .MuiTypography-h4 {
      margin-left: 10px;
      font-size: 30px;
    }
  `;
  return (
    <header className={style} {...props}>
      {children}
    </header>
  );
};

export const StyledMain = ({ children, ...props }) => {
  const style = css`
    text-align: left;
  `;
  return (
    <main className={style} {...props}>
      {children}
    </main>
  );
};

export const StyledFooter = ({ children, ...props }) => {
  const style = css`
    text-align: center;
  `;
  return (
    <footer className={style} {...props}>
      {children}
    </footer>
  );
};
