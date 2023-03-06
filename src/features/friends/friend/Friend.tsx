import React from "react";
import classes from "./Friend.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import clsx from "clsx";
import { IconButton } from "@mui/material";

interface TRequest {
  name: string;
}

const Friend: React.FC<TRequest> = ({ name }) => {
  return (
    <div className={clsx(classes.friend, "module")}>
      <div className={classes.part}>
        <div className="avatar">
          <p className="letter">{name.split("")[0]}</p>
        </div>
        <div className="text-module">{name}</div>
      </div>
      <div className={classes.part}>
        <IconButton size="medium" className={classes.iconButton}>
          <SvgSelector id="delete" />
        </IconButton>
      </div>
    </div>
  );
};

export default Friend;
