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
        <div className="mb-2 flex items-center">
          <Link href={"/"} passHref>
            <a className="font-bold">
              <h1 className="text-4xl ">KOSEI BLOG</h1>
            </a>
          </Link>
          <div className="ml-auto sm:pt-4">
            <ToggleDarkMode />
          </div>
        </div>
        <p className="mb-3 text-center text-xs text-red-600 sm:ml-1 sm:text-left">
          成功の反対は失敗ではなく挑戦しないことである
          {/* //TODO 継続は力なり */}
        </p>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
