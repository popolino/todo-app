import React from "react";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import classes from "src/features/friends/Friends.module.scss";
import clsx from "clsx";
import { IconButton } from "@mui/material";

interface TRequest {
  name?: string;
  picture: string | null;
  onClick: () => void;
}

const Outgoing: React.FC<TRequest> = ({ name, picture, onClick }) => {
  return (
    <div className={clsx("outgoing", "module")}>
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
          onClick={onClick}
        >
          <SvgSelector id="cancel" />
        </IconButton>
      </div>
    </div>
  );
};

export default Outgoing;
