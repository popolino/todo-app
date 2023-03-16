import React from "react";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import classes from "src/features/friends/Friends.module.scss";
import clsx from "clsx";
import { IconButton } from "@mui/material";

interface TRequest {
  name?: string;
}

const Outgoing: React.FC<TRequest> = ({ name }) => {
  return (
    <div className={clsx("outgoing", "module")}>
      <div className="module-part">
        <div className="avatar">
          <p className="letter">{name?.split("")[0]}</p>
        </div>
        <div className="text-module">{name}</div>
      </div>
      <div className="module-part">
        <IconButton size="medium" className={classes["icon-button"]}>
          <SvgSelector id="cancel" />
        </IconButton>
      </div>
    </div>
  );
};

export default Outgoing;
