import CssBaseline from "@mui/material/CssBaseline";
import { appWithTranslation } from "next-i18next";
import { StylesProvider } from "@mui/styles";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App({ Component, pageProps }) {
  return (
    
      <QueryClientProvider client={queryClient}>
        <StylesProvider injectFirst>
          <CssBaseline />
          <Component {...pageProps} />
        </StylesProvider>
      </QueryClientProvider>
  );
}

export default appWithTranslation(App);
