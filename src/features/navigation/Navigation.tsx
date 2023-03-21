import React from "react";
import classes from "./Navigation.module.scss";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import clsx from "clsx";
import logo from "src/img/logo.png";
import NavLinkComponent from "./NavLinkComponent";
import { IconButton } from "@mui/material";

type TNavigationProps = {
  persistent: boolean;
  open: boolean;
  onClose: () => void;
};

const Navigation: React.FC<TNavigationProps> = ({
  persistent,
  open,
  onClose,
}) => {
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
          onClick={onClose}
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
          <NavLinkComponent path="/tasks" id="tasks" title="Tasks" />
          <NavLinkComponent
            path="/notifications"
            id="notification"
            title="Notifications"
          />
          <NavLinkComponent
            path="/categories"
            id="categories"
            title="Categories"
          />
          <NavLinkComponent path="/friends" id="friends" title="Friends" />
          <NavLinkComponent path="/settings" id="settings" title="Settings" />
        </div>
        <div className={classes.footer}>
          <NavLinkComponent path="/login" id="logout" title="Logout" />
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
