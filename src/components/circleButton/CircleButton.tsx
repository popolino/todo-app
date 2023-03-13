import React from "react";
import classes from "./CircleButton.module.scss";
import clsx from "clsx";

type TCircleButtonProps = {
  icon: any;
  className?: string;
  color?: "blue" | "red";
  onClick: () => void;
};
const CircleButton: React.FC<TCircleButtonProps> = ({
  className,
  icon,
  color = "blue",
  onClick,
}) => {
  return (
    <button
      className={clsx(classes.circle, className, {
        [classes.red]: color === "red",
      })}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
export default CircleButton;
