import React from "react";
import classes from "src/features/friends/Friends.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import clsx from "clsx";
import { IconButton } from "@mui/material";

interface TPending {
  name?: string;
}

const Pending: React.FC<TPending> = ({ name }) => {
  return (
    <div className={clsx("pending", "module")}>
      <div className="module-part">
        <div className="avatar">
          <p className="letter">{name?.split("")[0]}</p>
        </div>
        <div className="text-module">{name}</div>
      </div>
      <div className="module-part">
        <IconButton size="medium" className={classes["icon-button"]}>
          <SvgSelector id="check_mark" />
        </IconButton>
        <IconButton size="medium" className={classes["icon-button"]}>
          <SvgSelector id="cancel" />
        </IconButton>
      </div>
    </div>
  );
};

export default Pending;
