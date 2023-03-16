import React from "react";
import classes from "./Avatar.module.scss";
import clsx from "clsx";

export type TUser = {
  id: string;
  name: string;
  surname: string;
  email: string;
  picture: string | null;
};

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
