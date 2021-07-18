import { css } from "@emotion/css";
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
export const StyledButton = ({ children, ...props }) => {
  const theme = useTheme();
  const style = {
    outlined: css`
      padding: 8px 20px;
      border-radius: 50px;
      color: ${theme.palette.primary.text3};
      border-color: ${theme.palette.primary.text3};
      font-size: 18;
      font-weight: 700;
      box-shadow: 0px 3px 5px #efefef;
      &:hover {
        border-color: ${theme.palette.primary.text3};
      }
    `,
  };
  return (
    <Button variant="outlined" classes={style} {...props}>
      {children}
    </Button>
  );
};
