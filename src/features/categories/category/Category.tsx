import React from "react";
import classes from "./Category.module.scss";
import clsx from "clsx";
import { IconButton } from "@mui/material";

interface TCategories {
  name: string;
  onContextMenu: (event: React.MouseEvent) => void;
}

const Category: React.FC<TCategories> = ({ name, onContextMenu }) => {
  return (
    <div
      className={clsx("module", classes.module)}
      onContextMenu={onContextMenu}
    >
      <p className="text-module">{name}</p>
      <IconButton classes={{ sizeLarge: classes["icon-button"] }} size="large">
        <div className={classes.options}>
          <div />
          <div />
          <div />
        </div>
      </IconButton>
    </div>
  );
};
export default Category;
