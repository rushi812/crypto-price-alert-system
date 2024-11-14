import type { AppProps } from "next/app";
import Head from "next/head";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { fontClasses } from "@config/fonts";

import "@styles/classes.scss";
import "@styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppRouterCacheProvider>
      <Head>
        <title>Crypto Price Alert System</title>
        <meta name="description" content="Get Latest alerts of crypto currencies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={fontClasses}>
        <Component {...pageProps} />
      </div>
    </AppRouterCacheProvider>
  );
}
