import React from "react";
import classes from "./Progress.module.scss";
import { colors, TColors } from "../../consts/colors";

export type TProgressProps = {
  maximum: number;
  value: number;
  color: TColors;
};
const Progress: React.FC<TProgressProps> = ({ maximum, value, color }) => {
  const percent = value <= maximum ? (value / maximum) * 100 : 0;
  return (
    <div className={classes["progress-bar"]}>
      <div
        className={classes.value}
        style={{ width: `${percent}%`, background: colors[color] }}
      >
        {percent > 0 && <div />}
      </div>
      <div
        className={classes.shadow}
        style={{
          width: `${percent}%`,
          boxShadow: `0px 1px 3px 0 ${colors[color]}`,
        }}
      />
    </div>
  );
};

export default Progress;
