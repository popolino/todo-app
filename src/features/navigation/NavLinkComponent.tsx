import React from "react";
import classes from "./Navigation.module.scss";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import { NavLink } from "react-router-dom";

interface TNavigation {
  path: string;
  id: string;
  title: string;
}

const NavLinkComponent: React.FC<TNavigation> = ({ path, id, title }) => {
  return (
    <NavLink
      to={path}
      className={(navData) =>
        navData.isActive
          ? `${classes.active} ${classes.chapter}`
          : classes.chapter
      }
    >
      <SvgSelector
        id={id}
        className={
          id === "friends" || id === "layout" ? classes["special-icon"] : ""
        }
      />
      <div className={classes.title}>{title}</div>
    </NavLink>
  );
};

export default NavLinkComponent;
