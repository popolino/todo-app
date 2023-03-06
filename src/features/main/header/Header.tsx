import React, { useEffect, useState } from "react";
import classes from "./Header.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import { IconButton } from "@mui/material";
import { useThemeDetector } from "../../../hooks";

const Header = () => {
  const localStorageTheme = window.localStorage.getItem("theme");
  const systemTheme = useThemeDetector() ? "dark" : "light";
  const [theme, setTheme] = useState(
    localStorageTheme === null ? systemTheme : localStorageTheme
  );
  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header>
      <div>
        <SvgSelector id="burger" className={classes.burger} />
      </div>
      <div className={classes.right}>
        <IconButton
          classes={{ sizeLarge: classes["icon-button"] }}
          size="large"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <SvgSelector id={theme === "dark" ? "light_mode" : "dark_mode"} />
        </IconButton>
        <IconButton
          classes={{ sizeLarge: classes["icon-button"] }}
          size="large"
        >
          <SvgSelector id="notification" />
        </IconButton>
      </div>
    </header>
  );
};
export default Header;
