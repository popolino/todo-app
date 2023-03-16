import React from "react";
import classes from "./Progress.module.scss";
import { TColors } from "src/consts/colors";
import { getColor } from "src/utils/Index";

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
        // let cityId = cities.find(city => city.name === searchTerm).id
        style={{
          width: `${percent}%`,
          background: getColor(color),
        }}
      >
        {percent > 0 && <div />}
      </div>
      <div
        className={classes.shadow}
        style={{
          width: `${percent}%`,
          boxShadow: `0px 1px 3px 0 ${getColor(color)}`,
        }}
      />
    </div>
  );
};

export default Progress;
