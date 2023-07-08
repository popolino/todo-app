import React from "react";
import classes from "./Navigation.module.scss";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import clsx from "clsx";
import logo from "src/assets/img/logo.png";
import NavLinkComponent from "./NavLinkComponent";
import { IconButton } from "@mui/material";
import { routes } from "../../routes/routes";
import { useKeyboardListener } from "src/hooks";

type TNavigationProps = {
  persistent: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  onLogout: () => void;
};

const Navigation: React.FC<TNavigationProps> = ({
  persistent,
  open,
  setOpen,
  onLogout,
}) => {
  useKeyboardListener("Escape", () => setOpen(!open));
  return (
    <div
      className={clsx(classes.navigation, {
        [classes.open]: open && !persistent,
      })}
    >
      <div className={classes.top}>
        <div className={clsx("avatar", classes.avatar)}>
          <p>J</p>
        </div>
        <IconButton
          classes={{ sizeLarge: classes.hide }}
          size="large"
          onClick={() => setOpen(false)}
        >
          <SvgSelector id="hide" />
        </IconButton>
      </div>
      <div className={classes.username}>
        <p>Joy</p>
        <p>Mitchell</p>
      </div>
      <div className={classes.container}>
        <div className={classes.chapters}>
          {routes
            .filter((route) => route.display)
            .map((route) => (
              <NavLinkComponent
                key={route.path}
                path={route.path}
                id={route.iconId}
                title={route.label}
              />
            ))}
        </div>
        <div className={classes.footer}>
          <NavLinkComponent
            path="/login"
            id="logout"
            title="Logout"
            onClick={onLogout}
          />
          <img src={logo} alt="" />
          <div className={classes.text}>
            <h1>Todo</h1>
            <p>List</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
