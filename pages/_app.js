import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import { StyledEngineProvider  } from "@material-ui/core/styles";

function App({ Component, pageProps }) {
  return (
    <StyledEngineProvider  injectFirst={true}>
      <Component {...pageProps} />
    </StyledEngineProvider >
  );
}

export default appWithTranslation(App);
