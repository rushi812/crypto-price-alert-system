import type { AppProps } from "next/app";
import Head from "next/head";
import { SnackbarProvider } from "notistack";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { fontClasses } from "@config/fonts";

import "@styles/classes.scss";
import "@styles/globals.scss";

const theme = createTheme({
  palette: {
    primary: { main: "#80E038" },
  },
  components: {
    MuiModal: { defaultProps: { className: fontClasses } },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Crypto Price Alert System</title>
          <meta name="description" content="Get Latest alerts of crypto currencies" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={fontClasses}>
          <SnackbarProvider
            preventDuplicate
            autoHideDuration={3000}
            maxSnack={3}
            classes={{ containerRoot: "notistack" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Component {...pageProps} />
          </SnackbarProvider>
        </div>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
