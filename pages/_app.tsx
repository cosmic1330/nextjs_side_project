import CssBaseline from "@mui/material/CssBaseline";
import { appWithTranslation } from "next-i18next";
import { StylesProvider } from "@mui/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "../redux/store";
const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Component {...pageProps} />
        </StylesProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default appWithTranslation(App);
