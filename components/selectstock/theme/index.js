import { ThemeProvider } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4cb5f5',
      secound: '#e6e6e6',
      text1: '#fff',
      text2: '#666666',
      text3: '#9f9f9f',
    },
    secondary: {
      main: '#faa',
    },
  },
});

export default function Theme ({ children, ...props }){
  return (
    <ThemeProvider theme={theme} {...props}>
      {children}
    </ThemeProvider>
  );
};
