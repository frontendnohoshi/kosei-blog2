import Link from "next/link";
import { memo } from "react";
import { getDebugger } from "src/components/utils/Debugger";

const debug = getDebugger(true);

const Header = memo(() => {
  debug("Header is rendering");

  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto flex max-w-7xl flex-col px-5 pt-5">
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
  );
});

Header.displayName = "Header";

export default Header;
