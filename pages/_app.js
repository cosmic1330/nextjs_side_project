import "../styles/globals.css";
import { appWithTranslation } from "next-i18next";
import { StylesProvider } from "@material-ui/core/styles";

function App({ Component, pageProps }) {
  return (
    <StylesProvider injectFirst={true}>
      <Component {...pageProps} />
    </StylesProvider>
  );
}

export default appWithTranslation(App);
