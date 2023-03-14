import React from "react";
import classes from "./Category.module.scss";
import clsx from "clsx";
import { IconButton } from "@mui/material";

interface TCategories {
  name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Category: React.FC<TCategories> = ({ name, onClick }) => {
  return (
    <div className={clsx("module", classes.module)}>
      <p className="text-module">{name}</p>
      <IconButton
        classes={{ sizeLarge: classes["icon-button"] }}
        size="large"
        onClick={onClick}
      >
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
