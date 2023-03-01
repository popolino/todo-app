import React from "react";
import classes from "./Header.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";

const Header = () => (
  <header>
    <div>
      <SvgSelector id="burger" className={classes.burger} />
    </div>
    <div className={classes.right}>
      <SvgSelector id="dark_mode" />
      <SvgSelector id="notification" />
    </div>
  </header>
);
export default Header;
