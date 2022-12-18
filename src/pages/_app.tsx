import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { getDebugger } from "src/components/utils/Debugger";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import Head from "next/head";

const debug = getDebugger(true);

function MyApp({ Component, pageProps }: AppProps) {
  debug("MyApp is rendering");

  return (
    <div className="flex min-h-screen flex-col duration-500 dark:bg-black dark:text-slate-100">
      <Head>
        <title>KOSEI BLOG</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
