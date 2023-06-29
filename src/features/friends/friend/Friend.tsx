import React from "react";
import classes from "src/features/friends/Friends.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import clsx from "clsx";
import { IconButton } from "@mui/material";

interface TFriend {
  name?: string;
  picture: string | null;
  onClick: () => void;
}

const Friend: React.FC<TFriend> = ({ name, picture, onClick }) => {
  return (
    <div className={clsx("friend", "module")}>
      <div className="module-part">
        <div className="avatar">
          {picture === null ? (
            <p className="letter">{name?.split("")[0]}</p>
          ) : (
            <img src={picture} alt="" />
          )}
        </div>
        <div className={clsx("text-module", classes.name)}>{name}</div>
      </div>
      <div className="module-part">
        <IconButton
          size="medium"
          className={classes["icon-delete"]}
          onClick={onClick}
        >
          <SvgSelector id="delete" />
        </IconButton>
      </div>
    </div>
  );
};

export default Friend;
