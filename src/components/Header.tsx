import Link from "next/link";
import { memo } from "react";
import ToggleDarkMode from "src/components/toggleDarkMode";
import { getDebugger } from "src/components/utils/Debugger";

const debug = getDebugger(true);

const Header = memo(() => {
  debug("Header is rendering");

  return (
    <header className="bg-slate-900 text-white drop-shadow-[0px_5px_5px_rgba(15,23,42,0.4)] dark:drop-shadow-[0_10px_10px_rgba(255,255,255,0.25)]">
      <div className="container mx-auto flex max-w-7xl flex-col px-5 pt-5">
        <div className="mb-2 flex items-center">
          <Link href={"/"} passHref>
            <a className="font-bold">
              <h1 className="text-4xl drop-shadow-[0px_0px_5px_rgba(255,255,255,0.55)]">KOSEI BLOG</h1>
            </a>
          </Link>
          <div className="ml-auto sm:pt-4">
            <ToggleDarkMode />
          </div>
        </div>
        <div className="flex flex-col gap-x-2 sm:flex-row drop-shadow-[0px_0px_5px_rgba(220,255,255,0.25)]">
          <p className="mb-1 text-center text-xs text-red-600 sm:ml-1 sm:text-left">
            成功の反対は失敗ではなく挑戦しないことである
          </p>
          <p className="mb-3 text-center text-xs text-red-600 sm:ml-1 sm:text-left">継続は力なり</p>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
