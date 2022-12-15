import { NextPage } from "next";
import { memo } from "react";
import { AiFillGithub } from "react-icons/ai";
import { getDebugger } from "src/components/utils/Debugger";

const debug = getDebugger(true);

const Footer = memo(() => {
  debug("Footer is rendering");

  return (
    <footer className="mt-auto flex h-20 items-center justify-center bg-slate-900 text-white">
      <p className="mr-3 text-center text-sm text-white">©︎ 2022 Kosei Onishi</p>
      <a href="https://github.com/frontendnohoshi/kosei-blog2" target="_blank" rel="noreferrer">
        <AiFillGithub size={20} />
      </a>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
