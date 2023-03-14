import React, { useEffect, useState } from "react";
import classes from "./Header.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import { IconButton } from "@mui/material";
import { useThemeDetector } from "../../../hooks";
import clsx from "clsx";

type THeaderProps = {
  onOpen: () => void;
};

const Header: React.FC<THeaderProps> = ({ onOpen }) => {
  const localStorageTheme = window.localStorage.getItem("theme");
  const systemTheme = useThemeDetector() ? "dark" : "light";
  const [theme, setTheme] = useState(
    localStorageTheme === null ? systemTheme : localStorageTheme
  );
  const [isDarkThemeButton, setIsDarkThemeButton] = useState(theme === "dark");
  const [animation, setAnimation] = useState(false);

  const handleToggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setIsDarkThemeButton(!isDarkThemeButton);
    setAnimation(true);
    const animationTimeout = setTimeout(() => {
      setAnimation(false);
      setTheme(newTheme);
    }, 800);
    const themeTimeout = setTimeout(() => {
      document.documentElement.setAttribute("color-scheme", newTheme);
      window.localStorage.setItem("theme", newTheme);
    }, 400);
    return () => {
      clearTimeout(animationTimeout);
      clearTimeout(themeTimeout);
    };
  };

  useEffect(() => {
    setTheme(theme);
    document.documentElement.setAttribute("color-scheme", theme);
    window.localStorage.setItem("theme", theme);
  }, []);
  return (
    <header>
      <IconButton
        classes={{ sizeLarge: classes["icon-button"] }}
        size="large"
        onClick={onOpen}
      >
        <SvgSelector id="burger" className={classes.burger} />
      </IconButton>
      <div className={classes.right}>
        <IconButton
          classes={{
            sizeLarge: clsx(classes["icon-button"], {
              [classes.animation]: animation,
              [classes.dark]: isDarkThemeButton,
            }),
          }}
          size="large"
          onClick={handleToggleTheme}
        >
          <SvgSelector id={isDarkThemeButton ? "light_mode" : "dark_mode"} />
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
