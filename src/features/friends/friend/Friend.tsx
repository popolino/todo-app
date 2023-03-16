import React from "react";
import classes from "src/features/friends/Friends.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import clsx from "clsx";
import { IconButton } from "@mui/material";

interface TFriend {
  name?: string;
}

const Friend: React.FC<TFriend> = ({ name }) => {
  return (
    <div className={clsx("friend", "module")}>
      <div className="module-part">
        <div className="avatar">
          <p className="letter">{name?.split("")[0]}</p>
        </div>
        <div className="text-module">{name}</div>
      </div>
      <div className="module-part">
        <IconButton size="medium" className={classes["icon-delete"]}>
          <SvgSelector id="delete" />
        </IconButton>
      </div>
    </div>
  );
};

export default Friend;
