import React from "react";
import classes from "src/features/friends/Friends.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import clsx from "clsx";
import { IconButton } from "@mui/material";

interface TPending {
  name?: string;
  picture: string | null;
  onDelete: () => void;
  onAcceptFriend: () => void;
}

const Pending: React.FC<TPending> = ({
  name,
  picture,
  onDelete,
  onAcceptFriend,
}) => {
  return (
    <div className={clsx("pending", "module")}>
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
          className={classes["icon-button"]}
          onClick={onAcceptFriend}
        >
          <SvgSelector id="check_mark" />
        </IconButton>
        <IconButton
          size="medium"
          className={classes["icon-button"]}
          onClick={onDelete}
        >
          <SvgSelector id="cancel" />
        </IconButton>
      </div>
    </div>
  );
};

export default Pending;
