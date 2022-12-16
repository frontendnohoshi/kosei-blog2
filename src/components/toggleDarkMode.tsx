import React, { memo, useEffect, useState } from "react";

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
    <div className="relative mr-2 ml-auto inline-block w-10 select-none align-middle transition duration-500 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        checked={isDarkMode}
        className="toggle-checkbox"
        onChange={handleChangeDarkMode}
      />
      <label htmlFor="toggle" className="toggle-label">
        toggle
      </label>
    </div>
  );
});

ToggleDarkMode.displayName = "toggleDarkMode";

export default ToggleDarkMode;
