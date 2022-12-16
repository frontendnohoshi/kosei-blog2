import { NextPage } from "next";
import { memo } from "react";

const Custom404: NextPage = memo(() => {
  return <h2 className="m-auto flex items-center justify-center dark:text-white">ページがありません。(404)</h2>;
});

Custom404.displayName = "Custom404";

export default Custom404;
