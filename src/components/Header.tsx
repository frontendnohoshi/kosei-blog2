import Link from "next/link";
import { memo } from "react";
import ToggleDarkMode from "src/components/toggleDarkMode";
import { getDebugger } from "src/components/utils/Debugger";

const debug = getDebugger(true);

const Header = memo(() => {
  debug("Header is rendering");

  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto flex max-w-7xl flex-col px-5 pt-5">
        <div className="flex items-center">
          <Link href={"/"} passHref>
            <a className="font-bold">
              <h1 className="mb-2 text-4xl ">Powerlifting Life</h1>
            </a>
          </Link>
          <ToggleDarkMode />
        </div>
        <p className="mb-3 text-center text-sm text-red-600 sm:text-left">
          Long may PowerLifting progress and rise up together with strong values and dedication.
        </p>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
