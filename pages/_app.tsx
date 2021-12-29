import CssBaseline from '@mui/material/CssBaseline';
import { appWithTranslation } from "next-i18next";
import { StylesProvider } from '@mui/styles';

function App({ Component, pageProps }) {
  return (
    <StylesProvider  injectFirst>
      <CssBaseline />
      <Component {...pageProps} />
    </StylesProvider >
  );
}

export default appWithTranslation(App);
