import React from "react";
import classes from "./CircleButton.module.scss";
import { colors, TColors } from "../../consts/colors";

export type TCircleButtonProps = {
  icon: React.JSXElementConstructor<any>;
  onChange: () => void;
};
const CircleButton = () => {
  return (
    <div className={classes.circle}>
      <div className={classes.vertical}></div>
      <div className={classes.horizontal}></div>
    </div>
  );
};
export default CircleButton;
