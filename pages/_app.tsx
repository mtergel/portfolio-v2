import "@/styles/globals.scss";

import { NextPageWithLayout } from "@/utils/types";
import { IconContext } from "@react-icons/all-files/lib";
import ResponsiveProvider from "context/responsive";
import type { AppProps } from "next/app";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <IconContext.Provider value={{ className: "r-icon" }}>
      <ResponsiveProvider>
        {getLayout(<Component {...pageProps} />)}
      </ResponsiveProvider>
    </IconContext.Provider>
  );
}

export default MyApp;
