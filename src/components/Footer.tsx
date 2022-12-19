import { NextPage } from "next";
import { memo } from "react";
import { AiFillGithub } from "react-icons/ai";
import { getDebugger } from "src/components/utils/Debugger";

const debug = getDebugger(true);

const Footer = memo(() => {
  debug("Footer is rendering");

  return (
    <footer className="mt-auto flex h-20 items-center justify-center bg-slate-900 text-white drop-shadow-[0px_-5px_5px_rgba(15,23,42,0.4)] dark:drop-shadow-[0_-5px_5px_rgba(255,255,255,0.25)]">
      <p className="mr-3 text-center text-sm text-white drop-shadow-[0px_0px_5px_rgba(255,255,255,0.55)]">
        ©︎ 2022 Kosei Onishi
      </p>
      <a
        href="https://github.com/frontendnohoshi/kosei-blog2"
        target="_blank"
        rel="noreferrer"
        className=" drop-shadow-[0px_0px_5px_rgba(255,255,255,0.55)]"
      >
        <AiFillGithub size={20} />
      </a>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
