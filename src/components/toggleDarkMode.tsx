import React, { memo, useEffect, useState } from "react";

import { BsSun } from "react-icons/bs";
import { BsMoon } from "react-icons/bs";

const ToggleDarkMode = memo(() => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.querySelector("html")?.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleChangeDarkMode = () => {
    if (isDarkMode) {
      localStorage.theme = "light";
      setIsDarkMode(false);
    } else {
      localStorage.theme = "dark";
      setIsDarkMode(true);
    }
  };

  return (
    <div className="flex items-center">
      <BsSun />
      <div className="relative mx-2  w-10">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          checked={isDarkMode}
          className="absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 border-gray-100 bg-gray-800 duration-500  checked:right-0  dark:border-gray-400 dark:bg-white"
          onChange={handleChangeDarkMode}
        />
        <label
          htmlFor="toggle"
          className="block h-6 cursor-pointer rounded-full border-2 border-gray-100 bg-gray-100 duration-500 dark:border-gray-400 dark:bg-gray-400"
        ></label>
      </div>
      <BsMoon />
    </div>
  );
});

ToggleDarkMode.displayName = "toggleDarkMode";

export default ToggleDarkMode;
