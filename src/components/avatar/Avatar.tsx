import React from "react";
import classes from "./Avatar.module.scss";
import clsx from "clsx";
import { TUser } from "src/features/friends/Friends.types";

interface IAvatarProps extends Partial<TUser> {
  name: string;
}

const Avatar: React.FC<IAvatarProps> = ({ picture, name }) => {
  return (
    <div className={clsx(picture ? classes.avatar : "avatar")}>
      <img src={picture ? picture : ""} alt="" />
      {!picture && <p>{name.split("")[0]}</p>}
    </div>
  );
};
export default Avatar;
