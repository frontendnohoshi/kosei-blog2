import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { getDebugger } from "src/components/utils/Debugger";
import Header from "src/components/Header";
import Footer from "src/components/Footer";

const debug = getDebugger(true);

function MyApp({ Component, pageProps }: AppProps) {
  debug("MyApp is rendering");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
