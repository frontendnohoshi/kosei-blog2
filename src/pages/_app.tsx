import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto">
      <header className="bg-slate-900 text-white">
        <div className="container mx-auto flex flex-col px-5 pt-5 max-w-7xl">
          <div className="flex items-center">
            <Link href={"/"} passHref>
              <a className="mb-3 font-medium sm:mb-0">
                <h1 className="text-4xl">Powerlifting Life</h1>
              </a>
            </Link>
            <form action="#" className="ml-auto mr-5">
              <label className="">
                <input type="checkbox" />
                <span className=""></span>
              </label>
            </form>
          </div>
          <p className="mb-3 text-center text-sm text-red-600 sm:text-left">
            PowerLifting Life is the best way to understand your Life.
          </p>
        </div>
      </header>
      <main className="container mx-auto mt-8 max-w-7xl">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
