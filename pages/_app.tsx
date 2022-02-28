import "@/styles/globals.scss";

import { NextPageWithLayout } from "@/utils/types";
import { IconContext } from "@react-icons/all-files/lib";
import ResponsiveProvider from "context/responsive";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <NextSeo
        title="Tergel Munkhdelger"
        description="My personal portfolio. 🌙"
        openGraph={{
          type: "website",
          url: "https://portfolio-tergelm.vercel.app/",
          title: "Tergel Munkhdelger | Portfolio",
          description: "My personal portfolio. 🌙",
          images: [
            {
              url: "https://res.cloudinary.com/flare-community/image/upload/v1646014576/static/portfolio_udobop.png",
              width: 632,
              height: 632,
              alt: "Moon",
            },
          ],
        }}
      />
      <IconContext.Provider value={{ className: "r-icon" }}>
        <ResponsiveProvider>
          {getLayout(<Component {...pageProps} />)}
        </ResponsiveProvider>
      </IconContext.Provider>
    </>
  );
}

export default MyApp;
