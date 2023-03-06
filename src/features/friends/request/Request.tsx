import React from "react";
import classes from "./Request.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import clsx from "clsx";
import { IconButton } from "@mui/material";

interface TRequest {
  name: string;
}

const Request: React.FC<TRequest> = ({ name }) => {
  return (
    <div className={clsx(classes.request, "module")}>
      <div className={classes.part}>
        <div className="avatar">
          <p className="letter">{name.split("")[0]}</p>
        </div>
        <div className="text-module">{name}</div>
      </div>
      <div className={classes.part}>
        <IconButton size="medium" className={classes.iconButton}>
          <SvgSelector id="check_mark" />
        </IconButton>
        <IconButton size="medium" className={classes.iconButton}>
          <SvgSelector id="cancel" />
        </IconButton>
      </div>
    </div>
  );
};

export default Request;
