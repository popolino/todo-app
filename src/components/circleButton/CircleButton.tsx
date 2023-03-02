import React from "react";
import classes from "./CircleButton.module.scss";
import clsx from "clsx";

type TCircleButtonProps = {
  icon: any;
  className?: string;
  onChange?: () => void;
};
const CircleButton: React.FC<TCircleButtonProps> = ({
  className,
  icon,
  onChange,
}) => {
  return <div className={clsx(classes.circle, className)}>{icon}</div>;
};
export default CircleButton;
